import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, FileText, LogOut } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-green-700 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Teacher Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/teacher/courses" className="flex items-center p-2 hover:bg-green-600 rounded">
                <BookOpen className="mr-2" size={20} />
                My Courses
              </Link>
            </li>
            <li>
              <Link to="/teacher/students" className="flex items-center p-2 hover:bg-green-600 rounded">
                <Users className="mr-2" size={20} />
                Students
              </Link>
            </li>
            <li>
              <Link to="/teacher/assignments" className="flex items-center p-2 hover:bg-green-600 rounded">
                <FileText className="mr-2" size={20} />
                Assignments
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={logout}
          className="flex items-center mt-auto p-2 hover:bg-green-600 rounded"
        >
          <LogOut className="mr-2" size={20} />
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Routes>
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route index element={<TeacherOverview />} />
        </Routes>
      </main>
    </div>
  );
};

const TeacherOverview: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Welcome, Teacher!</h2>
    <p>Here's an overview of your courses and students.</p>
  </div>
);

const TeacherCourses: React.FC = () => {
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem('teacherCourses');
    return storedCourses ? JSON.parse(storedCourses) : [
      { id: 1, title: 'Introduction to React', students: 25 },
      { id: 2, title: 'Advanced JavaScript', students: 20 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('teacherCourses', JSON.stringify(courses));
  }, [courses]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Course Title</th>
            <th className="py-2 px-4 border-b">Number of Students</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b">{course.title}</td>
              <td className="py-2 px-4 border-b">{course.students}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TeacherStudents: React.FC = () => {
  const [students, setStudents] = useState(() => {
    const storedStudents = localStorage.getItem('teacherStudents');
    return storedStudents ? JSON.parse(storedStudents) : [
      { id: 1, name: 'Alice Johnson', course: 'Introduction to React', grade: 'A' },
      { id: 2, name: 'Bob Smith', course: 'Advanced JavaScript', grade: 'B+' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('teacherStudents', JSON.stringify(students));
  }, [students]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Students</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Student Name</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.course}</td>
              <td className="py-2 px-4 border-b">{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TeacherAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState(() => {
    const storedAssignments = localStorage.getItem('teacherAssignments');
    return storedAssignments ? JSON.parse(storedAssignments) : [
      { id: 1, title: 'React Hooks Essay', course: 'Introduction to React', dueDate: '2023-10-15' },
      { id: 2, title: 'Async JavaScript Project', course: 'Advanced JavaScript', dueDate: '2023-11-01' },
    ];
  });

  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '' });

  useEffect(() => {
    localStorage.setItem('teacherAssignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignments([...assignments, { ...newAssignment, id: assignments.length + 1 }]);
    setNewAssignment({ title: '', course: '', dueDate: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            value={newAssignment.title}
            onChange={handleInputChange}
            placeholder="Assignment Title"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="course"
            value={newAssignment.course}
            onChange={handleInputChange}
            placeholder="Course"
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={newAssignment.dueDate}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Assignment
        </button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="py-2 px-4 border-b">{assignment.title}</td>
              <td className="py-2 px-4 border-b">{assignment.course}</td>
              <td className="py-2 px-4 border-b">{assignment.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;