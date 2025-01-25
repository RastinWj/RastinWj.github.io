import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { ScrollAnimation } from '../components/ScrollAnimation';
import { blogPosts, blogCategories } from '../data/blog';

interface BlogProps {
  isPersian?: boolean;
}

export const Blog: React.FC<BlogProps> = ({ isPersian = false }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => 
        post.categories?.some(pc => pc.category.slug === selectedCategory)
      )
    : blogPosts;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(isPersian ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <ScrollAnimation animation="fade-in-section">
          <button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isPersian ? 'بازگشت به خانه' : 'Back to Home'}</span>
          </button>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-section">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            {isPersian ? 'وبلاگ' : 'Blog'}
          </h1>
        </ScrollAnimation>

        {/* Categories */}
        <ScrollAnimation animation="slide-in-left">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                !selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {isPersian ? 'همه' : 'All'}
            </button>
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              {isPersian
                ? 'هیچ پستی در این دسته‌بندی یافت نشد'
                : 'No posts found in this category'}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <ScrollAnimation key={post.id} animation="scale-in">
                <Link
                  to={`/blog/${post.slug}`}
                  className="block bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2"
                >
                  {post.cover_image && (
                    <div className="relative h-48">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author?.email.split('@')[0]}</span>
                      </div>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          <span>
                            {post.categories
                              .map((pc) => pc.category.name)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))
          )}
        </div>
      </div>
    </div>
  );
};