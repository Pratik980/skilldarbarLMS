

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/publicStyles/Faq.css';

function Faqs() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    { id: 'all', name: 'All Questions', icon: '❓', count: 24 },
    { id: 'enrollment', name: 'Enrollment', icon: '📝', count: 6 },
    { id: 'certificate', name: 'Certificates', icon: '🎓', count: 4 },
    { id: 'beginners', name: 'For Beginners', icon: '🌱', count: 5 },
    { id: 'support', name: 'Support', icon: '🤝', count: 5 },
    { id: 'mode', name: 'Online/Offline', icon: '💻', count: 4 }
  ];

  const faqItems = [
    // Enrollment Questions
    {
      id: 1,
      category: 'enrollment',
      question: 'How do I enroll in a course?',
      answer: 'Enrolling is easy! Just visit the Courses page, select your desired course, and click "Enroll Now". You\'ll be guided through the payment process. After successful payment, you\'ll get instant access to the course materials and our learning platform. You can also contact our support team for assistance with enrollment.',
      icon: '📝',
      featured: true
    },
    {
      id: 2,
      category: 'enrollment',
      question: 'What are the payment methods accepted?',
      answer: 'We accept multiple payment methods including: E-sewa, Khalti, Connect IPS, Bank Transfer, and Credit/Debit cards. We also offer 0% EMI options with partner banks for 3-6 months. For installments, you can pay monthly without any interest.',
      icon: '💰'
    },
    {
      id: 3,
      category: 'enrollment',
      question: 'Can I enroll in multiple courses at once?',
      answer: 'Yes, you can enroll in multiple courses. We offer bundle discounts when you enroll in 2 or more courses. Contact our counselor for special combo offers.',
      icon: '📚'
    },
    {
      id: 4,
      category: 'enrollment',
      question: 'Is there a registration fee?',
      answer: 'No, there is no separate registration fee. The course price you see includes everything - no hidden charges. What you pay is what you get.',
      icon: '💵'
    },
    {
      id: 5,
      category: 'enrollment',
      question: 'Can I switch courses after enrolling?',
      answer: 'Yes, you can switch to another course within the first 7 days of enrollment. If the new course has a higher price, you\'ll pay the difference. If it\'s lower, we\'ll refund the difference.',
      icon: '🔄'
    },
    {
      id: 6,
      category: 'enrollment',
      question: 'Do you offer student discounts?',
      answer: 'Yes! Current students get an additional 10% discount on any course. Just show your valid student ID at the time of enrollment.',
      icon: '🎓'
    },

    // Certificate Questions
    {
      id: 7,
      category: 'certificate',
      question: 'Do I get a certificate after completion?',
      answer: 'Yes! Upon successful completion of your course, you will receive a Skill Darbar certificate. Our certificates are recognized by many companies in Nepal and internationally. You\'ll get both digital and printed copies.',
      icon: '🎓',
      featured: true
    },
    {
      id: 8,
      category: 'certificate',
      question: 'Is the certificate internationally recognized?',
      answer: 'While Skill Darbar is a Nepali institution, our certificates are valued by international clients and companies. Many of our graduates are working with global clients and companies who recognize our practical training approach.',
      icon: '🌍'
    },
    {
      id: 9,
      category: 'certificate',
      question: 'How do I get my certificate?',
      answer: 'After completing all course requirements and final projects, you\'ll receive a digital certificate via email within 7 days. Physical certificates can be collected from our office or shipped to your address (shipping charges apply).',
      icon: '📜'
    },
    {
      id: 10,
      category: 'certificate',
      question: 'Do you provide internship certificate?',
      answer: 'Yes, if you complete an internship with us, you\'ll receive a separate internship completion certificate along with a letter of recommendation based on your performance.',
      icon: '💼'
    },

    // Beginner Questions
    {
      id: 11,
      category: 'beginners',
      question: 'Is this beginner friendly?',
      answer: 'Absolutely! Most of our courses are designed for beginners. We start from the basics and gradually move to advanced topics. No prior experience is required unless specified in the course description.',
      icon: '🌱',
      featured: true
    },
    {
      id: 12,
      category: 'beginners',
      question: 'I have no technical background. Can I still learn?',
      answer: 'Yes! Many of our successful students started with no technical background. Our teaching approach breaks down complex concepts into simple, easy-to-understand lessons. We provide extra support for absolute beginners.',
      icon: '🚀'
    },
    {
      id: 13,
      category: 'beginners',
      question: 'How much time should I dedicate daily?',
      answer: 'For optimal learning, we recommend 2-3 hours daily. However, you can learn at your own pace. Our courses are flexible, and you can adjust your schedule based on your availability.',
      icon: '⏰'
    },
    {
      id: 14,
      category: 'beginners',
      question: 'What equipment do I need to start?',
      answer: 'For most courses, you just need a computer/laptop with internet connection. For design/video courses, a basic laptop is sufficient to start. Specific software requirements are listed in each course description.',
      icon: '💻'
    },
    {
      id: 15,
      category: 'beginners',
      question: 'Will I get job after completing course?',
      answer: 'We provide job placement assistance including resume building, interview preparation, and connecting you with our hiring partners. However, your success depends on your dedication and the quality of projects you build during the course.',
      icon: '💼'
    },

    // Support Questions
    {
      id: 16,
      category: 'support',
      question: 'Do you provide support?',
      answer: 'Yes! We provide multiple support channels: 24/7 chat support, email support, and dedicated mentor sessions. You can also join our community group to connect with fellow learners and instructors.',
      icon: '🤝',
      featured: true
    },
    {
      id: 17,
      category: 'support',
      question: 'Can I talk to instructors directly?',
      answer: 'Yes! All students get access to weekly 1-on-1 mentorship sessions with instructors. You can ask questions, get feedback on your projects, and discuss career goals.',
      icon: '👨‍🏫'
    },
    {
      id: 18,
      category: 'support',
      question: 'What is the response time for queries?',
      answer: 'Our support team typically responds within 2-4 hours during business hours. For urgent queries, our chat support is available 24/7 with instant responses.',
      icon: '⚡'
    },
    {
      id: 19,
      category: 'support',
      question: 'Is there a community of learners?',
      answer: 'Yes! You\'ll get access to our private community group where you can interact with fellow students, share projects, ask questions, and network. Many students find collaboration partners and job opportunities through our community.',
      icon: '👥'
    },
    {
      id: 20,
      category: 'support',
      question: 'Do you provide career counseling?',
      answer: 'Absolutely! We offer career counseling sessions to help you plan your learning path, build your portfolio, and prepare for job interviews. Our counselors have helped hundreds of students start their careers.',
      icon: '🎯'
    },

    // Online/Offline Questions
    {
      id: 21,
      category: 'mode',
      question: 'Online or Offline?',
      answer: 'We offer both! You can choose: Online (learn from anywhere with live sessions) or Offline (attend classes at our centers in Kathmandu, Pokhara, and Janakpur). Both modes include the same curriculum and support.',
      icon: '💻',
      featured: true
    },
    {
      id: 22,
      category: 'mode',
      question: 'Where are your physical locations?',
      answer: 'We have training centers in: Kathmandu (Putalisadak), Pokhara (Lakeside), and Janakpur (Main Road). We\'re planning to open centers in Butwal, Biratnagar, and Dharan soon.',
      icon: '📍'
    },
    {
      id: 23,
      category: 'mode',
      question: 'Are online classes live or recorded?',
      answer: 'Both! Online classes include live interactive sessions with instructors, and all sessions are recorded so you can watch them later. You get lifetime access to all recorded materials.',
      icon: '🎥'
    },
    {
      id: 24,
      category: 'mode',
      question: 'Can I switch from online to offline?',
      answer: 'Yes, you can switch modes anytime based on availability. If you\'re traveling or prefer classroom learning, just inform us and we\'ll arrange your transfer.',
      icon: '🔄'
    }
  ];

  const filteredFaqs = (activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(faq => faq.category === activeCategory)
  ).filter(faq => 
    !searchTerm || 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredFaqs = faqItems.filter(faq => faq.featured);

  return (
    <div className="faq-page">

      {/*===================================
        1. HERO SECTION
      ===================================*/}
      <section className="faq-hero">
        <div className="faq-hero-particles"></div>
        <div className="faq-container">
          <div className="faq-hero-content">
            <div className="faq-hero-badge">
              <span>❓ Got Questions?</span>
            </div>
            <h1 className="faq-hero-title">
              Frequently Asked <span className="faq-hero-highlight">Questions</span>
            </h1>
            <p className="faq-hero-subtitle">
              Everything you need to know about Skill Darbar. Can't find what you're looking for? Feel free to contact us.
            </p>
            
            {/* Search Bar */}
            <div className="faq-search-wrapper">
              <div className="faq-search-box">
                <svg className="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search your question..." 
                  className="faq-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="faq-hero-stats">
              <div className="faq-hero-stat">
                <span className="faq-stat-number">24/7</span>
                <span className="faq-stat-label">Support</span>
              </div>
              <div className="faq-hero-stat">
                <span className="faq-stat-number">5000+</span>
                <span className="faq-stat-label">Happy Students</span>
              </div>
              <div className="faq-hero-stat">
                <span className="faq-stat-number">4.8</span>
                <span className="faq-stat-label">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        2. FEATURED QUESTIONS
      ===================================*/}
      <section className="faq-featured">
        <div className="faq-container">
          <div className="faq-featured-header">
            <h2 className="faq-featured-title">Most Asked <span>Questions</span></h2>
            <p className="faq-featured-subtitle">Quick answers to common questions</p>
          </div>

          <div className="faq-featured-grid">
            {featuredFaqs.map((faq) => (
              <div key={faq.id} className="faq-featured-card">
                <div className="faq-featured-icon">{faq.icon}</div>
                <h3>{faq.question}</h3>
                <p>{faq.answer.length > 100 ? faq.answer.substring(0, 100) + '...' : faq.answer}</p>
                <button 
                  className="faq-featured-btn"
                  onClick={() => {
                    setActiveCategory(faq.category);
                    setTimeout(() => {
                      document.getElementById(`faq-${faq.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Read Full Answer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*===================================
        3. MAIN FAQ SECTION
      ===================================*/}
      <section className="faq-main">
        <div className="faq-container">
          <div className="faq-layout">
            {/* Category Sidebar */}
            <aside className="faq-sidebar">
              <h3 className="faq-sidebar-title">Categories</h3>
              <ul className="faq-category-list">
                {faqCategories.map(cat => (
                  <li 
                    key={cat.id}
                    className={`faq-category-item ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span className="faq-category-icon">{cat.icon}</span>
                    <span className="faq-category-name">{cat.name}</span>
                    <span className="faq-category-count">{cat.count}</span>
                  </li>
                ))}
              </ul>

              {/* Contact Card */}
              <div className="faq-contact-card">
                <div className="faq-contact-icon">💬</div>
                <h4>Still have questions?</h4>
                <p>Can't find the answer you're looking for? Please chat with our friendly team.</p>
                <Link to="/contact" className="faq-contact-btn">Contact Support</Link>
              </div>
            </aside>

            {/* FAQ Items */}
            <div className="faq-content">
              <div className="faq-category-header">
                <h2>
                  {faqCategories.find(c => c.id === activeCategory)?.icon}{' '}
                  {faqCategories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p>{filteredFaqs.length} questions</p>
              </div>

              <div className="faq-items">
                {filteredFaqs.map((faq, index) => (
                  <div 
                    key={faq.id} 
                    id={`faq-${faq.id}`}
                    className={`faq-item ${openItems[faq.id] ? 'open' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div 
                      className="faq-question"
                      onClick={() => toggleItem(faq.id)}
                    >
                      <div className="faq-question-left">
                        <span className="faq-question-icon">{faq.icon}</span>
                        <h3>{faq.question}</h3>
                      </div>
                      <button className="faq-toggle-btn">
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          style={{ transform: openItems[faq.id] ? 'rotate(180deg)' : 'none' }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                      
                      {/* Related Links (for some questions) */}
                      {faq.id === 1 && (
                        <div className="faq-related">
                          <strong>Related:</strong>
                          <Link to="/courses">Browse Courses →</Link>
                          <Link to="/pricing">View Pricing →</Link>
                        </div>
                      )}
                      
                      {faq.id === 7 && (
                        <div className="faq-related">
                          <strong>See sample certificate:</strong>
                          <Link to="/courses">View Courses →</Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Still Need Help */}
              <div className="faq-need-help">
                <div className="faq-need-help-content">
                  <h3>Still Need Help?</h3>
                  <p>Our support team is ready to assist you</p>
                  <div className="faq-need-help-buttons">
                    <Link to="/contact" className="faq-help-btn">
                      <span>💬</span>
                      Live Chat
                    </Link>
                    <a href="mailto:support@skilldarbar.com" className="faq-help-btn">
                      <span>📧</span>
                      Email Us
                    </a>
                    <a href="tel:+9779762726211" className="faq-help-btn">
                      <span>📞</span>
                      Call Now
                    </a>
                  </div>
                  <p className="faq-help-note">Average response: 2-4 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        4. QUICK ANSWERS SECTION
      ===================================*/}
      <section className="faq-quick-answers">
        <div className="faq-container">
          <h2 className="faq-quick-title">Quick Answers</h2>
          
          <div className="faq-quick-grid">
            <div className="faq-quick-card">
              <div className="faq-quick-icon">📝</div>
              <h3>How to Enroll?</h3>
              <p>Click "Enroll Now" on any course, complete payment, and get instant access.</p>
              <button className="faq-quick-btn" onClick={() => { setActiveCategory('enrollment'); document.querySelector('.faq-main')?.scrollIntoView({ behavior: 'smooth' }); }}>Learn More →</button>
            </div>
            
            <div className="faq-quick-card">
              <div className="faq-quick-icon">🎓</div>
              <h3>Certificate?</h3>
              <p>Yes, you get a verified certificate after completing course projects.</p>
              <button className="faq-quick-btn" onClick={() => { setActiveCategory('certificate'); document.querySelector('.faq-main')?.scrollIntoView({ behavior: 'smooth' }); }}>Learn More →</button>
            </div>
            
            <div className="faq-quick-card">
              <div className="faq-quick-icon">🌱</div>
              <h3>Beginner Friendly?</h3>
              <p>Absolutely! Most courses start from basics. No experience needed.</p>
              <button className="faq-quick-btn" onClick={() => { setActiveCategory('beginners'); document.querySelector('.faq-main')?.scrollIntoView({ behavior: 'smooth' }); }}>Learn More →</button>
            </div>
            
            <div className="faq-quick-card">
              <div className="faq-quick-icon">🤝</div>
              <h3>Support?</h3>
              <p>24/7 chat, mentor sessions, and community support available.</p>
              <button className="faq-quick-btn" onClick={() => { setActiveCategory('support'); document.querySelector('.faq-main')?.scrollIntoView({ behavior: 'smooth' }); }}>Learn More →</button>
            </div>
            
            <div className="faq-quick-card">
              <div className="faq-quick-icon">💻</div>
              <h3>Online/Offline?</h3>
              <p>Both options available. Choose what works best for you.</p>
              <button className="faq-quick-btn" onClick={() => { setActiveCategory('mode'); document.querySelector('.faq-main')?.scrollIntoView({ behavior: 'smooth' }); }}>Learn More →</button>
            </div>
            
            <div className="faq-quick-card">
              <div className="faq-quick-icon">💰</div>
              <h3>Payment Options?</h3>
              <p>E-sewa, Khalti, Bank Transfer, EMI available.</p>
              <button className="faq-quick-btn" onClick={() => { setActiveCategory('enrollment'); document.querySelector('.faq-main')?.scrollIntoView({ behavior: 'smooth' }); }}>Learn More →</button>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        5. SUPPORT CHANNELS
      ===================================*/}
      <section className="faq-support">
        <div className="faq-container">
          <h2 className="faq-support-title">Get in Touch</h2>
          
          <div className="faq-support-grid">
            <div className="faq-support-card">
              <div className="faq-support-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
              <p className="faq-support-time">24/7 Available</p>
              <Link to="/contact" className="faq-support-btn">Start Chat</Link>
            </div>
            
            <div className="faq-support-card">
              <div className="faq-support-icon">📧</div>
              <h3>Email</h3>
              <p>support@skilldarbar.com</p>
              <p className="faq-support-time">Response: 2-4 hours</p>
              <a href="mailto:support@skilldarbar.com" className="faq-support-btn">Send Email</a>
            </div>
            
            <div className="faq-support-card">
              <div className="faq-support-icon">📞</div>
              <h3>Phone</h3>
              <p>01-4567890</p>
              <p className="faq-support-time">Sun-Fri, 9AM-6PM</p>
              <a href="tel:+9779762726211" className="faq-support-btn">Call Now</a>
            </div>
            
            <div className="faq-support-card">
              <div className="faq-support-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Putalisadak, Kathmandu</p>
              <p className="faq-support-time">Map & Directions</p>
              <a href="https://maps.google.com/?q=Janakpur,Nepal" target="_blank" rel="noopener noreferrer" className="faq-support-btn">Get Directions</a>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        6. CTA SECTION
      ===================================*/}
      <section className="faq-cta">
        <div className="faq-container">
          <div className="faq-cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Join 5000+ students who have transformed their careers with Skill Darbar</p>
            <Link to="/courses" className="faq-cta-button">
              Browse Courses
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

export default Faqs;