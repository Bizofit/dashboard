export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-blue hover:bg-primary-dark text-white focus:ring-primary-blue',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
    danger: 'bg-danger hover:bg-red-600 text-white focus:ring-danger',
    success: 'bg-success hover:bg-green-600 text-white focus:ring-success',
    orange: 'bg-accent-orange hover:bg-orange-600 text-white focus:ring-accent-orange',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
