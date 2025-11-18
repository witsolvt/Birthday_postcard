
import React from 'react';

interface KittenProps {
  className?: string;
  variant?: 'sleeping' | 'peeking';
}

const Kitten: React.FC<KittenProps> = ({ className }) => {
  return (
    <div className={`${className} pointer-events-none drop-shadow-lg`}>
      <img 
        src="./pictures/kitten.png" 
        alt="Cute Kitten" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Kitten;
