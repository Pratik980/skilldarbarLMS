// ContactPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/publicStyles/Contact.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.'
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus({ submitted: false, success: false, message: '' });
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    }, 5000);
  };

  const courses = [
    'Select a course',
    'Graphic Designing Mastery',
    'Video Editing Professional',
    'Web Development Bootcamp',
    'App Development',
    'Meta Ads & Marketing'
  ];

  const officeHours = [
    { day: 'Sunday - Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 1:00 PM' },
    { day: 'Saturday', hours: 'Closed' }
  ];

  const quickContacts = [
    { icon: '📞', label: 'Emergency', value: '+977 980-1234567', type: 'emergency' },
    { icon: '💬', label: 'WhatsApp', value: '+977 976-2726211', type: 'whatsapp' },
    { icon: '📧', label: 'Support', value: 'support@skilldarbar.com', type: 'email' }
  ];

  return (
    <div className="contact-page">

      {/*===================================
        1. HERO SECTION
      ===================================*/}
      <section className="contact-hero">
        <div className="contact-hero-particles"></div>
        <div className="contact-container">
          <div className="contact-hero-content">
            <div className="contact-hero-badge">
              <span>📞 Get in Touch</span>
            </div>
            <h1 className="contact-hero-title">
              We'd Love to <span className="contact-hero-highlight">Hear From You</span>
            </h1>
            <p className="contact-hero-subtitle">
              Have questions about our courses? Need guidance? Our team is here to help you every step of the way.
            </p>
            <div className="contact-hero-stats">
              <div className="contact-hero-stat">
                <span className="contact-stat-number">24/7</span>
                <span className="contact-stat-label">Support</span>
              </div>
              <div className="contact-hero-stat">
                <span className="contact-stat-number">2hr</span>
                <span className="contact-stat-label">Avg Response</span>
              </div>
              <div className="contact-hero-stat">
                <span className="contact-stat-number">5000+</span>
                <span className="contact-stat-label">Happy Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        2. CONTACT INFO CARDS
      ===================================*/}
      <section className="contact-info-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            {/* Address Card */}
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <h3>Visit Us</h3>
              <div className="contact-info-content">
                <p className="contact-address-main">Janakpur, Dhanusha, Nepal</p>
                <p className="contact-address-detail">Main Road, Near Janaki Mandir</p>
                <p className="contact-address-detail">Janakpur, Province No. 2</p>
              </div>
              <div className="contact-info-footer">
                <a href="https://maps.google.com/?q=Janakpur,Nepal" target="_blank" rel="noopener noreferrer" className="contact-direction">Get Directions →</a>
              </div>
            </div>

            {/* Email Card */}
            <div className="contact-info-card">
              <div className="contact-info-icon">📧</div>
              <h3>Email Us</h3>
              <div className="contact-info-content">
                <div className="contact-email-item">
                  <span className="contact-email-label">Primary:</span>
                  <a href="mailto:ashveekyadav@gmail.com" className="contact-email">ashveekyadav@gmail.com</a>
                </div>
                <div className="contact-email-item">
                  <span className="contact-email-label">Support:</span>
                  <a href="mailto:support@skilldarbar.com" className="contact-email">support@skilldarbar.com</a>
                </div>
                <div className="contact-email-item">
                  <span className="contact-email-label">Careers:</span>
                  <a href="mailto:careers@skilldarbar.com" className="contact-email">careers@skilldarbar.com</a>
                </div>
              </div>
              <div className="contact-info-footer">
                <span className="contact-email-note">We reply within 2-4 hours</span>
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <h3>Call Us</h3>
              <div className="contact-info-content">
                <div className="contact-phone-item">
                  <span className="contact-phone-label">Main:</span>
                  <a href="tel:+9779762726211" className="contact-phone">+977 976-2726211</a>
                </div>
                <div className="contact-phone-item">
                  <span className="contact-phone-label">WhatsApp:</span>
                  <a href="https://wa.me/9779762726211" className="contact-phone">+977 976-2726211</a>
                </div>
                <div className="contact-phone-item">
                  <span className="contact-phone-label">Landline:</span>
                  <span className="contact-phone">041-523456</span>
                </div>
              </div>
              <div className="contact-info-footer">
                <span className="contact-phone-note">24/7 Emergency support</span>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="contact-info-card contact-quick-card">
              <div className="contact-info-icon">⚡</div>
              <h3>Quick Contact</h3>
              <div className="contact-quick-items">
                {quickContacts.map((item, index) => (
                  <a 
                    key={index} 
                    href={item.type === 'whatsapp' ? `https://wa.me/9779762726211` : 
                          item.type === 'email' ? `mailto:${item.value}` : `tel:${item.value}`}
                    className="contact-quick-item"
                  >
                    <span className="contact-quick-icon">{item.icon}</span>
                    <div>
                      <span className="contact-quick-label">{item.label}</span>
                      <span className="contact-quick-value">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        3. CONTACT FORM & MAP SECTION
      ===================================*/}
      <section className="contact-form-section">
        <div className="contact-container">
          <div className="contact-form-layout">
            {/* Left: Contact Form */}
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              {formStatus.submitted ? (
                <div className={`contact-form-success ${formStatus.success ? 'show' : ''}`}>
                  <div className="contact-success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>{formStatus.message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  {/* Name Field */}
                  <div className="contact-form-group">
                    <label htmlFor="name">
                      Full Name <span className="contact-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="contact-form-group">
                    <label htmlFor="email">
                      Email Address <span className="contact-required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ashveekyadav@gmail.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="contact-form-group">
                    <label htmlFor="phone">
                      Phone Number <span className="contact-required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+977 976-2726211"
                    />
                  </div>

                  {/* Course Selection */}
                  <div className="contact-form-group">
                    <label htmlFor="course">
                      Interested Course <span className="contact-required">*</span>
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                    >
                      {courses.map((course, index) => (
                        <option key={index} value={course} disabled={index === 0}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="contact-form-group contact-full-width">
                    <label htmlFor="message">
                      Your Message <span className="contact-required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us about your inquiry or questions..."
                    ></textarea>
                  </div>

                  {/* Form Footer */}
                  <div className="contact-form-footer">
                    <p className="contact-form-note">
                      <span className="contact-required">*</span> Required fields
                    </p>
                    <button type="submit" className="contact-submit-btn">
                      Send Message
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {/* Office Hours */}
              <div className="contact-office-hours">
                <h3>Office Hours</h3>
                <div className="contact-hours-list">
                  {officeHours.map((item, index) => (
                    <div key={index} className="contact-hours-item">
                      <span className="contact-hours-day">{item.day}</span>
                      <span className="contact-hours-time">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Google Map */}
            <div className="contact-map-wrapper">
              <div className="contact-map-header">
                <h3>Find Us Here</h3>
                <p>Janakpur, Dhanusha, Nepal</p>
              </div>
              
              <div className="contact-map-container">
                <iframe
                  title="Skill Darbar Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114468.4268718928!2d85.89075865!3d26.73158965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec1b8f5b4fe3f9%3A0x9d4c8b3b5b9b9b9b!2sJanakpur%2C%20Nepal!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="contact-map"
                ></iframe>
              </div>

              {/* Map Info Overlay */}
              <div className="contact-map-info">
                <div className="contact-map-address">
                  <strong>📍 Skill Darbar</strong>
                  <p>Main Road, Near Janaki Mandir<br />Janakpur, Dhanusha, Nepal</p>
                </div>
                <div className="contact-map-directions">
                  <a 
                    href="https://maps.google.com/?q=Janakpur,Nepal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-directions-btn"
                  >
                    Get Directions
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===================================
        4. BRANCH OFFICES
      ===================================*/}
      <section className="contact-branches">
        <div className="contact-container">
          <h2 className="contact-branches-title">Our <span>Locations</span></h2>
          
          <div className="contact-branches-grid">
            <div className="contact-branch-card">
              <div className="contact-branch-header">
                <span className="contact-branch-icon">🏛️</span>
                <h3>Janakpur (Head Office)</h3>
              </div>
              <p className="contact-branch-address">Main Road, Near Janaki Mandir</p>
              <p className="contact-branch-phone">📞 +977 976-2726211</p>
              <p className="contact-branch-hours">🕒 Sun-Thu: 9AM-6PM, Fri: 9AM-1PM</p>
              <a href="https://maps.google.com/?q=Janakpur,Nepal" target="_blank" rel="noopener noreferrer" className="contact-branch-btn">View on Map</a>
            </div>

            {/* <div className="contact-branch-card">
              <div className="contact-branch-header">
                <span className="contact-branch-icon">🏙️</span>
                <h3>Kathmandu Center</h3>
              </div>
              <p className="contact-branch-address">Putalisadak, Kathmandu</p>
              <p className="contact-branch-phone">📞 +977 984-1234567</p>
              <p className="contact-branch-hours">🕒 Sun-Fri: 9AM-6PM</p>
              <button className="contact-branch-btn">View on Map</button>
            </div>

            <div className="contact-branch-card">
              <div className="contact-branch-header">
                <span className="contact-branch-icon">🏞️</span>
                <h3>Pokhara Center</h3>
              </div>
              <p className="contact-branch-address">Lakeside, Pokhara</p>
              <p className="contact-branch-phone">📞 +977 985-7654321</p>
              <p className="contact-branch-hours">🕒 Sun-Fri: 9AM-6PM</p>
              <button className="contact-branch-btn">View on Map</button>
            </div> */}
          </div>
        </div>
      </section>

      {/*===================================
        5. FAQ PREVIEW
      ===================================*/}
      <section className="contact-faq-preview">
        <div className="contact-container">
          <div className="contact-faq-content">
            <h2>Quick Answers</h2>
            <p>Before contacting us, check our frequently asked questions</p>
            <div className="contact-faq-links">
              <Link to="/faqs" className="contact-faq-link">📝 How to enroll?</Link>
              <Link to="/faqs" className="contact-faq-link">🎓 Certificate?</Link>
              <Link to="/faqs" className="contact-faq-link">🌱 Beginner friendly?</Link>
              <Link to="/faqs" className="contact-faq-link">🤝 Support?</Link>
              <Link to="/faqs" className="contact-faq-link">💻 Online/Offline?</Link>
            </div>
            <Link to="/faqs" className="contact-faq-view-all">View All FAQs →</Link>
          </div>
        </div>
      </section>

      {/*===================================
        6. SOCIAL CONNECT
      ===================================*/}
      <section className="contact-social">
        <div className="contact-container">
          <h2 className="contact-social-title">Connect With Us</h2>
          
          <div className="contact-social-grid">
            <a href="https://facebook.com/skilldarbar" target="_blank" rel="noopener noreferrer" className="contact-social-card facebook">
              <div className="contact-social-icon">📘</div>
              <h3>Facebook</h3>
              <p>@skilldarbar</p>
              <span>Join our community</span>
            </a>
            
            <a href="https://instagram.com/skilldarbar" target="_blank" rel="noopener noreferrer" className="contact-social-card instagram">
              <div className="contact-social-icon">📷</div>
              <h3>Instagram</h3>
              <p>@skilldarbar</p>
              <span>Follow for updates</span>
            </a>
            
            <a href="https://linkedin.com/company/skilldarbar" target="_blank" rel="noopener noreferrer" className="contact-social-card linkedin">
              <div className="contact-social-icon">💼</div>
              <h3>LinkedIn</h3>
              <p>Skill Darbar</p>
              <span>Network with us</span>
            </a>
            
            <a href="https://youtube.com/@skilldarbar" target="_blank" rel="noopener noreferrer" className="contact-social-card youtube">
              <div className="contact-social-icon">▶️</div>
              <h3>YouTube</h3>
              <p>@skilldarbar</p>
              <span>Watch tutorials</span>
            </a>
          </div>
        </div>
      </section>

      {/*===================================
        7. CTA SECTION
      ===================================*/}
      <section className="contact-cta">
        <div className="contact-container">
          <div className="contact-cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Browse our courses and begin learning today</p>
            <a href="/courses" className="contact-cta-button">
              Explore Courses
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;