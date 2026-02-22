const LoadingSpinner = ({ message = 'Loading...', size = 'default' }) => {
  const ringSize = {
    small: { width: 40, stroke: 3 },
    default: { width: 56, stroke: 4 },
    large: { width: 72, stroke: 5 },
  };

  const { width, stroke } = ringSize[size] || ringSize.default;
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5">
      <div className="relative" style={{ width, height: width }}>
        {/* Outer pulse ring */}
        <span
          className="absolute inset-0 rounded-full border-2 border-brand-orange/20"
          style={{ animation: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />

        {/* SVG spinner */}
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          className="relative"
          style={{ animation: 'spinSmooth 1.8s linear infinite' }}
        >
          {/* Track */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-brand-teal/10 dark:text-slate-700"
          />
          {/* Arc */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.7}
            style={{ animation: 'arcPulse 1.8s ease-in-out infinite' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center glow dot */}
        <span
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(249,115,22,0.6)]"
          style={{ animation: 'dotGlow 1.8s ease-in-out infinite' }}
        />
      </div>

      {message && (
        <p className="text-sm font-medium tracking-wide text-brand-teal/60 dark:text-slate-400"
           style={{ animation: 'fadeText 1.8s ease-in-out infinite' }}>
          {message}
        </p>
      )}

      <style>{`
        @keyframes spinSmooth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes arcPulse {
          0%, 100% { stroke-dashoffset: ${circumference * 0.75}; }
          50% { stroke-dashoffset: ${circumference * 0.55}; }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.12); opacity: 0.15; }
        }
        @keyframes dotGlow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
        }
        @keyframes fadeText {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;