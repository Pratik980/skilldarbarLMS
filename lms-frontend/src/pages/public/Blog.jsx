// Blog.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/publicStyles/Blog.css';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const featuredPosts = [
    {
      id: 1,
      title: 'How to Start Freelancing in Nepal: Complete Guide 2026',
      excerpt: 'Learn the step-by-step process to start your freelancing journey from Nepal. Find clients, set rates, and build a successful career.',
      author: 'Ramesh Adhikari',
      authorRole: 'Freelance Expert',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop',
      date: 'March 15, 2026',
      readTime: '8 min read',
      category: 'freelancing',
      tags: ['Freelancing', 'Career', 'Nepal'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop',
      views: 15420,
      likes: 892,
      featured: true
    },
    {
      id: 2,
      title: 'Top 10 Skills in Demand for 2026',
      excerpt: 'Discover which skills will dominate the job market in 2026 and how to prepare yourself for the future of work.',
      author: 'Sunita Karki',
      authorRole: 'Career Counselor',
      authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop',
      date: 'March 10, 2026',
      readTime: '6 min read',
      category: 'career',
      tags: ['Skills', 'Career', 'Future'],
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop',
      views: 12350,
      likes: 745,
      featured: true
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: 'Graphic Design Career Guide: From Beginner to Pro',
      excerpt: 'Everything you need to know about building a successful graphic design career. Tools, skills, portfolio tips, and job opportunities.',
      author: 'Bikram Thapa',
      authorRole: 'Senior Designer',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop',
      date: 'March 5, 2026',
      readTime: '10 min read',
      category: 'design',
      tags: ['Graphic Design', 'Career', 'Portfolio'],
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop',
      views: 8900,
      likes: 567
    },
    {
      id: 4,
      title: 'Meta Ads for Beginners: Complete Guide 2026',
      excerpt: 'Learn how to create, manage, and optimize Facebook and Instagram ads. Perfect for small business owners and marketers.',
      author: 'Priya Gurung',
      authorRole: 'Digital Marketing Specialist',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop',
      date: 'February 28, 2026',
      readTime: '7 min read',
      category: 'marketing',
      tags: ['Meta Ads', 'Facebook', 'Instagram', 'Marketing'],
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&auto=format&fit=crop',
      views: 11200,
      likes: 678
    },
    {
      id: 5,
      title: 'How to Build a Portfolio That Gets You Hired',
      excerpt: 'Tips and examples for creating a standout portfolio that impresses clients and employers.',
      author: 'Ramesh Adhikari',
      authorRole: 'Freelance Expert',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop',
      date: 'February 20, 2026',
      readTime: '5 min read',
      category: 'career',
      tags: ['Portfolio', 'Job Search', 'Tips'],
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop',
      views: 7800,
      likes: 423
    },
    {
      id: 6,
      title: 'Video Editing: Tools Every Beginner Needs',
      excerpt: 'A comprehensive guide to video editing software for beginners. Free and paid options compared.',
      author: 'Bikram Thapa',
      authorRole: 'Video Editor',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop',
      date: 'February 15, 2026',
      readTime: '6 min read',
      category: 'video',
      tags: ['Video Editing', 'Tools', 'Software'],
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop',
      views: 6500,
      likes: 389
    },
    {
      id: 7,
      title: 'Web Development Roadmap 2026',
      excerpt: 'Complete roadmap to become a web developer in 2026. Technologies to learn, projects to build, and resources to use.',
      author: 'Sunita Karki',
      authorRole: 'Career Counselor',
      authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop',
      date: 'February 10, 2026',
      readTime: '9 min read',
      category: 'development',
      tags: ['Web Development', 'Roadmap', 'Coding'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop',
      views: 14300,
      likes: 892
    },
    {
      id: 8,
      title: 'App Development: Native vs Cross-Platform',
      excerpt: 'Compare native and cross-platform app development approaches. Which one is right for your project?',
      author: 'Priya Gurung',
      authorRole: 'App Developer',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop',
      date: 'February 5, 2026',
      readTime: '7 min read',
      category: 'development',
      tags: ['App Development', 'React Native', 'Flutter'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop',
      views: 5400,
      likes: 312
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length + featuredPosts.length },
    { id: 'freelancing', name: 'Freelancing', count: 1 },
    { id: 'career', name: 'Career', count: 2 },
    { id: 'design', name: 'Design', count: 1 },
    { id: 'marketing', name: 'Marketing', count: 1 },
    { id: 'video', name: 'Video', count: 1 },
    { id: 'development', name: 'Development', count: 2 }
  ];

  const popularTags = [
    'Freelancing', 'Career', 'Nepal', 'Web Development', 'Design', 
    'Marketing', 'Video Editing', 'Portfolio', 'Skills 2026', 'Meta Ads'
  ];

  const filteredPosts = [...featuredPosts, ...blogPosts].filter(post => 
    (selectedCategory === 'all' || post.category === selectedCategory) &&
    (searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="blog-">

      {/*===================================
        1. HERO SECTION
      ===================================*/}
      <section className="blog-hero">
        <div className="blog-hero-particles"></div>
        <div className="blog-container">
          <div className="blog-hero-content">
            <div className="blog-hero-badge">
              <span>📝 Skill Darbar Blog</span>
            </div>
            <h1 className="blog-hero-title">
              Insights & <span className="blog-hero-highlight">Guides</span>
            </h1>
            <p className="blog-hero-subtitle">
              Tips, tutorials, and career advice for Nepali learners and professionals
            </p>
            
            {/* Search Bar */}
            <div className="blog-search-wrapper">
              <div className="blog-search-box">
                <svg className="blog-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="blog-search-input"
                />
              </div>
            </div>

            <div className="blog-hero-stats">
              <div className="blog-hero-stat">
                <span className="blog-stat-number">50+</span>
                <span className="blog-stat-label">Articles</span>
              </div>
              <div className="blog-hero-stat">
                <span className="blog-stat-number">10k+</span>
                <span className="blog-stat-label">Monthly Readers</span>
              </div>
              <div className="blog-hero-stat">
                <span className="blog-stat-number">5</span>
                <span className="blog-stat-label">Expert Writers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        2. FEATURED POSTS
      ===================================*/}
      {searchTerm === '' && selectedCategory === 'all' && (
        <section className="blog-featured">
          <div className="blog-container">
            <div className="blog-section-header">
              <h2 className="blog-section-title">Featured <span>Articles</span></h2>
              <p className="blog-section-subtitle">Must-read guides for your career journey</p>
            </div>

            <div className="blog-featured-grid">
              {featuredPosts.map((post) => (
                <div key={post.id} className="blog-featured-card">
                  <div className="blog-featured-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-featured-badge">Featured</div>
                  </div>
                  <div className="blog-featured-content">
                    <div className="blog-meta">
                      <span className="blog-category">{post.category}</span>
                      <span className="blog-date">📅 {post.date}</span>
                      <span className="blog-read-time">⏱️ {post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    
                    <div className="blog-author">
                      <img src={post.authorImage} alt={post.author} />
                      <div>
                        <strong>{post.author}</strong>
                        <span>{post.authorRole}</span>
                      </div>
                    </div>

                    <div className="blog-stats">
                      <span>👁️ {post.views.toLocaleString()} views</span>
                      <span>❤️ {post.likes} likes</span>
                    </div>

                    <button className="blog-read-more" onClick={() => alert('Full article coming soon! Stay tuned.')}>
                      Read Article
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/*===================================
        3. MAIN BLOG SECTION WITH SIDEBAR
      ===================================*/}
      <section className="blog-main">
        <div className="blog-container">
          <div className="blog-layout">
            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Categories */}
              <div className="blog-widget">
                <h3 className="blog-widget-title">📂 Categories</h3>
                <ul className="blog-categories">
                  {categories.map(cat => (
                    <li 
                      key={cat.id}
                      className={selectedCategory === cat.id ? 'active' : ''}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span>{cat.name}</span>
                      <span className="blog-count">{cat.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="blog-widget">
                <h3 className="blog-widget-title">🏷️ Popular Tags</h3>
                <div className="blog-tags">
                  {popularTags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="blog-tag"
                      onClick={() => setSearchTerm(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="blog-widget blog-newsletter">
                <h3 className="blog-widget-title">📧 Newsletter</h3>
                <p>Get the latest articles straight to your inbox</p>
                <input type="email" placeholder="Your email" />
                <button onClick={() => alert('Subscribed! Thank you for joining our newsletter.')}>Subscribe</button>
              </div>

              {/* Popular Posts */}
              <div className="blog-widget">
                <h3 className="blog-widget-title">🔥 Popular Posts</h3>
                {[...featuredPosts, ...blogPosts].sort((a, b) => b.views - a.views).slice(0, 3).map(post => (
                  <div key={post.id} className="blog-popular-post">
                    <img src={post.image} alt={post.title} />
                    <div>
                      <h4>{post.title.substring(0, 40)}...</h4>
                      <span>{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div className="blog-content">
              {/* Results count */}
              <div className="blog-results">
                <p>Showing {filteredPosts.length} articles</p>
              </div>

              {/* Blog Grid */}
              <div className="blog-grid">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="blog-card">
                    <div className="blog-card-image">
                      <img src={post.image} alt={post.title} />
                      {post.featured && <span className="blog-card-badge">Featured</span>}
                    </div>
                    
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span className="blog-card-category">{post.category}</span>
                        <span className="blog-card-date">📅 {post.date}</span>
                      </div>

                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>

                      <div className="blog-card-footer">
                        <div className="blog-card-author">
                          <img src={post.authorImage} alt={post.author} />
                          <div>
                            <strong>{post.author}</strong>
                            <span>{post.authorRole}</span>
                          </div>
                        </div>

                        <div className="blog-card-stats">
                          <span>👁️ {post.views.toLocaleString()}</span>
                          <span>❤️ {post.likes}</span>
                        </div>
                      </div>

                      <div className="blog-card-tags">
                        {post.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="blog-card-tag"
                            onClick={() => setSearchTerm(tag)}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button className="blog-card-button" onClick={() => alert('Full article coming soon! Stay tuned.')}>
                        Read More
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="blog-load-more">
                  <button className="blog-load-btn" onClick={() => alert('More articles coming soon!')}>
                    Load More Articles
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <div className="blog-no-results">
                  <div className="blog-no-results-icon">🔍</div>
                  <h3>No articles found</h3>
                  <p>Try different keywords or browse categories</p>
                  <button onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        4. TOPICS COVERED
      ===================================*/}
      <section className="blog-topics">
        <div className="blog-container">
          <h2 className="blog-topics-title">Topics We Cover</h2>
          
          <div className="blog-topics-grid">
            <div className="blog-topic-card">
              <div className="blog-topic-icon">💻</div>
              <h3>Web Development</h3>
              <p>HTML, CSS, JavaScript, React, Node.js, and more</p>
              <span className="blog-topic-count">12 articles</span>
            </div>
            <div className="blog-topic-card">
              <div className="blog-topic-icon">🎨</div>
              <h3>Graphic Design</h3>
              <p>Photoshop, Illustrator, UI/UX, Branding guides</p>
              <span className="blog-topic-count">8 articles</span>
            </div>
            <div className="blog-topic-card">
              <div className="blog-topic-icon">🎬</div>
              <h3>Video Editing</h3>
              <p>Premiere Pro, After Effects, DaVinci Resolve</p>
              <span className="blog-topic-count">6 articles</span>
            </div>
            <div className="blog-topic-card">
              <div className="blog-topic-icon">📊</div>
              <h3>Digital Marketing</h3>
              <p>Meta Ads, SEO, Content Marketing, Analytics</p>
              <span className="blog-topic-count">10 articles</span>
            </div>
            <div className="blog-topic-card">
              <div className="blog-topic-icon">💼</div>
              <h3>Freelancing</h3>
              <p>Getting started, finding clients, setting rates</p>
              <span className="blog-topic-count">7 articles</span>
            </div>
            <div className="blog-topic-card">
              <div className="blog-topic-icon">📱</div>
              <h3>App Development</h3>
              <p>React Native, Flutter, iOS, Android</p>
              <span className="blog-topic-count">5 articles</span>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        5. WRITER SPOTLIGHT
      ===================================*/}
      <section className="blog-writers">
        <div className="blog-container">
          <h2 className="blog-writers-title">Meet Our Writers</h2>
          
          <div className="blog-writers-grid">
            <div className="blog-writer-card">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop" alt="Ramesh" />
              <h3>Ramesh Adhikari</h3>
              <p>Freelance Expert</p>
              <span>15 articles</span>
            </div>
            <div className="blog-writer-card">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop" alt="Sunita" />
              <h3>Sunita Karki</h3>
              <p>Career Counselor</p>
              <span>12 articles</span>
            </div>
            <div className="blog-writer-card">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop" alt="Bikram" />
              <h3>Bikram Thapa</h3>
              <p>Design & Video Expert</p>
              <span>10 articles</span>
            </div>
            <div className="blog-writer-card">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop" alt="Priya" />
              <h3>Priya Gurung</h3>
              <p>Marketing Specialist</p>
              <span>8 articles</span>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        6. CTA SECTION
      ===================================*/}
      <section className="blog-cta">
        <div className="blog-container">
          <div className="blog-cta-content">
            <h2>Want to Write for Us?</h2>
            <p>Share your expertise with thousands of readers. We're looking for guest writers.</p>
            <Link to="/contact" className="blog-cta-button">
              Become a Contributor
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;