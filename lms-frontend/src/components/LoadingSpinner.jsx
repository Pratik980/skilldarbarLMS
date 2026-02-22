const LoadingSpinner = ({ message = 'Loading...', size = 'default' }) => {
  const sizes = {
    small: 'h-6 w-6 border-2',
    default: 'h-10 w-10 border-4',
    large: 'h-14 w-14 border-4',
  };

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-brand-teal/70 dark:text-slate-400">
      <div className={`${sizes[size] || sizes.default} animate-spin rounded-full border-brand-teal/20 border-t-brand-orange dark:border-slate-600 dark:border-t-brand-orange`}></div>
      {message && <p className="text-sm font-medium animate-pulse">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;