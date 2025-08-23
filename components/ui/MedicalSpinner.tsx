import React from 'react';
import { MedicalCrossIcon } from './HealthIcons';

interface MedicalSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'healing' | 'urgent' | 'mint';
  text?: string;
  className?: string;
}

const MedicalSpinner: React.FC<MedicalSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  text,
  className = '' 
}) => {
  // Size mapping
  const sizeMap = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  // Color mapping
  const colorMap = {
    primary: 'text-primary-500',
    healing: 'text-healing-500',
    urgent: 'text-urgent-500',
    mint: 'text-mint-500'
  };

  const glow = {
    primary: 'shadow-primary-glow',
    healing: 'shadow-healing-glow',
    urgent: 'shadow-urgent-500/50',
    mint: 'shadow-mint-500/50'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin ${sizeMap[size]} ${colorMap[color]} ${glow[color]} rounded-full p-2`}>
        <MedicalCrossIcon className="h-full w-full" />
      </div>
      {text && (
        <p className={`mt-3 text-sm font-medium ${colorMap[color]}`}>{text}</p>
      )}
    </div>
  );
};

export default MedicalSpinner;
