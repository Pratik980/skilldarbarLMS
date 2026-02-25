import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/publicStyles/Navbar.css'
import logo from '../assets/skill-darbar-logo.png' // Uncomment when you have logo
import Footer from './Footer'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset'
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      {/* Top Header Bar */}
      <div className="top-header">
        <div className="container">
          <div className="top-header-content">
            <div className="top-header-left">
              <div className="contact-info">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>ashveekyadav@gmail.com</span>
              </div>
              <div className="contact-info">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+977-9704050656</span>
              </div>
              <div className="contact-info location">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Janakpur, Nepal</span>
              </div>
            </div>
            <div className="top-header-right">
              <div className="social-links">
                <a href="https://facebook.com/skilldarbar" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://instagram.com/skilldarbar" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://tiktok.com/@skilldarbar" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
              <Link to="/login" className="enroll-btn">Enroll Now</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`main-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="logo" onClick={closeMenu}>
              <img src={logo} alt="Skill Darbar" className="logo-img" />
              {/* <span className="logo-img-placeholder"></span> */}
              <i><h2 className="logo-text">Skill <span className='span'>Darbar</span></h2></i>
            </Link>

            {/* Desktop Menu */}
            <div className="desktop-menu">
              <NavLink to="/" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>About</NavLink>
              <NavLink to="/courses" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>Courses</NavLink>
              {/* <NavLink to="/careers" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>Careers</NavLink>
              <NavLink to="/pricing" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>Pricing</NavLink> */}
              <NavLink to="/blog" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>Blog</NavLink>
              <NavLink to="/faqs" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>Faqs</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>Contact</NavLink>
            </div>

            <div className="nav-actions">
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
              
              {/* Hamburger Menu */}
              <button 
                className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="mobile-logo" onClick={closeMenu}>
              {/* <img src={logo} alt="Skill Darbar" className="mobile-logo-img" /> */}
              {/* <span className="mobile-logo-img-placeholder"></span> */}
              <span className="mobile-logo-text">Skill Darbar</span>
            </Link>
            <button className="close-btn" onClick={closeMenu}>×</button>
          </div>
          <div className="mobile-menu-body">
            <NavLink to="/" className="mobile-menu-item" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" className="mobile-menu-item" onClick={closeMenu}>About Us</NavLink>
            <NavLink to="/courses" className="mobile-menu-item" onClick={closeMenu}>Courses</NavLink>
      
            {/* <NavLink to="/pricing" className="mobile-menu-item" onClick={closeMenu}>Pricing</NavLink> */}
            <NavLink to="/blog" className="mobile-menu-item" onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/faqs" className="mobile-menu-item" onClick={closeMenu}>Faqs</NavLink>
       
            {/* <NavLink to="/careers" className="mobile-menu-item" onClick={closeMenu}>Careers</NavLink> */}
            <NavLink to="/contact" className="mobile-menu-item" onClick={closeMenu}>Contact Us</NavLink>
            
            <div className="mobile-menu-footer">
              <Link to="/login" className="mobile-login" onClick={closeMenu}>Login</Link>
              <Link to="/signup" className="mobile-signup" onClick={closeMenu}>Sign Up</Link>
              <Link to="/login" className="mobile-enroll" onClick={closeMenu}>Enroll Now</Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />

      <Footer />
    </>
  )
}

export default Navbar