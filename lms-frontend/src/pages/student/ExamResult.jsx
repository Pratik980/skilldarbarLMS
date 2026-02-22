import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { certificateAPI, progressAPI } from '../../api';
import { CheckCircle, XCircle, Download, Home, Award } from 'lucide-react';

const ExamResult = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [progress, setProgress] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!result) {
      navigate(`/student/courses/${courseId}/exam`);
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const progressResponse = await progressAPI.getCourseProgress(courseId);
      if (progressResponse.success) {
        setProgress(progressResponse.data);
      }

      if (result.passed) {
        const certResponse = await certificateAPI.getCertificate(courseId);
        if (certResponse.success) {
          setCertificate(certResponse.data);
        }
      }
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      setDownloading(true);
      const response = await certificateAPI.downloadCertificate(courseId);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${courseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading certificate', err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand-teal/20 border-t-brand-orange dark:border-slate-600 dark:border-t-brand-orange"></div>
          <p className="text-sm text-brand-teal/70 dark:text-slate-400">Processing results...</p>
        </div>
      </div>
    );
  }

  const passingPercentage = result.passingPercentage || 60;
  const scorePercentage = Math.min(100, Math.max(0, result.score)).toFixed(0);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white shadow-lg shadow-black/5 overflow-hidden">
        <div className={`px-6 py-6 text-center ${result.passed ? 'bg-brand-orange/10' : 'bg-red-100'}`}>
          {result.passed ? (
            <CheckCircle className="mx-auto h-10 w-10 text-brand-orangeDark" />
          ) : (
            <XCircle className="mx-auto h-10 w-10 text-red-600" />
          )}
          <div className="mt-3 text-xl font-bold text-brand-teal">
            {result.passed ? '✓ Exam Passed!' : '✗ Exam Failed'}
          </div>
          <div className="mt-2 text-sm text-brand-teal/70">
            {result.passed
              ? 'Congratulations! You have successfully passed the exam and earned a certificate.'
              : 'Unfortunately, you did not achieve the required passing score. This was your only attempt. Please contact support if you have any questions.'}
          </div>
        </div>

        <div className="px-6 py-6 space-y-5">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Your Score</div>
            <div className="mt-2 text-4xl font-bold text-brand-teal">{scorePercentage}%</div>
            <div className="mt-2 text-sm text-brand-teal/70">
              {result.correctAnswers} out of {result.totalQuestions} questions correct
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-brand-teal/10 bg-brand-teal/5 p-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Required Score</div>
              <div className="mt-2 text-lg font-bold text-brand-teal">{passingPercentage}%</div>
            </div>
            <div className="rounded-xl border border-brand-teal/10 bg-brand-teal/5 p-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Your Score</div>
              <div className={`mt-2 text-lg font-bold ${result.passed ? 'text-brand-orangeDark' : 'text-red-600'}`}>{scorePercentage}%</div>
            </div>
          </div>

          {result.passed && certificate && (
            <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orangeDark">
                <Award size={20} /> 🎓 Certificate Earned!
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-teal/20 bg-white px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5"
            >
              <Home size={16} /> Dashboard
            </button>

            {result.passed && certificate && (
              <button
                onClick={handleDownloadCertificate}
                disabled={downloading}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark disabled:opacity-60"
              >
                <Download size={16} /> {downloading ? 'Downloading...' : 'Download Certificate'}
              </button>
            )}
          </div>
        </div>
      </div>

      {result.passed && (
        <div className="rounded-2xl border border-white/10 bg-white p-6 text-center shadow-lg shadow-black/5">
          <h3 className="text-lg font-semibold text-brand-teal">What's Next?</h3>
          <p className="mt-2 text-sm text-brand-teal/70">
            Your certificate has been generated and is ready to download. You can access it anytime from your certificates section.
          </p>
          <button
            onClick={() => navigate('/student/certificates')}
            className="mt-4 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
          >
            View All Certificates
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamResult;
