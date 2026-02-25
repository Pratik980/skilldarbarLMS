import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CoursesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSkill, setActiveSkill] = useState(null);

  const filters = [
    { id: 'all', label: 'All Programs', icon: '🎓' },
    { id: 'development', label: 'Development', icon: '💻' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'business', label: 'Business', icon: '📊' },
    { id: 'data', label: 'Data Science', icon: '📈' },
    { id: 'marketing', label: 'Marketing', icon: '📱' },
    { id: 'cybersecurity', label: 'Security', icon: '🔒' }
  ];

  const skills = [
    { id: 1, name: 'React & Next.js', icon: '⚛️', level: 'Advanced', color: '#61DAFB', description: 'Build modern web applications' },
    { id: 2, name: 'UI/UX Design', icon: '🎨', level: 'Intermediate', color: '#F24E1E', description: 'Create beautiful interfaces' },
    { id: 3, name: 'Python Development', icon: '🐍', level: 'Advanced', color: '#3776AB', description: 'Master backend development' },
    { id: 4, name: 'Data Analysis', icon: '📊', level: 'Intermediate', color: '#FF6B6B', description: 'Extract insights from data' },
    { id: 5, name: 'Digital Marketing', icon: '📱', level: 'Beginner', color: '#4ECDC4', description: 'Grow online presence' },
    { id: 6, name: 'Cloud Computing', icon: '☁️', level: 'Advanced', color: '#FFA07A', description: 'Deploy scalable solutions' },
    { id: 7, name: 'Mobile Development', icon: '📱', level: 'Intermediate', color: '#98D8C8', description: 'Build mobile apps' },
    { id: 8, name: 'Machine Learning', icon: '🤖', level: 'Advanced', color: '#FF9F1C', description: 'Create AI solutions' },
    { id: 9, name: 'Cybersecurity', icon: '🔒', level: 'Intermediate', color: '#2EC4B6', description: 'Protect digital assets' },
    { id: 10, name: 'DevOps', icon: '⚙️', level: 'Advanced', color: '#E71D36', description: 'Streamline deployments' },
    { id: 11, name: 'Blockchain', icon: '⛓️', level: 'Intermediate', color: '#011627', description: 'Build Web3 applications' },
    { id: 12, name: 'Database Management', icon: '🗄️', level: 'Intermediate', color: '#FFB347', description: 'Master data storage' }
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
    },
    {
      id: 4,
      name: 'Digital Marketing Mastery',
      level: 'Beginner',
      duration: '10 weeks',
      rating: 4.7,
      students: 1560,
      price: 'NPR 2,499',
      description: 'Master SEO, social media, content marketing, and analytics.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#4ECDC4',
      tools: [
        { name: 'Google Analytics', icon: '📊' },
        { name: 'SEMrush', icon: '🔍' },
        { name: 'HubSpot', icon: '🎯' },
        { name: 'Mailchimp', icon: '📧' }
      ],
      curriculum: [
        'SEO Strategy',
        'Social Media Marketing',
        'Content Creation',
        'Email Marketing',
        'PPC Advertising',
        'Marketing Analytics'
      ],
      career: [
        'Digital Marketing Manager',
        'SEO Specialist',
        'Social Media Manager',
        'Content Strategist'
      ],
      category: 'marketing',
      badge: 'New'
    },
    {
      id: 5,
      name: 'Cybersecurity Professional',
      level: 'Advanced',
      duration: '18 weeks',
      rating: 4.9,
      students: 623,
      price: 'NPR 4,299',
      description: 'Master network security, ethical hacking, and security operations.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#2EC4B6',
      tools: [
        { name: 'Kali Linux', icon: '🐧' },
        { name: 'Wireshark', icon: '🔍' },
        { name: 'Metasploit', icon: '🛡️' },
        { name: 'Burp Suite', icon: '🔐' }
      ],
      curriculum: [
        'Network Security',
        'Ethical Hacking',
        'Incident Response',
        'Security Auditing',
        'Cryptography',
        'Cloud Security'
      ],
      career: [
        'Security Analyst',
        'Penetration Tester',
        'Security Engineer',
        'CISO'
      ],
      category: 'cybersecurity',
      badge: 'Premium'
    },
    {
      id: 6,
      name: 'Mobile App Development',
      level: 'Intermediate',
      duration: '14 weeks',
      rating: 4.8,
      students: 987,
      price: 'NPR 3,299',
      description: 'Build iOS and Android apps with React Native and Flutter.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#98D8C8',
      tools: [
        { name: 'React Native', icon: '⚛️' },
        { name: 'Flutter', icon: '🦋' },
        { name: 'Swift', icon: '🐦' },
        { name: 'Kotlin', icon: '📱' }
      ],
      curriculum: [
        'Cross-Platform Development',
        'Native Features',
        'State Management',
        'App Store Deployment',
        'Performance Optimization',
        'Mobile UI/UX'
      ],
      career: [
        'Mobile Developer',
        'React Native Dev',
        'Flutter Developer',
        'App Architect'
      ],
      category: 'development',
      badge: 'Trending'
    },
    {
      id: 7,
      name: 'Cloud Architecture',
      level: 'Advanced',
      duration: '12 weeks',
      rating: 4.8,
      students: 534,
      price: 'NPR 3,899',
      description: 'Design and deploy scalable cloud solutions on AWS and Azure.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#FFA07A',
      tools: [
        { name: 'AWS', icon: '☁️' },
        { name: 'Azure', icon: '🔵' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '⚓' }
      ],
      curriculum: [
        'Cloud Infrastructure',
        'Microservices',
        'Containerization',
        'Serverless Computing',
        'DevOps Practices',
        'Cloud Security'
      ],
      career: [
        'Cloud Architect',
        'DevOps Engineer',
        'Site Reliability Engineer',
        'Cloud Consultant'
      ],
      category: 'development',
      badge: 'Advanced'
    },
    {
      id: 8,
      name: 'Blockchain Development',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.7,
      students: 345,
      price: 'NPR 3,599',
      description: 'Build decentralized applications and smart contracts.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#011627',
      tools: [
        { name: 'Ethereum', icon: '⧫' },
        { name: 'Solidity', icon: '📝' },
        { name: 'Web3.js', icon: '🌐' },
        { name: 'Truffle', icon: '🍫' }
      ],
      curriculum: [
        'Blockchain Fundamentals',
        'Smart Contracts',
        'DApp Development',
        'DeFi Protocols',
        'NFT Development',
        'Security Auditing'
      ],
      career: [
        'Blockchain Developer',
        'Smart Contract Engineer',
        'DeFi Specialist',
        'Web3 Developer'
      ],
      category: 'development',
      badge: 'Emerging'
    },
    {
      id: 9,
      name: 'Product Management',
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.8,
      students: 892,
      price: 'NPR 2,999',
      description: 'Lead product strategy from ideation to launch.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#FF6B6B',
      tools: [
        { name: 'Jira', icon: '📋' },
        { name: 'Figma', icon: '🎨' },
        { name: 'Amplitude', icon: '📈' },
        { name: 'Notion', icon: '📝' }
      ],
      curriculum: [
        'Product Strategy',
        'User Research',
        'Agile Methodologies',
        'Product Analytics',
        'Roadmap Planning',
        'Go-to-Market Strategy'
      ],
      career: [
        'Product Manager',
        'Product Owner',
        'Product Analyst',
        'Growth Product Manager'
      ],
      category: 'business',
      badge: 'Best Seller'
    }
    // },
    // {
    //   id: 10,
    //   name: 'DevOps Engineering',
    //   level: 'Advanced',
    //   duration: '14 weeks',
    //   rating: 4.9,
    //   students: 678,
    //   price: '$3,999',
    //   description: 'Master CI/CD pipelines, infrastructure as code, and monitoring.',
    //   image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    //   color: '#E71D36',
    //   tools: [
    //     { name: 'Jenkins', icon: '🔧' },
    //     { name: 'Terraform', icon: '🏗️' },
    //     { name: 'Ansible', icon: '🔄' },
    //     { name: 'Prometheus', icon: '📊' }
    //   ],
    //   curriculum: [
    //     'CI/CD Pipelines',
    //     'Infrastructure as Code',
    //     'Container Orchestration',
    //     'Monitoring & Logging',
    //     'Cloud Native Architecture',
    //     'Site Reliability Engineering'
    //   ],
    //   career: [
    //     'DevOps Engineer',
    //     'Platform Engineer',
    //     'SRE',
    //     'Cloud Engineer'
    //   ],
    //   category: 'development',
    //   badge: 'High Demand'
    // }
  ];

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  return (
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

        {/* Skills Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#0F172A] text-center mb-8">
            Master In-Demand Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="group relative bg-white rounded-xl p-4 border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onMouseEnter={() => setActiveSkill(skill.id)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-1">
                    {skill.name}
                  </h4>
                  <span 
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ 
                      backgroundColor: `${skill.color}20`,
                      color: skill.color 
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
                
                {/* Tooltip on Hover */}
                {activeSkill === skill.id && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#0F172A] text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap z-10 animate-fadeIn">
                    {skill.description}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0F172A] rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
                    to={`/login`}
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
            to="/login"
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
  );
};

export default CoursesSection;