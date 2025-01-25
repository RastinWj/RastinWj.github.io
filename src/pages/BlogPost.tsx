import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { ScrollAnimation } from '../components/ScrollAnimation';
import { blogPosts } from '../data/blog';

interface BlogPostProps {
  isPersian?: boolean;
}

export const BlogPost: React.FC<BlogPostProps> = ({ isPersian = false }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(isPersian ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {isPersian ? 'پست یافت نشد' : 'Post not found'}
          </h1>
          <button
            onClick={() => navigate('/blog')}
            className="glow-button"
          >
            {isPersian ? 'بازگشت به وبلاگ' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <ScrollAnimation animation="fade-in-section">
            <button
              onClick={() => navigate('/blog')}
              className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isPersian ? 'بازگشت به وبلاگ' : 'Back to Blog'}</span>
            </button>
          </ScrollAnimation>

          {/* Title */}
          <ScrollAnimation animation="fade-in-section">
            <h1 className="text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>
          </ScrollAnimation>

          {/* Meta Information */}
          <ScrollAnimation animation="fade-in-section">
            <div className="flex flex-wrap gap-4 text-gray-400 mb-8">
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-5 h-5" />
                <span>{post.author?.email.split('@')[0]}</span>
              </div>
              {post.categories && post.categories.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="w-5 h-5" />
                  <span>
                    {post.categories
                      .map((pc) => pc.category.name)
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* Cover Image */}
          {post.cover_image && (
            <ScrollAnimation animation="fade-in-section">
              <div className="mb-8">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </ScrollAnimation>
          )}

          {/* Content */}
          <ScrollAnimation animation="fade-in-section">
            <div className="prose prose-invert max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};