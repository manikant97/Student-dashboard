import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudentById, updateStudent, deleteStudent } from '../services/mockApi';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStudentById(Number(id));
      setStudent(data);
      setFormData(data);
    } catch (err) {
      setError('Failed to load student details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(student);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedStudent = await updateStudent(student.id, formData);
      setStudent(updatedStudent);
      setEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update student details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setLoading(true);
        await deleteStudent(student.id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete student');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="text-center">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="text-center text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-indigo-600 flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-gray-200 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 flex items-center"
                disabled={editing}
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>

          <div className="p-6">
            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="text-base text-gray-900">{student.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="text-base text-gray-900">{student.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="text-base text-gray-900">{student.phoneNumber}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="text-base text-gray-900">{student.address}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Age</dt>
                        <dd className="text-base text-gray-900">{student.age}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Course</dt>
                        <dd className="text-base text-gray-900">{student.course}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Grade</dt>
                        <dd className="text-base text-gray-900">{student.grade}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Semester</dt>
                        <dd className="text-base text-gray-900">{student.semester}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Enrollment Date</dt>
                        <dd className="text-base text-gray-900">{student.enrollmentDate}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Attendance</dt>
                        <dd className="text-base text-gray-900">{student.attendance}%</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assignment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {student.assignments.map((assignment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {assignment.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {assignment.score}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
