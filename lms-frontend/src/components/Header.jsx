import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';
import NotificationBell from './NotificationBell';
import SafeImage from './SafeImage';
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
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-orange-200 bg-blue-900 px-3 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-800 md:px-6 md:py-4">
      <div className="flex items-center gap-2 md:gap-3">
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
        <h1 className="text-sm font-semibold text-white md:text-lg">
          <span className="hidden sm:inline">Welcome, </span><span className="text-brand-orange">{user?.fullName?.split(' ')[0]}</span><span className="hidden md:inline">{user?.fullName?.split(' ').slice(1).join(' ') ? ' ' + user?.fullName?.split(' ').slice(1).join(' ') : ''}</span>!
        </h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-white transition-colors hover:bg-brand-teal/5 hover:text-white dark:text-orange-300 dark:hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} className="sm:size-5" /> : <Moon size={16} className="sm:size-5" />}
        </button>
        <NotificationBell />
        <div className="h-8 w-8 overflow-hidden rounded-full border border-orange-200 bg-orange-50 md:h-10 md:w-10">
          <SafeImage
            src={user?.profileImage ? getImageUrl(user.profileImage) : null}
            alt={user?.fullName}
            className="h-full w-full object-cover"
            fallbackIcon={
              <span className="text-sm font-semibold text-brand-orange">
                {user?.fullName?.charAt(0).toUpperCase()}
              </span>
            }
          />
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-brand-orange px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-orangeDark md:px-4 md:py-2 md:text-sm"
        >
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </div>
    </header>
  );
};

export default Header;