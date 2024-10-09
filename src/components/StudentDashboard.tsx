import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, FileText, LogOut } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Student Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/student/courses" className="flex items-center p-2 hover:bg-blue-600 rounded">
                <BookOpen className="mr-2" size={20} />
                My Courses
              </Link>
            </li>
            <li>
              <Link to="/student/assignments" className="flex items-center p-2 hover:bg-blue-600 rounded">
                <FileText className="mr-2" size={20} />
                Assignments
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={logout}
          className="flex items-center mt-auto p-2 hover:bg-blue-600 rounded"
        >
          <LogOut className="mr-2" size={20} />
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Routes>
          <Route path="courses" element={<StudentCourses />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route index element={<StudentOverview />} />
        </Routes>
      </main>
    </div>
  );
};

const StudentOverview: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Welcome, Student!</h2>
    <p>Here's an overview of your courses and assignments.</p>
  </div>
);

const StudentCourses: React.FC = () => {
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem('studentCourses');
    return storedCourses ? JSON.parse(storedCourses) : [
      { id: 1, title: 'Introduction to React', instructor: 'John Doe', progress: 60 },
      { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', progress: 40 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('studentCourses', JSON.stringify(courses));
  }, [courses]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p>Instructor: {course.instructor}</p>
            <div className="mt-2">
              <div className="text-sm text-gray-600">Progress: {course.progress}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudentAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState(() => {
    const storedAssignments = localStorage.getItem('studentAssignments');
    return storedAssignments ? JSON.parse(storedAssignments) : [
      { id: 1, title: 'React Hooks Essay', course: 'Introduction to React', dueDate: '2023-10-15', status: 'Pending' },
      { id: 2, title: 'Async JavaScript Project', course: 'Advanced JavaScript', dueDate: '2023-11-01', status: 'Submitted' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('studentAssignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleSubmitAssignment = (id: number) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id ? { ...assignment, status: 'Submitted' } : assignment
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="py-2 px-4 border-b">{assignment.title}</td>
              <td className="py-2 px-4 border-b">{assignment.course}</td>
              <td className="py-2 px-4 border-b">{assignment.dueDate}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 py-1 rounded ${
                  assignment.status === 'Submitted' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {assignment.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                {assignment.status === 'Pending' && (
                  <button
                    onClick={() => handleSubmitAssignment(assignment.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;