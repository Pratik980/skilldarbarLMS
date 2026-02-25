import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/publicStyles/Home.css'
import studentsImage from '../../assets/students-learning.jpg';
import HeroSection from '../../components/HeroSection';
import StudentPortalPreview from '../../components/StudentPortalPreview';
import TestimonialsSection from '../../components/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import CoursesSection from '../../components/CoursesSection';

function Home() {

    // const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({ students: 1000, courses: 50, placements: 2000 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate counters
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const targetStudents = 5000;
      const targetCourses = 25;
      const targetPlacements = 2000;

      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounts({
          students: Math.min(Math.floor(targetStudents * progress), targetStudents),
          courses: Math.min(Math.floor(targetCourses * progress), targetCourses),
          placements: Math.min(Math.floor(targetPlacements * progress), targetPlacements)
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Why Choose US

  const features = [
    {
      id: 1,
      title: 'Practical-Based Learning',
      description: 'Learn by doing with real-world projects and hands-on exercises that prepare you for actual industry challenges.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
      features: [
        'Project-based curriculum',
        'Real client simulations',
        'Portfolio building'
      ]
    },
    {
      id: 2,
      title: 'Affordable Pricing for Nepal',
      description: 'Quality education at prices that fit Nepali students\' budgets with flexible payment options and scholarships.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1v22M17 5H9.5M17 5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h10z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      features: [
        'Affordable monthly plans',
        'Scholarship opportunities',
        'No hidden costs'
      ]
    },
    {
      id: 3,
      title: 'Industry-Focused Curriculum',
      description: 'Courses designed with input from industry experts to teach the most in-demand skills employers are looking for.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      features: [
        'Latest tech stacks',
        'Industry expert mentors',
        'Trending skills focus'
      ]
    },
    {
      id: 4,
      title: 'Lifetime Community Support',
      description: 'Join a thriving community of learners and alumni for networking, collaboration, and continuous learning opportunities.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      features: [
        '24/7 Discord access',
        'Networking events',
        'Alumni network'
      ]
    }
  ];


  // Course section
// const coursesData = [
//     {
//       id: 1,
//       name: 'Graphic Designing Mastery',
//       category: 'design',
//       level: 'Beginner to Advanced',
//       duration: '12 Weeks',
//       students: 1240,
//       rating: 4.8,
//       tools: [
//         { name: 'Adobe Photoshop', icon: '🎨' },
//         { name: 'Adobe Illustrator', icon: '✏️' },
//         { name: 'Figma', icon: '🖌️' },
//         { name: 'Canva', icon: '📱' }
//       ],
//       curriculum: [
//         'Typography & Color Theory',
//         'Logo Design & Branding',
//         'UI/UX Fundamentals',
//         'Social Media Graphics',
//         'Portfolio Development'
//       ],
//       description: 'Master the art of visual communication with industry-standard tools. Create stunning designs for print and digital media.',
//       career: ['Graphic Designer', 'UI Designer', 'Brand Identity Designer', 'Social Media Manager'],
//       price: 'NPR 25,000',
//       image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop',
//       color: '#f97316'
//     },
//     {
//       id: 2,
//       name: 'Video Editing Professional',
//       category: 'video',
//       level: 'Intermediate',
//       duration: '8 Weeks',
//       students: 890,
//       rating: 4.9,
//       tools: [
//         { name: 'Premiere Pro', icon: '🎬' },
//         { name: 'After Effects', icon: '✨' },
//         { name: 'DaVinci Resolve', icon: '🎥' },
//         { name: 'Final Cut Pro', icon: '🍎' }
//       ],
//       curriculum: [
//         'Video Editing Fundamentals',
//         'Motion Graphics & VFX',
//         'Color Grading Mastery',
//         'Sound Design',
//         'YouTube Content Creation'
//       ],
//       description: 'Transform raw footage into cinematic masterpieces. Learn professional video editing techniques used by top creators.',
//       career: ['Video Editor', 'Motion Graphics Artist', 'Content Creator', 'Post-Production Specialist'],
//       price: 'NPR 22,000',
//       image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop',
//       color: '#ef4444'
//     },
//     {
//       id: 3,
//       name: 'Web Development',
//       category: 'development',
//       level: 'Beginner to Advanced',
//       duration: '16 Weeks',
//       students: 2150,
//       rating: 4.9,
//       tools: [
//         { name: 'HTML/CSS', icon: '🌐' },
//         { name: 'JavaScript', icon: '⚡' },
//         { name: 'React.js', icon: '⚛️' },
//         { name: 'Node.js', icon: '🚀' },
//         { name: 'MongoDB', icon: '🍃' }
//       ],
//       curriculum: [
//         'Frontend Development (React)',
//         'Backend Development (Node.js)',
//         'Database Management',
//         'API Development',
//         'Full-Stack Projects'
//       ],
//       description: 'Become a full-stack web developer. Build responsive, dynamic websites and web applications from scratch.',
//       career: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Web Application Developer'],
//       price: 'NPR 35,000',
//       image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop',
//       color: '#3b82f6'
//     },
//     {
//       id: 4,
//       name: 'App Development',
//       category: 'development',
//       level: 'Intermediate',
//       duration: '14 Weeks',
//       students: 670,
//       rating: 4.7,
//       tools: [
//         { name: 'React Native', icon: '📱' },
//         { name: 'Flutter', icon: '🦋' },
//         { name: 'Firebase', icon: '🔥' },
//         { name: 'Android Studio', icon: '🤖' }
//       ],
//       curriculum: [
//         'Mobile UI/UX Design',
//         'Cross-Platform Development',
//         'Native Features Integration',
//         'App Store Deployment',
//         'Real-time Apps'
//       ],
//       description: 'Create powerful mobile apps for iOS and Android. Learn to build, test, and deploy applications.',
//       career: ['Mobile App Developer', 'React Native Developer', 'Flutter Developer', 'Mobile UI Designer'],
//       price: 'NPR 32,000',
//       image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop',
//       color: '#8b5cf6'
//     },
//     {
//       id: 5,
//       name: 'Meta Ads & Marketing',
//       category: 'marketing',
//       level: 'Beginner to Advanced',
//       duration: '6 Weeks',
//       students: 540,
//       rating: 4.8,
//       tools: [
//         { name: 'Facebook Ads', icon: '📘' },
//         { name: 'Instagram Ads', icon: '📷' },
//         { name: 'Google Analytics', icon: '📊' },
//         { name: 'Meta Business Suite', icon: '📱' }
//       ],
//       curriculum: [
//         'Facebook/Instagram Advertising',
//         'Audience Targeting',
//         'Ad Creative Strategy',
//         'Budget Optimization',
//         'ROI Analysis'
//       ],
//       description: 'Master digital advertising on Meta platforms. Learn to create, optimize, and scale profitable ad campaigns.',
//       career: ['Digital Marketer', 'Social Media Manager', 'Media Buyer', 'Marketing Specialist'],
//       price: 'NPR 18,000',
//       image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&auto=format&fit=crop',
//       color: '#06b6d4'
//     }
//   ];

//     const filters = [
//     { id: 'all', label: 'All Courses', icon: '📚' },
//     { id: 'design', label: 'Design', icon: '🎨' },
//     { id: 'video', label: 'Video', icon: '🎬' },
//     { id: 'development', label: 'Development', icon: '💻' },
//     { id: 'marketing', label: 'Marketing', icon: '📈' }
//   ];

//   const filteredCourses = activeFilter === 'all' 
//     ? coursesData 
//     : coursesData.filter(course => course.category === activeFilter);

  const [activeFilter, setActiveFilter] = useState('all');
  // const [activeSkill, setActiveSkill] = useState(null);

  const filters = [
    { id: 'all', label: 'All Programs', icon: '🎓' },
    { id: 'development', label: 'Development', icon: '💻' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'business', label: 'Business', icon: '📊' },
    { id: 'data', label: 'Data Science', icon: '📈' },
    { id: 'marketing', label: 'Marketing', icon: '📱' },
    { id: 'cybersecurity', label: 'Security', icon: '🔒' }
  ];



  const courses = [
    {
      id: 1,
      name: 'Full Stack Engineering',
      level: 'Advanced',
      duration: '16 weeks',
      rating: 4.9,
      students: 1240,
      price: 'NPR 3,499',
      description: 'Master modern web development with React, Node.js, and cloud deployment.',
      image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#F97316',
      tools: [
        { name: 'React', icon: '⚛️' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Python', icon: '🐍' },
        { name: 'AWS', icon: '☁️' }
      ],
      curriculum: [
        'Frontend Architecture',
        'Backend API Design',
        'Database Management',
        'Cloud Deployment',
        'Security Best Practices',
        'Performance Optimization'
      ],
      career: [
        'Senior Developer',
        'Tech Lead',
        'Solutions Architect',
        'Engineering Manager'
      ],
      category: 'development',
      badge: 'Most Popular'
    },
    {
      id: 2,
      name: 'UI/UX Design Professional',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.8,
      students: 892,
      price: 'NPR 2,999',
      description: 'Create exceptional user experiences with industry-standard design tools.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#F97316',
      tools: [
        { name: 'Figma', icon: '🎨' },
        { name: 'Adobe XD', icon: '✒️' },
        { name: 'Sketch', icon: '✏️' },
        { name: 'Framer', icon: '🔄' }
      ],
      curriculum: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Usability Testing',
        'Design Systems',
        'Interaction Design'
      ],
      career: [
        'Product Designer',
        'UX Researcher',
        'UI Developer',
        'Design Lead'
      ],
      category: 'design',
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Data Analytics & AI',
      level: 'Advanced',
      duration: '14 weeks',
      rating: 4.9,
      students: 756,
      price: 'NPR 3,799',
      description: 'Harness the power of data with machine learning and AI applications.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#F97316',
      tools: [
        { name: 'Python', icon: '🐍' },
        { name: 'TensorFlow', icon: '🧠' },
        { name: 'SQL', icon: '🗄️' },
        { name: 'Tableau', icon: '📊' }
      ],
      curriculum: [
        'Statistical Analysis',
        'Machine Learning',
        'Neural Networks',
        'Big Data Processing',
        'Data Visualization',
        'Business Intelligence'
      ],
      career: [
        'Data Scientist',
        'ML Engineer',
        'Analytics Manager',
        'AI Specialist'
      ],
      category: 'data',
      badge: 'High Demand'
    }
  ];

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);


    // Course End
  



  return (
    <>
    
    {/* Hero Section */}
 <HeroSection />

    {/* Hero Section End */}

    {/* About Section */}

    <section className="about-preview" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          {/* Left Side - Image */}
          <div className="about-image-wrapper">
            <img 
              src={studentsImage} 
              alt="Students learning at Skill Darbar" 
              className="about-image"
            />
            <div className="image-overlay"></div>
            
            {/* Floating Badge */}
            <div className="image-badge">
              <div className="badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="badge-text">
                5000+ <span>Happy Students</span>
              </div>
            </div>

            {/* Stats Card */}
            <div className="stats-card">
              <div className="stats-number">4.9</div>
              <div className="stats-label">Rating ★</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="about-right">
            <div className="section-badge">✨ About Us</div>
            
            <h2 className="section-title1">
              Who We Are
            </h2>
            
            <div className="title-underline"></div>

            <p className="about-description">
              Skill Darbar is a skill-based e-learning platform focused on practical, 
              career-oriented education. We provide hands-on training in graphic design, 
              development, and digital marketing to empower Nepali youth.
            </p>

            {/* Feature Points */}
            <div className="feature-points">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="feature-text">
                  Practical Learning
                  <span>Hands-on projects & real-world scenarios</span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div className="feature-text">
                  Expert Mentors
                  <span>Learn from industry professionals</span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="feature-text">
                  Certified Courses
                  <span>Get recognized certificates</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{counts.students}+</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{counts.courses}+</div>
                <div className="stat-label">Courses</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{counts.placements}+</div>
                <div className="stat-label">Placements</div>
              </div>
            </div>

            {/* Button */}
            <Link to="/about" className="about-btn">
              Learn More About Us
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* About Section END */}


    {/* Course Section */}
 <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animation */}
        <div className="text-center mb-16 animate-fadeIn">
          <span className="text-[#F97316] font-semibold text-sm uppercase tracking-wider mb-2 block">
            Learn Today, Lead Tomorrow
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 animate-slideUp">
            Choose Your Path
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto animate-slideUp delay-100">
            Industry-aligned curriculum designed to launch your tech career
          </p>
        </div>

      

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-slideUp">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium
                transition-all duration-300 ease-out
                ${activeFilter === filter.id
                  ? 'bg-[#F97316] text-white shadow-[0_4px_12px_-4px_rgba(249,115,22,0.3)] scale-105'
                  : 'bg-white text-[#1E293B] border border-[#E2E8F0] hover:border-[#F97316] hover:scale-105 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]'
                }
              `}
            >
              <span className="text-lg group-hover:rotate-12 transition-transform duration-300">
                {filter.icon}
              </span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className="
                group bg-white rounded-xl border border-[#E2E8F0]
                shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]
                hover:-translate-y-1.5 transition-all duration-300 ease-out
                overflow-hidden animate-slideUp
              "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden bg-[#F8FAFC]">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Level Badge */}
                <div 
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm animate-slideRight"
                  style={{ backgroundColor: course.color }}
                >
                  {course.level}
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-sm text-[#0F172A] shadow-sm border border-[#E2E8F0] animate-slideLeft">
                  {course.badge}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-[#E2E8F0] animate-slideUp">
                  <span className="text-[#F97316] text-sm animate-pulse">★</span>
                  <span className="text-[#0F172A] font-semibold text-sm">{course.rating}</span>
                  <span className="text-[#64748B] text-xs">({course.students})</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 line-clamp-2 group-hover:text-[#F97316] transition-colors duration-300">
                  {course.name}
                </h3>

                {/* Description */}
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Tools/Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tools.slice(0, 3).map((tool, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-full text-xs text-[#1E293B] border border-[#E2E8F0] hover:bg-[#F97316] hover:text-white hover:scale-105 transition-all duration-200"
                    >
                      <span className="text-sm">{tool.icon}</span>
                      <span>{tool.name}</span>
                    </div>
                  ))}
                  {course.tools.length > 3 && (
                    <span className="px-3 py-1.5 rounded-full text-xs bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">
                      +{course.tools.length - 3}
                    </span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0] hover:border-[#F97316] transition-colors duration-300">
                    <span className="text-[#F97316] text-lg animate-bounce">⏱️</span>
                    <div className="flex flex-col">
                      <span className="text-[#64748B] text-[10px] uppercase tracking-wider">Duration</span>
                      <span className="text-[#0F172A] text-sm font-semibold">{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0] hover:border-[#F97316] transition-colors duration-300">
                    <span className="text-[#F97316] text-lg animate-bounce delay-100">📊</span>
                    <div className="flex flex-col">
                      <span className="text-[#64748B] text-[10px] uppercase tracking-wider">Level</span>
                      <span className="text-[#0F172A] text-sm font-semibold">{course.level}</span>
                    </div>
                  </div>
                </div>

                {/* Curriculum Preview */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                    Key Modules
                  </h4>
                  <ul className="space-y-1.5">
                    {course.curriculum.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#64748B] group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <span className="text-[#F97316] text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                    {course.curriculum.length > 2 && (
                      <li className="text-sm text-[#F97316] font-medium hover:underline cursor-pointer">
                        +{course.curriculum.length - 2} more modules
                      </li>
                    )}
                  </ul>
                </div>

                {/* Career Tags */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                    Career Paths
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {course.career.slice(0, 2).map((job, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#F8FAFC] rounded-full text-xs text-[#1E293B] border border-[#E2E8F0] hover:bg-[#F97316] hover:text-white hover:scale-105 transition-all duration-200"
                      >
                        {job}
                      </span>
                    ))}
                    {course.career.length > 2 && (
                      <span className="px-2.5 py-1 bg-[#F97316]/10 rounded-full text-xs text-[#F97316] font-medium border border-[#F97316]/20 hover:bg-[#F97316] hover:text-white transition-all duration-200 cursor-pointer">
                        +{course.career.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer - Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  <div>
                    <span className="text-[#64748B] text-xs uppercase tracking-wider block mb-1">
                      Course Fee
                    </span>
                    <span className="text-2xl font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors duration-300">
                      {course.price}
                    </span>
                  </div>
                  <Link
                    // to={`/course/${course.id}`}
                    to="/courses"
                    className="
                      group/btn flex items-center gap-2
                      bg-[#F97316] text-white font-semibold
                      px-5 py-2.5 rounded-lg
                      transition-all duration-300
                      hover:bg-[#EA580C] hover:shadow-[0_8px_20px_-8px_#F97316]
                      active:scale-95
                    "
                  >
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-slideUp">
          <Link
            to="/courses"
            className="
              inline-flex items-center gap-2
              text-[#0F172A] font-semibold
              px-8 py-3 rounded-lg
              border border-[#E2E8F0]
              hover:border-[#F97316] hover:text-[#F97316]
              transition-all duration-300
              group
              relative overflow-hidden
            "
          >
            <span className="relative z-10">View All Programs</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-[#F97316]/0 group-hover:bg-[#F97316]/5 transition-colors duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-slideRight {
          animation: slideRight 0.6s ease-out forwards;
        }

        .animate-slideLeft {
          animation: slideLeft 0.6s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scrolling for the whole page */
        * {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
            
{/* Course Section End */}


    {/* WHy Choose US */}

       <section className="why-choose-us">
      {/* Floating decorative orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            ✨ Why Choose Us
          </div>
          <h2 className="section-title">
            What Makes <span className="highlight">Skill Darbar</span> Different?
          </h2>
          <p className="section-subtitle">
            We're committed to providing the best learning experience tailored for Nepali students
          </p>
        </div>

        {/* Features Grid */}
        <div className="cards-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="card-number">0{feature.id}</div>
              
              <div className="card-icon-wrapper">
                <div className="card-icon">
                  {feature.icon}
                </div>
              </div>

              <h3 className="card-title">{feature.title}</h3>
              <p className="card-description">{feature.description}</p>

              <ul className="card-features">
                {feature.features.map((item, index) => (
                  <li key={index}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why CHoose US  END*/}

   
{/* StudentPreview */}

<StudentPortalPreview />

{/* Testominal */}
<TestimonialsSection />   

{/* Faq Section */}

<FAQSection />
    
    {/* CTA button ENd */}
    
    </>
  )
}

export default Home