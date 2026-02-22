

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/publicStyles/Pricing.css';

function Pricing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('one-time');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      name: 'Graphic Designing Mastery',
      category: 'design',
      price: 25000,
      installment: {
        monthly: 4500,
        duration: '6 months',
        total: 27000
      },
      originalPrice: 35000,
      savings: '29%',
      seats: 12,
      totalSeats: 25,
      duration: '12 Weeks',
      level: 'Beginner to Advanced',
      features: [
        'Adobe Photoshop & Illustrator',
        'Figma & Canva Mastery',
        'Typography & Color Theory',
        'Logo Design & Branding',
        'UI/UX Fundamentals',
        'Portfolio Development',
        '1-on-1 Mentorship',
        'Lifetime Access',
        'Certificate of Completion',
        'Job Placement Support'
      ],
      tools: ['Photoshop', 'Illustrator', 'Figma', 'Canva'],
      icon: '🎨',
      color: '#f97316',
      popular: true
    },
    {
      id: 2,
      name: 'Video Editing Professional',
      category: 'video',
      price: 22000,
      installment: {
        monthly: 4000,
        duration: '6 months',
        total: 24000
      },
      originalPrice: 30000,
      savings: '27%',
      seats: 8,
      totalSeats: 20,
      duration: '8 Weeks',
      level: 'Intermediate',
      features: [
        'Premiere Pro Mastery',
        'After Effects & Motion Graphics',
        'DaVinci Resolve Color Grading',
        'Sound Design',
        'YouTube Content Creation',
        'Portfolio Projects',
        '1-on-1 Mentorship',
        'Lifetime Access',
        'Certificate of Completion',
        'Freelance Guidance'
      ],
      tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
      icon: '🎬',
      color: '#ef4444',
      popular: false
    },
    {
      id: 3,
      name: 'Web Development Bootcamp',
      category: 'development',
      price: 35000,
      installment: {
        monthly: 6300,
        duration: '6 months',
        total: 37800
      },
      originalPrice: 45000,
      savings: '22%',
      seats: 5,
      totalSeats: 20,
      duration: '16 Weeks',
      level: 'Beginner to Advanced',
      features: [
        'HTML5, CSS3, JavaScript',
        'React.js & Node.js',
        'MongoDB & Express',
        'Full-Stack Development',
        'API Development',
        '3 Real-World Projects',
        '1-on-1 Mentorship',
        'Lifetime Access',
        'Certificate of Completion',
        'Interview Preparation'
      ],
      tools: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      icon: '💻',
      color: '#3b82f6',
      popular: true
    },
    {
      id: 4,
      name: 'App Development',
      category: 'development',
      price: 32000,
      installment: {
        monthly: 5800,
        duration: '6 months',
        total: 34800
      },
      originalPrice: 42000,
      savings: '24%',
      seats: 6,
      totalSeats: 15,
      duration: '14 Weeks',
      level: 'Intermediate',
      features: [
        'React Native',
        'Flutter Basics',
        'Firebase Integration',
        'App Store Deployment',
        'Native Features',
        '2 Published Apps',
        '1-on-1 Mentorship',
        'Lifetime Access',
        'Certificate',
        'Developer Account Setup'
      ],
      tools: ['React Native', 'Flutter', 'Firebase', 'Android Studio'],
      icon: '📱',
      color: '#8b5cf6',
      popular: false
    },
    {
      id: 5,
      name: 'Meta Ads & Marketing',
      category: 'marketing',
      price: 18000,
      installment: {
        monthly: 3300,
        duration: '6 months',
        total: 19800
      },
      originalPrice: 25000,
      savings: '28%',
      seats: 10,
      totalSeats: 30,
      duration: '6 Weeks',
      level: 'Beginner to Advanced',
      features: [
        'Facebook/Instagram Ads',
        'Audience Targeting',
        'Ad Creative Strategy',
        'Budget Optimization',
        'Analytics & Reporting',
        'Campaign Management',
        'Meta Certified',
        'Lifetime Access',
        'Certificate',
        'Client Acquisition Tips'
      ],
      tools: ['Meta Ads Manager', 'Google Analytics', 'Canva', 'Excel'],
      icon: '📊',
      color: '#06b6d4',
      popular: false
    }
  ];

  const limitedSeatsCourses = courses.filter(c => c.seats <= 10);
  const installmentPlans = [
    { bank: 'Global IME Bank', months: 3, interest: '0%', processing: 'NPR 500' },
    { bank: 'Nabil Bank', months: 6, interest: '0%', processing: 'NPR 800' },
    { bank: 'Prabhu Bank', months: 9, interest: '5%', processing: 'NPR 1000' },
    { bank: 'Siddhartha Bank', months: 12, interest: '8%', processing: 'NPR 1200' }
  ];

  const faqs = [
    {
      q: 'Can I pay in installments?',
      a: 'Yes! We offer 0% EMI options with partner banks for 3-6 months. Higher tenure options available with minimal interest.'
    },
    {
      q: 'Is there a refund policy?',
      a: 'We offer a 7-day money-back guarantee if you\'re not satisfied with the first week of classes.'
    },
    {
      q: 'Are there any hidden fees?',
      a: 'No hidden fees! The price you see includes all course materials, mentorship, and certification.'
    },
    {
      q: 'Do you offer student discounts?',
      a: 'Yes! Current students get an additional 10% discount on any course. Show your valid student ID.'
    }
  ];

  return (
    <div className="pricing-page">

      {/*===================================
        1. HERO SECTION
      ===================================*/}
      <section className="pricing-hero">
        <div className="pricing-hero-particles"></div>
        <div className="pricing-container">
          <div className="pricing-hero-content">
            <div className="pricing-hero-badge">
              <span>💰 Affordable Education</span>
            </div>
            <h1 className="pricing-hero-title">
              Invest in Your <span className="pricing-hero-highlight">Future</span>
            </h1>
            <p className="pricing-hero-subtitle">
              Quality skill-based education at prices that make sense. No hidden fees, just transparent pricing.
            </p>
            <div className="pricing-hero-stats">
              <div className="pricing-hero-stat">
                <span className="pricing-stat-number">30-50%</span>
                <span className="pricing-stat-label">Cheaper than market</span>
              </div>
              <div className="pricing-hero-stat">
                <span className="pricing-stat-number">0%</span>
                <span className="pricing-stat-label">EMI Available</span>
              </div>
              <div className="pricing-hero-stat">
                <span className="pricing-stat-number">7-Day</span>
                <span className="pricing-stat-label">Money-back</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        2. BILLING TOGGLE & LIMITED SEATS BANNER
      ===================================*/}
      <section className="pricing-toggle-section">
        <div className="pricing-container">
          {/* Limited Seats Alert */}
          <div className="pricing-limited-alert">
            <div className="pricing-alert-icon">⚠️</div>
            <div className="pricing-alert-content">
              <h3>Limited Seats Available!</h3>
              <p>Only {limitedSeatsCourses.reduce((acc, course) => acc + course.seats, 0)} seats left across all courses. Batch starts April 15th.</p>
            </div>
            <div className="pricing-alert-timer">
              <span>⏰</span>
              <span>Early bird ends in: <strong>5 days</strong></span>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="pricing-billing-toggle">
            <span className={billingCycle === 'one-time' ? 'active' : ''}>One-Time Payment</span>
            <button 
              className={`pricing-toggle-btn ${billingCycle === 'one-time' ? 'left' : 'right'}`}
              onClick={() => setBillingCycle(billingCycle === 'one-time' ? 'installment' : 'one-time')}
            >
              <span className="pricing-toggle-circle"></span>
            </button>
            <span className={billingCycle === 'installment' ? 'active' : ''}>
              Installment Plan
              <span className="pricing-toggle-badge">0% EMI</span>
            </span>
          </div>
        </div>
      </section>

      {/*===================================
        3. PRICING CARDS
      ===================================*/}
      <section className="pricing-cards-section">
        <div className="pricing-container">
          <div className="pricing-grid">
            {courses.map((course) => (
              <div key={course.id} className="pricing-card-wrapper">
                {course.popular && <div className="pricing-card-popular">Most Popular</div>}
                <div className="pricing-card" style={{ '--card-color': course.color }}>
                  
                  {/* Card Header */}
                  <div className="pricing-card-header">
                    <div className="pricing-card-icon" style={{ background: course.color }}>
                      {course.icon}
                    </div>
                    <h3 className="pricing-card-title">{course.name}</h3>
                    <div className="pricing-card-meta">
                      <span className="pricing-meta-item">⏱️ {course.duration}</span>
                      <span className="pricing-meta-item">📊 {course.level}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pricing-card-price">
                    {billingCycle === 'one-time' ? (
                      <>
                        <span className="pricing-original-price">NPR {course.originalPrice.toLocaleString()}</span>
                        <div className="pricing-current-price">
                          <span className="pricing-currency">NPR</span>
                          <span className="pricing-amount">{course.price.toLocaleString()}</span>
                        </div>
                        <span className="pricing-savings">Save {course.savings}</span>
                      </>
                    ) : (
                      <>
                        <div className="pricing-installment">
                          <span className="pricing-installment-amount">NPR {course.installment.monthly.toLocaleString()}</span>
                          <span className="pricing-installment-period">/month</span>
                        </div>
                        <div className="pricing-installment-details">
                          <span>{course.installment.duration}</span>
                          <span>Total: NPR {course.installment.total.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Seats Left */}
                  <div className="pricing-seats">
                    <div className="pricing-seats-info">
                      <span>🔥 Only {course.seats} seats left</span>
                      <span>{Math.round((course.seats / course.totalSeats) * 100)}% filled</span>
                    </div>
                    <div className="pricing-seats-bar">
                      <div 
                        className="pricing-seats-fill" 
                        style={{ 
                          width: `${((course.totalSeats - course.seats) / course.totalSeats) * 100}%`,
                          background: course.color 
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pricing-features">
                    <h4>What's included:</h4>
                    <ul>
                      {course.features.slice(0, 6).map((feature, index) => (
                        <li key={index}>
                          <span className="pricing-check">✓</span>
                          {feature}
                        </li>
                      ))}
                      {course.features.length > 6 && (
                        <li className="pricing-more-features">
                          +{course.features.length - 6} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div className="pricing-tools">
                    {course.tools.map((tool, index) => (
                      <span key={index} className="pricing-tool">{tool}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button 
                    className="pricing-enroll-btn" 
                    style={{ background: course.color }}
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    Enroll Now
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

      {/*===================================
        4. INSTALLMENT OPTIONS
      ===================================*/}
      <section className="pricing-installment-section">
        <div className="pricing-container">
          <div className="pricing-installment-header">
            <h2 className="pricing-installment-title">
              <span className="pricing-zero">0%</span> Installment Options Available
            </h2>
            <p className="pricing-installment-subtitle">
              Partner banks offering easy EMI plans for Skill Darbar students
            </p>
          </div>

          <div className="pricing-installment-grid">
            {installmentPlans.map((plan, index) => (
              <div key={index} className="pricing-installment-card">
                <div className="pricing-installment-bank">{plan.bank}</div>
                <div className="pricing-installment-term">
                  <span className="pricing-term-months">{plan.months} Months</span>
                  <span className="pricing-term-interest">{plan.interest} Interest</span>
                </div>
                <div className="pricing-installment-processing">
                  Processing: {plan.processing}
                </div>
                <button className="pricing-installment-apply" onClick={() => navigate('/contact')}>Apply Now</button>
              </div>
            ))}
          </div>

          <div className="pricing-installment-note">
            <p>✨ No cost EMI available for 3 and 6 months. T&C apply.</p>
          </div>
        </div>
      </section>

      {/*===================================
        5. SAVINGS CALCULATOR
      ===================================*/}
      <section className="pricing-calculator-section">
        <div className="pricing-container">
          <div className="pricing-calculator">
            <div className="pricing-calculator-left">
              <h2>Compare & Save</h2>
              <p>See how much you save with Skill Darbar vs traditional institutes</p>
              
              <div className="pricing-calculator-bars">
                <div className="pricing-calc-bar">
                  <span className="pricing-bar-label">Market Average</span>
                  <div className="pricing-bar-container">
                    <div className="pricing-bar-fill market" style={{ width: '100%' }}></div>
                  </div>
                  <span className="pricing-bar-value">NPR 45,000</span>
                </div>
                
                <div className="pricing-calc-bar">
                  <span className="pricing-bar-label">Skill Darbar</span>
                  <div className="pricing-bar-container">
                    <div className="pricing-bar-fill skilldarbar" style={{ width: '60%' }}></div>
                  </div>
                  <span className="pricing-bar-value">NPR 25,000</span>
                </div>
              </div>

              <div className="pricing-savings-total">
                <span>You Save</span>
                <strong>NPR 20,000 (44%)</strong>
              </div>
            </div>

            <div className="pricing-calculator-right">
              <div className="pricing-calculator-features">
                <div className="pricing-calc-feature">
                  <span>✅ Same Quality</span>
                </div>
                <div className="pricing-calc-feature">
                  <span>✅ Better Mentorship</span>
                </div>
                <div className="pricing-calc-feature">
                  <span>✅ Practical Training</span>
                </div>
                <div className="pricing-calc-feature">
                  <span>✅ Job Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        6. MONEY-BACK GUARANTEE
      ===================================*/}
      <section className="pricing-guarantee">
        <div className="pricing-container">
          <div className="pricing-guarantee-content">
            <div className="pricing-guarantee-icon">🛡️</div>
            <h2>7-Day Money-Back Guarantee</h2>
            <p>Not satisfied with the first week? Get a full refund, no questions asked.</p>
            <div className="pricing-guarantee-features">
              <span>✅ Full refund within 7 days</span>
              <span>✅ No paperwork</span>
              <span>✅ Money back in 3-5 days</span>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        7. FAQ
      ===================================*/}
      <section className="pricing-faq">
        <div className="pricing-container">
          <h2 className="pricing-faq-title">Frequently Asked Questions</h2>
          
          <div className="pricing-faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="pricing-faq-item">
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*===================================
        8. FINAL CTA
      ===================================*/}
      <section className="pricing-cta">
        <div className="pricing-container">
          <div className="pricing-cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Limited seats available. Enroll now and pay in easy installments.</p>
            <div className="pricing-cta-buttons">
              <Link to="/signup" className="pricing-cta-primary">
                Book Your Seat
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/contact" className="pricing-cta-secondary">
                Talk to Counselor
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </div>
            <p className="pricing-cta-note">🔒 Secure payment • No hidden fees</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;