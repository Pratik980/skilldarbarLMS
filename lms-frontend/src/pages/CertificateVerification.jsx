import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { certificateAPI } from '../../api';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const CertificateVerification = () => {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    verifyCertificate();
  }, [certificateId]);

  const verifyCertificate = async () => {
    try {
      const response = await certificateAPI.verifyCertificate(certificateId);
      if (response.success) {
        setCertificate(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid certificate ID');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-teal via-[#1B3F4C] to-[#14323C] px-4 font-sans">
        <div className="flex flex-col items-center gap-3 text-white/80">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-brand-orange"></div>
          <p className="text-sm font-medium">Verifying Certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-teal via-[#1B3F4C] to-[#14323C] px-4 font-sans">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/95 p-8 text-center shadow-2xl">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-brand-orange">Certificate Not Found</h1>
          <p className="mt-2 text-sm text-brand-teal/70">
            The certificate you are trying to verify does not exist or has been revoked.
            Please check the certificate ID and try again.
          </p>
          {certificateId && (
            <div className="mt-4 rounded-lg border border-brand-teal/10 bg-brand-teal/5 px-3 py-2 text-xs font-semibold text-brand-teal">
              Certificate ID: {certificateId}
            </div>
          )}
          <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-teal via-[#1B3F4C] to-[#14323C] px-4 py-10 font-sans">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/95 shadow-2xl">
          <div className="border-b border-brand-teal/10 px-8 py-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-brand-orange" />
            <h1 className="mt-3 text-2xl font-bold text-brand-orange">Certificate Verified</h1>
            <p className="mt-2 text-sm text-brand-teal/70">This certificate has been verified as authentic</p>
          </div>

          <div className="px-8 py-6 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Awarded To</div>
              <div className="mt-2 text-xl font-semibold text-brand-teal">{certificate.studentName}</div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Course Completed</div>
              <div className="mt-2 text-xl font-semibold text-brand-orangeDark">{certificate.courseName}</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-teal/10 bg-brand-teal/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Final Score</div>
                <div className="mt-2 text-2xl font-bold text-brand-orangeDark">{certificate.score}%</div>
              </div>
              <div className="rounded-xl border border-brand-teal/10 bg-brand-teal/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Issue Date</div>
                <div className="mt-2 text-sm font-semibold text-brand-teal">
                  {new Date(certificate.issuedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Certificate ID</div>
              <div className="mt-2 rounded-lg border border-brand-teal/10 bg-brand-teal/5 px-3 py-2 text-sm font-semibold text-brand-teal">
                {certificate.certificateId}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Verification Status</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-3 py-1 text-sm font-semibold text-brand-orangeDark">
                <CheckCircle className="h-4 w-4" />
                Verified & Authentic
              </div>
            </div>

            <div className="rounded-xl border border-brand-teal/10 bg-brand-teal/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-teal">
                <span>🔒</span>
                Security Stamp
              </div>
              <p className="mt-2 text-sm text-brand-teal/70">
                This certificate is cryptographically secured and blockchain-verified
              </p>
            </div>

            <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-4">
              <div className="text-sm font-semibold text-brand-orangeDark">Verification Information</div>
              <p className="mt-2 text-sm text-brand-orangeDark">
                This certificate has been issued by our Learning Management System upon successful 
                completion of the course. The authenticity of this certificate can be verified at 
                any time using the certificate ID shown above. For any queries or concerns, please 
                contact our support team.
              </p>
            </div>

            <div className="text-center text-xs tracking-widest text-brand-teal/40">✦ ✦ ✦</div>

            <div className="text-center">
              <div className="text-sm font-semibold text-brand-teal">Learning Management System</div>
              <div className="mt-1 text-xs text-brand-teal/60">
                © {new Date().getFullYear()} All Rights Reserved
                <br />
                Empowering learners through quality education and verified achievements
              </div>
            </div>
          </div>
        </div>

        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CertificateVerification;
