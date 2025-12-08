import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
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

        <div className="space-y-2">
          <Label htmlFor="experience">Previous Experience</Label>
          <Textarea
            id="experience"
            placeholder="Tell us about your previous modeling or acting experience, projects you've worked on, brands you've collaborated with, etc."
            value={data.experience}
            onChange={(e) => onChange("experience", e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            If you're new to modeling, that's okay! Just tell us about any relevant experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TalentsStep;