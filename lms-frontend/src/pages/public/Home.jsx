import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/publicStyles/Home.css'
import studentsImage from '../../assets/students-learning.jpg';

function Home() {

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({ students: 0, courses: 0, placements: 0 });

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

  // Course 
    const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'design', name: 'Graphic Design' },
    { id: 'video', name: 'Video Editing' },
    { id: 'dev', name: 'Development' },
    { id: 'marketing', name: 'Marketing' }
  ];

  const courses = [
    // Graphic Designing
    {
      id: 1,
      title: 'Graphic Designing',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop',
      duration: '12 Weeks',
      students: '2.5k+',
      price: '9999',
      tools: ['Photoshop', 'Illustrator', 'InDesign', 'Canva'],
      badge: 'Popular',
      level: 'Beginner to Advanced'
    },
    // Video Editing
    {
      id: 2,
      title: 'Video Editing',
      category: 'video',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop',
      duration: '10 Weeks',
      students: '1.8k+',
      price: '11999',
      tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Capcut'],
      badge: 'Trending',
      level: 'Intermediate'
    },
    // Web Development
    {
      id: 3,
      title: 'Web Development',
      category: 'dev',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop',
      duration: '16 Weeks',
      students: '3.2k+',
      price: '14999',
      tools: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
      badge: 'Best Seller',
      level: 'Full Stack'
    },
    // App Development
    {
      id: 4,
      title: 'App Development',
      category: 'dev',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop',
      duration: '14 Weeks',
      students: '1.5k+',
      price: '15999',
      tools: ['React Native', 'Flutter', 'Firebase', 'API'],
      badge: 'New',
      level: 'Intermediate'
    },
    // Digital Marketing
    {
      id: 5,
      title: 'Digital Marketing',
      category: 'marketing',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&auto=format&fit=crop',
      duration: '8 Weeks',
      students: '2.1k+',
      price: '8999',
      tools: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      badge: 'Hot',
      level: 'Beginner'
    },
    // UI/UX Design
    {
      id: 6,
      title: 'UI/UX Design',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop',
      duration: '10 Weeks',
      students: '1.2k+',
      price: '10999',
      tools: ['Figma', 'Adobe XD', 'Sketch', 'Miro'],
      badge: 'Popular',
      level: 'Beginner'
    },
    // Motion Graphics
    {
      id: 7,
      title: 'Motion Graphics',
      category: 'video',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop',
      duration: '12 Weeks',
      students: '900+',
      price: '12999',
      tools: ['After Effects', 'Cinema 4D', 'Premiere Pro'],
      badge: 'Advanced',
      level: 'Advanced'
    },
    // Meta Ads
    {
      id: 8,
      title: 'Meta Ads & Marketing',
      category: 'marketing',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop',
      duration: '6 Weeks',
      students: '1.1k+',
      price: '7999',
      tools: ['Facebook Ads', 'Instagram Ads', 'Pixel', 'Analytics'],
      badge: 'Hot',
      level: 'Intermediate'
    },
    // Backend Development
    {
      id: 9,
      title: 'Backend Development',
      category: 'dev',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop',
      duration: '14 Weeks',
      students: '1.3k+',
      price: '13999',
      tools: ['Node.js', 'Python', 'Databases', 'APIs'],
      badge: 'Advanced',
      level: 'Intermediate'
    }
  ];

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);


    // Learning Process

      const [activeStep, setActiveStep] = useState(1);
  // const sectionRefs = useRef(null);

  const steps = [
    {
      id: 1,
      title: 'Learn Fundamentals',
      description: 'Master the core concepts and theories with expert-led video tutorials and interactive lessons.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      features: [
        'Expert video tutorials',
        'Interactive quizzes',
        'Study materials & resources',
        'Live doubt sessions'
      ],
      duration: '4-6 weeks',
      outcome: 'Strong foundation'
    },
    {
      id: 2,
      title: 'Practice with Real Projects',
      description: 'Apply your knowledge to real-world projects that simulate actual client work and industry scenarios.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
      features: [
        'Client project simulations',
        'Industry use cases',
        'Code reviews & feedback',
        'Team collaboration'
      ],
      duration: '6-8 weeks',
      outcome: 'Practical experience'
    },
    {
      id: 3,
      title: 'Build Portfolio',
      description: 'Create a stunning portfolio showcasing your best work to attract employers and clients.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <path d="M12 11v6" />
          <path d="M9 14h6" />
        </svg>
      ),
      features: [
        'Portfolio website setup',
        'Project documentation',
        'Case studies creation',
        'Professional presentation'
      ],
      duration: '2-3 weeks',
      outcome: 'Impressive portfolio'
    },
    {
      id: 4,
      title: 'Start Earning',
      description: 'Launch your career through freelancing, remote jobs, or entrepreneurship with our placement support.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1v22M17 5H9.5M17 5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h10z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      features: [
        'Freelance marketplace access',
        'Job placement assistance',
        'Interview preparation',
        'Networking opportunities'
      ],
      duration: 'Ongoing',
      outcome: 'Monthly income'
    }
  ];

  // Auto-highlight steps on scroll
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.step-card');
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveStep(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sucess Stories
    const [activeStory, setActiveStory] = useState(null);

  const stories = [
    {
      id: 1,
      name: 'Rahul Saha',
      location: 'Janakpur',
      district: 'Dhanusha',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      course: 'Graphic Designing',
      testimonial: 'After completing Graphic Designing, I started freelancing and now earn consistently online.',
      achievement: 'Earning रू 45,000/month',
      icon: '🎨',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'Roshan Katuwal',
      location: 'Kathmandu',
      district: 'Kathmandu',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop',
      course: 'Video Editing',
      testimonial: 'Skill Darbar helped me master video editing and work with local clients.',
      achievement: 'Worked with 15+ clients',
      icon: '🎬',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      name: 'Pooja Chaudhary',
      location: 'Itahari',
      district: 'Sunsari',
      image: 'https://images.unsplash.com/photo-1494790108777-383d1a4b6a3f?w=400&auto=format&fit=crop',
      course: 'Web Development',
      testimonial: 'I built my first website after completing Web Development course.',
      achievement: '3 websites launched',
      icon: '💻',
      bgColor: 'linear-gradient(135deg, #5e72e4 0%, #825ee4 100%)'
    },
    {
      id: 4,
      name: 'Ashish Yadav',
      location: 'Birgunj',
      district: 'Parsa',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
      course: 'Meta Ads',
      testimonial: 'Meta Ads training helped me manage ad campaigns for local businesses.',
      achievement: 'Managed रू 10L+ ad spend',
      icon: '📱',
      bgColor: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
    }
  ];

  const stats = [
    { value: '5000+', label: 'Students Trained', desc: 'Across 77 districts' },
    { value: 'रू 2.5Cr+', label: 'Student Earnings', desc: 'Combined freelance income' },
    { value: '1000+', label: 'Success Stories', desc: 'And counting...' }
  ];

  const nepaliDistricts = ['Janakpur', 'Kathmandu', 'Itahari', 'Birgunj', 'Pokhara', 'Biratnagar', 'Butwal', 'Nepalgunj'];

  // Team Section
    const [activeMember, setActiveMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Ashvik Yadav',
      title: 'Founder / Director',
      role: 'Leadership',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop',
      bio: 'Visionary leader with 10+ years in edtech, dedicated to making quality education accessible to every Nepali youth.',
      expertise: ['Strategy', 'EdTech', 'Business Development'],
      experience: '10+ years',
      education: 'MBA, Kathmandu University',
      achievement: 'Placed 1000+ students',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    },
    {
      id: 2,
      name: 'Sushil Kunwar',
      title: 'Lead Graphic Instructor',
      role: 'Creative',
      image: 'https://images.unsplash.com/photo-1531427186629-7fd5fe58b2e9?w=400&auto=format&fit=crop',
      bio: 'Award-winning graphic designer with 8+ years of industry experience. Mentored 500+ students in design.',
      expertise: ['Photoshop', 'Illustrator', 'UI/UX', 'Branding'],
      experience: '8+ years',
      education: 'B.Des, Purvanchal University',
      achievement: '500+ students mentored',
      social: {
        linkedin: '#',
        behance: '#',
        email: '#'
      }
    },
    {
      id: 3,
      name: 'Rahul Shrestha',
      title: 'Lead Development Instructor',
      role: 'Development',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop',
      bio: 'Full-stack developer with 7+ years of experience in MERN stack. Passionate about teaching coding to beginners.',
      expertise: ['MERN Stack', 'Python', 'Cloud', 'DevOps'],
      experience: '7+ years',
      education: 'B.Tech CS, IOE Pulchowk',
      achievement: 'Built 50+ projects',
      social: {
        linkedin: '#',
        github: '#',
        email: '#'
      }
    },
    {
      id: 4,
      name: 'Roshan Katuwal',
      title: 'Lead Software & Web Development',
      role: 'Software',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop',
      bio: 'Software architect with 9+ years in web and mobile development. Expert in building scalable applications.',
      expertise: ['React Native', 'Node.js', 'AWS', 'System Design'],
      experience: '9+ years',
      education: 'M.Sc. CS, Tribhuvan University',
      achievement: '20+ apps launched',
      social: {
        linkedin: '#',
        github: '#',
        email: '#'
      }
    }
  ];

  const teamStats = [
    { value: '25+', label: 'Team Members', desc: 'Across Nepal' },
    { value: '50+', label: 'Years Combined', desc: 'Industry experience' },
    { value: '5000+', label: 'Students Taught', desc: 'And counting' },
    { value: '100%', label: 'Passionate', desc: 'Dedicated mentors' }
  ];


   const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate('/signup');
  };


  return (
    <>
    
    {/* Hero Section */}
     <section className="hero-section">
      {/* Floating particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <div className="container">
        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-left">
            <div className="premium-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
              </svg>
              <span>Premium Learning Experience</span>
            </div>

            <h1 className="hero-title">
              Upgrade Your <span className="gradient-text">Skills</span><br />
              for a Better Future.
            </h1>

            <h2 className="hero-subtitle">
              Nepal's Practical Skill-Based Learning Platform
            </h2>

            <p className="hero-description">
              Skill Darbar offers hands-on training designed to help students gain 
              real-world experience and start earning through freelancing, jobs, 
              and entrepreneurship.
            </p>

            <div className="hero-buttons">
              <Link to="/courses" className="btn-primary">
                Explore Courses
                <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 3L10 8L5 13" />
                </svg>
              </Link>
              <Link to="/signup" className="btn-secondary">
                Start Learning
                <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 8H14M14 8L10 4M14 8L10 12" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - 3D Cards */}
          <div className="hero-right">
            <div className="cards-container">
              {/* Graphic Designing Card */}
              <div className="card-3d card-1">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                    <path d="M21 15L16 10L5 21" />
                  </svg>
                </div>
                <h3 className="card-title">Graphic Designing</h3>
                <p className="card-subtitle">12 Weeks • Beginner to Advanced</p>
                <ul className="card-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Photoshop & Illustrator
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    UI/UX Fundamentals
                  </li>
                </ul>
              </div>

              {/* Video Editing Card */}
              <div className="card-3d card-2">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M9 8L15 12L9 16V8z" />
                  </svg>
                </div>
                <h3 className="card-title">Video Editing</h3>
                <p className="card-subtitle">8 Weeks • Project Based</p>
                <ul className="card-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Premiere Pro & After Effects
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Color Grading
                  </li>
                </ul>
              </div>

              {/* Web Development Card */}
              <div className="card-3d card-3">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7L12 12L22 7L12 2z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                  </svg>
                </div>
                <h3 className="card-title">Web Development</h3>
                <p className="card-subtitle">16 Weeks • Full Stack</p>
                <ul className="card-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    MERN Stack
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Real-world Projects
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
            
            <h2 className="section-title">
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

        {/* CTA Banner */}
        <div className="cta-banner">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Start Your Journey?</h3>
            <p className="cta-text">
              Join thousands of students who have transformed their careers with Skill Darbar
            </p>
          </div>
          <Link to="/courses" className="cta-btn">
            Explore All Features
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3L10 8L5 13" />
            </svg>
          </Link>
        </div>
      </div>
    </section>

    {/* Why CHoose US  END*/}

    {/* Cousre Section */}
      <section className="popular-courses">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            📚 Popular Courses
          </div>
          <h2 className="section-title">
            Choose Your <span className="highlight">Learning Path</span>
          </h2>
          <p className="section-subtitle">
            Industry-relevant courses designed to boost your career with practical skills
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="card-image-wrapper">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="course-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
                <div className="course-badge">{course.badge}</div>
              </div>

              <div className="card-content">
                <h3 className="course-title">{course.title}</h3>
                
                <div className="course-meta">
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {course.duration}
                  </div>
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    </svg>
                    {course.students}
                  </div>
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    {course.level}
                  </div>
                </div>

                <p className="course-description" style={{display: 'none'}}>
                  Master {course.title} with our comprehensive course
                </p>

                <div className="tools-list">
                  {course.tools.map((tool, index) => (
                    <span key={index} className="tool-tag">{tool}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="course-price">
                    रू {course.price} <span>/ course</span>
                  </div>
                  <Link to="/courses" className="enroll-link">
                    Enroll Now
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 3L10 8L5 13" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Link to="/courses" className="view-all-btn">
          View All Courses
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 3L10 8L5 13" />
          </svg>
        </Link>
      </div>
    </section>

    {/* Course SECTION END */}

    {/* Leraning Process Section */}
      <section className="learning-process" ref={sectionRef}>
      {/* Floating decorative shapes */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Learning Journey
          </div>
          <h2 className="section-title">
            Your Path to <span className="highlight">Success</span>
          </h2>
          <p className="section-subtitle">
            A structured 4-step process designed to take you from beginner to earning professional
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-steps">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`step-card ${activeStep === step.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(step.id)}
            >
              <div className="step-number">{step.id}</div>
              
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  {step.icon}
                </div>
              </div>

              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>

              <ul className="step-features">
                {step.features.map((feature, index) => (
                  <li key={index}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div style={{ 
                marginTop: '20px', 
                padding: '10px', 
                background: 'rgba(249, 115, 22, 0.1)', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#f97316'
              }}>
                ⏱️ {step.duration} • 🎯 {step.outcome}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Stats */}
        <div className="progress-stats">
          <div className="stat-item">
            <div className="stat-value">1000+</div>
            <div className="stat-label">Hours of Content</div>
            <div className="stat-desc">Expert-crafted curriculum</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">50+</div>
            <div className="stat-label">Real Projects</div>
            <div className="stat-desc">Industry simulations</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">500+</div>
            <div className="stat-label">Portfolio Pieces</div>
            <div className="stat-desc">Created by students</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">रू 2.5Cr+</div>
            <div className="stat-label">Student Earnings</div>
            <div className="stat-desc">Combined income</div>
          </div>
        </div>

        {/* Process Visualization */}
        <div style={{ 
          marginTop: '40px', 
          display: 'flex', 
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              onClick={() => setActiveStep(step)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: activeStep === step ? '#f97316' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeStep === step ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Sucess Stories */}
    <section className="success-stories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            🇳🇵 Made in Nepal
          </div>
          <h2 className="section-title">
            Student <span className="highlight">Success Stories</span>
          </h2>
          <p className="section-subtitle">
            Real stories from real students across Nepal who transformed their careers with Skill Darbar
          </p>
        </div>

        {/* Nepal Districts Map Visualization */}
        <div className="nepal-decoration">
          {nepaliDistricts.map((district, index) => (
            <span key={index} title={district}></span>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="stories-grid">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="story-card"
              onMouseEnter={() => setActiveStory(story.id)}
              onMouseLeave={() => setActiveStory(null)}
            >
              <div className="location-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {story.location}, {story.district}
              </div>

              <div className="card-header">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="student-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
                <div className="quote-icon">“</div>
              </div>

              <div className="card-content">
                <div className="student-info">
                  <div 
                    className="student-avatar"
                    style={{ background: story.bgColor }}
                  >
                    {story.icon}
                  </div>
                  <div className="student-details">
                    <h3 className="student-name">{story.name}</h3>
                    <div className="student-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      </svg>
                      {story.location}
                    </div>
                  </div>
                </div>

                <div className="testimonial">
                  <p className="testimonial-text">"{story.testimonial}"</p>
                </div>

                <div className="course-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  {story.course}
                </div>

                <div className="achievement-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8 21 12 17 16 21" />
                  </svg>
                  {story.achievement}
                </div>

                {/* Hover Stats */}
                {activeStory === story.id && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: '#f8fafc',
                    borderRadius: '10px',
                    fontSize: '13px',
                    color: '#64748b',
                    animation: 'fadeInUp 0.3s ease'
                  }}>
                    📍 From {story.district} • ⭐ 4.9 rating
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="stories-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Link to="/about" className="view-all-btn">
          Read More Success Stories
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 3L10 8L5 13" />
          </svg>
        </Link>

        {/* Nepali Flag Colors Line */}
        <div style={{ 
          marginTop: '40px', 
          height: '4px', 
          background: 'linear-gradient(90deg, #f97316 0%, #003893 50%, #f97316 100%)',
          borderRadius: '2px',
          opacity: '0.3'
        }}></div>
      </div>
    </section>

    {/* Sucess Stories ENd */}

    {/* TEam Section */}

     <section className="team-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Our Experts
          </div>
          <h2 className="section-title">
            Meet the <span className="highlight">Mentors</span>
          </h2>
          <p className="section-subtitle">
            Learn from industry professionals dedicated to your success
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className={`team-card ${activeMember === member.id ? 'featured' : ''}`}
              onMouseEnter={() => setActiveMember(member.id)}
              onMouseLeave={() => setActiveMember(null)}
            >
              <div className="card-image-wrapper">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
                
                {/* Role Badge */}
                <div className="role-badge">{member.role}</div>

                {/* Social Links */}
                <div className="social-links">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="social-link" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                  )}
                  {member.social.behance && (
                    <a href={member.social.behance} className="social-link" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-2.35-5.564-5.5 0-3.123 2.393-5.5 5.6-5.5 2.923 0 4.819 1.978 5.14 3.255l-2.012.598c-.248-.798-1.043-1.853-3.128-1.853-2.058 0-3.55 1.809-3.55 3.5 0 1.82 1.509 3.5 3.6 3.5 1.756 0 2.688-.95 2.944-1.5h-2.944v-1.5h5.026c.026.29.026.56.026.79 0 2.12-1.206 4.21-4.052 4.21-3.116 0-5.6-2.24-5.6-5.5 0-3.21 2.414-5.5 5.6-5.5 2.69 0 4.52 1.51 5.052 3.5h-2.026zM11 13h-5v3h5.5c-.139.984-.879 3-3.5 3-2.1 0-3.5-1.7-3.5-3.5s1.4-3.5 3.5-3.5c1.681 0 2.559.966 2.859 2h2.141c-.3-2.161-1.9-4-5-4-3.2 0-5.5 2.5-5.5 5.5s2.3 5.5 5.5 5.5c3.9 0 5-2.9 5-5.5v-.5h-5z" />
                      </svg>
                    </a>
                  )}
                  {member.social.email && (
                    <a href={`mailto:${member.social.email}`} className="social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="card-content">
                <h3 className="member-name">{member.name}</h3>
                <div className="member-title">{member.title}</div>
                <p className="member-bio">{member.bio}</p>

                {/* Expertise Tags */}
                <div className="expertise-tags">
                  {member.expertise.map((skill, index) => (
                    <span key={index} className="expertise-tag">{skill}</span>
                  ))}
                </div>

                {/* Experience Badge */}
                <div className="experience-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8 21 12 17 16 21" />
                  </svg>
                  {member.experience} • {member.achievement}
                </div>

                {/* Hover Education Info */}
                {activeMember === member.id && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                    animation: 'fadeInUp 0.3s ease'
                  }}>
                    🎓 {member.education}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="team-stats">
          {teamStats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TEam Section End  */}

    {/* CTA BUtton */}
       <section className="final-cta">
      {/* Floating Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      <div className="container">
        <div className="cta-content">
          {/* Decorative Elements */}
          <div className="cta-decoration"></div>
          <div className="cta-decoration-dots"></div>

          {/* Badge */}
          <div className="cta-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
            </svg>
            <span>Limited Time Opportunity</span>
          </div>

          {/* Limited Offer Tag */}
          <div className="limited-offer">
            Offer Ends Soon
          </div>

          {/* Main Title */}
          <h1 className="cta-title">
            Ready to Build Your <span className="highlight">Career</span>
            <br />with Skills?
          </h1>

          {/* Subtitle */}
          <p className="cta-subtitle">
            Join thousands of successful students who transformed their lives through practical learning. 
            Your journey to a better future starts here.
          </p>

          {/* Stats Preview */}
          <div className="cta-stats">
            <div className="stat-item">
              <div className="stat-value">5000+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">50+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="cta-button-wrapper">
            <button className="cta-button" onClick={handleEnrollClick}>
              Enroll Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div className="button-ripple"></div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Money-back Guarantee
            </div>
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secure Payment
            </div>
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Lifetime Access
            </div>
          </div>

          {/* Optional: Countdown Timer */}
          <div style={{ 
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px'
          }}>
            <div>⏰ Offer ends in: {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s</div>
          </div>
        </div>
      </div>
    </section>
    
    {/* CTA button ENd */}
    
    </>
  )
}

export default Home