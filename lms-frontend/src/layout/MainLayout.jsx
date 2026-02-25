import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

/** Inner layout — reads isDark from the portal-scoped ThemeProvider above it */
const MainLayoutInner = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/courses', label: 'Courses', icon: '📚' },
    { path: '/student/my-enrollments', label: 'My Enrollments', icon: '📝' },
    { path: '/student/certificates', label: 'My Achievements', icon: '🏆' },
    { path: '/student/profile', label: 'Profile', icon: '👤' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    // `dark` class is applied HERE — scoped to this div only, not to <html>
    <div className={`flex min-h-screen font-sans${isDark ? ' dark' : ''}`}>
      <div className="flex min-h-screen w-full bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">
        <Sidebar
          navLinks={navLinks}
          user={user}
          isMobileOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
        <div className="flex min-w-0 flex-1 flex-col md:ml-64">
          <Header onMenuToggle={toggleMobileMenu} />
          <main className="flex-1 overflow-y-auto bg-slate-50 px-3 py-4 dark:bg-slate-900 md:px-6 md:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

/** Outer wrapper — provides the portal-scoped theme context */
const MainLayout = () => (
  <ThemeProvider>
    <MainLayoutInner />
  </ThemeProvider>
);

export default MainLayout;