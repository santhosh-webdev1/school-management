import React, { useEffect, useState } from 'react';
import { teacherService } from '../../services/teacherService';
import { Teacher } from '../../types';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await teacherService.getAll();
      setTeachers(data);
    } catch (error) {
      toast.error('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingTeacher) {
        await teacherService.update(editingTeacher.id, data);
        toast.success('Teacher updated successfully');
      } else {
        await teacherService.create(data);
        toast.success('Teacher created successfully');
      }
      setShowModal(false);
      reset();
      setEditingTeacher(null);
      fetchTeachers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    reset(teacher);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await teacherService.delete(id);
        toast.success('Teacher deleted successfully');
        fetchTeachers();
      } catch (error) {
        toast.error('Failed to delete teacher');
      }
    }
  };

  const openAddModal = () => {
    setEditingTeacher(null);
    reset({});
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
        <button onClick={openAddModal} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Teacher
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Employee ID</th>
                <th className="table-header">Email</th>
                <th className="table-header">Phone</th>
                <th className="table-header">Qualification</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    {teacher.firstName} {teacher.lastName}
                  </td>
                  <td className="table-cell">{teacher.employeeId}</td>
                  <td className="table-cell">{teacher.user?.email || 'N/A'}</td>
                  <td className="table-cell">{teacher.phoneNumber}</td>
                  <td className="table-cell">{teacher.qualification || 'N/A'}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingTeacher ? 'Edit Teacher' : 'Add Teacher'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName', { required: true })}
                    className="input"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    {...register('lastName', { required: true })}
                    className="input"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>
              </div>

              {!editingTeacher && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    {...register('email', { required: !editingTeacher })}
                    className="input"
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID *
                </label>
                <input
                  {...register('employeeId', { required: !editingTeacher })}
                  className="input"
                  placeholder="EMP001"
                  disabled={!!editingTeacher}
                />
                {errors.employeeId && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  {...register('phoneNumber', { required: true })}
                  className="input"
                  placeholder="+1234567890"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea {...register('address')} className="input" rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input type="date" {...register('dateOfBirth')} className="input" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <input {...register('qualification')} className="input" placeholder="B.Ed, M.Ed" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTeacher ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;

