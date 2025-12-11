import { useState, useEffect, useRef } from "react";
import cameraSound from "@/assets/camera-shutter.m4a";

interface LogoAnimationProps {
  onComplete: () => void;
}

const LogoAnimation = ({ onComplete }: LogoAnimationProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [flashPhase, setFlashPhase] = useState<"off" | "in" | "hold" | "out">("off");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // "faces" in lowercase with last 's' in red
  const letters = [
    { char: "f", isRed: false },
    { char: "a", isRed: false },
    { char: "c", isRed: false },
    { char: "e", isRed: false },
    { char: "s", isRed: true },
  ];

  // Play the uploaded camera sound
  const playCameraSound = () => {
    try {
      const audio = new Audio(cameraSound);
      audio.volume = 1.0;
      audioRef.current = audio;
      audio.play();
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  useEffect(() => {
    // Type in letters one by one (slower - 300ms per letter)
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev < letters.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);

    // After all letters, start flash sequence
    const flashInTimeout = setTimeout(() => {
      clearInterval(letterInterval);
      playCameraSound();
      setShowFlash(true);
      setFlashPhase("in");
    }, letters.length * 300 + 800);

    // Flash reaches full white
    const flashHoldTimeout = setTimeout(() => {
      setFlashPhase("hold");
    }, letters.length * 300 + 1100);

    // Complete - transition to home page while screen is white
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, letters.length * 300 + 1400);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(flashInTimeout);
      clearTimeout(flashHoldTimeout);
      clearTimeout(completeTimeout);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [onComplete, letters.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground overflow-hidden">
      {/* Camera Flash Effect - covers entire screen */}
      {showFlash && (
        <>
          {/* Main flash */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 100%)',
              animation: flashPhase === "in" 
                ? "cameraFlashIn 0.15s ease-out forwards" 
                : flashPhase === "hold" 
                  ? "none" 
                  : undefined,
              opacity: flashPhase === "in" ? 0 : 1,
            }}
          />
          {/* Flash burst rays */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.3) 10deg, transparent 20deg, rgba(255,255,255,0.2) 30deg, transparent 40deg, rgba(255,255,255,0.3) 50deg, transparent 60deg)',
              animation: flashPhase === "in" ? "flashBurst 0.2s ease-out forwards" : undefined,
              opacity: flashPhase === "in" ? 0 : flashPhase === "hold" ? 0.5 : 0,
            }}
          />
        </>
      )}

      {/* Logo Letters */}
      <div className="flex items-center justify-center gap-0">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`text-7xl md:text-9xl font-bold tracking-wider ${
              index < visibleLetters ? "animate-type-in" : "opacity-0"
            } ${letter.isRed ? "text-primary" : "text-background"}`}
            style={{
              animationDelay: `${index * 0.12}s`,
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            {letter.char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoAnimation;