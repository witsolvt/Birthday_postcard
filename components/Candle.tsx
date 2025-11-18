
import React from 'react';

interface CandleProps {
  number: string;
  className?: string;
  isBlownOut?: boolean;
}

const Candle: React.FC<CandleProps> = ({ number, className, isBlownOut = false }) => {
  // Determine color based on number
  const getColor = (num: string) => {
    const colors = {
      '0': 'text-yellow-500',
      '1': 'text-blue-500',
      '2': 'text-green-500',
      '3': 'text-purple-500',
      '4': 'text-orange-500',
      '5': 'text-pink-500',
      '6': 'text-cyan-500',
      '7': 'text-red-500',
      '8': 'text-indigo-500',
      '9': 'text-teal-500',
    };
    return (colors as any)[num] || 'text-red-500';
  };

  const colorClass = getColor(number);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Flame Group */}
      <div className={`absolute -top-14 w-8 h-16 flex justify-center transition-all duration-300 ease-out ${isBlownOut ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
         {/* Outer Glow */}
         <div className="absolute bottom-0 w-6 h-10 bg-orange-300/50 rounded-full blur-md animate-pulse"></div>
         {/* Main Flame */}
         <div className="absolute bottom-0 w-4 h-10 bg-gradient-to-t from-yellow-100 via-yellow-400 to-orange-500 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] animate-[wiggle_2s_ease-in-out_infinite] shadow-[0_-5px_10px_rgba(255,200,0,0.8)] origin-bottom"></div>
         {/* Inner Blue Core */}
         <div className="absolute bottom-1 w-1.5 h-3 bg-blue-500/60 rounded-full blur-[1px]"></div>
      </div>

      {/* Smoke Effect (Triggers when blown out) */}
      {isBlownOut && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-10 h-32 pointer-events-none">
            {/* Multiple smoke particles */}
             <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-400/40 rounded-full blur-md animate-[smoke-rise_2s_ease-out_forwards]"></div>
             <div className="absolute bottom-0 left-1/2 w-5 h-5 bg-gray-300/30 rounded-full blur-md animate-[smoke-rise_2.5s_ease-out_forwards_0.2s]"></div>
             <div className="absolute bottom-2 left-1/2 w-3 h-3 bg-gray-500/20 rounded-full blur-sm animate-[smoke-rise_3s_ease-out_forwards_0.1s]"></div>
        </div>
      )}

      {/* Wick */}
      <div className="w-1 h-3 bg-gray-800 -mb-1 z-10"></div>

      {/* 3D Number Candle */}
      <div className="relative z-20 filter drop-shadow-lg">
        {/* The Number SVG for custom shape/stroke */}
        <svg width="60" height="80" viewBox="0 0 60 80" className={`fill-current ${colorClass} overflow-visible`}>
            <defs>
                <filter id="plastic" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                    <feOffset in="blur" dx="2" dy="4" result="offsetBlur"/>
                    <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lightingColor="#ffffff" result="specOut">
                        <fePointLight x="-5000" y="-10000" z="20000"/>
                    </feSpecularLighting>
                    <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                    <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
                    <feMerge>
                        <feMergeNode in="offsetBlur"/>
                        <feMergeNode in="litPaint"/>
                    </feMerge>
                </filter>
            </defs>
            <text x="30" y="70" fontSize="80" fontWeight="900" textAnchor="middle" filter="url(#plastic)" stroke="rgba(0,0,0,0.1)" strokeWidth="1">
                {number}
            </text>
        </svg>
      </div>
    </div>
  );
};

export default Candle;
