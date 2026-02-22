
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/publicStyles/About.css';

function AboutPage() {
  const coreValues = [
    {
      title: 'Practicality',
      description: 'Learn by doing with real-world projects and hands-on exercises that prepare you for actual work.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      )
    },
    {
      title: 'Transparency',
      description: 'Clear communication, honest pricing, and no hidden fees. What you see is what you get.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Affordability',
      description: 'Quality education at prices that make sense for Nepali students and professionals.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1v22M17 5H9.5M17 5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h10z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      title: 'Community',
      description: 'Join a supportive network of learners, mentors, and alumni helping each other grow.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  const impactStats = [
    { number: '500+', label: 'Students', desc: 'Trained and placed' },
    { number: '200+', label: 'Projects Built', desc: 'By our students' },
    { number: '50+', label: 'Freelancers', desc: 'Working globally' }
  ];


  // Sucess 
    const successStories = [
    {
      id: 1,
      name: 'Ramesh Yadav',
      location: 'Janakpur, Nepal',
      course: 'Web Development Bootcamp',
      before: 'Local shop assistant, earning NPR 8,000/month',
      after: 'Remote Developer for US startup',
      income: 'NPR 85,000/month',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      impact: '10x Income Growth'
    },
    {
      id: 2,
      name: 'Sita Sharma',
      location: 'Pokhara, Nepal',
      course: 'Graphic Design Mastery',
      before: 'Homemaker with no income',
      after: 'Freelance Graphic Designer',
      income: 'NPR 45,000/month',
      image: 'https://images.unsplash.com/photo-1494790108777-466fd103c8ab?w=400&auto=format&fit=crop',
      impact: 'Financial Independence'
    },
    {
      id: 3,
      name: 'Bikram Thapa',
      location: 'Butwal, Nepal',
      course: 'Video Editing Pro',
      before: 'Unemployed graduate',
      after: 'YouTube Content Creator',
      income: 'NPR 60,000/month',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop',
      impact: 'Dream Job Achieved'
    }
  ];


    const teamMembers = [
    {
      id: 1,
      name: 'Rajesh Kumar Mandal',
      role: 'Founder & CEO',
      bio: 'Former IT professional with 12+ years experience in ed-tech. Started Skill Darbar to make quality education accessible in rural Nepal.',
      expertise: ['Ed-Tech Strategy', 'Curriculum Design', 'Business Development'],
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      },
      quote: "Education should transform lives, not just fill minds."
    },
    {
      id: 2,
      name: 'Sunita Sharma',
      role: 'Lead Instructor - Web Development',
      bio: 'Full-stack developer and mentor who has trained 1000+ students. Previously worked at tech startups in Bangalore and Kathmandu.',
      expertise: ['MERN Stack', 'Python', 'Teaching Methodology'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      },
      quote: "Code is poetry, teaching is purpose."
    },
    {
      id: 3,
      name: 'Bikash Thapa Magar',
      role: 'Lead Instructor - Graphic Design',
      bio: 'Award-winning graphic designer with 8 years experience. Worked with international clients and loves nurturing creative talent.',
      expertise: ['Adobe Creative Suite', 'UI/UX', 'Brand Identity'],
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      },
      quote: "Design is thinking made visual."
    },
    {
      id: 4,
      name: 'Priya Gurung',
      role: 'Support Team Lead',
      bio: 'Passionate about student success and community building. Ensures every learner gets the help they need throughout their journey.',
      expertise: ['Student Support', 'Community Management', 'Career Counseling'],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      },
      quote: "Behind every successful student is a great support system."
    }
  ];



   const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryCategories = [
    { id: 'all', label: 'All Moments' },
    { id: 'classroom', label: 'Classroom' },
    { id: 'projects', label: 'Student Projects' },
    { id: 'workshops', label: 'Workshops' }
  ];

  const galleryImages = [
    // Classroom Photos
    {
      id: 1,
      type: 'classroom',
      category: 'classroom',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop',
      title: 'Web Development Bootcamp',
      location: 'Kathmandu Center',
      date: 'March 2025',
      students: 45,
      description: 'Students learning MERN stack in intensive bootcamp'
    },
    {
      id: 2,
      type: 'classroom',
      category: 'classroom',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop',
      title: 'Graphic Design Workshop',
      location: 'Pokhara Branch',
      date: 'February 2025',
      students: 30,
      description: 'Hands-on session with Adobe Creative Suite'
    },
    {
      id: 3,
      type: 'classroom',
      category: 'classroom',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop',
      title: 'Morning Batch',
      location: 'Janakpur Center',
      date: 'January 2025',
      students: 25,
      description: 'Early birds mastering video editing'
    },

    // Student Projects
    {
      id: 4,
      type: 'projects',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
      title: 'E-commerce Website',
      student: 'Ramesh Yadav',
      projectType: 'Web Development',
      description: 'Full-stack e-commerce platform built with MERN',
      achievement: 'Best Project Award'
    },
    {
      id: 5,
      type: 'projects',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop',
      title: 'Brand Identity Design',
      student: 'Sita Sharma',
      projectType: 'Graphic Design',
      description: 'Complete brand package for local restaurant',
      achievement: 'Client Approved'
    },
    {
      id: 6,
      type: 'projects',
      category: 'projects',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop',
      title: 'Short Film',
      student: 'Bikram Thapa',
      projectType: 'Video Editing',
      description: '5-minute documentary on local artisans',
      achievement: 'Film Festival Selection'
    },

    // Workshop Moments
    {
      id: 7,
      type: 'workshops',
      category: 'workshops',
      image: 'https://images.unsplash.com/photo-1540317580384-e5d43867b609?w=600&auto=format&fit=crop',
      title: 'Freelancing Workshop',
      location: 'Butwal',
      date: 'March 2025',
      attendees: 60,
      description: 'How to start freelancing and get first client'
    },
    {
      id: 8,
      type: 'workshops',
      category: 'workshops',
      image: 'https://images.unsplash.com/photo-1559223607-a43c9902e98a?w=600&auto=format&fit=crop',
      title: 'Portfolio Review Day',
      location: 'Online Session',
      date: 'February 2025',
      attendees: 85,
      description: 'Industry experts reviewing student portfolios'
    },
    {
      id: 9,
      type: 'workshops',
      category: 'workshops',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop',
      title: 'Networking Meetup',
      location: 'Kathmandu',
      date: 'January 2025',
      attendees: 120,
      description: 'Students connecting with industry professionals'
    }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);



  return (
    <div className="about-page">
      {/* 1. Hero Section - CHANGED CLASS NAME */}
      <section className="about-hero-section">
        <div className="about-hero-particles"></div>
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <span>🇳🇵 Made in Nepal</span>
            </div>
            <h1 className="about-hero-title">
              Empowering Nepal Through <span className="about-highlight">Practical Skills</span>
            </h1>
            <p className="about-hero-subtitle">
              Bridging the gap between traditional education and industry demands with hands-on, career-focused learning.
            </p>
            <div className="about-hero-stats">
              <div className="about-hero-stat-item">
                <div className="about-hero-stat-value">77</div>
                <div className="about-hero-stat-label">Districts</div>
              </div>
              <div className="about-hero-stat-item">
                <div className="about-hero-stat-value">5000+</div>
                <div className="about-hero-stat-label">Students</div>
              </div>
              <div className="about-hero-stat-item">
                <div className="about-hero-stat-value">95%</div>
                <div className="about-hero-stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-left">
              <div className="story-badge">📖 Our Story</div>
              <h2 className="story-title">
                Started from <span>Janakpur</span> with a Mission
              </h2>
              <p className="story-text">
                Skill Darbar began in 2020 with a simple yet powerful vision: to make skill-based education 
                affordable and accessible to every Nepali youth. What started as small workshops in Janakpur 
                has now grown into a thriving online platform serving students across all 77 districts of Nepal.
              </p>
              <p className="story-text">
                Our journey is driven by the belief that practical skills, not just degrees, are the key to 
                unlocking economic opportunities in today's digital economy.
              </p>
              <div className="story-features">
                <div className="story-feature">
                  <div className="story-feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="story-feature-text">
                    5000+ Students
                    <small>Across Nepal</small>
                  </div>
                </div>
                <div className="story-feature">
                  <div className="story-feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="story-feature-text">
                    25+ Courses
                    <small>Skill-based curriculum</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-right">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop" 
                alt="Students learning in Janakpur" 
                className="story-image"
              />
              <div className="story-location-badge">
                <div className="location-icon">📍</div>
                <div className="location-text">
                  <h4>Janakpur, Nepal</h4>
                  <p>Where it all began</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       <section className="success-section">
      {/* Floating Elements */}
      <div className="success-float success-float-1">💰</div>
      <div className="success-float success-float-2">🚀</div>
      <div className="success-float success-float-3">✨</div>

      <div className="success-container">
        {/* Section Header */}
        <div className="success-header">
          <div className="success-badge">
            <span className="success-badge-icon">🏆</span>
            <span>Real Stories, Real Impact</span>
          </div>
          <h2 className="success-title">
            From <span className="success-highlight">Struggle to Success</span>
          </h2>
          <p className="success-subtitle">
            Meet our students who transformed their lives through practical skills
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="success-grid">
          {successStories.map((story) => (
            <div key={story.id} className="success-card">
              {/* Card Header with Image */}
              <div className="success-card-header">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="success-card-image"
                />
                <div className="success-card-overlay">
                  <span className="success-impact-badge">{story.impact}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="success-card-content">
                {/* Basic Info */}
                <div className="success-info">
                  <h3 className="success-name">{story.name}</h3>
                  <div className="success-location">
                    <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{story.location}</span>
                  </div>
                  <div className="success-course">
                    <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{story.course}</span>
                  </div>
                </div>

                {/* Before & After Comparison */}
                <div className="success-comparison">
                  <div className="comparison-before">
                    <span className="comparison-label">Before</span>
                    <p className="comparison-text">{story.before}</p>
                  </div>
                  <div className="comparison-arrow">→</div>
                  <div className="comparison-after">
                    <span className="comparison-label">After</span>
                    <p className="comparison-text">{story.after}</p>
                  </div>
                </div>

                {/* Income Impact */}
                <div className="success-income">
                  <div className="income-icon">💰</div>
                  <div className="income-details">
                    <span className="income-label">Current Income</span>
                    <span className="income-value">{story.income}</span>
                  </div>
                </div>

                {/* Story Link */}
                <Link to="/blog" className="success-read-more">
                  Read Full Story
                  <svg className="success-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        
        
      </div>
    </section>

    {/* 6. Why Skill-Based Learning Matters */}
      <section className="why-matters">
        <div className="container">
          <div className="matters-content">
            <div className="matters-left">
              <div className="matters-badge">📈 Industry Insight</div>
              <h2 className="matters-title">
                Why <span>Skill-Based Learning</span> Matters in Nepal
              </h2>
              <p className="matters-text">
                Nepal's job market is undergoing a massive transformation. Traditional degrees alone no longer 
                guarantee employment. Employers now prioritize practical skills, portfolio, and real-world experience 
                over theoretical knowledge.
              </p>
              <p className="matters-text">
                With the rise of remote work and digital economy, Nepali youth have unprecedented opportunities to 
                work for global clients—but only if they have the right skills. Skill-based learning bridges this gap.
              </p>
              
              <div className="stats-highlight">
                <div className="stat-row">
                  <span className="stat-label">Companies prioritizing skills over degrees</span>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{width: '82%'}}></div>
                  </div>
                  <span className="stat-percent">82%</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Nepali freelancers in digital economy</span>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{width: '67%'}}></div>
                  </div>
                  <span className="stat-percent">67%</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Demand for practical skills (YoY growth)</span>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{width: '95%'}}></div>
                  </div>
                  <span className="stat-percent">95%</span>
                </div>
              </div>
            </div>

            <div className="matters-right">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop" 
                alt="Nepali student working remotely" 
                className="matters-image"
              />
              <div className="quote-bubble">
                <p>
                  "The future of work is skill-based. In Nepal, we're seeing a shift where freelancers and 
                  remote workers are earning more than traditional 9-5 jobs."
                </p>
                <div className="quote-author">
                  - Tech Industry Report 2025
                  <span>Nepal IT Association</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="mv-title">Our Mission</h2>
              <p className="mv-text">
                To provide practical, hands-on training that leads to real income opportunities for Nepali youth. 
                We're committed to bridging the skills gap and creating pathways to financial independence through 
                quality education.
              </p>
            </div>

            <div className="mv-card">
              <div className="mv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h2 className="mv-title">Our Vision</h2>
              <p className="mv-text">
                To become Nepal's leading skill-based digital learning platform, recognized for producing 
                job-ready professionals who can compete globally. We envision a Nepal where every youth has 
                access to quality skill development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="core-values">
        <div className="container">
          <div className="values-header">
            <div className="values-badge">💎 Our Values</div>
            <h2 className="values-title">What Drives <span>Us</span></h2>
            <p className="values-subtitle">
              The principles that guide everything we do at Skill Darbar
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  */}
       <section className="team-section">
      {/* Background Pattern */}
      <div className="team-pattern"></div>
      
      <div className="team-container">
        {/* Section Header */}
        <div className="team-header">
          <div className="team-badge">
            <span>👥 Meet Our Team</span>
          </div>
          <h2 className="team-title">
            The <span className="team-highlight">Mentors</span> Behind Your Success
          </h2>
          <p className="team-subtitle">
            Passionate educators and industry experts committed to your growth
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              {/* Card Front */}
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-image-wrapper">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="team-image"
                    />
                    <div className="team-social">
                      <a href={member.social.linkedin} className="team-social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href={member.social.twitter} className="team-social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.812-3.767 13.94 13.94 0 001.543-5.95c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                      <a href={`mailto:${member.social.email}`} className="team-social-link">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <div className="team-expertise">
                      {member.expertise.map((skill, index) => (
                        <span key={index} className="team-skill">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Back */}
                <div className="team-card-back">
                  <div className="team-quote">"{member.quote}"</div>
                  <p className="team-bio">{member.bio}</p>
                  <a href={`mailto:${member.social.email}`} className="team-connect">Connect with {member.name.split(' ')[0]}</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        
    
      </div>
    </section>

      {/* 5. Our Impact */}
      <section className="our-impact">
        <div className="container">
          <div className="impact-header">
            <div className="impact-badge">📊 Our Impact</div>
            <h2 className="impact-title">Making a <span>Difference</span></h2>
          </div>

          <div className="impact-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="impact-card">
                <div className="impact-number">{stat.number}</div>
                <div className="impact-label">{stat.label}</div>
                <div className="impact-desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


       <section className="gallery-section">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.image} alt={selectedImage.title} className="lightbox-image" />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              {selectedImage.student && <p className="lightbox-student">Student: {selectedImage.student}</p>}
              {selectedImage.location && <p className="lightbox-location">📍 {selectedImage.location}</p>}
              {selectedImage.date && <p className="lightbox-date">📅 {selectedImage.date}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="gallery-container">
        {/* Header */}
        <div className="gallery-header">
          <div className="gallery-badge">
            <span className="gallery-badge-icon">🖼</span>
            <span>Our Gallery</span>
          </div>
          <h2 className="gallery-title">
            Capturing <span className="gallery-highlight">Moments of Growth</span>
          </h2>
          <p className="gallery-subtitle">
            A visual journey through our classrooms, student projects, and workshop moments
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="gallery-filters">
          {galleryCategories.map(category => (
            <button
              key={category.id}
              className={`gallery-filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((item) => (
            <div 
              key={item.id} 
              className={`gallery-item gallery-item-${item.type}`}
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-item-inner">
                <img src={item.image} alt={item.title} className="gallery-item-image" />
                
                {/* Overlay Content */}
                <div className="gallery-item-overlay">
                  <h3 className="gallery-item-title">{item.title}</h3>
                  
                  {item.type === 'classroom' && (
                    <div className="gallery-item-details">
                      <span className="gallery-detail">📍 {item.location}</span>
                      <span className="gallery-detail">👥 {item.students} students</span>
                      <span className="gallery-detail">📅 {item.date}</span>
                    </div>
                  )}

                  {item.type === 'projects' && (
                    <div className="gallery-item-details">
                      <span className="gallery-detail">👤 {item.student}</span>
                      <span className="gallery-detail">🏷 {item.projectType}</span>
                      {item.achievement && (
                        <span className="gallery-achievement">🏆 {item.achievement}</span>
                      )}
                    </div>
                  )}

                  {item.type === 'workshops' && (
                    <div className="gallery-item-details">
                      <span className="gallery-detail">📍 {item.location}</span>
                      <span className="gallery-detail">👥 {item.attendees} attendees</span>
                      <span className="gallery-detail">📅 {item.date}</span>
                    </div>
                  )}

                  <p className="gallery-item-description">{item.description}</p>
                  
                  <span className="gallery-view-btn">
                    View Full Size
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </span>
                </div>

                {/* Category Badge */}
                <div className={`gallery-item-badge gallery-badge-${item.type}`}>
                  {item.type === 'classroom' && '📚 Classroom'}
                  {item.type === 'projects' && '💻 Project'}
                  {item.type === 'workshops' && '🔧 Workshop'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="gallery-stats">
          <div className="gallery-stat">
            <span className="gallery-stat-number">45+</span>
            <span className="gallery-stat-label">Classroom Sessions</span>
          </div>
          <div className="gallery-stat">
            <span className="gallery-stat-number">200+</span>
            <span className="gallery-stat-label">Student Projects</span>
          </div>
          <div className="gallery-stat">
            <span className="gallery-stat-number">25+</span>
            <span className="gallery-stat-label">Workshops</span>
          </div>
          <div className="gallery-stat">
            <span className="gallery-stat-number">1000+</span>
            <span className="gallery-stat-label">Photos & Videos</span>
          </div>
        </div>
      </div>
    </section>



      


      {/* 7. Final CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Career?</h2>
            <p className="cta-subtitle">
              Join Skill Darbar today and start your journey toward practical skills and real income.
            </p>
            <Link to="/signup" className="cta-button">
              Get Started Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 10h10M10 5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;