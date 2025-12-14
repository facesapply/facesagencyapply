import { useState } from "react";
import partnersFull from "@/assets/partners-full.png";
interface WelcomeStepProps {
  onProceed: () => void;
}
type Phase = "ready-question" | "declined";
const WelcomeStep = ({
  onProceed
}: WelcomeStepProps) => {
  const [phase, setPhase] = useState<Phase>("ready-question");
  return <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-between text-center px-4 py-12 md:py-16">
        
        {/* Top section - Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold tracking-wider" style={{
          fontFamily: "'Bebas Neue', sans-serif"
        }}>
            <span className="text-foreground">FACE</span>
            <span className="text-primary">S</span>
          </h1>
        </div>

        {/* Middle section - Tagline & Partners */}
        <div className="flex-1 flex flex-col items-center justify-start py-4 md:py-6">
          {/* Tagline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 md:mb-16 font-serif max-w-2xl font-semibold px-4">
            Want to have that chance to work, create, and perform, for the best and most recognizable brands internationally?
          </p>

          {/* Partner logos section - Our Customers */}
          <div className="w-full">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Our Customers
            </p>
            <div className="logo-scroll-wrapper">
              <div className="logo-scroll-track">
                <img alt="Partners" className="h-28 md:h-36 lg:h-44 object-contain px-8" src="/lovable-uploads/07543e1b-278c-4ebb-bb58-a8107bf32277.png" />
                <img src={partnersFull} alt="Partners" className="h-28 md:h-36 lg:h-44 object-contain px-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - CTA */}
        <div className="flex-shrink-0 w-full max-w-sm mx-auto">
          {phase === "ready-question" && <div className="animate-fade-in">
              <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <p className="text-foreground font-medium">
                  Are you ready to join the FACES community?
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={onProceed} className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group">
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    Yes
                  </span>
                </button>
                <button onClick={() => setPhase("declined")} className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group">
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    No
                  </span>
                </button>
              </div>
            </div>}

          {phase === "declined" && <div className="animate-fade-in">
              <p className="text-2xl text-muted-foreground mb-6">
                😢 Come back whenever you feel ready. Hope to see you at FACES soon!
              </p>
              <button onClick={() => setPhase("ready-question")} className="py-4 px-8 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group">
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Try again
                </span>
              </button>
            </div>}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-background py-6">
        <p className="text-xs text-muted-foreground/60 text-center px-4">
          Note: Due to high demand, not everyone will be selected.
        </p>
      </div>
    </div>;
};
export default WelcomeStep;