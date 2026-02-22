import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api/auth';
import { Camera } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';

const Profile = () => {
  const { user, updateUser, updateProfileImage, changePassword, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const result = await updateUser(formData);

    if (result.success) {
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (passwordData.newPassword !== passwordData.newPasswordConfirm) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);

    const result = await changePassword(passwordData);
    if (result.success) {
      setMessage('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
      setShowPasswordChange(false);
    } else {
      setError(result.error || 'Failed to update password');
    }

    setLoading(false);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfileImage = async () => {
    if (!profileImageFile) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await authAPI.uploadProfileImage(profileImageFile);
      if (result.success) {
        updateProfileImage(result.data.profileImage);
        setMessage('Profile photo updated successfully');
        setProfileImageFile(null);
        setProfileImagePreview(null);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload profile photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold text-brand-orange">My Profile</h2>

      {message && (
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-2xl font-semibold text-slate-600 dark:text-slate-300">
              {user?.profileImage ? (
                <SafeImage
                  src={getImageUrl(user.profileImage)}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                  fallbackIcon={<span className="text-2xl font-semibold">{user?.fullName?.charAt(0).toUpperCase()}</span>}
                />
              ) : (
                <span>{user?.fullName?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <label htmlFor="profileImageInput" className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow">
              <Camera size={16} />
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </label>
          </div>

          {profileImagePreview && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <img src={profileImagePreview} alt="Preview" className="h-24 w-24 rounded-full border border-slate-200 dark:border-slate-700 object-cover" />
              <div className="flex gap-2">
                <button
                  onClick={handleUploadProfileImage}
                  disabled={loading}
                  className="rounded-lg bg-slate-900 dark:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600"
                >
                  {loading ? 'Uploading...' : 'Upload Photo'}
                </button>
                <button
                  onClick={() => {
                    setProfileImageFile(null);
                    setProfileImagePreview(null);
                  }}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">{user?.fullName}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
        </div>

        {!isEditing ? (
          <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Phone:</span>
              <span>{user?.phone}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Account Status:</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${user?.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Member Since:</span>
              <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 rounded-lg bg-slate-900 dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="submit" disabled={loading} className="rounded-lg bg-slate-900 dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="my-6 h-px bg-slate-200 dark:bg-slate-700"></div>

        <div className="space-y-3">
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {showPasswordChange ? 'Cancel' : 'Change Password'}
          </button>

          {showPasswordChange && (
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                <input
                  type="password"
                  name="newPasswordConfirm"
                  value={passwordData.newPasswordConfirm}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button type="submit" disabled={loading} className="rounded-lg bg-slate-900 dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600">
                Update Password
              </button>
            </form>
          )}
        </div>

        <button onClick={logout} className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;