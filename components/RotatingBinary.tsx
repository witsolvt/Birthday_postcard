
import React from 'react';

interface RotatingBinaryProps {
  binary: string;
}

const RotatingBinary: React.FC<RotatingBinaryProps> = ({ binary }) => {
  return (
    <div className="flex items-center justify-center w-28 h-28 bg-purple-200/80 rounded-full animate-spin [animation-duration:10s] shadow-lg ring-2 ring-purple-300">
      <span className="text-3xl font-mono font-bold text-purple-800" style={{ animation: 'spin 10s linear infinite reverse' }}>
        {binary}
      </span>
    </div>
  );
};

export default RotatingBinary;
