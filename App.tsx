
import React, { useState, useEffect, useRef } from 'react';
import Cake from './components/Cake';
import AnalogCounter from './components/AnalogCounter';
import Kitten from './components/Kitten';
import Fireworks from './components/Fireworks';
import Confetti from './components/Confetti';

const App: React.FC = () => {
  const ageBinary = (27).toString(2); // "11011"
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;

      setAudioAllowed(true);
      detectBlow();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Pro sfouknutí svíček je potřeba povolit mikrofon!");
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Simple algorithm: Check average volume
    let sum = 0;
    const data = dataArrayRef.current;
    for(let i = 0; i < data.length; i++) {
        sum += data[i];
    }
    const average = sum / data.length;

    // Threshold for "blowing"
    if (average > 50) { 
       setIsBlownOut(true);
    }

    if (!isBlownOut) {
        animationFrameRef.current = requestAnimationFrame(detectBlow);
    }
  };

  const handleRelight = () => {
    setIsBlownOut(false);
    // Restart detection loop if audio is allowed
    if (audioAllowed && analyserRef.current) {
        detectBlow();
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fefce8] font-sans flex flex-col items-center justify-center p-4 overflow-hidden text-center relative selection:bg-orange-200">
      
      {/* Effects Overlay */}
      {isBlownOut && <Fireworks />}
      {isBlownOut && <Confetti />}

      {/* Header */}
      <header className="mb-8 z-10 relative animate-fade-in-down">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-800 tracking-tight drop-shadow-sm">
          Vašku,
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600 mt-2">
          všechno nejlepší k narozeninám!
        </h2>
      </header>

      {/* Cake Section */}
      <div className="relative z-10 scale-90 sm:scale-100 mb-8 mt-4">
        <Cake isBlownOut={isBlownOut} />
      </div>

      {/* Binary Age Counter Sentence with Kitten sitting ON TOP */}
      <div className="relative z-20 mt-8 group">
        
        <div className="relative inline-block">
             {/* Kitten sitting on top of the text box */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 z-30 transition-transform duration-300 hover:scale-110">
                <Kitten className="w-full h-full" />
            </div>

            {/* Text Container */}
            <div className="flex items-center justify-center flex-wrap text-gray-700 text-lg sm:text-xl font-medium bg-white/90 backdrop-blur-md px-12 py-6 rounded-2xl shadow-xl border border-white/60 transform transition-all hover:scale-105 relative overflow-visible">
                <span className="mr-2">V jazyce nul a jedniček je ti</span>
                <AnalogCounter binary={ageBinary} />
                <span className="ml-2">let!</span>
            </div>
        </div>

      </div>

      {/* Microphone Control & Relight */}
      <div className="mt-12 h-16 relative z-30 flex flex-col items-center justify-center">
        {!audioAllowed && !isBlownOut && (
            <button 
                onClick={startListening}
                className="px-8 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-bounce flex items-center gap-2"
            >
                <span className="text-xl">🎤</span> 
                <span>Sfouknout svíčky</span>
            </button>
        )}

        {audioAllowed && !isBlownOut && (
             <div className="text-gray-500 animate-pulse font-medium">
                Foukněte do mikrofonu...
             </div>
        )}

        {isBlownOut && (
            <div className="flex flex-col items-center gap-4 animate-[pop_0.5s_ease-out_forwards]">
                <div className="text-3xl font-bold text-green-600 flex items-center gap-2 drop-shadow-sm">
                    <span>🎉</span> Hurá! <span>🎉</span>
                </div>
                <button 
                    onClick={handleRelight}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-md transition-colors text-sm"
                >
                    Zapálit znovu 🔥
                </button>
            </div>
        )}
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         {/* Soft glow behind cake */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-3xl"></div>
      </div>

      {/* Global Styles for custom animations */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: scaleY(1) rotate(-2deg); }
          50% { transform: scaleY(1.1) rotate(2deg); }
        }
        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-100px) scale(2.5); opacity: 0; }
        }
        @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

    </main>
  );
};

export default App;
