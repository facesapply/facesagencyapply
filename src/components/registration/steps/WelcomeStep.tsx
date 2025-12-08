interface WelcomeStepProps {
  onGenderSelect: (gender: "male" | "female") => void;
}

const WelcomeStep = ({ onGenderSelect }: WelcomeStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative">
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
            <span className="text-2xl mb-2 block">👩</span>
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Female</span>
          </button>
          <button
            onClick={() => onGenderSelect("male")}
            className="flex-1 py-6 px-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
          >
            <span className="text-2xl mb-2 block">👨</span>
            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Male</span>
          </button>
        </div>
      </div>

      {/* Disclaimer - bottom right, smaller */}
      <div className="absolute bottom-4 right-4 max-w-xs text-right">
        <p className="text-xs text-muted-foreground/80">
          <span className="font-medium">Note:</span> Due to high demand, not everyone will be selected — but go ahead and apply!
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;