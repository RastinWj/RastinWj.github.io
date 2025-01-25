-- Update blog_posts foreign key
ALTER TABLE blog_posts
DROP CONSTRAINT blog_posts_author_id_fkey,
ADD CONSTRAINT blog_posts_author_id_fkey 
  FOREIGN KEY (author_id) 
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- Ensure RLS policies are updated
DROP POLICY IF EXISTS "Authors can manage their own posts" ON blog_posts;
CREATE POLICY "Authors can manage their own posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());