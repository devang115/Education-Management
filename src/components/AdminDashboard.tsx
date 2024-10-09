import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, BookOpen, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/courses" className="flex items-center p-2 hover:bg-indigo-600 rounded">
                <BookOpen className="mr-2" size={20} />
                Courses
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center p-2 hover:bg-indigo-600 rounded">
                <Users className="mr-2" size={20} />
                Users
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={logout}
          className="flex items-center mt-auto p-2 hover:bg-indigo-600 rounded"
        >
          <LogOut className="mr-2" size={20} />
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Routes>
          <Route path="courses" element={<CourseManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route index element={<AdminOverview />} />
        </Routes>
      </main>
    </div>
  );
};

const AdminOverview: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
    <p>Here's an overview of your Education Management System.</p>
  </div>
);

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem('courses');
    return storedCourses ? JSON.parse(storedCourses) : [
      { id: 1, title: 'Introduction to React', description: 'Learn the basics of React', startDate: '2023-09-01', endDate: '2023-12-15', teacher: 'John Doe' },
      { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript', startDate: '2023-09-15', endDate: '2023-12-20', teacher: 'Jane Smith' },
    ];
  });

  const [newCourse, setNewCourse] = useState({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
    setNewCourse({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(filterText.toLowerCase()) ||
      course.description.toLowerCase().includes(filterText.toLowerCase()) ||
      course.teacher.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Course Management</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            placeholder="Course Title"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="startDate"
            value={newCourse.startDate}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="endDate"
            value={newCourse.endDate}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="teacher"
            value={newCourse.teacher}
            onChange={handleInputChange}
            placeholder="Assigned Teacher"
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Course
        </button>
      </form>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter courses..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('title')}>
              Title {sortField === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('description')}>
              Description {sortField === 'description' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('startDate')}>
              Start Date {sortField === 'startDate' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('endDate')}>
              End Date {sortField === 'endDate' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('teacher')}>
              Teacher {sortField === 'teacher' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedCourses.map((course) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b">{course.title}</td>
              <td className="py-2 px-4 border-b">{course.description}</td>
              <td className="py-2 px-4 border-b">{course.startDate}</td>
              <td className="py-2 px-4 border-b">{course.endDate}</td>
              <td className="py-2 px-4 border-b">{course.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [
      { id: 1, name: 'John Doe', role: 'teacher' },
      { id: 2, name: 'Jane Smith', role: 'student' },
    ];
  });

  const [newUser, setNewUser] = useState({ name: '', role: '' });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', role: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="User Name"
            className="p-2 border rounded"
            required
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add User
        </button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;