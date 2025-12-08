import partnersFull from "@/assets/partners-full.png";

interface WelcomeStepProps {
  onGenderSelect: (gender: "male" | "female") => void;
}

const WelcomeStep = ({ onGenderSelect }: WelcomeStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 pb-32">
      <h1 
        className="text-5xl md:text-7xl font-bold mb-4 tracking-wider"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        <span className="text-foreground">FACE</span>
        <span className="text-primary">S</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-2">
        You are now working with the best
      </p>
      <p className="text-foreground mb-12 max-w-md">
        Join our roster of exceptional talents. Complete your registration to get started.
      </p>

      <div className="w-full max-w-sm mb-8">
        <p className="text-muted-foreground text-sm mb-6">I am a...</p>
        <div className="flex gap-4">
          <button
            onClick={() => onGenderSelect("female")}
            className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
          >
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Female</span>
          </button>
          <button
            onClick={() => onGenderSelect("male")}
            className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
          >
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Male</span>
          </button>
        </div>
      </div>

      {/* Partner logos - smooth scrolling banner at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-3 overflow-hidden">
        <p className="text-xs text-muted-foreground text-center mb-2">Trusted by leading brands</p>
        <div className="flex animate-scroll-slow whitespace-nowrap">
          <img src={partnersFull} alt="Partners" className="h-10 md:h-12 object-contain opacity-80 mx-4 inline-block" />
          <img src={partnersFull} alt="Partners" className="h-10 md:h-12 object-contain opacity-80 mx-4 inline-block" />
        </div>
        {/* Disclaimer - centered at bottom */}
        <p className="text-[9px] text-muted-foreground/50 text-center mt-3 pb-1">
          Note: Due to high demand, not everyone will be selected.
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;