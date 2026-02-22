import React, { useEffect, useState } from 'react';
import { certificateAPI } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Download, Award, BookOpen, Star, CheckCircle, Calendar } from 'lucide-react';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await certificateAPI.getStudentCertificates();
      if (response.success) {
        setCertificates(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = async (courseId, courseName) => {
    try {
      setDownloading(courseId);
      const response = await certificateAPI.downloadCertificate(courseId);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${courseName || courseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading certificate', err);
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <div className="flex items-center gap-3">
          <Award size={36} className="text-brand-orange" />
          <div>
            <h1 className="text-2xl font-bold text-brand-orange">My Achievements</h1>
            <p className="text-sm text-brand-teal/70">View and manage your earned certificates and accomplishments</p>
          </div>
        </div>
      </div>

      {certificates.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orangeDark">
                <Award size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-teal">{certificates.length}</div>
                <div className="text-xs text-brand-teal/60">Certificates Earned</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
                <BookOpen size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-teal">{certificates.length}</div>
                <div className="text-xs text-brand-teal/60">Courses Completed</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orangeDark">
                <Star size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-teal">
                  {Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length)}%
                </div>
                <div className="text-xs text-brand-teal/60">Average Score</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100">
          {error}
        </div>
      )}

      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white p-10 text-center shadow-lg shadow-black/5">
          <Award className="mx-auto h-12 w-12 text-brand-teal/30" />
          <div className="mt-3 text-xl font-semibold text-brand-teal">No Achievements Yet</div>
          <div className="mt-2 text-sm text-brand-teal/70">
            Complete courses and pass exams to earn certificates and build your achievements. Start your learning journey today!
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert._id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg shadow-black/5">
              <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">
                <CheckCircle size={16} /> Certified
              </div>

              <div className="border-b border-brand-teal/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
                    <BookOpen size={26} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-teal">
                      {cert.course?.name || 'Course Certificate'}
                    </div>
                    <div className="text-xs text-brand-teal/60">Certificate of Completion</div>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Certificate ID</div>
                  <div className="mt-2 rounded-lg border border-brand-teal/10 bg-brand-teal/5 px-3 py-2 text-xs font-semibold text-brand-teal">
                    {cert.certificateId}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orangeDark">
                      <Star size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-brand-teal/60">Final Score</div>
                      <div className="text-sm font-semibold text-brand-orangeDark">{cert.score}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-brand-teal/60">Issued On</div>
                      <div className="text-sm font-semibold text-brand-teal">
                        {new Date(cert.issuedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadCertificate(cert.course?._id || cert.course, cert.course?.name)}
                  disabled={downloading === cert._id}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark disabled:opacity-60"
                >
                  <Download size={16} />
                  {downloading === cert._id ? 'Downloading...' : 'Download PDF'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
