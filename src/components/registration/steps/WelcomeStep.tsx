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
        Model & Talent Agency
      </p>
      <p className="text-foreground mb-12 max-w-md">
        Join our roster of exceptional talents. Complete your registration to get started.
      </p>

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