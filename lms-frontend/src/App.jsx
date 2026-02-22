import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'

//  PUblic pages 
import Navbar from './components/Navbar'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Courses from './pages/public/Courses'
import Blog from './pages/public/Blog'
import Careers from './pages/public/Careers'
import Faqs from './pages/public/Faqs'
import Pricing from './pages/public/Pricing'
import Contract from './pages/public/Contact'


// Layouts
import MainLayout from './layout/MainLayout'
import AdminLayout from './layout/AdminLayout'

// Auth Pages
import Login from './pages/Login'
import Signup from './pages/Signup'

// Student Pages
import StudentDashboard from './pages/student/Dashboard'
import StudentCourses from './pages/student/Courses'
import CourseDetail from './pages/student/CourseDetail'
import MyEnrollments from './pages/student/MyEnrollments'
import ContentViewer from './pages/student/ContentViewer'
import Profile from './pages/student/Profile'
import ExamStart from './pages/student/ExamStart'
import ExamTake from './pages/student/ExamTake'
import ExamResult from './pages/student/ExamResult'
import Certificates from './pages/student/Certificates'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminCourses from './pages/admin/Courses'
import CourseForm from './pages/admin/CourseForm'
import AdminEnrollments from './pages/admin/Enrollments'
import AdminAnalytics from './pages/admin/Analytics'
import AdminCertificates from './pages/admin/Certificates'
import AdminSettings from './pages/admin/Settings'
import ExamManagement from './pages/admin/ExamManagement'
import ExamForm from './pages/admin/ExamForm'
import ExamResults from './pages/admin/ExamResults'
import CourseContent from './pages/admin/CourseContent'

function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#1e293b',
              color: '#e2e8f0',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#F97316', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
        <Routes>
         
             {/* Public Routes */}
           <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
             <Route path="/courses" element={<Courses />} />
              <Route path="/blog" element={<Blog />} />
             <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contract />} />
             <Route path="/faqs" element={<Faqs />} />
              <Route path="/pricing" element={<Pricing />} />
               </Route>

            {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route element={<MainLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/courses" element={<StudentCourses />} />
              <Route path="/student/courses/:id" element={<CourseDetail />} />
              <Route path="/student/my-enrollments" element={<MyEnrollments />} />
              <Route path="/student/content/:courseId/:contentId" element={<ContentViewer />} />
              <Route path="/student/profile" element={<Profile />} />
              <Route path="/student/courses/:courseId/exam" element={<ExamStart />} />
              <Route path="/student/courses/:courseId/exam/take" element={<ExamTake />} />
              <Route path="/student/courses/:courseId/exam/result" element={<ExamResult />} />
              <Route path="/student/certificates" element={<Certificates />} />
            </Route>
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/course-content" element={<CourseContent />} />
              <Route path="/admin/course-content/:courseId" element={<CourseContent />} />
              <Route path="/admin/courses/new" element={<CourseForm />} />
              <Route path="/admin/courses/edit/:id" element={<CourseForm />} />
              <Route path="/admin/courses/:courseId/exam" element={<ExamManagement />} />
              <Route path="/admin/exams/create/:courseId" element={<ExamForm />} />
              <Route path="/admin/exams/:examId/edit" element={<ExamForm />} />
              <Route path="/admin/courses/:courseId/exam-results" element={<ExamResults />} />
              <Route path="/admin/enrollments" element={<AdminEnrollments />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/certificates" element={<AdminCertificates />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Default Redirect */}
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App