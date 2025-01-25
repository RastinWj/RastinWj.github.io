/*
  # Create cart items table and related functions

  1. New Tables
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (text)
      - `quantity` (integer)
      - `date_added` (timestamp)
      - `last_modified` (timestamp)

  2. Security
    - Enable RLS on `cart_items` table
    - Add policies for authenticated users to manage their cart items
*/

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_id text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  date_added timestamptz DEFAULT now(),
  last_modified timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

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
CREATE TRIGGER update_cart_item_last_modified
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_cart_item_last_modified();

-- Create function to handle duplicate items
CREATE OR REPLACE FUNCTION merge_cart_items()
RETURNS TRIGGER AS $$
BEGIN
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
CREATE TRIGGER merge_cart_items
  BEFORE INSERT ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION merge_cart_items();