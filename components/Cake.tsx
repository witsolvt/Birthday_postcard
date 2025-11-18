
import React from 'react';
import Candle from './Candle';



interface CakeProps {
  isBlownOut: boolean;
}

const Cake: React.FC<CakeProps> = ({ isBlownOut }) => {
  return (
    <div className="relative flex flex-col items-center justify-end">
      
      <div className="relative transition-transform duration-500 hover:scale-105">
        
        <img 
            src="https://raw.githubusercontent.com/witsolvt/Birthday_postcard/main/components/pictures/cake.png" 
            alt="Birthday Cake" 
            className="w-72 h-auto object-contain drop-shadow-2xl"
        />

        {/* Candles - Positioned relative to the image */}
        <div className="absolute bottom-[85%] left-1/2 -translate-x-1/2 flex gap-4 z-40">
            <div className="transform -rotate-6 origin-bottom">
                <Candle number="2" isBlownOut={isBlownOut} />
            </div>
            <div className="transform rotate-6 origin-bottom">
                <Candle number="7" isBlownOut={isBlownOut} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default Cake;
