export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  author_id: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: {
    email: string;
  };
  categories?: BlogCategory[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface CreateBlogPostData {
  title: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published?: boolean;
  category_ids?: string[];
}