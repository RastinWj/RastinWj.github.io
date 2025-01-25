/*
  # Fix Cart Items Table and RLS Policies

  1. Changes
    - Add default value for user_id using auth.uid()
    - Update RLS policies to properly handle user authentication
    - Improve merge cart items function with better error handling

  2. Security
    - Ensure RLS policies properly restrict access to authenticated users
    - Validate user_id matches auth.uid()
*/

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid() REFERENCES auth.users NOT NULL,
  product_id text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  date_added timestamptz DEFAULT now(),
  last_modified timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own cart items" ON cart_items;
  DROP POLICY IF EXISTS "Users can insert own cart items" ON cart_items;
  DROP POLICY IF EXISTS "Users can update own cart items" ON cart_items;
  DROP POLICY IF EXISTS "Users can delete own cart items" ON cart_items;
END $$;

-- Create policies
CREATE POLICY "Users can view own cart items"
  ON cart_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update last_modified
CREATE OR REPLACE FUNCTION update_cart_item_last_modified()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modified = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for last_modified updates
DROP TRIGGER IF EXISTS update_cart_item_last_modified ON cart_items;
CREATE TRIGGER update_cart_item_last_modified
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_cart_item_last_modified();

-- Create function to handle duplicate items
CREATE OR REPLACE FUNCTION merge_cart_items()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure user_id is set to auth.uid()
  NEW.user_id := auth.uid();
  
  -- Check if item already exists for user
  IF EXISTS (
    SELECT 1 FROM cart_items 
    WHERE user_id = NEW.user_id 
    AND product_id = NEW.product_id
    AND id != NEW.id
  ) THEN
    -- Update existing item quantity
    UPDATE cart_items
    SET quantity = quantity + NEW.quantity,
        last_modified = now()
    WHERE user_id = NEW.user_id 
    AND product_id = NEW.product_id
    AND id != NEW.id;
    RETURN NULL; -- Prevent insert of new row
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for merging duplicate items
DROP TRIGGER IF EXISTS merge_cart_items ON cart_items;
CREATE TRIGGER merge_cart_items
  BEFORE INSERT ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION merge_cart_items();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON cart_items TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;