import React from 'react';
import Image from 'next/image';

interface MedicalImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  hover?: boolean;
  animate?: boolean;
}

const MedicalImage: React.FC<MedicalImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  rounded = true,
  shadow = true,
  hover = true,
  animate = false,
}) => {
  // Determine classes based on props
  const roundedClass = rounded ? 'rounded-xl' : '';
  const shadowClass = shadow ? 'shadow-md' : '';
  const hoverClass = hover ? 'transition-transform duration-300 hover:scale-[1.02]' : '';
  const animateClass = animate ? 'animate-fade-in' : '';

  return (
    <div className={`relative overflow-hidden ${roundedClass} ${shadowClass} ${hoverClass} ${animateClass} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default MedicalImage;
