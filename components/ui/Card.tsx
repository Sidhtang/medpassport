import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
  accent?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  hoverEffect?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  icon, 
  className = '', 
  children,
  accent = 'primary',
  hoverEffect = false,
  onClick
}) => {
  const accentColors = {
    primary: 'before:bg-primary-500',
    secondary: 'before:bg-secondary-500',
    accent: 'before:bg-accent-500',
    success: 'before:bg-success',
    warning: 'before:bg-warning',
    error: 'before:bg-error'
  };

  const accentShadow = {
    primary: 'hover:shadow-primary-glow',
    secondary: 'hover:shadow-lg hover:shadow-secondary-500/20',
    accent: 'hover:shadow-accent-glow',
    success: 'hover:shadow-lg hover:shadow-success/20',
    warning: 'hover:shadow-lg hover:shadow-warning/20',
    error: 'hover:shadow-lg hover:shadow-error/20'
  };
  
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-md overflow-hidden relative
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1.5 
        ${accentColors[accent]}
        ${hoverEffect ? `transition-all duration-300 ${accentShadow[accent]}` : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          {icon && <div className="mr-3 text-gray-600">{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
