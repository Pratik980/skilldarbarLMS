import { NavLink } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';
import SafeImage from './SafeImage';

const Sidebar = ({ navLinks, user, isAdmin = false, isMobileOpen = false, onClose }) => {
  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose}></div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-orange-200 bg-white overflow-hidden transition-transform duration-200 dark:border-slate-700 dark:bg-slate-800 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-orange-200 dark:border-slate-700 px-5 py-4 flex-shrink-0">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-orange">
            {isAdmin ? 'Admin Panel' : 'LMS Student'}
          </h2>
          <button
            className="md:hidden text-slate-600 hover:text-slate-900"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => {
                const base = 'group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors';
                return isActive
                  ? `${base} bg-brand-orange/10 text-brand-orange`
                  : `${base} text-brand-orange hover:bg-orange-100 hover:text-brand-orangeDark`;
              }}
              onClick={onClose}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-100 text-lg group-hover:bg-orange-200 transition-colors">
                {link.icon}
              </span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-orange-200 dark:border-slate-700 px-4 py-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-orange-200 dark:border-slate-600 bg-orange-50 dark:bg-slate-700">
              <SafeImage
                src={user?.profileImage ? getImageUrl(user.profileImage) : null}
                alt={user?.fullName}
                className="h-full w-full object-cover"
                fallbackIcon={
                  <span className="text-sm font-semibold text-brand-orange">{user?.fullName?.charAt(0).toUpperCase()}</span>
                }
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-orange">{user?.fullName}</p>
              <p className="text-xs text-brand-orange/70 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;