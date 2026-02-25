import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationAPI } from '../api/notification';
import { useSocket } from '../context/SocketContext';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Listen for real-time notification events
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data) => {
      // Refresh notifications from server
      fetchNotifications();
    };

    const handleNewEnrollment = (data) => {
      fetchNotifications();
    };

    socket.on('notification', handleNewNotification);
    socket.on('enrollmentUpdate', handleNewNotification);
    socket.on('newEnrollment', handleNewEnrollment);

    return () => {
      socket.off('notification', handleNewNotification);
      socket.off('enrollmentUpdate', handleNewNotification);
      socket.off('newEnrollment', handleNewEnrollment);
    };
  }, [socket]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getMyNotifications(1, 10);
      setNotifications(response.data || []);
      setUnreadCount(response.unreadCount || 0);
    } catch (err) {
      // If notification endpoint doesn't exist yet (404), stop polling to avoid console spam
      if (err?.response?.status === 404) {
        console.warn('Notification endpoint not available yet.');
      }
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = async (notif) => {
    if (!notif.isRead) {
      try {
        await notificationAPI.markAsRead(notif._id);
        setNotifications(prev =>
          prev.map(n => n._id === notif._id ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (err) { /* ignore */ }
    }
    if (notif.link) {
      navigate(notif.link);
      setIsOpen(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) { /* ignore */ }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await notificationAPI.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      setUnreadCount(prev => {
        const removed = notifications.find(n => n._id === id);
        return removed && !removed.isRead ? Math.max(0, prev - 1) : prev;
      });
    } catch (err) { /* ignore */ }
  };

  const getTypeIcon = (type) => {
    const icons = {
      enrollment: '📝',
      course: '📚',
      exam: '📋',
      certificate: '🎓',
      payment: '💳',
      system: '🔔',
    };
    return icons[type] || '🔔';
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative rounded-lg p-2 text-white hover:bg-brand-teal/5 hover:text-white transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-brand-teal/10 bg-white shadow-xl shadow-black/10">
          <div className="flex items-center justify-between border-b border-brand-teal/10 px-4 py-3">
            <h4 className="text-sm font-semibold text-brand-teal">Notifications</h4>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-brand-orange hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-brand-teal/50">
                No notifications yet
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif._id}
                  onClick={() => handleMarkAsRead(notif)}
                  className={`flex cursor-pointer items-start gap-3 border-b border-brand-teal/5 px-4 py-3 transition-colors hover:bg-brand-teal/5 ${
                    !notif.isRead ? 'bg-brand-orange/5' : ''
                  }`}
                >
                  <span className="mt-0.5 text-lg">{getTypeIcon(notif.type)}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${!notif.isRead ? 'font-semibold text-brand-teal' : 'text-brand-teal/80'}`}>
                      {notif.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-brand-teal/60">{notif.message}</p>
                    <p className="mt-1 text-[10px] text-brand-teal/40">{timeAgo(notif.createdAt)}</p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, notif._id)}
                    className="flex-shrink-0 rounded p-1 text-brand-teal/30 hover:bg-red-50 hover:text-red-500"
                    aria-label="Delete"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
