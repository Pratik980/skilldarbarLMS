import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#F97316', '#1D4A5A', '#EA580C', '#2563EB', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setStats(response.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  // Prepare chart data
  const revenueChartData = stats?.revenuePerCourse?.map(item => ({
    name: item.courseName?.length > 15 ? item.courseName.substring(0, 15) + '...' : item.courseName,
    revenue: item.courseRevenue,
    enrollments: item.enrollmentCount,
  })) || [];

  const monthlyChartData = stats?.monthlyRevenue?.map(item => ({
    month: item._id,
    revenue: item.revenue,
  })) || [];

  const enrollmentPieData = [
    { name: 'Approved', value: stats?.approvedEnrollments || stats?.totalEnrollments || 0 },
    { name: 'Pending', value: stats?.pendingEnrollments || 0 },
    { name: 'Rejected', value: stats?.rejectedEnrollments || 0 },
  ].filter(d => d.value > 0);

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 md:space-y-6 md:px-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-orange md:text-2xl">Admin Dashboard</h2>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{stats?.totalUsers || 0}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Students</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{stats?.totalStudents || 0}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Admins</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{stats?.totalAdmins || 0}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Total Courses</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{stats?.totalCourses || 0}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Enrollments</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{stats?.totalEnrollments || 0}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">NPR {stats?.totalRevenue || 0}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Revenue per Course Bar Chart */}
        {revenueChartData.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Revenue per Course</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData} margin={{ top: 5, right: 20, left: 10, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11, fill: '#1D4A5A' }} interval={0} />
                <YAxis tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}
                  formatter={(value, name) => [`NPR ${value}`, name === 'revenue' ? 'Revenue' : 'Enrollments']}
                />
                <Bar dataKey="revenue" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Monthly Revenue Line Chart */}
        {monthlyChartData.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Monthly Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <YAxis tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}
                  formatter={(value) => [`NPR ${value}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#1D4A5A" strokeWidth={2} dot={{ fill: '#F97316', strokeWidth: 2, r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Enrollment Status Pie Chart */}
        {enrollmentPieData.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Enrollment Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={enrollmentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {enrollmentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Enrollments per Course (horizontal bar) */}
        {revenueChartData.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Enrollments per Course</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#1D4A5A' }} width={75} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}
                />
                <Bar dataKey="enrollments" fill="#1D4A5A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Revenue per Course Table */}
      {stats?.revenuePerCourse && stats.revenuePerCourse.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
          <h3 className="text-lg font-semibold text-brand-teal">Revenue per Course (Table)</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Enrollments</th>
                  <th className="px-4 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-teal/10">
                {stats.revenuePerCourse.map(item => (
                  <tr key={item._id} className="hover:bg-brand-teal/5">
                    <td className="px-4 py-3 font-medium text-brand-teal">{item.courseName}</td>
                    <td className="px-4 py-3 text-brand-teal/70">{item.enrollmentCount}</td>
                    <td className="px-4 py-3 text-brand-teal/70">NPR {item.courseRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly Revenue Table */}
      {stats?.monthlyRevenue && stats.monthlyRevenue.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
          <h3 className="text-lg font-semibold text-brand-teal">Monthly Revenue (Table)</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-teal/10">
                {stats.monthlyRevenue.map(item => (
                  <tr key={item._id} className="hover:bg-brand-teal/5">
                    <td className="px-4 py-3 font-medium text-brand-teal">{item._id}</td>
                    <td className="px-4 py-3 text-brand-teal/70">NPR {item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;