import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { languages } from "@/data/lebanese-locations";

interface LanguagesStepProps {
  data: {
    languages: string[];
  };
  onChange: (field: string, value: string[]) => void;
}

const LanguagesStep = ({ data, onChange }: LanguagesStepProps) => {
  const handleLanguageToggle = (language: string) => {
    const currentLanguages = data.languages || [];
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter((l) => l !== language)
      : [...currentLanguages, language];
    onChange("languages", newLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Languages
        </h2>
        <p className="text-muted-foreground">Select all languages you speak fluently</p>
      </div>

      <div className="space-y-2">
        <Label>Languages Spoken *</Label>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {languages.map((language) => (
            <div
              key={language}
              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                data.languages?.includes(language)
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleLanguageToggle(language)}
            >
              <Checkbox
                id={language}
                checked={data.languages?.includes(language)}
                onCheckedChange={() => handleLanguageToggle(language)}
              />
              <label
                htmlFor={language}
                className="text-sm font-medium cursor-pointer"
              >
                {language}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagesStep;