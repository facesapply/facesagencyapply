import { useState, useEffect } from "react";

interface LogoAnimationProps {
  onComplete: () => void;
}

const LogoAnimation = ({ onComplete }: LogoAnimationProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const letters = ["F", "A", "C", "E", "S"];

  useEffect(() => {
    // Type in letters one by one
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev < letters.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 120);

    // After all letters, trigger flash
    const flashTimeout = setTimeout(() => {
      clearInterval(letterInterval);
      setShowFlash(true);
    }, letters.length * 120 + 100);

    // Complete animation after flash
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, letters.length * 120 + 500);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(flashTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, letters.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Camera Flash Effect */}
      {showFlash && (
        <div className="absolute inset-0 bg-white animate-flash pointer-events-none" />
      )}

      {/* Logo Letters */}
      <div className="flex items-center justify-center gap-1">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`text-7xl md:text-9xl font-bold text-primary tracking-wider ${
              index < visibleLetters ? "animate-type-in" : "opacity-0"
            }`}
            style={{
              animationDelay: `${index * 0.12}s`,
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoAnimation;