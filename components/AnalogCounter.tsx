import React from 'react';

interface AnalogCounterProps {
  binary: string;
}

const AnalogCounter: React.FC<AnalogCounterProps> = ({ binary }) => {
  const digits = binary.split('');

  return (
    <div className="inline-flex gap-1 px-2 py-1 bg-neutral-800 rounded-md shadow-lg border-t-2 border-neutral-700 align-middle mx-2 transform -translate-y-1">
      {digits.map((digit, index) => (
        <div key={index} className="relative group">
          {/* Mechanical housing for the digit */}
          <div className="w-6 h-9 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-[2px] flex items-center justify-center border border-neutral-950 overflow-hidden relative">
             {/* The wheel highlight */}
             <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
             
             {/* The number */}
             <span className="font-mono text-lg font-bold text-neutral-100 drop-shadow-md z-10 leading-none">
               {digit}
             </span>

             {/* Horizontal divider line to simulate split flap or wheel mechanism */}
             <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/60 z-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalogCounter;