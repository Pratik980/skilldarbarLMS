import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../../api/courses';
import { contentAPI } from '../../api/content';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getImageUrl } from '../../utils/imageUrl';
import toast from 'react-hot-toast';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [contentList, setContentList] = useState([]);
  const [contentForm, setContentForm] = useState({
    title: '',
    type: 'video',
    description: '',
    externalLink: '',
    duration: '',
    order: 0,
  });
  const [contentFiles, setContentFiles] = useState({
    videoFile: null,
    pdfFile: null,
    slideImages: [],
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fee: '',
    category: 'General',
    duration: '',
    lectures: '',
    thumbnail: '',
    reviewEnabled: true,
  });
  const [qrImageFile, setQrImageFile] = useState(null);
  const [qrImagePreview, setQrImagePreview] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  useEffect(() => {
    if (id) {
      fetchCourse();
      fetchContent();
    }
  }, [id]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const response = await coursesAPI.getCourseById(id);
      const course = response.data.course;
      setFormData({
        name: course.name,
        description: course.description || '',
        fee: course.fee,
        category: course.category,
        duration: course.duration || '',
        lectures: course.lectures || '',
        thumbnail: course.thumbnail || '',
        reviewEnabled: course.reviewEnabled !== false,
      });
      setQrImagePreview(getImageUrl(course.qrImage));
      if (course.thumbnail) {
        setThumbnailPreview(getImageUrl(course.thumbnail));
      }
    } catch (err) {
      setError('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      const response = await contentAPI.getCourseContent(id);
      setContentList(response.data || []);
    } catch (err) {
      setError('Failed to load course content');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQrImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrImageFile(file);
      setQrImagePreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (e) => {
    setContentForm({
      ...contentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'slideImages') {
      setContentFiles({ ...contentFiles, slideImages: Array.from(files) });
      return;
    }

    setContentFiles({ ...contentFiles, [name]: files[0] || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!id && !qrImageFile) {
      setError('Please upload a QR code image');
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('fee', formData.fee);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('lectures', formData.lectures);
      formDataToSend.append('reviewEnabled', formData.reviewEnabled);
      
      if (qrImageFile) {
        formDataToSend.append('qrImage', qrImageFile);
      }

      if (thumbnailFile) {
        formDataToSend.append('thumbnail', thumbnailFile);
      }

      let response;
      if (id) {
        response = await coursesAPI.updateCourse(id, formDataToSend);
      } else {
        response = await coursesAPI.createCourse(formDataToSend);
      }

      if (response.success) {
        toast.success(id ? 'Course updated!' : 'Course created!');
        if (id) {
          navigate('/admin/courses');
        } else {
          // After creating, redirect to course content page so admin can add content
          const newCourseId = response.data?._id || response.data?.course?._id;
          navigate(`/admin/course-content/${newCourseId}`);
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save course';
      toast.error(msg);
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!contentForm.title || !contentForm.type) {
      setError('Please provide content title and type');
      return;
    }

    if ((contentForm.type === 'link' || contentForm.type === 'youtube') && !contentForm.externalLink) {
      setError('External link is required for link or YouTube content');
      return;
    }

    const formData = new FormData();
    formData.append('courseId', id);
    formData.append('title', contentForm.title);
    formData.append('type', contentForm.type);
    formData.append('description', contentForm.description);
    formData.append('order', contentForm.order);
    if (contentForm.duration) formData.append('duration', contentForm.duration);
    if (contentForm.externalLink) formData.append('externalLink', contentForm.externalLink);

    if (contentForm.type === 'video' && contentFiles.videoFile) {
      formData.append('videoFile', contentFiles.videoFile);
    }

    if (contentForm.type === 'pdf' && contentFiles.pdfFile) {
      formData.append('pdfFile', contentFiles.pdfFile);
    }

    if (contentForm.type === 'image' && contentFiles.slideImages.length > 0) {
      contentFiles.slideImages.forEach((file) => formData.append('slideImages', file));
    }

    try {
      const response = await contentAPI.createContent(formData);
      if (response.success) {
        setContentForm({
          title: '',
          type: 'video',
          description: '',
          externalLink: '',
          duration: '',
          order: 0,
        });
        setContentFiles({ videoFile: null, pdfFile: null, slideImages: [] });
        fetchContent();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add content');
    }
  };

  const handleDeleteContent = async (contentId) => {
    if (!window.confirm('Delete this content item?')) {
      return;
    }

    try {
      const response = await contentAPI.deleteContent(contentId);
      if (response.success) {
        fetchContent();
      }
    } catch (err) {
      setError('Failed to delete content');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">{id ? 'Edit Course' : 'Add New Course'}</h2>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Course Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Description <span className="text-slate-400 font-normal">(optional)</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Course description..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="General">General</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="DevOps">DevOps</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Business">Business</option>
                <option value="Language">Language</option>
                <option value="Photography">Photography</option>
                <option value="Music">Music</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Personal Development">Personal Development</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Fee (NPR)</label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                required
                min="0"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Duration (e.g., 12h 30min) <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="12h 30min"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Number of Lectures</label>
              <input
                type="number"
                name="lectures"
                value={formData.lectures}
                onChange={handleChange}
                min="0"
                placeholder="56"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Course Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
            />
            {thumbnailPreview && (
              <div>
                <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-3 w-full max-w-xs rounded-lg border border-slate-200" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">QR Code Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleQrImageChange}
              required={!id}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
            />
            {qrImagePreview && (
              <div>
                <img src={qrImagePreview} alt="QR Preview" className="mt-3 w-full max-w-[220px] rounded-lg border border-slate-200" />
              </div>
            )}
            <p className="text-xs text-slate-500">Upload QR code image for payment (JPEG, PNG, or GIF)</p>
          </div>

          {/* Review Toggle */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={formData.reviewEnabled}
                onChange={(e) => setFormData({ ...formData, reviewEnabled: e.target.checked })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-orange peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
            <span className="text-sm font-semibold text-slate-700">Enable Course Reviews</span>
            <span className="text-xs text-slate-400">{formData.reviewEnabled ? 'Students can leave reviews' : 'Reviews disabled'}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={submitting} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
              {submitting ? 'Saving...' : (id ? 'Update Course' : 'Create Course')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/courses')}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {!id && (
        <p className="text-sm text-slate-500">
          Create the course first, then you can upload content.
        </p>
      )}

      {id && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Course Content</h3>

          <form onSubmit={handleContentSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Title</label>
              <input
                type="text"
                name="title"
                value={contentForm.title}
                onChange={handleContentChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Type</label>
              <select
                name="type"
                value={contentForm.type}
                onChange={handleContentChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="image">Slides (Images)</option>
                <option value="link">External Link</option>
                <option value="youtube">YouTube Video</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={contentForm.duration}
                onChange={handleContentChange}
                min="0"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea
                name="description"
                value={contentForm.description}
                onChange={handleContentChange}
                rows="3"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {(contentForm.type === 'link' || contentForm.type === 'youtube') && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">{contentForm.type === 'youtube' ? 'YouTube URL' : 'External Link'}</label>
                <input
                  type="url"
                  name="externalLink"
                  value={contentForm.externalLink}
                  onChange={handleContentChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {contentForm.type === 'video' && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Video File</label>
                <input type="file" name="videoFile" accept="video/*" onChange={handleContentFileChange} className="block w-full text-sm text-slate-600" />
              </div>
            )}

            {contentForm.type === 'pdf' && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">PDF File</label>
                <input type="file" name="pdfFile" accept="application/pdf" onChange={handleContentFileChange} className="block w-full text-sm text-slate-600" />
              </div>
            )}

            {contentForm.type === 'image' && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Slide Images</label>
                <input
                  type="file"
                  name="slideImages"
                  accept="image/*"
                  multiple
                  onChange={handleContentFileChange}
                  className="block w-full text-sm text-slate-600"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Order</label>
              <input
                type="number"
                name="order"
                value={contentForm.order}
                onChange={handleContentChange}
                min="0"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Add Content
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {contentList.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <div>
                  <span className="font-semibold text-slate-800">{item.title}</span> <span className="text-slate-500">({item.type})</span>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                  onClick={() => handleDeleteContent(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseForm;