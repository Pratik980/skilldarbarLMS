import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/courses', label: 'Courses', icon: '📚' },
    { path: '/admin/course-content', label: 'Course Content', icon: '🎬' },
    { path: '/admin/enrollments', label: 'Enrollments', icon: '📝' },
    { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { path: '/admin/certificates', label: 'Certificates', icon: '🎓' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
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
        navLinks={adminLinks} 
        user={user} 
        isAdmin 
        isMobileOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
        <Header isAdmin onMenuToggle={toggleMobileMenu} />
        <main className="flex-1 px-6 py-6 bg-slate-50 overflow-y-auto dark:bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;