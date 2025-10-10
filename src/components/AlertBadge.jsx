const AlertBadge = ({ riskLevel, size = 'normal', animated = false }) => {
  const getColorClasses = (level) => {
    switch (level) {
      case 'High':
        return 'bg-gradient-to-r from-danger-50 to-danger-100 text-danger-700 border-danger-200 shadow-glow-red';
      case 'Medium':
        return 'bg-gradient-to-r from-warning-50 to-warning-100 text-warning-700 border-warning-200 shadow-glow-orange';
      case 'Low':
        return 'bg-gradient-to-r from-success-50 to-success-100 text-success-700 border-success-200 shadow-glow-green';
      default:
        return 'bg-gradient-to-r from-neutral-50 to-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'small':
        return 'px-2.5 py-1 text-2xs';
      case 'large':
        return 'px-5 py-2.5 text-base';
      default:
        return 'px-3 py-1.5 text-xs';
    }
  };

  const getIcon = (level) => {
    const iconSize = size === 'small' ? 'w-3 h-3' : size === 'large' ? 'w-5 h-5' : 'w-3.5 h-3.5';
    
    switch (level) {
      case 'High':
        return (
          <svg className={`${iconSize} mr-1.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'Medium':
        return (
          <svg className={`${iconSize} mr-1.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Low':
        return (
          <svg className={`${iconSize} mr-1.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getAnimationClass = (level, animated) => {
    if (!animated) return '';
    
    switch (level) {
      case 'High':
        return 'animate-pulse-soft';
      case 'Medium':
        return 'animate-bounce-subtle';
      default:
        return '';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-semibold 
        transition-all duration-300 hover:scale-105 hover:shadow-medium
        ${getColorClasses(riskLevel)} 
        ${getSizeClasses(size)} 
        ${getAnimationClass(riskLevel, animated)}
      `}
    >
      {getIcon(riskLevel)}
      <span className="font-bold tracking-wide uppercase">
        {riskLevel} Risk
      </span>
    </span>
  );
};

export default AlertBadge;