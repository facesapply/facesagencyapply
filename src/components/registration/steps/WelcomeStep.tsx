import partnersRow1 from "@/assets/partners-row-1.png";
import partnersRow2 from "@/assets/partners-row-2.png";

interface WelcomeStepProps {
  onGenderSelect: (gender: "male" | "female") => void;
}

const WelcomeStep = ({ onGenderSelect }: WelcomeStepProps) => {
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
        <p className="text-lg md:text-xl text-muted-foreground mb-2">
          You are now working with the best to serve the best
        </p>
        <p className="text-foreground mb-8 max-w-md">
          Join our roster of exceptional talents. Complete your registration to get started.
        </p>

        {/* Gender selection */}
        <div className="w-full max-w-sm mb-8">
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
      </div>

      {/* Partner logos section - Netflix-style infinite scroll */}
      <div className="bg-background py-6">
        <p className="text-sm text-muted-foreground text-center mb-4">Trusted by leading brands</p>
        
        {/* Row 1 - scrolling left */}
        <div className="overflow-hidden mb-3">
          <div className="logo-scroll-container animate-scroll-left">
            <img src={partnersRow1} alt="Partners" className="h-16 md:h-20 lg:h-24 object-contain px-4" />
            <img src={partnersRow1} alt="Partners" className="h-16 md:h-20 lg:h-24 object-contain px-4" />
          </div>
        </div>
        
        {/* Row 2 - scrolling left (slightly different speed via inline style) */}
        <div className="overflow-hidden">
          <div className="logo-scroll-container animate-scroll-left" style={{ animationDuration: '25s' }}>
            <img src={partnersRow2} alt="Partners" className="h-16 md:h-20 lg:h-24 object-contain px-4" />
            <img src={partnersRow2} alt="Partners" className="h-16 md:h-20 lg:h-24 object-contain px-4" />
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