# Professional LMS Backend

A complete, production-ready Learning Management System backend built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

## 🎯 Features

✅ **Authentication System**

- Student registration (fullName, email, phone, password)
- Email & password login
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access (Student, Admin)

✅ **Course Management**

- Public course listing
- Course creation/update/delete (Admin)
- Course details with metadata
- QR-based payment system

✅ **Enrollment System**

- Manual QR payment verification
- Student enrolls → Shows QR → Marks as paid → Admin approves
- Enrollment status tracking (pending, approved, rejected)
- Revenue tracking per course

✅ **Course Content** (Optional)

- Video uploads (mp4)
- Multiple slide images
- PDF documents
- Google Drive links
- Any combination supported

✅ **Student Dashboard**

- View enrolled courses
- Track course progress
- View approved/pending enrollments
- Mark content as completed

✅ **Admin Panel**

- Dashboard with analytics
- Total users, students, courses, enrollments
- Revenue tracking (total, per course, monthly)
- Manage users (activate/deactivate)
- Approve/reject enrollments
- Manage courses and content
- View student progress
- Send certificates (manual process)

✅ **File Management**

- Multer-based file uploads
- Organized storage (videos, pdfs, images)
- Static file serving
- File deletion on content removal

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT + bcryptjs |
| **File Upload** | Multer |
| **Environment** | dotenv |

## 📁 Folder Structure

```
lms-backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema (student/admin)
│   │   ├── Course.js             # Course schema
│   │   ├── Enrollment.js         # Enrollment schema
│   │   ├── Content.js            # Course content
│   │   └── Progress.js           # Student progress tracking
│   ├── controllers/
│   │   ├── auth.controller.js    # Login, signup, profile
│   │   ├── course.controller.js  # Course CRUD
│   │   ├── enrollment.controller.js # Enrollment management
│   │   ├── content.controller.js # Content management
│   │   ├── progress.controller.js # Progress tracking
│   │   └── admin.controller.js   # Admin dashboard
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── course.routes.js
│   │   ├── enrollment.routes.js
│   │   ├── content.routes.js
│   │   ├── progress.routes.js
│   │   └── admin.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── admin.middleware.js   # Role-based access
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
├── uploads/
│   ├── videos/
│   ├── pdfs/
│   └── images/
├── .env                          # Environment variables
├── package.json
└── README.md
```

## 🚀 Installation

### 1. **Prerequisites**

- Node.js (v14+)
- MongoDB (local or Atlas)

### 2. **Clone & Install**

```bash
# Create directory
mkdir lms-backend
cd lms-backend

# Initialize project
npm init -y

# Install dependencies
npm install express mongoose bcryptjs jsonwebtoken dotenv multer cors
npm install -D nodemon
```

### 3. **Copy Files**

Copy all files from this template into your project maintaining the folder structure.

### 4. **Environment Setup**

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lms-db
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
```

### 5. **Run Server**

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 6. **Test Server**

```bash
curl http://localhost:5000/api/health
```

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/signup              # Register student
POST   /api/auth/login               # Login
GET    /api/auth/me                  # Current user (Protected)
PUT    /api/auth/update-profile      # Update profile (Protected)
PUT    /api/auth/change-password     # Change password (Protected)
```

### Courses

```
GET    /api/courses                  # List all courses
GET    /api/courses/:id              # Get course details
POST   /api/courses                  # Create (Admin)
PUT    /api/courses/:id              # Update (Admin)
DELETE /api/courses/:id              # Delete (Admin)
PATCH  /api/courses/:id/toggle-status # Activate/Deactivate (Admin)
```

### Enrollment

```
GET    /api/enrollments/my-enrollments         # My enrollments (Student)
POST   /api/enrollments/:courseId              # Enroll (Student)
PUT    /api/enrollments/:enrollmentId/mark-paid # Mark paid (Student)
GET    /api/enrollments                        # All enrollments (Admin)
PUT    /api/enrollments/:enrollmentId/approve  # Approve (Admin)
PUT    /api/enrollments/:enrollmentId/reject   # Reject (Admin)
```

### Content

```
GET    /api/content/course/:courseId           # Get course content
GET    /api/content/:id                        # Get content details
POST   /api/content                            # Create (Admin) - with file upload
PUT    /api/content/:id                        # Update (Admin) - with file upload
DELETE /api/content/:id                        # Delete (Admin)
```

### Progress

```
GET    /api/progress/:courseId                 # Course progress (Student)
PUT    /api/progress/:courseId/complete/:contentId # Mark complete (Student)
GET    /api/progress                           # All progress (Admin)
PUT    /api/progress/:progressId/send-certificate # Send certificate (Admin)
```

### Admin Dashboard

```
GET    /api/admin/dashboard                    # Dashboard stats (Admin)
GET    /api/admin/users                        # All users (Admin)
PUT    /api/admin/users/:userId/toggle-status  # Toggle user status (Admin)
GET    /api/admin/users/:userId/enrollments   # User enrollments (Admin)
GET    /api/admin/courses/:courseId/analytics  # Course analytics (Admin)
```

## 🔐 Authentication

### How It Works

1. **Signup**: POST `/api/auth/signup` → Get JWT token
2. **Login**: POST `/api/auth/login` → Get JWT token
3. **Protected Routes**: Include header: `Authorization: Bearer <token>`

### Example Request

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 💳 Enrollment Flow (QR Payment)

```
1. Student views course
2. Clicks "Enroll" → Creates PENDING enrollment
3. System shows QR image
4. Student scans QR and pays
5. Student marks as "I Have Paid"
6. Admin sees PENDING enrollment
7. Admin verifies and clicks "Approve"
8. Enrollment status → APPROVED
9. Student gets course access
10. Student can access content and track progress
```

## 📊 Admin Dashboard Stats

```json
{
  "users": {
    "total": 150,
    "students": 145,
    "admins": 5
  },
  "courses": {
    "total": 12
  },
  "enrollments": {
    "total": 320,
    "approved": 280,
    "pending": 35,
    "rejected": 5
  },
  "revenue": {
    "total": 45000,
    "perCourse": [...],
    "monthlyBreakdown": [...]
  }
}
```

## 📝 Database Models

### User

```javascript
{
  fullName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: 'student' | 'admin',
  isActive: Boolean,
  profileImage: String,
  createdAt: Date
}
```

### Course

```javascript
{
  name: String,
  description: String,
  fee: Number,
  qrImage: String,
  instructor: ObjectId,
  category: String,
  isActive: Boolean,
  totalEnrollments: Number,
  totalRevenue: Number,
  createdAt: Date
}
```

### Enrollment

```javascript
{
  student: ObjectId,
  course: ObjectId,
  status: 'pending' | 'approved' | 'rejected',
  amount: Number,
  paymentMethod: String,
  enrolledAt: Date,
  approvedAt: Date,
  approvedBy: ObjectId
}
```

### Content

```javascript
{
  course: ObjectId,
  title: String,
  type: 'video' | 'pdf' | 'image' | 'link',
  description: String,
  filePath: String,
  slideImages: [String],
  externalLink: String,
  duration: Number,
  order: Number,
  createdAt: Date
}
```

### Progress

```javascript
{
  student: ObjectId,
  course: ObjectId,
  completedContents: [ObjectId],
  progressPercentage: Number,
  certificateSent: Boolean,
  certificateSentAt: Date,
  lastAccessedAt: Date
}
```

## 🔧 Configuration

Edit `.env` for your setup:

```env
# Server
PORT=5000
NODE_ENV=development

# Database - Change to your MongoDB URI
MONGODB_URI=mongodb://localhost:27017/lms-db
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/lms-db

# Security
JWT_SECRET=your-very-secure-random-key-here
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=104857600    # 100MB
UPLOAD_PATH=uploads

# API
API_URL=http://localhost:5000
```

## 📤 File Upload

### Video Upload

```bash
curl -X POST http://localhost:5000/api/content \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: multipart/form-data" \
  -F "courseId=<courseId>" \
  -F "title=Lecture 1" \
  -F "type=video" \
  -F "videoFile=@video.mp4"
```

### Multiple Slide Images

```bash
curl -X POST http://localhost:5000/api/content \
  -H "Authorization: Bearer <token>" \
  -F "courseId=<courseId>" \
  -F "title=Slides" \
  -F "type=image" \
  -F "slideImages=@slide1.jpg" \
  -F "slideImages=@slide2.jpg"
```

## ✨ Best Practices Implemented

✅ Async/Await syntax
✅ Clean REST APIs
✅ Proper error handling
✅ Middleware-based authentication
✅ Role-based authorization
✅ Password hashing (bcryptjs)
✅ JWT token validation
✅ File upload with Multer
✅ MongoDB indexes for performance
✅ Proper HTTP status codes
✅ Consistent response format
✅ Environment-based configuration

## 🐛 Error Handling

All endpoints return consistent JSON:

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.3",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5"
}
```

## 🚀 Deployment

### Production Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas instead of local DB
- [ ] Enable HTTPS
- [ ] Set up email service for certificates
- [ ] Configure CORS for frontend domain
- [ ] Set file upload limits appropriately
- [ ] Add rate limiting for security
- [ ] Monitor server logs
- [ ] Backup database regularly

## 📞 Support

For issues or questions, check:

- Error messages in console
- HTTP status codes
- Request payload format
- Token expiration
- MongoDB connection

## 📄 License

ISC - Feel free to use and modify

---

**Created by:** David456667  

**Last Updated:** 2026-02-12
