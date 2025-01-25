import { BlogPost, BlogCategory } from '../types/blog';

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Gaming',
    slug: 'gaming',
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: '2',
    name: 'Hardware',
    slug: 'hardware',
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: '3',
    name: 'Tech News',
    slug: 'tech-news',
    created_at: '2024-01-25T00:00:00Z'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Gaming PCs in 2025',
    slug: 'future-of-gaming-pcs-2025',
    content: `The landscape of gaming PCs is evolving rapidly as we move through 2025. With the introduction of next-generation processors and graphics cards, we're seeing unprecedented levels of performance becoming available to gamers.

The rise of AI-enhanced gaming experiences is perhaps the most significant trend this year. NVIDIA's DLSS technology has set new standards for performance optimization, while AMD's FSR continues to evolve, offering competitive alternatives for high-performance gaming.

Another notable trend is the increasing focus on energy efficiency. As hardware becomes more powerful, manufacturers are putting more emphasis on creating components that deliver maximum performance while consuming less power. This is not just good for your electricity bill – it's also essential for environmental sustainability.

The custom PC building community has also seen interesting developments. The popularity of small form factor (SFF) builds continues to grow, with manufacturers releasing increasingly sophisticated components designed specifically for compact builds. This trend reflects a broader shift in how we think about gaming setups, with many users preferring space-efficient solutions that don't compromise on performance.

Looking ahead, we can expect to see:
- More widespread adoption of DDR5 RAM as prices continue to fall
- Increased focus on AI-powered gaming features
- Greater emphasis on power efficiency
- Innovation in cooling solutions
- More options for small form factor builds

The future of gaming PCs looks bright, with continuous innovations making high-end gaming more accessible and efficient than ever before.`,
    excerpt: 'Explore the latest trends and innovations shaping the future of gaming PCs in 2025.',
    cover_image: 'https://i.imgur.com/eBhdG9L.jpeg',
    author_id: '1',
    published: true,
    published_at: '2025-01-25T12:00:00Z',
    created_at: '2025-01-25T10:00:00Z',
    updated_at: '2025-01-25T12:00:00Z',
    author: { 
      email: 'tech.expert@example.com'
    },
    categories: [
      {
        category: {
          id: '1',
          name: 'Gaming',
          slug: 'gaming',
          created_at: '2024-01-25T00:00:00Z'
        }
      },
      {
        category: {
          id: '2',
          name: 'Hardware',
          slug: 'hardware',
          created_at: '2024-01-25T00:00:00Z'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Understanding PC Cooling Solutions',
    slug: 'understanding-pc-cooling-solutions',
    content: `Effective cooling is crucial for maintaining optimal performance in your PC. In this comprehensive guide, we'll explore different cooling solutions and help you choose the right one for your setup.

Air Cooling:
The traditional method of cooling your PC components involves using heatsinks and fans. Air coolers are generally more affordable and require less maintenance than liquid cooling solutions. High-end air coolers can even compete with entry-level liquid coolers in terms of performance.

Liquid Cooling:
AIO (All-In-One) liquid coolers have become increasingly popular due to their excellent cooling performance and aesthetic appeal. Custom loop liquid cooling offers the best possible cooling performance but requires more maintenance and expertise to set up.

Key Factors to Consider:
- Case airflow
- Component heat output
- Noise levels
- Budget
- Maintenance requirements
- Aesthetic preferences

Recommendations:
For most users, a good air cooler or AIO liquid cooler will provide sufficient cooling. Custom loop cooling is recommended only for enthusiasts who prioritize maximum performance and are willing to invest time in maintenance.

Remember, proper thermal paste application and regular cleaning are essential regardless of your chosen cooling solution. With the right cooling setup, you can ensure your PC runs at its best while maintaining safe temperatures.`,
    excerpt: 'A comprehensive guide to PC cooling solutions, from air cooling to custom liquid loops.',
    cover_image: 'https://i.imgur.com/SxDpvOv.jpeg',
    author_id: '2',
    published: true,
    published_at: '2024-01-24T15:00:00Z',
    created_at: '2024-01-24T14:00:00Z',
    updated_at: '2024-01-24T15:00:00Z',
    author: {
      email: 'cooling.expert@example.com'
    },
    categories: [
      {
        category: {
          id: '2',
          name: 'Hardware',
          slug: 'hardware',
          created_at: '2024-01-25T00:00:00Z'
        }
      }
    ]
  },
  {
    id: '3',
    title: 'Next-Gen CPUs: What to Expect',
    slug: 'next-gen-cpus-what-to-expect',
    content: `The CPU market is heating up with exciting developments from both Intel and AMD. Let's dive into what we can expect from the next generation of processors.

Performance Improvements:
The upcoming generation of CPUs promises significant improvements in both single-core and multi-core performance. We're seeing better power efficiency alongside these performance gains, thanks to advanced manufacturing processes.

New Technologies:
- Enhanced AI capabilities
- Improved integrated graphics
- Better power management
- Advanced security features

Market Impact:
These developments are likely to influence both high-end and mainstream segments, making powerful computing more accessible to average users while pushing the boundaries of what's possible in professional workloads.

The competition between manufacturers continues to drive innovation, resulting in better products for consumers. Whether you're a gamer, content creator, or professional user, the future of CPU technology looks promising.`,
    excerpt: 'Explore the upcoming developments in CPU technology and what they mean for users.',
    cover_image: 'https://i.imgur.com/vaKzz9G.jpeg',
    author_id: '1',
    published: true,
    published_at: '2024-01-23T10:00:00Z',
    created_at: '2024-01-23T09:00:00Z',
    updated_at: '2024-01-23T10:00:00Z',
    author: {
      email: 'tech.expert@example.com'
    },
    categories: [
      {
        category: {
          id: '2',
          name: 'Hardware',
          slug: 'hardware',
          created_at: '2024-01-25T00:00:00Z'
        }
      },
      {
        category: {
          id: '3',
          name: 'Tech News',
          slug: 'tech-news',
          created_at: '2024-01-25T00:00:00Z'
        }
      }
    ]
  }
];