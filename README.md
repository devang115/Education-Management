# Education Management System (EMS) Frontend

## Project Overview

The **Education Management System (EMS) Frontend** is a React-based web application that allows **Administrators**, **Teachers**, and **Students** to manage courses, enrollments, and track performance. The application implements role-based dashboards for each user type, providing features such as course creation, student performance tracking, and grade management.

### Technologies Used:
- **React** (Frontend framework)
- **Tailwind CSS** (Styling)
- **React Router** (Routing for navigation between roles)
- **React Context API / Redux** (State management)
  
## Features

### 1. Role-Based Dashboards
- **Admin Dashboard**: 
  - View and manage all courses, students, and teachers.
  - Create, edit, and delete courses.
  
- **Teacher Dashboard**:
  - View assigned courses and track student progress.
  - Manage course content, upload assignments and quizzes, and assign grades.
  
- **Student Dashboard**:
  - View enrolled courses, assignments, and grades.
  - Submit assignments.

### 2. Course Management
- **Admin**: Create, edit, and delete courses, assign teachers to courses.
- **Teacher**: Manage course content, upload assignments, create quizzes, and track student progress.
- **Student**: View course details and submit assignments.

### 3. Forms and Tables
- **Dynamic Forms**: Create courses, enroll students, and assign grades using dynamic forms.
- **Tables**: Display all course and student data with sorting and filtering options.

### 4. State Management
- Use **React Context API** or **Redux** to manage global state for user roles and course data.

### 5. Styling
- **Tailwind CSS** is used to create a responsive and intuitive UI.
- Inspiration for the UI is drawn from modern admin dashboard templates.

### 6. Routing and Role-Based Access
- **React Router** is used for navigation, with protected routes based on user roles (Admin, Teacher, Student).
  
## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/devang115/ems-frontend.git
   cd ems-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the application in your browser at `http://localhost:3000`.

### Default Login Credentials:
- **Admin**: 
  - Username: `admin`
  - Password: `admin`
  
- **Teacher**: 
  - Username: Select a teacher from the dropdown list
  - Password: `teacher`
  
- **Student**: 
  - Username: Select a student from the dropdown list
  - Password: `student`

## Key Components

### 1. Login Page
- Dropdown for selecting user type: **Admin**, **Teacher**, or **Student**.
- When selecting **Teacher** or **Student**, a second dropdown appears to choose a specific user (3 teachers and 3 students provided by default).
  
### 2. Admin Dashboard
- Manage Courses (create, edit, delete).
- View and manage students and teachers.

### 3. Teacher Dashboard
- View assigned courses and student progress.
- Upload assignments and create quizzes.

### 4. Student Dashboard
- View enrolled courses, assignments, and grades.
- Submit assignments.

### 5. Course Management
- Dynamic forms for creating, editing, and deleting courses.
- Tables to display courses, students, and teacher details with filtering and sorting.

### 6. State Management
- **React Context API** or **Redux** is used to manage global state, including user roles and course data.



## Additional Notes

- Make sure to explore admin dashboard UI templates from **Material UI** or other similar resources for inspiration.
- The app is designed to handle real-time updates, with role-specific dashboards that provide the necessary tools for managing courses and students.
  
## License
This project is licensed under the MIT License.

---

Feel free to reach out if you have any issues or need help with the setup!
