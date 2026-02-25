import { Link } from 'react-router-dom';
import '../styles/publicStyles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      {/* premium animated orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />
      <div className="hero-grid" />
      
      {/* brand watermark */}
      <div className="hero-watermark">SKILL<span>DARBAR</span></div>

      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <div className="premium-badge">
            <span className="badge-pulse" />
            <span className="badge-text">PREMIUM LEARNING EXPERIENCE</span>
            <span className="badge-star">⭐</span>
          </div>

          <h1 className="hero-title">
            Upgrade Your{' '}
            <span className="title-gradient">
              Skills
            </span>
          </h1>
          
          <h2 className="hero-headline">
            for a <span className="headline-highlight">Better Future.</span>
          </h2>

          <p className="hero-description">
            <span className="brand-highlight">SkillDarbar</span> offers hands-on training designed to help students 
            gain real-world experience and start earning through{' '}
            <strong>freelancing, jobs, and entrepreneurship</strong>
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Happy Learners</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Expert Mentors</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Practical Training</span>
            </div>
          </div>

          <div className="hero-buttons">
           <Link to="/courses">
           <button className="btn btn-primary">
              Explore Courses
              <span className="btn-arrow">→</span>
            </button>
            </Link>
          <Link to="/login">
           <button className="btn btn-secondary">
              Start Learning
              <span className="btn-shine" />
            </button>
            </Link> 
          </div>

          {/* Trust badges */}
          <div className="trust-badges">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Industry Certified</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Live Projects</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Job Assistance</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ENHANCED VISUAL */}
        <div className="hero-right">
          {/* Main Skills Dashboard */}
          <div className="skills-dashboard">
            <div className="dashboard-header">
              <div className="dashboard-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="dashboard-title">SkillDarbar • Live Dashboard</span>
              <span className="dashboard-live">LIVE</span>
            </div>
            
            <div className="dashboard-content">
              <div className="dashboard-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="SkillDarbar Learning Platform"
                  className="dashboard-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
              </div>
              
              {/* Floating skill badges */}
              <div className="floating-badge badge-1">
                <span className="badge-icon">🎨</span>
                <span>Photoshop</span>
              </div>
              <div className="floating-badge badge-2">
                <span className="badge-icon">📱</span>
                <span>UI/UX Design</span>
              </div>
              <div className="floating-badge badge-3">
                <span className="badge-icon">💻</span>
                <span>Web Dev</span>
              </div>
              <div className="floating-badge badge-4">
                <span className="badge-icon">🐍</span>
                <span>Python</span>
              </div>
              
              {/* Skill chips - 8+ skills */}
              <div className="skill-chips">
                <span className="chip">Photoshop</span>
                <span className="chip">Digital Marketing</span>
                <span className="chip">SEO</span>
                <span className="chip">VS Code</span>
                <span className="chip">Web Dev</span>
                <span className="chip">UI/UX</span>
                <span className="chip">React</span>
                <span className="chip">Python</span>
                <span className="chip chip-plus">+5 more</span>
              </div>
            </div>
          </div>

          {/* Live learning activity indicator */}
          <div className="live-activity">
            <div className="activity-pulse"></div>
            <span className="activity-text">250+ learners active now</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;













// import React from 'react';
// import '../styles/publicStyles/HeroSection.css';

// const HeroSection = () => {
//   return (
//     <section className="hero">
//       {/* premium animated orbs */}
//       <div className="hero-orb orb-1" />
//       <div className="hero-orb orb-2" />
//       <div className="hero-orb orb-3" />
//       <div className="hero-grid" />
      
//       {/* brand watermark */}
//       <div className="hero-watermark">SKILL<span>DARBAR</span></div>

//       <div className="hero-container">
//         {/* LEFT CONTENT - REFINED */}
//         <div className="hero-left">
//           <div className="premium-badge">
//             <span className="badge-pulse" />
//             <span className="badge-tet">Trusted by 10,000+ Learners</span>
//             <span className="badge-star">✨</span>
//           </div>

//           <h1 className="hero-title">
//             Upgrade Your{' '}
//             <span className="title-gradient">
//               Skills<span className="title-dot"></span>
//             </span>
//           </h1>
          
//           <h2 className="hero-headline">
//             for a Better Future.
//           </h2>

//           <p className="hero-description">
//             Master <strong>8+ cutting-edge skills</strong> including Photoshop, Digital Marketing, 
//             SEO, Web Development, VS Code, UI/UX Design, React, and Python. 
//             Learn from expert mentors, build real-world projects, and earn 
//             industry-recognized certifications.
//           </p>

//           <div className="hero-stats">
//             <div className="stat-item">
//               <span className="stat-number">8+</span>
//               <span className="stat-label">Pro Skills</span>
//             </div>
//             <div className="stat-divider" />
//             <div className="stat-item">
//               <span className="stat-number">50+</span>
//               <span className="stat-label">Experts</span>
//             </div>
//             <div className="stat-divider" />
//             <div className="stat-item">
//               <span className="stat-number">100%</span>
//               <span className="stat-label">Job Ready</span>
//             </div>
//           </div>

//           <div className="hero-buttons">
//             <button className="btn btn-primary">
//               Explore Courses
//               <span className="btn-arrow">→</span>
//             </button>
//             <button className="btn btn-secondary">
//               Get Started
//               <span className="btn-shine" />
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SIDE - SKILLS HUB */}
//         <div className="hero-right">
//           {/* main visual - skills dashboard */}
//           <div className="skills-dashboard">
//             <div className="dashboard-header">
//               <div className="dashboard-dots">
//                 <span className="dot red" />
//                 <span className="dot yellow" />
//                 <span className="dot green" />
//               </div>
//               <span className="dashboard-title">SkillDarbar Pro</span>
//             </div>
            
//             <div className="dashboard-content">
//               <img
//                 src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
//                 alt="Professional Skills Workspace"
//                 className="dashboard-image"
//                 loading="lazy"
//               />
              
//               {/* skill chips - 8+ skills */}
//               <div className="skill-chips">
//                 <span className="chip">Photoshop</span>
//                 <span className="chip">Digital Marketing</span>
//                 <span className="chip">SEO</span>
//                 <span className="chip">VS Code</span>
//                 <span className="chip">Web Dev</span>
//                 <span className="chip">UI/UX</span>
//                 <span className="chip">React</span>
//                 <span className="chip">Python</span>
//                 <span className="chip chip-plus">+5</span>
//               </div>
//             </div>
//           </div>

        
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



  {/* floating skill cards - 8 cards total
          <div className="floating-card card-photoshop">
            <div className="card-icon">🎨</div>
            <div className="card-content">
              <span className="card-label">Photoshop</span>
              <span className="card-value">248+ lessons</span>
            </div>
            <span className="card-badge">Master</span>
          </div>

          <div className="floating-card card-marketing">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <span className="card-label">Digital Marketing</span>
              <span className="card-value">156+ lessons</span>
            </div>
            <span className="card-badge">Hot</span>
          </div>

          <div className="floating-card card-seo">
            <div className="card-icon">🔍</div>
            <div className="card-content">
              <span className="card-label">SEO Advanced</span>
              <span className="card-value">89 lessons</span>
            </div>
            <span className="card-badge">Pro</span>
          </div>

          <div className="floating-card card-webdev">
            <div className="card-icon">💻</div>
            <div className="card-content">
              <span className="card-label">Web Development</span>
              <span className="card-value">312+ lessons</span>
            </div>
            <span className="card-badge">Popular</span>
          </div>

          <div className="floating-card card-vscode">
            <div className="card-icon">⚡</div>
            <div className="card-content">
              <span className="card-label">VS Code Pro</span>
              <span className="card-value">67 tips</span>
            </div>
          </div>

          <div className="floating-card card-uiux">
            <div className="card-icon">✨</div>
            <div className="card-content">
              <span className="card-label">UI/UX Design</span>
              <span className="card-value">124 lessons</span>
            </div>
          </div>

          <div className="floating-card card-react">
            <div className="card-icon">⚛️</div>
            <div className="card-content">
              <span className="card-label">React</span>
              <span className="card-value">98 lessons</span>
            </div>
          </div>

          <div className="floating-card card-python">
            <div className="card-icon">🐍</div>
            <div className="card-content">
              <span className="card-label">Python</span>
              <span className="card-value">156 lessons</span>
            </div>
          </div> */}






    // <section className="hero-section">
    //   {/* Floating particles */}
    //   <div className="particle"></div>
    //   <div className="particle"></div>
    //   <div className="particle"></div>
    //   <div className="particle"></div>
    //   <div className="particle"></div>

    //   <div className="container">
    //     <div className="hero-content">
    //       {/* Left Content */}
    //       <div className="hero-left">
    //         <div className="premium-badge">
    //           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
    //           </svg>
    //           <span>Premium Learning Experience</span>
    //         </div>

    //         <h1 className="hero-title">
    //           Upgrade Your <span className="gradient-text">Skills</span><br />
    //           for a Better Future.
    //         </h1>

    //         <h2 className="hero-subtitle">
    //           Nepal's Practical Skill-Based Learning Platform
    //         </h2>

    //         <p className="hero-description">
    //           Skill Darbar offers hands-on training designed to help students gain 
    //           real-world experience and start earning through freelancing, jobs, 
    //           and entrepreneurship.
    //         </p>

    //         <div className="hero-buttons">
    //           <Link to="/courses" className="btn-primary">
    //             Explore Courses
    //             <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    //               <path d="M5 3L10 8L5 13" />
    //             </svg>
    //           </Link>
    //           <Link to="/signup" className="btn-secondary">
    //             Start Learning
    //             <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    //               <path d="M2 8H14M14 8L10 4M14 8L10 12" />
    //             </svg>
    //           </Link>
    //         </div>
    //       </div>

    //       {/* Right Side - 3D Cards */}
    //       <div className="hero-right">
    //         <div className="cards-container">
    //           {/* Graphic Designing Card */}
    //           <div className="card-3d card-1">
    //             <div className="card-icon">
    //               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                 <path d="M4 4h16v16H4z" />
    //                 <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
    //                 <path d="M21 15L16 10L5 21" />
    //               </svg>
    //             </div>
    //             <h3 className="card-title">Graphic Designing</h3>
    //             <p className="card-subtitle">12 Weeks • Beginner to Advanced</p>
    //             <ul className="card-features">
    //               <li>
    //                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                   <polyline points="20 6 9 17 4 12" />
    //                 </svg>
    //                 Photoshop & Illustrator
    //               </li>
    //               <li>
    //                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                   <polyline points="20 6 9 17 4 12" />
    //                 </svg>
    //                 UI/UX Fundamentals
    //               </li>
    //             </ul>
    //           </div>

    //           {/* Video Editing Card */}
    //           <div className="card-3d card-2">
    //             <div className="card-icon">
    //               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                 <rect x="2" y="4" width="20" height="16" rx="2" />
    //                 <path d="M9 8L15 12L9 16V8z" />
    //               </svg>
    //             </div>
    //             <h3 className="card-title">Video Editing</h3>
    //             <p className="card-subtitle">8 Weeks • Project Based</p>
    //             <ul className="card-features">
    //               <li>
    //                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                   <polyline points="20 6 9 17 4 12" />
    //                 </svg>
    //                 Premiere Pro & After Effects
    //               </li>
    //               <li>
    //                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                   <polyline points="20 6 9 17 4 12" />
    //                 </svg>
    //                 Color Grading
    //               </li>
    //             </ul>
    //           </div>

    //           {/* Web Development Card */}
    //           <div className="card-3d card-3">
    //             <div className="card-icon">
    //               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                 <path d="M12 2L2 7L12 12L22 7L12 2z" />
    //                 <path d="M2 17L12 22L22 17" />
    //                 <path d="M2 12L12 17L22 12" />
    //               </svg>
    //             </div>
    //             <h3 className="card-title">Web Development</h3>
    //             <p className="card-subtitle">16 Weeks • Full Stack</p>
    //             <ul className="card-features">
    //               <li>
    //                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                   <polyline points="20 6 9 17 4 12" />
    //                 </svg>
    //                 MERN Stack
    //               </li>
    //               <li>
    //                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //                   <polyline points="20 6 9 17 4 12" />
    //                 </svg>
    //                 Real-world Projects
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>