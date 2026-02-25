import React, { useState, useEffect } from 'react';

const StudentPortalPreview = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on load
    const timer = setTimeout(() => {
      setProgress(75);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for result tracking
  const results = [
    { subject: 'Mathematics', grade: 'A', badge: 'A' },
    { subject: 'Physics', grade: 'B+', badge: 'B+' },
    { subject: 'Computer Science', grade: 'A-', badge: 'A-' }
  ];

  // Sample notifications
  const notifications = [
    { id: 1, message: 'Assignment due tomorrow', time: '2h ago' },
    { id: 2, message: 'Grade posted: Mathematics', time: '5h ago' },
    { id: 3, message: 'New course material available', time: '1d ago' }
  ];

  return (
    <section className="bg-[#0F172A] min-h-screen py-16 px-4 md:px-8 lg:px-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout: flex row, Mobile: flex col */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          
          {/* Left side - Section heading */}
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Powerful Student
              <span className="text-[#F97316] block mt-2">Dashboard</span>
            </h2>
            <p className="text-[#CBD5E1] text-lg leading-relaxed">
              Experience enterprise-grade academic management with real-time analytics, 
              secure document handling, and intelligent progress tracking.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="h-1 w-16 bg-[#F97316]"></div>
              <span className="text-[#CBD5E1] text-sm uppercase tracking-wider">Enterprise Ready</span>
            </div>
          </div>

          {/* Right side - Dashboard Preview Card */}
          <div className="lg:w-2/3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl shadow-black/30 p-6 md:p-8 hover:translate-y-[-2px] transition-all duration-300">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                  <span className="text-white text-sm">Dashboard Preview</span>
                </div>
                <span className="text-[#CBD5E1] text-sm">v2.4.0</span>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Course Progress Section */}
                <div className="space-y-4 bg-white/5 rounded-lg p-5 card-hover">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span className="text-[#F97316]">📊</span> Course Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#CBD5E1]">Web Development</span>
                      <span className="text-white font-medium">{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#F97316] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-[#CBD5E1]">Next milestone: Advanced React</div>
                  </div>
                </div>

                {/* Assignment Upload */}
                <div className="space-y-4 bg-white/5 rounded-lg p-5 card-hover">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span className="text-[#F97316]">📁</span> Quick Upload
                  </h3>
                  <button className="w-full group flex items-center justify-center gap-3 bg-[#F97316] bg-opacity-10 hover:bg-opacity-20 border-2 border-dashed border-[#F97316] border-opacity-30 hover:border-opacity-100 rounded-lg py-4 px-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F97316]/20">
                    <svg className="w-5 h-5 text-[#F97316] group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-white font-medium">Upload Assignment</span>
                  </button>
                  <p className="text-xs text-[#CBD5E1] text-center">PDF, DOC up to 25MB</p>
                </div>

                {/* Result Tracking */}
                <div className="space-y-4 bg-white/5 rounded-lg p-5 card-hover">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span className="text-[#F97316]">📈</span> Recent Results
                  </h3>
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between group hover:translate-x-1 transition-transform">
                        <span className="text-[#CBD5E1] text-sm">{result.subject}</span>
                        <span className="px-2 py-1 bg-[#F97316]/10 text-[#F97316] text-xs font-bold rounded border border-[#F97316]/20">
                          {result.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 text-xs text-[#CBD5E1] border-t border-white/10">
                    GPA: 3.7 / 4.0
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4 bg-white/5 rounded-lg p-5 card-hover">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span className="text-[#F97316]">🔔</span> Notifications
                  </h3>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-all group cursor-default border-l-2 border-transparent hover:border-[#F97316]"
                      >
                        <span className="text-[#F97316] text-lg group-hover:rotate-12 transition-transform">•</span>
                        <div className="flex-1">
                          <p className="text-white text-sm">{notification.message}</p>
                          <span className="text-[#CBD5E1] text-xs">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-xs text-[#CBD5E1]">
                <span>🔒 Secured by enterprise encryption</span>
                <span>Last sync: 2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and hover effects */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.5);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: background-color, border-color, transform, box-shadow, opacity;
          transition-duration: 0.2s;
          transition-timing-function: ease;
        }
      `}</style>
    </section>
  );
};

export default StudentPortalPreview;