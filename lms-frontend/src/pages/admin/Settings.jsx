import { useEffect, useState } from 'react';
import { adminAPI } from '../../api/admin';
import { authAPI } from '../../api/auth';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Upload } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    profileImage: '',
  });
  const [formData, setFormData] = useState({
    instituteName: '',
    adminEmail: '',
    contactNumber: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setProfile({
          fullName: user.fullName || '',
          email: user.email || '',
          profileImage: user.profileImage || '',
        });
        if (user.profileImage) {
          setImagePreview(getImageUrl(user.profileImage));
        }
      }
    } catch (err) {
      console.error('Failed to load profile');
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await adminAPI.getSettings();
      setFormData({
        instituteName: response.data?.instituteName || '',
        adminEmail: response.data?.adminEmail || '',
        contactNumber: response.data?.contactNumber || '',
      });
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfilePhoto = async (e) => {
    e.preventDefault();
    if (!profileImage) {
      setError('Please select an image to upload');
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await authAPI.uploadProfileImage(profileImage);
      if (response.success) {
        setMessage('Profile photo updated successfully');
        setProfileImage(null);
        // Update localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        user.profileImage = response.data.profileImage;
        localStorage.setItem('user', JSON.stringify(user));
        setProfile({
          ...profile,
          profileImage: response.data.profileImage
        });
        setImagePreview(getImageUrl(response.data.profileImage));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload profile photo');
    } finally {
      setSaving(false);
    }
  };

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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await adminAPI.updateSettings(formData);
      if (response.success) {
        setMessage('Settings updated successfully');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (passwordData.newPassword !== passwordData.newPasswordConfirm) {
      setError('New passwords do not match');
      return;
    }

    setSaving(true);
    try {
      const response = await authAPI.changePassword(passwordData);
      if (response.success) {
        setMessage('Password updated successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-orange">Settings</h2>
      </div>

      {message && (
        <div className="rounded-lg border border-brand-teal/20 bg-brand-teal/10 px-4 py-3 text-sm text-brand-teal">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {/* Profile Photo Section */}
      <form onSubmit={handleUploadProfilePhoto} className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5 space-y-4">
        <h3 className="text-lg font-semibold text-brand-orange">Admin Profile Photo</h3>
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-orange-200 bg-orange-50">
              {imagePreview ? (
                <SafeImage src={imagePreview} alt="Profile Preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-brand-orange">
                  {profile.fullName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-teal">Upload Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-brand-teal file:mr-4 file:rounded-lg file:border-0 file:bg-brand-orange file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-orangeDark"
                />
                <p className="text-xs text-slate-600">Recommended: Square image (500x500px or larger)</p>
              </div>
              <button 
                type="submit" 
                className="mt-4 flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark disabled:opacity-50"
                disabled={!profileImage || saving}
              >
                <Upload className="h-4 w-4" />
                {saving ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleSave} className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-teal">Institute Name</label>
          <input
            type="text"
            name="instituteName"
            value={formData.instituteName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-teal">Admin Email</label>
          <input
            type="email"
            name="adminEmail"
            value={formData.adminEmail}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-teal">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
        </div>

        <button type="submit" className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>

      <form onSubmit={handleChangePassword} className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5 space-y-4">
        <h3 className="text-lg font-semibold text-brand-teal">Change Admin Password</h3>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-teal">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            required
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-teal">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
            minLength="6"
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-teal">Confirm New Password</label>
          <input
            type="password"
            name="newPasswordConfirm"
            value={passwordData.newPasswordConfirm}
            onChange={handlePasswordChange}
            required
            minLength="6"
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
        </div>

        <button type="submit" className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark" disabled={saving}>
          {saving ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
