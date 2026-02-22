# LMS Upgrade - File Changes Reference

## Backend Files Modified/Created

### NEW FILES CREATED:

#### Models:
1. `lms-backend/src/models/Exam.js` - Exam schema with MCQ questions
2. `lms-backend/src/models/Certificate.js` - Certificate schema

#### Controllers:
3. `lms-backend/src/controllers/exam.controller.js` - Exam endpoints logic
4. `lms-backend/src/controllers/certificate.controller.js` - Certificate endpoints logic

#### Routes:
5. `lms-backend/src/routes/exam.routes.js` - Exam API routes
6. `lms-backend/src/routes/certificate.routes.js` - Certificate API routes

### MODIFIED FILES:

#### Core App:
- `lms-backend/src/app.js` - Added exam and certificate route imports and registrations

#### Models:
- `lms-backend/src/models/Progress.js` - Added exam tracking fields:
  - examAttempted (boolean)
  - examScore (number)
  - examPassed (boolean)
  - examAttemptedAt (date)
  - certificateGenerated (boolean)

#### Middleware:
- `lms-backend/src/middleware/auth.middleware.js` - Added `authorize()` function for role-based access control

---

## Frontend Files Modified/Created

### NEW FILES CREATED:

#### API Files:
1. `lms-frontend/src/api/exam.js` - Exam API calls
2. `lms-frontend/src/api/certificate.js` - Certificate API calls

#### Student Pages:
3. `lms-frontend/src/pages/student/ExamStart.jsx` - Exam overview and rules
4. `lms-frontend/src/pages/student/ExamTake.jsx` - Exam interface with timer
5. `lms-frontend/src/pages/student/ExamResult.jsx` - Exam results and certificate
6. `lms-frontend/src/pages/student/Certificates.jsx` - Student certificate list

#### Admin Pages:
7. `lms-frontend/src/pages/admin/ExamManagement.jsx` - Exam management interface
8. `lms-frontend/src/pages/admin/ExamForm.jsx` - Create/edit exam form
9. `lms-frontend/src/pages/admin/ExamResults.jsx` - Student exam results view

#### Public Pages:
10. `lms-frontend/src/pages/CertificateVerification.jsx` - Public certificate verification

### MODIFIED FILES:

#### Core App:
- `lms-frontend/src/App.jsx` - Added routes for:
  - Student exam pages
  - Student certificate pages
  - Admin exam management pages
  - Public certificate verification page

---

## Backend Endpoints Created

### Exam Endpoints (8 total):
```
GET    /api/exams/course/:courseId - Get exam for course
GET    /api/exams/take/:courseId - Get exam for taking (no answers)
POST   /api/exams/submit/:courseId - Submit exam answers
POST   /api/exams - Create exam (admin)
PUT    /api/exams/:examId - Update exam (admin)
DELETE /api/exams/:examId - Delete exam (admin)
GET    /api/exams - Get all exams (admin)
GET    /api/exams/results/course/:courseId - Get exam results (admin)
```

### Certificate Endpoints (6 total):
```
GET    /api/certificates/course/:courseId - Get certificate
GET    /api/certificates/download/:courseId - Download PDF
GET    /api/certificates - Get all certificates (student)
GET    /api/certificates/verify/:certificateId - Verify (public)
GET    /api/certificates/admin/all - Get all (admin)
GET    /api/certificates/stats/course/:courseId - Get stats (admin)
```

---

## Frontend Routes Added

### Student Routes:
```
/student/courses/:courseId/exam - Exam start page
/student/courses/:courseId/exam/take - Exam taking interface
/student/courses/:courseId/exam/result - Exam result page
/student/certificates - Student certificates list
```

### Admin Routes:
```
/admin/courses/:courseId/exam - Exam management
/admin/exams/create/:courseId - Create exam form
/admin/exams/:examId/edit - Edit exam form
/admin/courses/:courseId/exam-results - Exam results view
```

### Public Routes:
```
/certificates/verify/:certificateId - Certificate verification
```

---

## Database Schema Changes

### Exam Collection (NEW):
```javascript
{
  course: ObjectId,
  title: String,
  description: String,
  passingPercentage: Number,
  totalQuestions: Number,
  duration: Number (minutes),
  questions: [{
    questionText: String,
    questionImage: String,
    options: [{text: String, isCorrect: Boolean}],
    explanation: String,
    order: Number
  }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Certificate Collection (NEW):
```javascript
{
  student: ObjectId,
  course: ObjectId,
  exam: ObjectId,
  certificateId: String (unique),
  score: Number,
  issuedDate: Date,
  expiryDate: Date,
  certificatePath: String,
  status: String (generated/downloaded),
  createdAt: Date,
  updatedAt: Date
}
```

### Progress Collection (UPDATED):
Added fields:
```javascript
{
  examAttempted: Boolean,
  examScore: Number,
  examPassed: Boolean,
  examAttemptedAt: Date,
  certificateGenerated: Boolean
}
```

---

## Dependencies

### Backend:
- pdfkit (^0.17.2) - PDF generation for certificates
  * Already in package.json

### Frontend:
- No new dependencies needed
- Uses existing: axios, react-router-dom, lucide-react, tailwindcss

---

## Configuration Notes

### Environment Variables (.env):
Ensure these are set:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_secret>
```

### File Upload Paths:
Certificates will be stored in:
- `uploads/certificates/` (if implementing file storage)

Currently certificates are generated on-the-fly as PDF streams.

---

## Testing Notes

### Important Test Cases:
1. ✓ Exam locked until 100% progress
2. ✓ One attempt only enforced
3. ✓ Timer counts down and auto-submits
4. ✓ Answers not revealed before submission
5. ✓ Correct answers revealed after submission
6. ✓ Certificate auto-generated on pass
7. ✓ PDF downloads correctly
8. ✓ Verification works for any certificate ID
9. ✓ Progress fields update correctly
10. ✓ Admin can view all results

---

## Rollback Plan (if needed):

To rollback this update:
1. Delete these models: Exam.js, Certificate.js
2. Remove exam and certificate from app.js routes
3. Restore Progress.js to original (remove exam fields)
4. Delete exam and certificate route files
5. Delete exam and certificate controllers
6. Delete frontend pages and API files
7. Restore App.jsx routes
8. Remove exam and certificate collections from database

---

## Support & Troubleshooting

### Common Issues:

**Exam not appearing:**
- Check enrollment status (must be 'approved')
- Check progress % (must be 100%)
- Check exam exists in database

**Certificate not generating:**
- Check exam passing percentage setting
- Check student score >= passing %
- Check pdfkit is installed

**Routes not working:**
- Verify all imports in App.jsx
- Check route paths match component imports
- Clear browser cache and reload

**API errors:**
- Check Bearer token in Authorization header
- Verify user role has access
- Check database connectivity

---

## Performance Optimization Tips

1. **Index database:**
   - exam: {course: 1}
   - certificate: {student: 1, course: 1}
   - progress: {student: 1, course: 1}

2. **Cache exam list if rarely changes**

3. **Lazy load questions for admin form**

4. **Compress PDFs before download**

5. **Use pagination for exam results**

---

File Count Summary:
- Backend: 2 new models + 2 new controllers + 2 new routes + 3 modified files = 9 files
- Frontend: 2 new API files + 10 new pages + 1 modified file = 13 files
- Documentation: 2 files (this reference + summary)

**Total: 24 new/modified files**
