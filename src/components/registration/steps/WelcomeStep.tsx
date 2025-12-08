import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onGenderSelect: (gender: "male" | "female") => void;
}

const WelcomeStep = ({ onGenderSelect }: WelcomeStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
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
      <p className="text-foreground mb-8 max-w-md">
        Join our roster of exceptional talents. Complete your registration to get started.
      </p>
      
      <div className="bg-secondary/70 border border-border rounded-lg p-4 mb-12 max-w-md">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Please note:</span> Due to high demand and new partnerships, not everyone will be selected. But don't let that stop you — go ahead and apply!
        </p>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <p className="text-muted-foreground text-sm mb-4">I am a...</p>
        <Button
          onClick={() => onGenderSelect("female")}
          className="w-full h-14 text-lg font-semibold"
          variant="default"
        >
          Female
        </Button>
        <Button
          onClick={() => onGenderSelect("male")}
          className="w-full h-14 text-lg font-semibold"
          variant="outline"
        >
          Male
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;