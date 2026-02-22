import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      // Disconnect if user logs out
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,                  // IMPORTANT: Send credentials with CORS
      transports: ['websocket', 'polling'],   // Try websocket first, fallback to polling
      reconnectionAttempts: 5,                // stop after 5 retries instead of infinite
      reconnectionDelay: 3000,                // wait 3s between retries
      reconnectionDelayMax: 15000,            // max 15s between retries
      timeout: 20000,                         // 20s connection timeout (increased for Render cold starts)
      autoConnect: true,
      forceNew: false,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      // Join user room
      newSocket.emit('join', user._id || user.id);
      // If admin, join admin room
      if (user.role === 'admin') {
        newSocket.emit('joinAdmin');
      }
    });

    newSocket.on('connect_error', (err) => {
      console.warn('Socket connection error:', err.message);
    });

    newSocket.on('reconnect_failed', () => {
      console.warn('Socket reconnection failed after max attempts. Real-time features unavailable.');
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?._id, user?.id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
