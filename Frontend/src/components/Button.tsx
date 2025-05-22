import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  primary = false, 
  onClick,
  className = ''
}) => {
  const baseClasses = "px-6 py-3 rounded-md font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const styleClasses = primary
    ? "bg-white text-gray-900 hover:bg-gray-200 focus:ring-white"
    : "bg-transparent text-white border border-white hover:bg-white hover:text-gray-900 focus:ring-white";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${styleClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;