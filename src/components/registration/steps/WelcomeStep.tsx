import { useState } from "react";
import partnersFull from "@/assets/partners-full.png";

interface WelcomeStepProps {
  onGenderSelect: (gender: "male" | "female") => void;
}

type Phase = "ready-question" | "declined" | "gender-selection";

const WelcomeStep = ({ onGenderSelect }: WelcomeStepProps) => {
  const [phase, setPhase] = useState<Phase>("ready-question");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-8 pb-4">
        <h1
          className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold mb-6 tracking-wider"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="text-foreground">FACE</span>
          <span className="text-primary">S</span>
        </h1>

        {phase === "ready-question" && (
          <div className="animate-fade-in">
            <p className="text-lg md:text-xl text-muted-foreground mb-6 font-medium font-serif">
              You can now have that chance to work, create, and perform, for the best and most favourable brands internationally
            </p>

            {/* Ready question */}
            <div className="w-full max-w-sm mb-8 mx-auto">
              <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <p className="text-foreground font-medium">
                  Are you ready to join the FACES community?
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setPhase("gender-selection")}
                  className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                >
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    Yes
                  </span>
                </button>
                <button
                  onClick={() => setPhase("declined")}
                  className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                >
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    No
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === "declined" && (
          <div className="animate-fade-in w-full max-w-sm mx-auto">
            <p className="text-2xl text-muted-foreground mb-6">
              😢 Come back whenever you feel ready. Hope to see you at FACES soon!
            </p>
            <button
              onClick={() => setPhase("ready-question")}
              className="py-4 px-8 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
            >
              <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                Try again
              </span>
            </button>
          </div>
        )}

        {phase === "gender-selection" && (
          <div className="animate-fade-in w-full max-w-sm mb-8 mx-auto">
            <p className="text-muted-foreground text-sm mb-6">I am a...</p>
            <div className="flex gap-4">
              <button
                onClick={() => onGenderSelect("female")}
                className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
              >
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Female
                </span>
              </button>
              <button
                onClick={() => onGenderSelect("male")}
                className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
              >
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Male
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Partner logos section - Netflix-style infinite scroll */}
      <div className="bg-background py-6">
        <p className="text-sm text-muted-foreground text-center mb-4">
          Trusted by leading brands
        </p>

        {/* Single row - infinite scroll */}
        <div className="overflow-hidden">
          <div className="logo-scroll-container animate-scroll-left">
            <img
              src={partnersFull}
              alt="Partners"
              className="h-32 md:h-40 lg:h-48 object-contain px-4"
            />
            <img
              src={partnersFull}
              alt="Partners"
              className="h-32 md:h-40 lg:h-48 object-contain px-4"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/60 text-center mt-4">
          Note: Due to high demand, not everyone will be selected.
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
