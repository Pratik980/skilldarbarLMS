const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'active':
        return 'bg-brand-orange/15 text-brand-orangeDark';
      case 'pending':
        return 'bg-brand-teal/10 text-brand-teal';
      case 'rejected':
      case 'inactive':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-brand-teal/10 text-brand-teal/80';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;