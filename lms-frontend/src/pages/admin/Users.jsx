import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ role: '', isActive: '' });

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getAllUsers(filter.role, filter.isActive);
      setUsers(response.data || []);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const response = await adminAPI.toggleUserStatus(userId);
      if (response.success) {
        fetchUsers(); // Refresh list
      }
    } catch (err) {
      setError('Failed to toggle user status');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 md:space-y-6 md:px-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-orange md:text-2xl">Manage Users</h2>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Filter by Role</label>
          <select
            value={filter.role}
            onChange={(e) => setFilter({ ...filter, role: e.target.value })}
            className="rounded-lg border border-white/20 bg-white px-4 py-3 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Filter by Status</label>
          <select
            value={filter.isActive}
            onChange={(e) => setFilter({ ...filter, isActive: e.target.value })}
            className="rounded-lg border border-white/20 bg-white px-4 py-3 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white shadow-lg shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                <th className="px-3 py-3 md:px-4">Name</th>
                <th className="hidden px-3 py-3 sm:table-cell md:px-4">Email</th>
                <th className="hidden px-3 py-3 lg:table-cell md:px-4">Phone</th>
                <th className="px-3 py-3 md:px-4">Role</th>
                <th className="px-3 py-3 md:px-4">Status</th>
                <th className="hidden px-3 py-3 md:table-cell md:px-4">Joined</th>
                <th className="px-3 py-3 md:px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/10">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-brand-teal/5">
                  <td className="px-3 py-3 font-medium text-brand-teal md:px-4">{user.fullName}</td>
                  <td className="hidden px-3 py-3 text-brand-teal/70 sm:table-cell md:px-4">{user.email}</td>
                  <td className="hidden px-3 py-3 text-brand-teal/70 lg:table-cell md:px-4">{user.phone}</td>
                  <td className="px-3 py-3 text-brand-teal/70 capitalize md:px-4">{user.role}</td>
                  <td className="px-3 py-3 md:px-4">
                    <StatusBadge status={user.isActive ? 'active' : 'inactive'} />
                  </td>
                  <td className="hidden px-3 py-3 text-brand-teal/70 md:table-cell md:px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3 md:px-4">
                    <button
                      onClick={() => handleToggleStatus(user._id)}
                      className={`rounded-lg px-2 py-1 text-xs font-semibold md:px-3 md:py-1.5 ${user.isActive ? 'bg-brand-orange/15 text-brand-orangeDark' : 'bg-brand-teal/10 text-brand-teal'}`}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <p className="text-sm text-white/70">No users found</p>
      )}
    </div>
  );
};

export default Users;