import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { languages } from "@/data/lebanese-locations";

interface LanguageWithLevel {
  language: string;
  level: number;
}

interface LanguagesStepProps {
  data: {
    languages: string[];
    languageLevels?: Record<string, number>;
    customLanguage?: string;
  };
  onChange: (field: string, value: string[] | Record<string, number> | string) => void;
}

const LanguagesStep = ({ data, onChange }: LanguagesStepProps) => {
  const [customLanguage, setCustomLanguage] = useState(data.customLanguage || "");
  
  const languageLevels = data.languageLevels || {};

  const handleLanguageToggle = (language: string) => {
    const currentLanguages = data.languages || [];
    if (currentLanguages.includes(language)) {
      // Remove language and its level
      const newLanguages = currentLanguages.filter((l) => l !== language);
      const newLevels = { ...languageLevels };
      delete newLevels[language];
      onChange("languages", newLanguages);
      onChange("languageLevels", newLevels);
    } else {
      // Add language with default level 3
      const newLanguages = [...currentLanguages, language];
      const newLevels = { ...languageLevels, [language]: 3 };
      onChange("languages", newLanguages);
      onChange("languageLevels", newLevels);
    }
  };

  const handleLevelChange = (language: string, level: number) => {
    const newLevels = { ...languageLevels, [language]: level };
    onChange("languageLevels", newLevels);
  };

  const handleCustomLanguageChange = (value: string) => {
    setCustomLanguage(value);
    onChange("customLanguage", value);
  };

  const StarRating = ({ language, level }: { language: string; level: number }) => (
    <div className="flex gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLevelChange(language, star);
          }}
          className="p-0.5"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= level
                ? "fill-primary text-primary"
                : "fill-none text-muted-foreground"
            }`}
          />
        </button>
      ))}
      <span className="text-xs text-muted-foreground ml-2 self-center">
        {level === 1 && "Basic"}
        {level === 2 && "Elementary"}
        {level === 3 && "Intermediate"}
        {level === 4 && "Advanced"}
        {level === 5 && "Fluent"}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Languages
        </h2>
        <p className="text-muted-foreground">Select all languages you speak and rate your fluency</p>
      </div>

      <div className="space-y-2">
        <Label>Languages Spoken *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {languages.map((language) => {
            const isSelected = data.languages?.includes(language);
            const isOther = language === "Other";
            
            return (
              <div
                key={language}
                className={`flex flex-col p-4 rounded-lg border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleLanguageToggle(language)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={language}
                    checked={isSelected}
                    onCheckedChange={() => handleLanguageToggle(language)}
                  />
                  <label
                    htmlFor={language}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {language}
                  </label>
                </div>
                
                {isSelected && (
                  <>
                    <StarRating 
                      language={language} 
                      level={languageLevels[language] || 3} 
                    />
                    {isOther && (
                      <Input
                        placeholder="Specify language..."
                        value={customLanguage}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCustomLanguageChange(e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 h-10"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguagesStep;