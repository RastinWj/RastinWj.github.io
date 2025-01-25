import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Monitor,
  Cpu,
  PenTool as Tool,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  History,
  Award,
  Users,
  Building,
  CheckCircle2,
  Languages,
  Menu,
  X,
  Calendar,
} from 'lucide-react';
import { BuildDetail } from './pages/BuildDetail';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { BuildCard } from './components/BuildCard';
import { builds } from './data/builds';
import { blogPosts } from './data/blog';
import { ScrollAnimation } from './components/ScrollAnimation';
import { AuthModal } from './components/AuthModal';
import { CartModal } from './components/CartModal';
import { CartButton } from './components/CartButton';
import { supabase } from './lib/supabase';
import { ContactForm } from './components/ContactForm';

function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
      <div className="loading-wrapper">
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-shadow"></div>
        <div className="loading-shadow"></div>
        <div className="loading-shadow"></div>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPersian, setIsPersian] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for user session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cart count effect
  useEffect(() => {
    if (user) {
      const fetchCartCount = async () => {
        const { data, error } = await supabase
          .from('cart_items')
          .select('id', { count: 'exact' });
        
        if (!error) {
          setCartItemCount(data.length);
        }
      };

      fetchCartCount();

      // Subscribe to changes
      const channel = supabase
        .channel('cart_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'cart_items'
          },
          () => {
            fetchCartCount();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setCartItemCount(0);
    }
  }, [user]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const heroImages = [
    {
      url: 'https://i.imgur.com/EqTXjSA.jpeg',
      alt: 'High-end gaming PC with RGB lighting',
    },
    {
      url: 'https://i.imgur.com/hSxP7VB.jpeg',
      alt: 'Custom water-cooled PC build',
    },
    {
      url: 'https://i.imgur.com/5WnfLQX.jpeg',
      alt: 'Professional workstation setup',
    },
    {
      url: 'https://i.imgur.com/mRboqrv.jpeg',
      alt: 'Clean minimalist PC build',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Routes>
        <Route path="/builds/:id" element={<BuildDetail isPersian={isPersian} user={user} />} />
        <Route path="/products/:id" element={<ProductDetail isPersian={isPersian} user={user} />} />
        <Route path="/products" element={<Products isPersian={isPersian} user={user} />} />
        <Route path="/blog" element={<Blog isPersian={isPersian} />} />
        <Route path="/blog/:slug" element={<BlogPost isPersian={isPersian} />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-900">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <div className="flex items-center space-x-4">
                    <img 
                      src="https://i.imgur.com/HUom5p1.jpeg"
                      alt="WJ Industry Logo"
                      className="h-8 w-auto object-contain"
                    />
                    <span className="text-white font-bold text-xl">
                      {isPersian ? ' وی جی سیستم' : 'WJ System'}
                    </span>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-8">
                    <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                      {isPersian ? 'درباره ما' : 'About'}
                    </a>
                    <button 
                      onClick={() => navigate('/products')}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {isPersian ? 'محصولات' : 'Products'}
                    </button>
                    <button
                      onClick={() => navigate('/blog')}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {isPersian ? 'وبلاگ' : 'Blog'}
                    </button>
                    <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                      {isPersian ? 'نظرات' : 'Testimonials'}
                    </a>
                  </div>

                  {/* Desktop Actions */}
                  <div className="hidden md:flex items-center space-x-4">
                    <button
                      onClick={() => setIsPersian(!isPersian)}
                      className="text-gray-300 hover:text-white transition-colors"
                      aria-label="Toggle Language"
                    >
                      <Languages className="h-6 w-6" />
                    </button>

                    {user ? (
                      <>
                        <CartButton
                          onClick={() => setIsCartModalOpen(true)}
                          itemCount={cartItemCount}
                          isPersian={isPersian}
                        />
                        <button
                          onClick={handleLogout}
                          className="glow-button"
                        >
                          {isPersian ? 'خروج' : 'Logout'}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setAuthMode('login');
                            setIsAuthModalOpen(true);
                          }}
                          className="glow-button"
                        >
                          {isPersian ? 'ورود' : 'Login'}
                        </button>
                        <button
                          onClick={() => {
                            setAuthMode('signup');
                            setIsAuthModalOpen(true);
                          }}
                          className="glow-button"
                        >
                          {isPersian ? 'ثبت نام' : 'Sign Up'}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-gray-300 hover:text-white transition-colors"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden fixed inset-x-0 top-16 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 z-40">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex flex-col space-y-4">
                    <a
                      href="#about"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {isPersian ? 'درباره ما' : 'About'}
                    </a>
                    <button
                      onClick={() => {
                        navigate('/products');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-300 hover:text-white transition-colors text-left"
                    >
                      {isPersian ? 'محصولات' : 'Products'}
                    </button>
                    <button
                      onClick={() => {
                        navigate('/blog');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-300 hover:text-white transition-colors text-left"
                    >
                      {isPersian ? 'وبلاگ' : 'Blog'}
                    </button>
                    <a
                      href="#testimonials"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {isPersian ? 'نظرات' : 'Testimonials'}
                    </a>

                    <div className="pt-4 border-t border-gray-800 flex flex-col space-y-4">
                      <button
                        onClick={() => setIsPersian(!isPersian)}
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Languages className="h-6 w-6" />
                        {isPersian ? 'تغییر زبان' : 'Change Language'}
                      </button>

                      {user ? (
                        <>
                          <CartButton
                            onClick={() => {
                              setIsCartModalOpen(true);
                              setIsMobileMenuOpen(false);
                            }}
                            itemCount={cartItemCount}
                            isPersian={isPersian}
                          />
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsMobileMenuOpen(false);
                            }}
                            className="glow-button"
                          >
                            {isPersian ? 'خروج' : 'Logout'}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setAuthMode('login');
                              setIsAuthModalOpen(true);
                              setIsMobileMenuOpen(false);
                            }}
                            className="glow-button"
                          >
                            {isPersian ? 'ورود' : 'Login'}
                          </button>
                          <button
                            onClick={() => {
                              setAuthMode('signup');
                              setIsAuthModalOpen(true);
                              setIsMobileMenuOpen(false);
                            }}
                            className="glow-button"
                          >
                            {isPersian ? 'ثبت نام' : 'Sign Up'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Section */}
            <section className="relative h-screen">
              {/* Hero Background */}
              <div className="absolute inset-0">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                  </div>
                ))}
              </div>

              {/* Hero Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl">
                    <ScrollAnimation animation="fade-in-section">
                      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        {isPersian
                          ? 'ساخت کامپیوتر رویایی شما'
                          : 'Build Your Dream PC'}
                      </h1>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-in-section">
                      <p className="text-xl text-gray-300 mb-8">
                        {isPersian
                          ? 'با بیش از یک دهه تجربه در ساخت سیستم‌های سفارشی، ما به شما کمک می‌کنیم تا کامپیوتر ایده‌آل خود را بسازید.'
                          : 'With over a decade of experience in custom PC building, we help you create your ideal computer setup.'}
                      </p>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-in-section">
                      <div className="flex flex-wrap gap-4">
                        <a href="#builds" className="glow-button">
                          {isPersian ? 'مشاهده محصولات' : 'View Builds'}
                        </a>
                        <a href="#contact" className="glow-button">
                          {isPersian ? 'تماس با ما' : 'Contact Us'}
                        </a>
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-800">
              <div className="container mx-auto px-4">
                <ScrollAnimation animation="fade-in-section">
                  <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {isPersian ? 'چرا ما را انتخاب کنید؟' : 'Why Choose Us?'}
                  </h2>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <ScrollAnimation animation="slide-in-left">
                    <div className="text-center">
                      <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <History className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {isPersian ? 'تجربه' : 'Experience'}
                      </h3>
                      <p className="text-gray-300">
                        {isPersian
                          ? '۱۰+ سال تجربه در صنعت'
                          : '10+ Years in Industry'}
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-in-left">
                    <div className="text-center">
                      <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {isPersian ? 'کیفیت' : 'Quality'}
                      </h3>
                      <p className="text-gray-300">
                        {isPersian
                          ? 'بهترین قطعات با گارانتی'
                          : 'Premium Parts & Warranty'}
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-in-right">
                    <div className="text-center">
                      <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {isPersian ? 'پشتیبانی' : 'Support'}
                      </h3>
                      <p className="text-gray-300">
                        {isPersian
                          ? 'پشتیبانی ۲۴/۷'
                          : '24/7 Customer Support'}
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-in-right">
                    <div className="text-center">
                      <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {isPersian ? 'تضمین' : 'Guarantee'}
                      </h3>
                      <p className="text-gray-300">
                        {isPersian
                          ? 'تضمین رضایت مشتری'
                          : 'Satisfaction Guaranteed'}
                      </p>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </section>

            {/* Featured Builds Section */}
            <section id="builds" className="py-20">
              <div className="container mx-auto px-4">
                <ScrollAnimation animation="fade-in-section">
                  <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {isPersian ? 'محصولات' : 'Featured Builds'}
                  </h2>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {builds.map((build, index) => (
                    <ScrollAnimation key={build.id} animation="scale-in">
                      <BuildCard build={build} isPersian={isPersian} />
                    </ScrollAnimation>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => navigate('/products')}
                    className="glow-button"
                  >
                    {isPersian ? 'مشاهده همه محصولات' : 'View All Products'}
                  </button>
                </div>
              </div>
            </section>

            {/* Blog Preview Section */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <ScrollAnimation animation="fade-in-section">
                  <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {isPersian ? 'آخرین مقالات' : 'Latest Articles'}
                  </h2>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.slice(0, 3).map((post) => (
                    <ScrollAnimation key={post.id} animation="scale-in">
                      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
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
                          <h3 className="text-xl font-bold text-white mb-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-gray-300 mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(post.published_at || post.created_at).toLocaleDateString(
                                  isPersian ? 'fa-IR' : 'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  }
                                )}
                              </span>
                            </div>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {isPersian ? 'ادامه مطلب' : 'Read More'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => navigate('/blog')}
                    className="glow-button"
                  >
                    {isPersian ? 'مشاهده همه مقالات' : 'View All Articles'}
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gray-800">
              <div className="container mx-auto px-4">
                <ScrollAnimation animation="fade-in-section">
                  <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {isPersian ? 'نظرات مشتریان' : 'What Our Customers Say'}
                  </h2>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <ScrollAnimation animation="slide-in-left">
                    <div className="bg-gray-900 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {isPersian ? 'علی رضایی' : 'Ali Rezaei'}
                          </h3>
                          <div className="flex text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300">
                        {isPersian
                          ? 'بهترین سیستمی که تا به حال داشته‌ام. کیفیت ساخت و پشتیبانی عالی است.'
                          : "Best PC I've ever owned. The build quality and support are outstanding."}
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="fade-in-section">
                    <div className="bg-gray-900 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {isPersian ? 'مریم حسینی' : 'Maryam Hosseini'}
                          </h3>
                          <div className="flex text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300">
                        {isPersian
                          ? 'فرآیند سفارش بسیار ساده و سریع بود. از نتیجه نهایی کاملاً راضی هستم.'
                          : 'The ordering process was smooth and fast. Completely satisfied with the final result.'}
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-in-right">
                    <div className="bg-gray-900 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {isPersian ? 'محمد کریمی' : 'Mohammad Karimi'}
                          </h3>
                          <div className="flex text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300">
                        {isPersian
                          ? 'پشتیبانی فنی عالی و قیمت‌های رقابتی. قطعاً دوباره خرید خواهم کرد.'
                          : 'Excellent technical support and competitive prices. Will definitely buy again.'}
                      </p>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
              <div className="container mx-auto px-4">
                <ScrollAnimation animation="fade-in-section">
                  <h2 className="text-4xl font-bold text-white text-center mb-16">
                    {isPersian ? 'تماس با ما' : 'Contact Us'}
                  </h2>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ScrollAnimation animation="slide-in-left">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">
                            {isPersian ? 'ایمیل' : 'Email'}
                          </h3>
                          <p className="text-gray-300">info@wjindustry.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">
                            {isPersian ? 'تلفن' : 'Phone'}
                          </h3>
                          <p className="text-gray-300">+1 (555) 123-4567</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">
                            {isPersian ? 'آدرس' : 'Address'}
                          </h3>
                          <p className="text-gray-300">
                            {isPersian
                              ? 'تهران، خیابان ولیعصر، پلاک ۱۲۳'
                              : 'Tehran, Vali-e-Asr Street, No. 123'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-in-right">
                    <ContactForm isPersian={isPersian} />
                  </ScrollAnimation>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 py-12">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">
                      {isPersian ? 'درباره ما' : 'About Us'}
                    </h3>
                    <p className="text-gray-400">
                      {isPersian
                        ? 'ما متخصص در ساخت کامپیوتر سفارشی با کیفیت بالا هستیم'
                        : 'We specialize in building high-quality custom computers.'}
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Mail className="h-5  w-5" />
                        <span>info@wjindustry.com</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 mt-2">
                        <Phone className="h-5 w-5" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">
                      {isPersian ? 'لینک‌های سریع' : 'Quick Links'}
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="#about"
                        className="block text-gray-400 hover:text-white"
                      >
                        {isPersian ? 'درباره ما' : 'About'}
                      </a>
                      <a
                        href="#products"
                        className="block text-gray-400 hover:text-white"
                        onClick={() => navigate('/products')}
                      >
                        {isPersian ? 'محصولات' : 'Products'}
                      </a>
                      <a
                        href="#builds"
                        className="block text-gray-400 hover:text-white"
                      >
                        {isPersian ? 'ساخت‌ها' : 'Builds'}
                      </a>
                      <button
                        onClick={() => navigate('/blog')}
                        className="block text-gray-400 hover:text-white"
                      >
                        {isPersian ? 'وبلاگ' : 'Blog'}
                      </button>
                      <a
                        href="#testimonials"
                        className="block text-gray-400 hover:text-white"
                      >
                        {isPersian ? 'نظرات' : 'Testimonials'}
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">
                      {isPersian ? 'ما را دنبال کنید' : 'Follow Us'}
                    </h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-blue-400">
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-400">
                        <Twitter className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-400">
                        <Instagram className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  © {new Date().getFullYear()} {isPersian ? 'صنعت وی جی' : 'WJ Industry'}. {isPersian ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.'}
                </div>
              </div>
            </footer>

            {/* Auth Modal */}
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              mode={authMode}
              isPersian={isPersian}
            />

            {/* Cart Modal */}
            <CartModal
              isOpen={isCartModalOpen}
              onClose={() => setIsCartModalOpen(false)}
              isPersian={isPersian}
            />
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;