import React, { useState, useRef, useEffect } from 'react';

interface DraggableCardProps {
  children: React.ReactNode;
  className?: string;
  initialPosition?: { x: number, y: number };
  allowDrag?: boolean;
  variant?: 'default' | 'primary' | 'healing' | 'urgent' | 'mint';
  onDrop?: (position: { x: number, y: number }) => void;
  title?: string;
  icon?: React.ReactNode;
  isAnimated?: boolean;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  children,
  className = "",
  initialPosition = { x: 0, y: 0 },
  allowDrag = true,
  variant = 'default',
  onDrop,
  title,
  icon,
  isAnimated = true,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, left: 0, top: 0 });

  const variantStyles = {
    default: 'border-neutral-200 bg-white',
    primary: 'border-primary-200 bg-primary-50',
    healing: 'border-healing-200 bg-healing-50',
    urgent: 'border-urgent-200 bg-urgent-50',
    mint: 'border-mint-200 bg-mint-50',
  };

  const variantTitleStyles = {
    default: 'text-text-dark',
    primary: 'text-primary-700',
    healing: 'text-healing-700',
    urgent: 'text-urgent-700',
    mint: 'text-mint-700',
  };

  const animationClass = isAnimated ? 'animate-fade-in' : '';
  const draggingClass = isDragging ? 'cursor-grabbing shadow-lg opacity-90 z-50' : 'cursor-grab';

  useEffect(() => {
    if (!cardRef.current) return;
    
    const handleMouseDown = (e: MouseEvent) => {
      if (!allowDrag) return;
      setIsDragging(true);
      
      const rect = cardRef.current!.getBoundingClientRect();
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        left: rect.left,
        top: rect.top,
      };
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      const newLeft = dragStartRef.current.left + deltaX;
      const newTop = dragStartRef.current.top + deltaY;
      
      setPosition({
        x: newLeft,
        y: newTop,
      });
    };
    
    const handleMouseUp = () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      if (onDrop) onDrop(position);
    };
    
    cardRef.current.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      cardRef.current?.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, allowDrag, onDrop, position]);

  return (
    <div
      ref={cardRef}
      className={`
        rounded-xl border shadow-card transition-shadow 
        ${variantStyles[variant]} 
        ${draggingClass}
        ${className}
        ${animationClass}
      `}
      style={{
        transform: isDragging ? `translate(${position.x}px, ${position.y}px)` : undefined,
        position: isDragging ? 'absolute' : 'relative',
      }}
    >
      {title && (
        <div className={`
          flex items-center gap-2 p-3 border-b border-neutral-200 
          ${variantTitleStyles[variant]}
          ${allowDrag ? 'cursor-grab' : ''}
        `}>
          {icon && <div>{icon}</div>}
          <h3 className="font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DraggableCard;
