# user routes

### Complate user profile

- post /api/user/complate-user-profile

- headers: { Authorization: `Bearer ${tokan}` }

- req body = {age: userAge, school: userSchool, government: userGovernment, phoneNumber: userPhoneNumber, learningType: ["visual", "audio", "kinetic"]}

- success {success: true, user}

- fail {success: false, message: errorMessage}

### Get user Data

- get /api/user/data

- headers: { Authorization: `Bearer ${tokan}` }

- success {success: true, user}

- fail {success: false, message: errorMessage}

### Get Enrolled Courses

- get /api/user/enrolled-courses

- headers: { Authorization: `Bearer ${tokan}` }

- success {success: true, enrolledCourses}

- fail {success: false, message: errorMessage}

### purchase course

- get /api/user/purchase

- headers: { Authorization: `Bearer ${tokan}` }

- req body {courseId}

- free course {sucess: true, message}

- paid course {success: true, session_url}

### update course progress

- patch /api/user/update-course-progress

- headers: { Authorization: `Bearer ${tokan}` }

- req body { courseId, lectureId }

- success {success: true, message: "Progress Updated"}

- fail {sucess: false, message}

### get course progress

- get /api/user/get-course-progress/{courseId}

- headers: { Authorization: `Bearer ${tokan}` }

- success {success: true, progress}

- fail {sucess: false, message}

### rate course

- post /api/user/add-rating

- headers: { Authorization: `Bearer ${tokan}` }

- success {success: true, message: "Rating added"}

- fail {sucess: false, message}

# Educator Routes

### update to educator

- get /api/educator/update-role

- headers: { Authorization: `Bearer ${tokan}` }

- success { success: true, message: "You can publish a course now" }

- fail {sucess: false, message}

### add course

- post /api/educator/add-course

- headers: { Authorization: `Bearer ${tokan}` }

- req body {
  courseData: {
  courseTitle, courseDescription, coursePrice, discount,
  courseContent: [{
  chapterId, chapterOrder, chapterTitle,
  chapterContent: [{
  lectureId, lectureTitle, lectureUrl, isFreePreview, lectureOrder
  }]
  }]

  }
  }

- req file

- success {success: true, message: "Course Added"}

- fail {sucess: false, message}

### edit course

- patch /api/educator/edit-course

- headers: { Authorization: `Bearer ${tokan}` }

- req body {
  courseData: {
  courseTitle, courseDescription, coursePrice, discount,
  courseContent: [{
  chapterId, chapterOrder, chapterTitle,
  chapterContent: [{
  lectureId, lectureTitle, lectureUrl, isFreePreview, lectureOrder
  }]
  }]

  }
  }

- req file

- success {success: true, message: "Course Added"}

- fail {sucess: false, message}

### courses

- get /api/educator/courses

- headers: { Authorization: `Bearer ${tokan}` }

- success {success: true, courses}

- fail {sucess: false, message}

### dashboard

- get /api/educator/dashboard

- headers: { Authorization: `Bearer ${tokan}` }

- success {success: true, dashboardData: { totalEarnings, enrolledStudentsData, totalCourses }}

- fail {sucess: false, message}

### enrolled-students

- get /api/educator/enrolled-students

- headers: { Authorization: `Bearer ${tokan}` }

- success {success: true, enrolledStudents}

- fail {sucess: false, message}

# course routes

### all courses

- get /api/course/all

- success {success: true, courses}

- fail {sucess: false, message}

### one course

- get /api/course/{courseId}

- headers: { Authorization: `Bearer ${tokan}` } (optional (needed to get edit data))

- success {success: true, course}

- fail {sucess: false, message}
