import React, { useEffect, useRef, useState } from 'react';
import roshanImg from "../assets/profile.jpg";

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Roshan Katuwal",
      course: "Full Stack Development",
      feedback: "The learning environment is very professional and practical. I gained real-world skills that helped me feel confident in interviews.",
      image: roshanImg,
  isImage: true
    },
    {
      id: 2,
      name: "Suman Karki",
      course: "Diploma in Computer Engineering",
      feedback: "The instructors are supportive and the student portal makes tracking progress very easy. I highly recommend this institute.",
      image: "SK",
      color: "bg-[#F97316]/20"
    },
    {
      id: 3,
      name: "Priya Gurung",
      course: "UI/UX Design",
      feedback: "Modern labs, structured curriculum, and a secure system. I improved both technically and professionally.",
      image: "PG",
      color: "bg-[#F97316]/20"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0F172A] py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Student 
            <span className="text-[#F97316] ml-3">Success Stories</span>
          </h2>
          <p className="text-[#CBD5E1] text-lg max-w-2xl mx-auto">
            Trusted by hundreds of students who transformed their careers through our premium programs
          </p>
          <div className="flex justify-center gap-2 pt-4">
            <div className="h-1 w-16 bg-[#F97316]"></div>
            <div className="h-1 w-4 bg-[#F97316]/40"></div>
            <div className="h-1 w-4 bg-[#F97316]/20"></div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`
                bg-white/5 rounded-xl p-8 
                shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]
                hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]
                hover:translate-y-[-6px] transition-all duration-500 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Student Photo - Top Center */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className={`
                    w-24 h-24 rounded-full 
                    ${testimonial.color} 
                    flex items-center justify-center
                    border-2 border-[#F97316] border-opacity-30
                    group-hover:border-opacity-100 transition-all duration-500
                    shadow-lg shadow-black/30
                  `}>

                    {testimonial.isImage ? (
  <img
    src={testimonial.image}
    alt={testimonial.name}
    className="w-full h-full object-cover rounded-full"
  />
) : (
  <span className="text-2xl font-bold text-white">
    {testimonial.image}
  </span>
)}
                    {/* <span className="text-2xl font-bold text-white">
                      {testimonial.image}
                    </span> */}
                  </div>
                  {/* Subtle ring effect on hover */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-[#F97316] ring-opacity-0 group-hover:ring-opacity-30 transition-all duration-500 scale-110"></div>
                </div>
              </div>

              {/* Student Name */}
              <h3 className="text-white text-xl font-bold text-center mb-1">
                {testimonial.name}
              </h3>

              {/* Course Name - Orange Accent */}
              <p className="text-[#F97316] text-sm font-medium text-center mb-4">
                {testimonial.course}
              </p>

              {/* Feedback */}
              <div className="relative">
                {/* Decorative quote mark */}
                <span className="absolute -top-2 -left-2 text-[#F97316] text-6xl opacity-20">"</span>
                <p className="text-[#CBD5E1] text-center leading-relaxed relative z-10 px-2">
                  {testimonial.feedback}
                </p>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className="w-4 h-4 text-[#F97316]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
            <span className="text-[#CBD5E1] text-sm">500+ Alumni</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
            <span className="text-[#CBD5E1] text-sm">96% Placement Rate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
            <span className="text-[#CBD5E1] text-sm">Industry Certified</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Card animations */
        .testimonial-card {
          animation: fadeSlideUp 0.8s ease-out forwards;
          opacity: 0;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: background-color, border-color, transform, box-shadow, opacity;
          transition-duration: 0.3s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Photo scale on hover - subtle */
        .group:hover .w-24 {
          transform: scale(1.05);
        }

        /* Custom scrollbar hiding for carousel option if needed */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;