# LMS Upgrade - Quick Start & Testing Guide

## 🚀 Quick Setup

### 1. Backend Setup
```bash
cd lms-backend

# Install dependencies (if not already done)
npm install

# Start the server
npm run dev
```
Server runs on: `http://localhost:5000`

### 2. Frontend Setup  
```bash
cd lms-frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```
Frontend runs on: `http://localhost:5173` (or as shown in terminal)

---

## 📋 Testing Scenario - Complete Flow

### Step 1: Create Admin & Test Student Accounts
```
Admin Account:
- Email: admin@test.com
- Password: Admin@123
- Role: Admin

Student Account:
- Email: student@test.com
- Password: Student@123
- Role: Student
```

### Step 2: Login as Admin - Create Course
1. Go to `/admin/dashboard`
2. Click "Create New Course"
3. Fill in:
   - Course Name: "Web Development Basics"
   - Description: "Learn web development"
   - Fee: 500
   - Upload thumbnail image
   - Upload QR code image for payment
4. Save course

### Step 3: Admin - Add Lesson Content
1. Go to Courses → Select the course
2. Add Content:
   - **Lesson 1: Introduction**
     - Type: PDF / Video Link / Text
     - Title: "Introduction to Web Dev"
   - **Lesson 2: HTML Basics**
   - **Lesson 3: CSS Styling**
3. Minimum 3 lessons needed for testing

### Step 4: Admin - Create Exam
1. Go to course → Click "Exam Management"
2. Click "Create Exam"
3. Fill:
   - Title: "Web Dev Basics Quiz"
   - Duration: 10 minutes (for testing)
   - Passing %: 60%
4. Add Questions (minimum 5 for good testing):
   ```
   Q1: What is HTML?
   A) Hyper Text Markup Language ✓
   B) High Text Markup Language
   C) Home Tool Markup Language
   D) None
   Explanation: HTML is the standard markup language...
   
   Q2: CSS stands for?
   A) Computer Styling Sheets
   B) Cascading Style Sheets ✓
   C) Creative Style Sheets
   D) All of above
   ```
5. Repeat for 3-5 questions
6. Save Exam

### Step 5: Student - Enroll in Course
1. Logout, login as student
2. Go to /student/courses (or /student/dashboard)
3. Find the course created
4. Click "Enroll"
5. Fill enrollment form:
   - Name, Email, Phone
   - Upload payment proof screenshot
6. Submit

### Step 6: Admin - Approve Enrollment
1. Login as admin
2. Go to Enrollments
3. Find student's enrollment
4. Click Approve

### Step 7: Student - Learn & Complete Course
1. Login as student
2. Go to course detail
3. Click on each lesson and view
4. After viewing, click "Mark as Completed"
5. Repeat for all lessons
6. Progress bar should reach 100%

### Step 8: Student - Take Exam
1. Once 100% complete, "Take Exam" button appears
2. Click button
3. Read exam rules
4. Click "Start Exam"
5. Answer all questions:
   - Use "Previous" and "Next" buttons
   - Click on question numbers to jump
   - Watch the timer (should be counting down)
6. Click "Submit Exam" on last question

#### Testing Exam Timer:
- For 10-minute exam, timer should show: 9:59, 9:58...
- If you wait until time expires, exam auto-submits
- Timer warning when < 5 minutes

### Step 9: View Exam Result
After submission, should see:
```
✓ Passed (if score >= 60%)
- Correct/Total answers shown
- Score displayed as percentage
- Certificate info and download button
```

### Step 10: Download Certificate
1. Click "Download Certificate (PDF)" button
2. PDF should generate with:
   - Student name
   - Course name
   - Score
   - Certificate ID
   - Issue date
3. File saved as: certificate-{certificateId}.pdf

### Step 11: View Certificates
1. Go to `/student/certificates`
2. Should see certificate listed
3. Shows all details
4. Can download again

### Step 12: Verify Certificate Publicly
1. Go to `/certificates/verify/{certificateId}`
   - Find certificateId from the page or PDF
2. Should show certificate is valid
3. Shows student name, course, score, date
4. No login required

### Step 13: Admin - View Exam Results
1. Login as admin
2. Go to course → "View Results"
3. Should see:
   - Student name and email
   - Score achieved
   - Pass/Fail status
   - Date attempted
4. Can sort by score

---

## 🔍 What to Check in Each Step

### Exam Start Page:
- ✓ Shows course completion status
- ✓ Shows % complete (should be 0-99%)
- ✓ "Start Exam" button is DISABLED until 100%
- ✓ Shows exam duration and pass %
- ✓ Shows exam rules clearly
- ✓ Shows "Exam Not Available" if not 100%

### Exam Taking Page:
- ✓ Timer shows minutes:seconds format
- ✓ Timer counts down every second
- ✓ Can select only one option per question
- ✓ Selected option highlighted with blue
- ✓ Question numbers show: answered (green), current (blue), unanswered (gray)
- ✓ Can navigate with Previous/Next buttons
- ✓ Can jump to any question by clicking number
- ✓ Last question shows "Submit Exam" button instead of "Next"
- ✓ Previous button disabled on Q1
- ✓ Next button disabled on last Q

### Result Page:
- ✓ Shows Pass/Fail with correct icon/color
- ✓ Shows your score and correct/total answers
- ✓ Shows passing percentage requirement
- ✓ If PASSED: Shows certificate section with:
  - Certificate ID
  - Issue date
  - Download button (generates PDF)
- ✓ If FAILED: Shows encouragement message
- ✓ "Back to Course" button works
- ✓ "Go to Dashboard" button works

### Certificate Verification:
- ✓ URL: `/certificates/verify/{certificateId}`
- ✓ Page shows "Certificate Verified" with checkmark
- ✓ Shows student name
- ✓ Shows course name
- ✓ Shows score
- ✓ Shows issue date
- ✓ Shows certificate ID
- ✓ No login required
- ✓ Invalid ID shows "Invalid Certificate" message

---

## 🧪 Edge Case Testing

### Test 1: Timer Expiration
1. Start exam with 10-minute timer
2. Don't answer any questions
3. Wait until timer hits 0:00
4. Should auto-submit with 0 answered
5. Result should show 0% (0 correct out of X)

### Test 2: One Attempt Only
1. Student takes exam and gets 50% (fails)
2. Try to take exam again
3. Should show: "You have already attempted this exam"
4. Button should be disabled

### Test 3: Progress Lock
1. Complete only 2 out of 3 lessons (66%)
2. Try to click "Take Exam"
3. Should redirect to exam start page showing: "Course must be 100% completed"
4. "Start Exam" button disabled

### Test 4: Partial Answers
1. Answer only first 2 questions out of 5
2. Submit exam
3. Should still grade correctly with only 2 answers
4. Should show: "2 correct out of 5"

### Test 5: PDF Download Issues
1. Download certificate
2. Check if file is valid PDF (not corrupted)
3. Open PDF and verify:
   - Student name correct
   - Course name correct  
   - Score correct
   - Certificate ID matches website
   - Formatting looks professional

### Test 6: Admin Can't Take Exam
1. Login as admin
2. Try to access: `/student/courses/{courseId}/exam/take`
3. Should deny or redirect (ProtectedRoute should block)

---

## ⚠️ Common Issues & Solutions

### Issue: "Exam not found" error
**Fix:**
- Make sure exam was created and saved successfully
- Check exam is for correct course
- Refresh page
- Check browser console for error details

### Issue: Timer doesn't count down
**Fix:**
- Make sure JavaScript is enabled
- Try using different browser
- Check server time synchronization
- Clear browser cache

### Issue: Certificate PDF doesn't download
**Fix:**
- Check browser pop-up blocker
- Ensure pdfkit is installed: `npm install pdfkit`
- Restart server
- Try different browser

### Issue: "Can't take exam" when progress is 100%
**Fix:**
- Refresh page to get updated progress
- Check all lessons are marked as completed
- Try logging out and back in
- Check database Progress record status

### Issue: Routes not working (404 errors)
**Fix:**
- Make sure App.jsx has all imports
- Check import paths are correct
- Restart frontend dev server
- Clear browser cache

### Issue: "Not authorized" errors
**Fix:**
- Make sure you're logged in
- Check JWT token is stored in localStorage
- Login again (token might have expired)
- Developer Tools → Application → delete tokens, login again

---

## 📱 Browser Compatibility

Tested on:
- Chrome 120+
- Firefox 121+
- Safari 17+
- Edge 120+

---

## 🎯 Success Criteria Checklist

### User Can:
- [ ] See exam button after 100% progress
- [ ] Start exam and see all questions
- [ ] Answer questions and navigate
- [ ] Watch countdown timer
- [ ] Submit exam and get instant result
- [ ] Pass exam with score >= threshold
- [ ] Receive certificate on pass
- [ ] Download certificate as PDF
- [ ] View certificate details anytime
- [ ] Share certificate with unique verify link

### Admin Can:
- [ ] Create exam for course
- [ ] Add MCQ questions
- [ ] Set passing percentage
- [ ] Edit/delete exam
- [ ] View all student attempts
- [ ] See pass/fail statistics
- [ ] Export results

### System Should:
- [ ] Lock exam until 100% progress
- [ ] Allow only 1 exam attempt
- [ ] Auto-grade instantly
- [ ] Generate PDF certificates
- [ ] Store certificate records
- [ ] Verify certificates publicly
- [ ] Update progress on completion

---

## 🔄 Regression Testing

After implementing, test that existing features still work:
- [ ] Course listing and filtering
- [ ] Course enrollment process
- [ ] Lesson viewing and completion
- [ ] Progress tracking
- [ ] Dashboard showing courses
- [ ] User authentication
- [ ] Admin course management
- [ ] File uploads
- [ ] User profiles

---

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Check server terminal for backend errors
3. Check network tab for failed API calls
4. Ensure database is running and connected
5. Verify all files are created in correct locations
6. Ensure all imports are correct in App.jsx

---

**Test Status:** ✅ Ready for Full System Testing
**Estimated Testing Time:** 1-2 hours for full coverage
