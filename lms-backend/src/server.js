require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const server = http.createServer(app);

// Socket.io setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://skilldarbarlmss.netlify.app',
  'https://skilldarbarlms.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc)
      if (!origin) {
        console.log('✅ Socket.IO: Allowing request with no origin');
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log('✅ Socket.IO: Allowing origin:', origin);
        return callback(null, true);
      } else {
        console.log('❌ Socket.IO: Blocked origin:', origin);
        return callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  transports: ['websocket', 'polling'], // Try websocket first, fallback to polling
  allowEIO3: true, // Allow compatibility with Socket.IO v2/v3 clients
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Store io instance on app for use in controllers
app.set('io', io);

// Connected users map: userId -> socketId
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // User joins with their userId
  socket.on('join', (userId) => {
    if (userId) {
      connectedUsers.set(userId, socket.id);
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined room user_${userId}`);
    }
  });

  // Admin room
  socket.on('joinAdmin', () => {
    socket.join('admin_room');
    console.log(`Admin joined admin_room`);
  });

  socket.on('disconnect', () => {
    // Remove from connected users
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API ready at http://localhost:${PORT}/api`);
  console.log(`✓ Socket.io ready`);
  console.log("Cloudinary also ready mero lekha")
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('✗ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('✗ Uncaught Exception:', err.message);
  process.exit(1);
});