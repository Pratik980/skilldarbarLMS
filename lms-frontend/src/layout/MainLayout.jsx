import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/courses', label: 'Courses', icon: '📚' },
    { path: '/student/my-enrollments', label: 'My Enrollments', icon: '📝' },
    { path: '/student/certificates', label: 'My Achievements', icon: '🏆' },
    { path: '/student/profile', label: 'Profile', icon: '👤' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans dark:bg-slate-900 dark:text-slate-200">
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
  );
};

export default MainLayout;