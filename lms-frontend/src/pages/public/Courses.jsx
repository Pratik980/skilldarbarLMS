// Courses.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/publicStyles/Courses.css';

function Courses() {
  const [activeFilter, setActiveFilter] = useState('all');

  const coursesData = [
    {
      id: 1,
      name: 'Graphic Designing Mastery',
      category: 'design',
      level: 'Beginner to Advanced',
      duration: '12 Weeks',
      students: 1240,
      rating: 4.8,
      tools: [
        { name: 'Adobe Photoshop', icon: '🎨' },
        { name: 'Adobe Illustrator', icon: '✏️' },
        { name: 'Figma', icon: '🖌️' },
        { name: 'Canva', icon: '📱' }
      ],
      curriculum: [
        'Typography & Color Theory',
        'Logo Design & Branding',
        'UI/UX Fundamentals',
        'Social Media Graphics',
        'Portfolio Development'
      ],
      description: 'Master the art of visual communication with industry-standard tools. Create stunning designs for print and digital media.',
      career: ['Graphic Designer', 'UI Designer', 'Brand Identity Designer', 'Social Media Manager'],
      price: 'NPR 25,000',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop',
      color: '#f97316'
    },
    {
      id: 2,
      name: 'Video Editing Professional',
      category: 'video',
      level: 'Intermediate',
      duration: '8 Weeks',
      students: 890,
      rating: 4.9,
      tools: [
        { name: 'Premiere Pro', icon: '🎬' },
        { name: 'After Effects', icon: '✨' },
        { name: 'DaVinci Resolve', icon: '🎥' },
        { name: 'Final Cut Pro', icon: '🍎' }
      ],
      curriculum: [
        'Video Editing Fundamentals',
        'Motion Graphics & VFX',
        'Color Grading Mastery',
        'Sound Design',
        'YouTube Content Creation'
      ],
      description: 'Transform raw footage into cinematic masterpieces. Learn professional video editing techniques used by top creators.',
      career: ['Video Editor', 'Motion Graphics Artist', 'Content Creator', 'Post-Production Specialist'],
      price: 'NPR 22,000',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop',
      color: '#ef4444'
    },
    {
      id: 3,
      name: 'Web Development',
      category: 'development',
      level: 'Beginner to Advanced',
      duration: '16 Weeks',
      students: 2150,
      rating: 4.9,
      tools: [
        { name: 'HTML/CSS', icon: '🌐' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'React.js', icon: '⚛️' },
        { name: 'Node.js', icon: '🚀' },
        { name: 'MongoDB', icon: '🍃' }
      ],
      curriculum: [
        'Frontend Development (React)',
        'Backend Development (Node.js)',
        'Database Management',
        'API Development',
        'Full-Stack Projects'
      ],
      description: 'Become a full-stack web developer. Build responsive, dynamic websites and web applications from scratch.',
      career: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Web Application Developer'],
      price: 'NPR 35,000',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop',
      color: '#3b82f6'
    },
    {
      id: 4,
      name: 'App Development',
      category: 'development',
      level: 'Intermediate',
      duration: '14 Weeks',
      students: 670,
      rating: 4.7,
      tools: [
        { name: 'React Native', icon: '📱' },
        { name: 'Flutter', icon: '🦋' },
        { name: 'Firebase', icon: '🔥' },
        { name: 'Android Studio', icon: '🤖' }
      ],
      curriculum: [
        'Mobile UI/UX Design',
        'Cross-Platform Development',
        'Native Features Integration',
        'App Store Deployment',
        'Real-time Apps'
      ],
      description: 'Create powerful mobile apps for iOS and Android. Learn to build, test, and deploy applications.',
      career: ['Mobile App Developer', 'React Native Developer', 'Flutter Developer', 'Mobile UI Designer'],
      price: 'NPR 32,000',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop',
      color: '#8b5cf6'
    },
    {
      id: 5,
      name: 'Meta Ads & Marketing',
      category: 'marketing',
      level: 'Beginner to Advanced',
      duration: '6 Weeks',
      students: 540,
      rating: 4.8,
      tools: [
        { name: 'Facebook Ads', icon: '📘' },
        { name: 'Instagram Ads', icon: '📷' },
        { name: 'Google Analytics', icon: '📊' },
        { name: 'Meta Business Suite', icon: '📱' }
      ],
      curriculum: [
        'Facebook/Instagram Advertising',
        'Audience Targeting',
        'Ad Creative Strategy',
        'Budget Optimization',
        'ROI Analysis'
      ],
      description: 'Master digital advertising on Meta platforms. Learn to create, optimize, and scale profitable ad campaigns.',
      career: ['Digital Marketer', 'Social Media Manager', 'Media Buyer', 'Marketing Specialist'],
      price: 'NPR 18,000',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&auto=format&fit=crop',
      color: '#06b6d4'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Courses', icon: '📚' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'video', label: 'Video', icon: '🎬' },
    { id: 'development', label: 'Development', icon: '💻' },
    { id: 'marketing', label: 'Marketing', icon: '📈' }
  ];

  const filteredCourses = activeFilter === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeFilter);

  return (
    <div className="courses-page">

      {/*===================================
        1. HERO SECTION
      ===================================*/}
      <section className="courses-hero">
        <div className="courses-hero-particles"></div>
        <div className="courses-container">
          <div className="courses-hero-content">
            <div className="courses-hero-badge">
              <span>📚 Skill Darbar Academy</span>
            </div>
            <h1 className="courses-hero-title">
              Explore Our <span className="courses-hero-highlight">Professional Courses</span>
            </h1>
            <p className="courses-hero-subtitle">
              Industry-designed curriculum taught by experts. Get job-ready with practical, hands-on training.
            </p>
            <div className="courses-hero-stats">
              <div className="courses-hero-stat">
                <span className="courses-stat-number">2000+</span>
                <span className="courses-stat-label">Students Trained</span>
              </div>
              <div className="courses-hero-stat">
                <span className="courses-stat-number">95%</span>
                <span className="courses-stat-label">Success Rate</span>
              </div>
              <div className="courses-hero-stat">
                <span className="courses-stat-number">50+</span>
                <span className="courses-stat-label">Expert Mentors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        2. COURSES FILTER & GRID
      ===================================*/}
      <section className="courses-section">
        <div className="courses-container">
          {/* Filter Bar */}
          <div className="courses-filter-wrapper">
            <div className="courses-filter-header">
              <h2 className="courses-filter-title">Choose Your Path</h2>
              <p className="courses-filter-subtitle">Select a category to explore specialized courses</p>
            </div>
            <div className="courses-filter-bar">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`courses-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span className="courses-filter-icon">{filter.icon}</span>
                  <span className="courses-filter-label">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="courses-card">
                {/* Card Image */}
                <div className="courses-card-image-wrapper">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="courses-card-image"
                  />
                  <div className="courses-card-badge" style={{ background: course.color }}>
                    {course.level}
                  </div>
                  <div className="courses-card-rating">
                    <span className="courses-star">⭐</span>
                    <span>{course.rating}</span>
                    <span className="courses-rating-count">({course.students} students)</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="courses-card-content">
                  <h3 className="courses-card-title">{course.name}</h3>
                  
                  {/* Tools/Skills */}
                  <div className="courses-tools">
                    {course.tools.map((tool, index) => (
                      <div key={index} className="courses-tool">
                        <span className="courses-tool-icon">{tool.icon}</span>
                        <span className="courses-tool-name">{tool.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Course Info */}
                  <div className="courses-info-grid">
                    <div className="courses-info-item">
                      <span className="courses-info-icon">⏱️</span>
                      <div className="courses-info-text">
                        <span className="courses-info-label">Duration</span>
                        <span className="courses-info-value">{course.duration}</span>
                      </div>
                    </div>
                    <div className="courses-info-item">
                      <span className="courses-info-icon">📊</span>
                      <div className="courses-info-text">
                        <span className="courses-info-label">Level</span>
                        <span className="courses-info-value">{course.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="courses-description">{course.description}</p>

                  {/* Curriculum Preview */}
                  <div className="courses-curriculum">
                    <span className="courses-curriculum-label">What you'll learn:</span>
                    <ul className="courses-curriculum-list">
                      {course.curriculum.slice(0, 3).map((item, index) => (
                        <li key={index} className="courses-curriculum-item">
                          <span className="courses-check">✓</span>
                          {item}
                        </li>
                      ))}
                      {course.curriculum.length > 3 && (
                        <li className="courses-curriculum-item courses-more">
                          +{course.curriculum.length - 3} more modules
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Career Paths */}
                  <div className="courses-career">
                    <span className="courses-career-label">Career opportunities:</span>
                    <div className="courses-career-tags">
                      {course.career.slice(0, 2).map((job, index) => (
                        <span key={index} className="courses-career-tag">{job}</span>
                      ))}
                      {course.career.length > 2 && (
                        <span className="courses-career-tag courses-more-tag">
                          +{course.career.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="courses-card-footer">
                    <div className="courses-price">
                      <span className="courses-price-label">Course Fee</span>
                      <span className="courses-price-value">{course.price}</span>
                    </div>
                    <Link to="/signup" className="courses-enroll-btn" style={{ '--hover-color': course.color }}>
                      Enroll Now
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*===================================
        3. WHY CHOOSE US SECTION
      ===================================*/}
      <section className="courses-why-section">
        <div className="courses-container">
          <div className="courses-why-header">
            <h2 className="courses-why-title">Why Choose <span>Skill Darbar</span></h2>
            <p className="courses-why-subtitle">We don't just teach, we transform careers</p>
          </div>

          <div className="courses-why-grid">
            <div className="courses-why-card">
              <div className="courses-why-icon">💼</div>
              <h3>Industry Projects</h3>
              <p>Work on real client projects and build a professional portfolio</p>
            </div>
            <div className="courses-why-card">
              <div className="courses-why-icon">🎓</div>
              <h3>Expert Mentors</h3>
              <p>Learn from industry professionals with years of experience</p>
            </div>
            <div className="courses-why-card">
              <div className="courses-why-icon">🔄</div>
              <h3>Lifetime Access</h3>
              <p>Get lifetime access to course materials and future updates</p>
            </div>
            <div className="courses-why-card">
              <div className="courses-why-icon">💪</div>
              <h3>Job Assistance</h3>
              <p>Resume building, interview prep, and job placement support</p>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        4. COMPARISON TABLE
      ===================================*/}
      <section className="courses-comparison">
        <div className="courses-container">
          <h2 className="courses-comparison-title">Traditional vs Skill-Based Learning</h2>
          
          <div className="courses-comparison-grid">
            <div className="courses-comparison-card traditional">
              <h3>Traditional Education</h3>
              <ul>
                <li>❌ Theoretical knowledge only</li>
                <li>❌ No practical projects</li>
                <li>❌ Outdated curriculum</li>
                <li>❌ High fees, long duration</li>
                <li>❌ No job guarantee</li>
              </ul>
            </div>
            
            <div className="courses-comparison-card skillbased">
              <h3>Skill Darbar</h3>
              <ul>
                <li>✅ Hands-on practical training</li>
                <li>✅ Real-world projects</li>
                <li>✅ Industry-updated curriculum</li>
                <li>✅ Affordable, flexible duration</li>
                <li>✅ Job placement support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        5. CTA SECTION
      ===================================*/}
      <section className="courses-cta">
        <div className="courses-container">
          <div className="courses-cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join 2000+ students who have transformed their careers with Skill Darbar</p>
            <div className="courses-cta-buttons">
              <Link to="/signup" className="courses-cta-primary">
                Browse All Courses
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/contact" className="courses-cta-secondary">
                Talk to Counselor
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;