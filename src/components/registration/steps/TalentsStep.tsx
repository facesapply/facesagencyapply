import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { talents } from "@/data/lebanese-locations";

interface TalentsStepProps {
  data: {
    talents: string[];
    experience: string;
    customTalent?: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const TalentsStep = ({ data, onChange }: TalentsStepProps) => {
  const [customTalent, setCustomTalent] = useState(data.customTalent || "");

  const handleTalentToggle = (talent: string) => {
    const currentTalents = data.talents || [];
    const newTalents = currentTalents.includes(talent)
      ? currentTalents.filter((t) => t !== talent)
      : [...currentTalents, talent];
    onChange("talents", newTalents);
  };

  const handleCustomTalentChange = (value: string) => {
    setCustomTalent(value);
    onChange("customTalent", value);
  };

  const handleExperienceSelect = (hasExperience: string) => {
    onChange("experience", hasExperience);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Talents & Experience
        </h2>
        <p className="text-muted-foreground">What are your skills and experience?</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Talents & Skills *</Label>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {talents.map((talent) => {
              const isSelected = data.talents?.includes(talent);
              const isOther = talent === "Other";
              
              return (
                <div
                  key={talent}
                  className={`flex flex-col p-4 rounded-lg border cursor-pointer transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleTalentToggle(talent)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={talent}
                      checked={isSelected}
                      onCheckedChange={() => handleTalentToggle(talent)}
                    />
                    <label
                      htmlFor={talent}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {talent}
                    </label>
                  </div>
                  
                  {isSelected && isOther && (
                    <Input
                      placeholder="Specify your talent..."
                      value={customTalent}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCustomTalentChange(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 h-10"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Do you have previous modeling or acting experience?</Label>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div
              onClick={() => handleExperienceSelect("yes")}
              className={`flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                data.experience === "yes"
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                data.experience === "yes" ? "text-primary" : "text-foreground"
              }`}>
                Yes
              </span>
            </div>
            <div
              onClick={() => handleExperienceSelect("no")}
              className={`flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                data.experience === "no"
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                data.experience === "no" ? "text-primary" : "text-foreground"
              }`}>
                No
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            No experience? No problem! We welcome fresh faces.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TalentsStep;