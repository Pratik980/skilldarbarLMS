import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I enroll?",
      answer: "Students can apply online through the admission form. Our team will review the application and contact you for further steps. The entire process takes approximately 3-5 business days."
    },
    {
      id: 2,
      question: "Is certificate provided?",
      answer: "Yes, students receive an industry-recognized certificate after successfully completing the course requirements. Our certificates are verified and accepted by major employers in the industry."
    },
    {
      id: 3,
      question: "Is online class available?",
      answer: "We provide both physical and online learning options with full access to the student portal. Online students get live sessions, recorded lectures, and 24/7 access to learning materials."
    },
    {
      id: 4,
      question: "What are the payment options?",
      answer: "Students can pay via bank transfer, digital wallets, or installment plans. We offer flexible payment schedules with 0% interest EMI options for qualified students."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0F172A] py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Frequently Asked 
            <span className="text-[#F97316] block mt-2">Questions</span>
          </h2>
          <p className="text-[#CBD5E1] text-lg max-w-2xl mx-auto">
            Everything you need to know before enrolling. Clear answers to common questions about our programs.
          </p>
          <div className="flex justify-center gap-2 pt-4">
            <div className="h-1 w-16 bg-[#F97316]"></div>
            <div className="h-1 w-4 bg-[#F97316]/40"></div>
            <div className="h-1 w-4 bg-[#F97316]/20"></div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`
                bg-white/5 rounded-xl overflow-hidden
                border border-white/10
                hover:bg-white/[0.07] transition-all duration-300
                shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)]
                ${openIndex === index ? 'border-l-4 border-l-[#F97316]' : ''}
              `}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between group text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-semibold text-lg pr-8">
                  {faq.question}
                </span>
                <div className={`
                  w-8 h-8 rounded-full bg-[#F97316]/10 
                  flex items-center justify-center flex-shrink-0
                  group-hover:bg-[#F97316]/20 transition-all duration-300
                  ${openIndex === index ? 'rotate-180' : ''}
                `}>
                  <svg 
                    className="w-5 h-5 text-[#F97316] transition-transform duration-500 ease-in-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Answer Panel with Smooth Animation */}
              <div 
                className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="px-6 md:px-8 pb-6">
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[#CBD5E1] leading-relaxed">
                      {faq.answer}
                    </p>
                    
                    {/* Additional trust indicator */}
                    <div className="flex items-center gap-2 mt-3">
                      <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-[#CBD5E1]">Verified information</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Powerful and Confident */}
        <div className="bg-white/5 rounded-xl p-8 md:p-12 text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] border border-white/10">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-[#CBD5E1] text-lg mb-8 max-w-2xl mx-auto">
            Apply today and secure your future with professional education. Join hundreds of successful graduates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <Link to="/login">
            <button className="
              group relative
              bg-[#F97316] text-white font-semibold 
              px-8 py-4 rounded-xl
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-[0_0_25px_-5px_#F97316]
              active:scale-[0.98]
              min-w-[200px]
              shadow-lg shadow-black/30
            ">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Apply Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            </Link>
            
           <Link to="/contact">
             <button className="
              bg-transparent text-white font-semibold
              px-8 py-4 rounded-xl
              border border-white/20
              hover:bg-white/5 hover:border-white/30
              transition-all duration-300
              min-w-[200px]
            ">
              Talk to Advisor
            </button>
            </Link> 
          </div>

          {/* Trust badges */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-[#CBD5E1]">
              <svg className="w-4 h-4 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2 text-[#CBD5E1]">
              <svg className="w-4 h-4 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure application</span>
            </div>
            <div className="flex items-center gap-2 text-[#CBD5E1]">
              <svg className="w-4 h-4 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span>500+ alumni</span>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-[#CBD5E1] mt-8 opacity-60">
          *Terms and conditions apply. All information is verified and regularly updated.
        </p>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        /* Smooth height transitions */
        .transition-max-height {
          transition-property: max-height, opacity;
          transition-duration: 500ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Rotate animation for arrow */
        .rotate-180 {
          transform: rotate(180deg);
        }

        /* Entrance animation for cards */
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .faq-item {
          animation: fadeSlideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Stagger children animations */
        .faq-item:nth-child(1) { animation-delay: 0.1s; }
        .faq-item:nth-child(2) { animation-delay: 0.2s; }
        .faq-item:nth-child(3) { animation-delay: 0.3s; }
        .faq-item:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
};

export default FAQSection;