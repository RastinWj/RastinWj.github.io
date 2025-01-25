/*
  # Blog System Schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `content` (text, required)
      - `excerpt` (text)
      - `cover_image` (text)
      - `author_id` (uuid, references profiles)
      - `published` (boolean)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `blog_categories`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `slug` (text, unique, required)
    - `blog_post_categories`
      - Junction table for posts and categories
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their posts
    - Add policies for public access to published posts
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  cover_image text,
  author_id uuid REFERENCES profiles(id) NOT NULL,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create junction table for posts and categories
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authors can manage their own posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Create policies for blog_categories
CREATE POLICY "Public can view categories"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON blog_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for blog_post_categories
CREATE POLICY "Public can view post categories"
  ON blog_post_categories
  FOR SELECT
  TO public
  USING (EXISTS (
    SELECT 1 FROM blog_posts
    WHERE blog_posts.id = post_id
    AND blog_posts.published = true
  ));

CREATE POLICY "Authors can manage their post categories"
  ON blog_post_categories
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM blog_posts
    WHERE blog_posts.id = post_id
    AND blog_posts.author_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM blog_posts
    WHERE blog_posts.id = post_id
    AND blog_posts.author_id = auth.uid()
  ));

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();