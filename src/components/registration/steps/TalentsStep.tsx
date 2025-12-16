import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { talents } from "@/data/lebanese-locations";
import { Check, ChevronDown, X, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TalentsStepProps {
  data: {
    talents: string[];
    experience: string;
    customTalent?: string;
    comfortableWithSwimwear: boolean | null;
  };
  onChange: (field: string, value: string | string[] | boolean) => void;
}

const TalentsStep = ({ data, onChange }: TalentsStepProps) => {
  const [customTalent, setCustomTalent] = useState(data.customTalent || "");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTalents = useMemo(() => {
    if (!searchQuery.trim()) return talents;
    return talents.filter((talent) =>
      talent.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const maxTalents = 8;

  const handleTalentToggle = (talent: string) => {
    const currentTalents = data.talents || [];
    if (currentTalents.includes(talent)) {
      onChange("talents", currentTalents.filter((t) => t !== talent));
    } else if (currentTalents.length < maxTalents) {
      onChange("talents", [...currentTalents, talent]);
    }
  };

  const handleRemoveTalent = (talent: string) => {
    const currentTalents = data.talents || [];
    onChange("talents", currentTalents.filter((t) => t !== talent));
    if (talent === "Other") {
      setCustomTalent("");
      onChange("customTalent", "");
    }
  };

  const handleCustomTalentChange = (value: string) => {
    setCustomTalent(value);
    onChange("customTalent", value);
  };

  const selectedTalents = data.talents || [];
  const hasOtherSelected = selectedTalents.includes("Other");

  const PollQuestion = ({
    label,
    field,
    value,
  }: {
    label: string;
    field: string;
    value: string;
  }) => (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-4">
        <div
          onClick={() => onChange(field, "yes")}
          className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
            value === "yes"
              ? "border-primary bg-primary/10 shadow-md"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <span className={`text-lg font-semibold ${
            value === "yes" ? "text-primary" : "text-foreground"
          }`}>
            Yes
          </span>
        </div>
        <div
          onClick={() => onChange(field, "no")}
          className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
            value === "no"
              ? "border-primary bg-primary/10 shadow-md"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <span className={`text-lg font-semibold ${
            value === "no" ? "text-primary" : "text-foreground"
          }`}>
            No
          </span>
        </div>
      </div>
    </div>
  );

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
          
          {/* Selected talents badges */}
          {selectedTalents.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTalents.map((talent) => (
                <Badge
                  key={talent}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {talent}
                  <button
                    type="button"
                    onClick={() => handleRemoveTalent(talent)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Searchable dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors text-left"
            >
              <span className="text-muted-foreground">
                {selectedTalents.length === 0
                  ? "Select your talents (max 8)..."
                  : `${selectedTalents.length}/${maxTalents} talents selected`}
              </span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                {/* Search input */}
                <div className="p-3 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search talents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Talents list */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredTalents.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No talents found
                    </div>
                  ) : (
                    filteredTalents.map((talent) => {
                      const isSelected = selectedTalents.includes(talent);
                      const isDisabled = !isSelected && selectedTalents.length >= maxTalents;
                      return (
                        <button
                          key={talent}
                          type="button"
                          onClick={() => !isDisabled && handleTalentToggle(talent)}
                          disabled={isDisabled}
                          className={`w-full flex items-center justify-between px-4 py-3 transition-colors text-left ${
                            isSelected ? "bg-primary/5 hover:bg-primary/10" : ""
                          } ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50"}`}
                        >
                          <span className={isSelected ? "text-primary font-medium" : "text-foreground"}>
                            {talent}
                          </span>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Custom talent input when "Other" is selected */}
          {hasOtherSelected && (
            <Input
              placeholder="Specify your other talent..."
              value={customTalent}
              onChange={(e) => handleCustomTalentChange(e.target.value)}
              className="mt-3"
            />
          )}
        </div>

        <PollQuestion
          label="Do you have previous modeling or acting experience?"
          field="experience"
          value={data.experience}
        />
        <p className="text-xs text-muted-foreground text-center -mt-3">
          No experience? No problem! We welcome fresh faces.
        </p>

        {/* Swimwear comfort question */}
        <div className="space-y-3">
          <Label>Are you comfortable modeling swimwear?</Label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onChange("comfortableWithSwimwear", true)}
              className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
                data.comfortableWithSwimwear === true
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                data.comfortableWithSwimwear === true ? "text-primary" : "text-foreground"
              }`}>
                Yes
              </span>
            </div>
            <div
              onClick={() => onChange("comfortableWithSwimwear", false)}
              className={`flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
                data.comfortableWithSwimwear === false
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                data.comfortableWithSwimwear === false ? "text-primary" : "text-foreground"
              }`}>
                No
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TalentsStep;