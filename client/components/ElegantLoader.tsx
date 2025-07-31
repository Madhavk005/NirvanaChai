import { useEffect, useState } from 'react';

interface ElegantLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function ElegantLoader({ isLoading, onComplete }: ElegantLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Sourcing premium tea leaves...",
    "Selecting the finest blends...",
    "Preparing your tea journey...",
    "Almost ready to serve..."
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.8;
          
          // Update message based on progress
          if (newProgress >= 75 && currentMessage < 3) {
            setCurrentMessage(3);
          } else if (newProgress >= 50 && currentMessage < 2) {
            setCurrentMessage(2);
          } else if (newProgress >= 25 && currentMessage < 1) {
            setCurrentMessage(1);
          }
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => onComplete?.(), 800);
            return 100;
          }
          return newProgress;
        });
      }, 25);
      
      return () => clearInterval(interval);
    }
  }, [isLoading, onComplete, currentMessage]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-sage-50 via-off-white to-clay-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Tea Leaves Circle */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 border-4 border-sage-200 rounded-full animate-pulse"></div>
          
          {/* Tea leaves orbiting */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 flex items-center justify-center"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-48px)`,
                animation: `spin ${3 + i * 0.2}s linear infinite`,
              }}
            >
              <div 
                className="text-sage-600 text-lg animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              >
                🍃
              </div>
            </div>
          ))}
          
          {/* Center tea cup */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-sage-400 to-chai-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white text-xl">🫖</span>
            </div>
          </div>
          
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#9CA68C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>

        {/* Brand and Message */}
        <div className="space-y-4 max-w-md mx-auto">
          <h2 className="text-3xl font-heading font-bold text-sage-800 tracking-wide">
            Nirvana Chai
          </h2>
          
          <div className="h-8 flex items-center justify-center">
            <p 
              key={currentMessage}
              className="text-sage-600 text-lg animate-fade-in"
            >
              {messages[currentMessage]}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="w-64 h-1 bg-sage-200 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sage-500 via-chai-500 to-clay-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Percentage */}
          <p className="text-sm text-sage-500 font-medium">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-sage-300/40 animate-float"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                fontSize: `${12 + Math.random() * 8}px`,
              }}
            >
              🍃
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg) translateY(-48px); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateY(-48px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
