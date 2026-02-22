

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/publicStyles/Careers.css';

function Careers() {
  const [activeTab, setActiveTab] = useState('instructor');

  const instructorBenefits = [
    { icon: '💰', title: 'Competitive Pay', desc: 'Earn NPR 30,000 - 80,000 per month based on experience' },
    { icon: '🎓', title: 'Free Training', desc: 'Get certified in latest tools and technologies' },
    { icon: '🕒', title: 'Flexible Hours', desc: 'Teach part-time or full-time, choose your schedule' },
    { icon: '📈', title: 'Growth Path', desc: 'Clear career progression to senior roles' },
    { icon: '👥', title: 'Community', desc: 'Join a network of 50+ expert instructors' },
    { icon: '🏆', title: 'Recognition', desc: 'Instructor of the month awards and bonuses' }
  ];

  const marketingBenefits = [
    { icon: '📊', title: 'Performance Bonus', desc: 'Earn up to 30% commission on successful campaigns' },
    { icon: '🌍', title: 'Work Remote', desc: '100% remote position, work from anywhere in Nepal' },
    { icon: '📱', title: 'Latest Tools', desc: 'Access to premium marketing tools and software' },
    { icon: '📈', title: 'Growth Potential', desc: 'Scale your impact as we grow to new districts' },
    { icon: '🎯', title: 'Creative Freedom', desc: 'Design and execute your own marketing strategies' },
    { icon: '🤝', title: 'Collaboration', desc: 'Work with founders and industry experts' }
  ];

  const internshipBenefits = [
    { icon: '💪', title: 'Hands-on Experience', desc: 'Work on real projects, not just coffee runs' },
    { icon: '📜', title: 'Certificate', desc: 'Get recognized with official Skill Darbar certificate' },
    { icon: '🤝', title: 'Mentorship', desc: 'One-on-one guidance from industry professionals' },
    { icon: '💼', title: 'Stipend', desc: 'Earn NPR 5,000 - 15,000 monthly stipend' },
    { icon: '🎯', title: 'Job Offer', desc: 'Top performers get full-time job offers' },
    { icon: '📚', title: 'Learning Budget', desc: 'Access to all courses for free during internship' }
  ];

  const openPositions = {
    instructor: [
      {
        title: 'Web Development Instructor',
        type: 'Full-time / Part-time',
        location: 'Kathmandu / Remote',
        experience: '2+ years',
        students: '45+',
        description: 'Teach MERN stack to aspiring developers. Conduct live sessions, review projects, and mentor students.',
        requirements: [
          'Strong knowledge of JavaScript, React, Node.js',
          '2+ years of teaching or industry experience',
          'Excellent communication skills',
          'Passion for mentoring'
        ],
        icon: '💻'
      },
      {
        title: 'Graphic Design Instructor',
        type: 'Part-time',
        location: 'Pokhara / Remote',
        experience: '3+ years',
        students: '30+',
        description: 'Guide students through Adobe Creative Suite, design principles, and portfolio building.',
        requirements: [
          'Expert in Photoshop, Illustrator, Figma',
          'Strong portfolio of design work',
          'Teaching experience preferred',
          'Ability to give constructive feedback'
        ],
        icon: '🎨'
      },
      {
        title: 'Video Editing Instructor',
        type: 'Full-time',
        location: 'Kathmandu',
        experience: '2+ years',
        students: '25+',
        description: 'Teach video editing, motion graphics, and post-production techniques.',
        requirements: [
          'Proficient in Premiere Pro, After Effects',
          'Experience in content creation',
          'Strong storytelling skills',
          'Patient and encouraging teaching style'
        ],
        icon: '🎬'
      }
    ],
    marketing: [
      {
        title: 'Digital Marketing Partner',
        type: 'Commission-based',
        location: 'Remote',
        experience: '1+ years',
        reach: 'Pan-Nepal',
        description: 'Promote Skill Darbar courses in your network. Earn commission on every successful enrollment.',
        requirements: [
          'Active in local communities',
          'Understanding of social media',
          'Good communication skills',
          'Self-motivated and results-driven'
        ],
        icon: '📱'
      },
      {
        title: 'Content Marketing Specialist',
        type: 'Contract',
        location: 'Remote',
        experience: '2+ years',
        reach: 'Digital',
        description: 'Create engaging content for social media, blog, and YouTube to attract potential students.',
        requirements: [
          'Excellent writing skills',
          'Video content creation experience',
          'Understanding of SEO',
          'Creative mindset'
        ],
        icon: '✍️'
      },
      {
        title: 'Campus Ambassador',
        type: 'Part-time',
        location: 'Your College',
        experience: 'Current student',
        reach: 'College Campus',
        description: 'Represent Skill Darbar at your college. Organize events and spread awareness.',
        requirements: [
          'Enrolled in any college',
          'Leadership qualities',
          'Active on campus',
          'Good networking skills'
        ],
        icon: '🎓'
      }
    ],
    internship: [
      {
        title: 'Web Development Intern',
        type: '3 months',
        location: 'Remote',
        stipend: 'NPR 8,000/month',
        positions: '3 openings',
        description: 'Work on real client projects under senior developers. Perfect for final year students.',
        requirements: [
          'Basic knowledge of HTML, CSS, JavaScript',
          'Currently pursuing or recent graduate',
          'Eager to learn and contribute',
          'Good problem-solving skills'
        ],
        icon: '💻'
      },
      {
        title: 'Graphic Design Intern',
        type: '3 months',
        location: 'Remote',
        stipend: 'NPR 6,000/month',
        positions: '2 openings',
        description: 'Create social media graphics, course materials, and branding assets.',
        requirements: [
          'Familiar with Canva and Photoshop',
          'Creative portfolio (personal projects count)',
          'Attention to detail',
          'Ability to take feedback'
        ],
        icon: '🎨'
      },
      {
        title: 'Social Media Intern',
        type: '3 months',
        location: 'Remote',
        stipend: 'NPR 5,000/month',
        positions: '2 openings',
        description: 'Manage social media accounts, create content, and engage with community.',
        requirements: [
          'Active on Instagram, Facebook, LinkedIn',
          'Good writing skills',
          'Basic content creation skills',
          'Understanding of trending topics'
        ],
        icon: '📱'
      }
    ]
  };

  const testimonials = [
    {
      name: 'Ramesh Adhikari',
      role: 'Web Development Instructor',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop',
      quote: 'Teaching at Skill Darbar has been transformative. I get to shape the next generation of developers while growing my own skills.',
      experience: '2 years with us'
    },
    {
      name: 'Sunita Karki',
      role: 'Marketing Partner',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop',
      quote: 'The commission structure is fantastic. I\'ve helped 50+ students enroll while earning a great income from home.',
      experience: '1.5 years with us'
    },
    {
      name: 'Bikram Thapa',
      role: 'Former Intern, Now Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop',
      quote: 'Started as an intern, now I\'m a full-time developer. The mentorship I received was invaluable.',
      experience: 'Intern to Employee'
    }
  ];

  return (
    <div className="careers-page">

      {/*===================================
        1. HERO SECTION
      ===================================*/}
      <section className="careers-hero">
        <div className="careers-hero-particles"></div>
        <div className="careers-container">
          <div className="careers-hero-content">
            <div className="careers-hero-badge">
              <span>💼 Join Our Team</span>
            </div>
            <h1 className="careers-hero-title">
              Build Your Career <span className="careers-hero-highlight">With Us</span>
            </h1>
            <p className="careers-hero-subtitle">
              At Skill Darbar, we're not just building courses—we're building careers. Join our growing team and help shape Nepal's skill development future.
            </p>
            <div className="careers-hero-stats">
              <div className="careers-hero-stat">
                <span className="careers-stat-number">50+</span>
                <span className="careers-stat-label">Team Members</span>
              </div>
              <div className="careers-hero-stat">
                <span className="careers-stat-number">77</span>
                <span className="careers-stat-label">Districts Covered</span>
              </div>
              <div className="careers-hero-stat">
                <span className="careers-stat-number">100%</span>
                <span className="careers-stat-label">Growth YoY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        2. OPPORTUNITY TABS
      ===================================*/}
      <section className="careers-tabs-section">
        <div className="careers-container">
          {/* Tab Navigation */}
          <div className="careers-tabs-nav">
            <button
              className={`careers-tab-btn ${activeTab === 'instructor' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructor')}
            >
              <span className="careers-tab-icon">👨‍🏫</span>
              <span className="careers-tab-label">Become an Instructor</span>
            </button>
            <button
              className={`careers-tab-btn ${activeTab === 'marketing' ? 'active' : ''}`}
              onClick={() => setActiveTab('marketing')}
            >
              <span className="careers-tab-icon">📊</span>
              <span className="careers-tab-label">Marketing Partner</span>
            </button>
            <button
              className={`careers-tab-btn ${activeTab === 'internship' ? 'active' : ''}`}
              onClick={() => setActiveTab('internship')}
            >
              <span className="careers-tab-icon">💪</span>
              <span className="careers-tab-label">Internships</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="careers-tab-content">
            {/* Benefits Grid */}
            <div className="careers-benefits-grid">
              {(activeTab === 'instructor' ? instructorBenefits : 
                activeTab === 'marketing' ? marketingBenefits : internshipBenefits).map((benefit, index) => (
                <div key={index} className="careers-benefit-card">
                  <div className="careers-benefit-icon">{benefit.icon}</div>
                  <h3 className="careers-benefit-title">{benefit.title}</h3>
                  <p className="careers-benefit-desc">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* Open Positions */}
            <h2 className="careers-positions-title">
              {activeTab === 'instructor' ? 'Open Instructor Positions' :
               activeTab === 'marketing' ? 'Marketing Opportunities' : 'Available Internships'}
            </h2>
            
            <div className="careers-positions-grid">
              {openPositions[activeTab].map((position, index) => (
                <div key={index} className="careers-position-card">
                  <div className="careers-position-header">
                    <div className="careers-position-icon">{position.icon}</div>
                    <div>
                      <h3 className="careers-position-title">{position.title}</h3>
                      <div className="careers-position-meta">
                        <span className="careers-position-type">📍 {position.location}</span>
                        <span className="careers-position-type">⏱️ {position.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="careers-position-details">
                    {activeTab === 'instructor' && (
                      <>
                        <div className="careers-detail-item">
                          <span className="careers-detail-label">Experience:</span>
                          <span className="careers-detail-value">{position.experience}</span>
                        </div>
                        <div className="careers-detail-item">
                          <span className="careers-detail-label">Students:</span>
                          <span className="careers-detail-value">{position.students}</span>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'marketing' && (
                      <>
                        <div className="careers-detail-item">
                          <span className="careers-detail-label">Experience:</span>
                          <span className="careers-detail-value">{position.experience}</span>
                        </div>
                        <div className="careers-detail-item">
                          <span className="careers-detail-label">Reach:</span>
                          <span className="careers-detail-value">{position.reach}</span>
                        </div>
                      </>
                    )}

                    {activeTab === 'internship' && (
                      <>
                        <div className="careers-detail-item">
                          <span className="careers-detail-label">Stipend:</span>
                          <span className="careers-detail-value careers-stipend">{position.stipend}</span>
                        </div>
                        <div className="careers-detail-item">
                          <span className="careers-detail-label">Openings:</span>
                          <span className="careers-detail-value">{position.positions}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="careers-position-description">{position.description}</p>

                  <div className="careers-requirements">
                    <h4>Requirements:</h4>
                    <ul>
                      {position.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact" className="careers-apply-btn">
                    Apply Now
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        3. WHY JOIN US
      ===================================*/}
      <section className="careers-why-join">
        <div className="careers-container">
          <div className="careers-why-header">
            <h2 className="careers-why-title">Why Join <span>Skill Darbar</span></h2>
            <p className="careers-why-subtitle">More than a job—it's a mission to transform Nepal through education</p>
          </div>

          <div className="careers-why-grid">
            <div className="careers-why-card">
              <div className="careers-why-card-icon">🌱</div>
              <h3>Growth Mindset</h3>
              <p>We invest in your learning. Get monthly training budgets and mentorship from industry experts.</p>
            </div>
            <div className="careers-why-card">
              <div className="careers-why-card-icon">🤝</div>
              <h3>Collaborative Culture</h3>
              <p>Work with passionate people who support each other. No office politics, just shared goals.</p>
            </div>
            <div className="careers-why-card">
              <div className="careers-why-card-icon">🎯</div>
              <h3>Real Impact</h3>
              <p>See the direct impact of your work as students transform their lives and careers.</p>
            </div>
            <div className="careers-why-card">
              <div className="careers-why-card-icon">🏠</div>
              <h3>Work-Life Balance</h3>
              <p>Flexible hours, remote options, and we respect your personal time. Results matter, not hours logged.</p>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        4. TEAM TESTIMONIALS
      ===================================*/}
      <section className="careers-testimonials">
        <div className="careers-container">
          <h2 className="careers-testimonials-title">What Our Team Says</h2>
          
          <div className="careers-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="careers-testimonial-card">
                <div className="careers-testimonial-quote">"</div>
                <p className="careers-testimonial-text">{testimonial.quote}</p>
                <div className="careers-testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="careers-testimonial-image" />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <span className="careers-testimonial-exp">{testimonial.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*===================================
        5. APPLICATION PROCESS
      ===================================*/}
      <section className="careers-process">
        <div className="careers-container">
          <h2 className="careers-process-title">How to Join</h2>
          
          <div className="careers-process-steps">
            <div className="careers-process-step">
              <div className="careers-step-number">1</div>
              <div className="careers-step-icon">📝</div>
              <h3>Apply Online</h3>
              <p>Fill out the application form with your details and experience</p>
            </div>
            <div className="careers-process-arrow">→</div>
            
            <div className="careers-process-step">
              <div className="careers-step-number">2</div>
              <div className="careers-step-icon">📞</div>
              <h3>Initial Chat</h3>
              <p>Quick 15-minute call to understand your goals</p>
            </div>
            <div className="careers-process-arrow">→</div>
            
            <div className="careers-process-step">
              <div className="careers-step-number">3</div>
              <div className="careers-step-icon">🎯</div>
              <h3>Skill Assessment</h3>
              <p>Demonstrate your expertise through a small task</p>
            </div>
            <div className="careers-process-arrow">→</div>
            
            <div className="careers-process-step">
              <div className="careers-step-number">4</div>
              <div className="careers-step-icon">🚀</div>
              <h3>Welcome Aboard</h3>
              <p>Get trained and start your journey with us</p>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        6. FAQ SECTION
      ===================================*/}
      <section className="careers-faq">
        <div className="careers-container">
          <h2 className="careers-faq-title">Frequently Asked Questions</h2>
          
          <div className="careers-faq-grid">
            <div className="careers-faq-item">
              <h3>Do I need teaching experience?</h3>
              <p>Not necessarily. If you have strong industry skills and a passion for sharing knowledge, we can train you in teaching methodology.</p>
            </div>
            <div className="careers-faq-item">
              <h3>Can I work part-time?</h3>
              <p>Yes! Many of our instructors and marketing partners work part-time while pursuing other interests.</p>
            </div>
            <div className="careers-faq-item">
              <h3>Is this remote or office-based?</h3>
              <p>We offer both. Instructors can choose to teach from our centers or online. Marketing roles are fully remote.</p>
            </div>
            <div className="careers-faq-item">
              <h3>What about internships?</h3>
              <p>Internships are 3 months with stipend. Top performers get full-time offers with competitive salary.</p>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        7. FINAL CTA
      ===================================*/}
      <section className="careers-final-cta">
        <div className="careers-container">
          <div className="careers-cta-content">
            <h2>Ready to Make an Impact?</h2>
            <p>Join us in building Nepal's skill development revolution</p>
            <Link to="/contact" className="careers-cta-button">
              Apply Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="careers-cta-note">✨ No resume? No problem. Just your passion matters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;