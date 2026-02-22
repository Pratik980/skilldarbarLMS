import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';
import NotificationBell from './NotificationBell';
import { Sun, Moon } from 'lucide-react';

const Header = ({ isAdmin = false, onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-orange-200 bg-white px-6 py-4 backdrop-blur dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center rounded-lg border border-orange-200 bg-orange-50 p-2 text-brand-orange hover:bg-orange-100 md:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-slate-900">
          Welcome, <span className="text-brand-orange">{user?.fullName}</span>!
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-brand-teal/70 hover:bg-brand-teal/5 hover:text-brand-teal transition-colors dark:text-orange-300 dark:hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <NotificationBell />
        <div className="h-10 w-10 overflow-hidden rounded-full border border-orange-200 bg-orange-50">
          {user?.profileImage ? (
            <img 
              src={getImageUrl(user.profileImage)} 
              alt={user.fullName}
              className="h-full w-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-brand-orange">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;