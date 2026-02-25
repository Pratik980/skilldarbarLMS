// Courses.jsx

import { Link } from 'react-router-dom';
import '../../styles/publicStyles/Courses.css';
import CoursesSection from '../../components/CoursesSection';

function Courses() {
  
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
                <span className="courses-stat-number">5000+</span>
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

    {/* Course Section */}
      
        <CoursesSection />




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