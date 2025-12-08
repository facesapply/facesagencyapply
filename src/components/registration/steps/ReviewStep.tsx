import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ReviewStepProps {
  formData: {
    gender: "male" | "female";
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    mobile: string;
    whatsapp: string;
    governorate: string;
    area: string;
    languages: string[];
    languageLevels?: Record<string, number>;
    height: string;
    weight: string;
    bust: string;
    waist: string;
    hips: string;
    eyeColor: string;
    hairColor: string;
    skinTone: string;
    hasTattoos: boolean;
    hasPiercings: boolean;
    talents: string[];
    experience: string;
    hasCar: boolean;
    hasLicense: boolean;
    hasPassport: boolean;
    canTravel: boolean;
    headshot: File | null;
    fullBody: File | null;
    acceptTerms?: boolean;
    acceptAmbassador?: boolean;
  };
  onSubmit: () => void;
  onChange: (field: string, value: boolean) => void;
  isSubmitting: boolean;
}

const ReviewStep = ({ formData, onSubmit, onChange, isSubmitting }: ReviewStepProps) => {
  const getLevelText = (level: number) => {
    switch (level) {
      case 1: return "Basic";
      case 2: return "Elementary";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Fluent";
      default: return "";
    }
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-primary font-semibold text-sm uppercase tracking-wider">
        {title}
      </h3>
      <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }: { label: string; value: string | boolean }) => (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">
        {typeof value === "boolean" ? (value ? "Yes" : "No") : value || "-"}
      </span>
    </div>
  );

  const formatLanguagesWithLevels = () => {
    if (!formData.languages || formData.languages.length === 0) return "-";
    return formData.languages.map(lang => {
      const level = formData.languageLevels?.[lang];
      return level ? `${lang} (${getLevelText(level)})` : lang;
    }).join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Review Your Information
        </h2>
        <p className="text-muted-foreground">
          Please verify all details before submitting
        </p>
      </div>

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        <Section title="Personal Information">
          <Field label="Name" value={formData.fullName} />
          <Field label="Gender" value={formData.gender === "male" ? "Male" : "Female"} />
          <Field label="Date of Birth" value={formData.dateOfBirth} />
          <Field label="Nationality" value={formData.nationality} />
        </Section>

        <Section title="Contact">
          <Field label="Mobile" value={`+961 ${formData.mobile}`} />
          <Field label="WhatsApp" value={formData.whatsapp ? `+961 ${formData.whatsapp}` : "Same as mobile"} />
        </Section>

        <Section title="Location">
          <Field label="Governorate" value={formData.governorate} />
          <Field label="Area" value={formData.area} />
        </Section>

        <Section title="Languages">
          <div className="text-sm">
            <span className="text-muted-foreground">Languages:</span>
            <p className="text-foreground mt-1">{formatLanguagesWithLevels()}</p>
          </div>
        </Section>

        <Section title="Physical Features">
          <Field label="Height" value={formData.height ? `${formData.height} cm` : "-"} />
          <Field label="Weight" value={formData.weight ? `${formData.weight} kg` : "-"} />
          <Field label="Measurements" value={formData.bust && formData.waist && formData.hips ? `${formData.bust}-${formData.waist}-${formData.hips}` : "-"} />
          <Field label="Eye Color" value={formData.eyeColor} />
          <Field label="Hair Color" value={formData.hairColor} />
          <Field label="Skin Tone" value={formData.skinTone} />
          <Field label="Tattoos" value={formData.hasTattoos} />
          <Field label="Piercings" value={formData.hasPiercings} />
        </Section>

        <Section title="Talents & Experience">
          <Field label="Talents" value={formData.talents?.join(", ") || "-"} />
          {formData.experience && (
            <div className="text-sm">
              <span className="text-muted-foreground">Experience:</span>
              <p className="text-foreground mt-1">{formData.experience}</p>
            </div>
          )}
        </Section>

        <Section title="Availability">
          <Field label="Has Car" value={formData.hasCar} />
          <Field label="Driving License" value={formData.hasLicense} />
          <Field label="Valid Passport" value={formData.hasPassport} />
          <Field label="Can Travel" value={formData.canTravel} />
        </Section>

        <Section title="Photos">
          <Field label="Headshot" value={formData.headshot ? "Uploaded ✓" : "Not uploaded"} />
          <Field label="Full Body" value={formData.fullBody ? "Uploaded ✓" : "Not uploaded"} />
        </Section>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-6 border-t border-border pt-6">
        <h3 className="text-primary font-semibold text-sm uppercase tracking-wider">
          Terms & Consent
        </h3>
        
        {/* Consent 1: Photo Usage */}
        <div className="space-y-3">
          <p className="text-sm text-foreground font-medium">
            Do you give Faces Casting Agency consent to show your photos to clients when selecting talent for projects?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onChange("acceptTerms", true)}
              className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.acceptTerms === true
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                formData.acceptTerms === true ? "text-primary" : "text-foreground"
              }`}>
                Yes
              </span>
            </div>
            <div
              onClick={() => onChange("acceptTerms", false)}
              className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.acceptTerms === false
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                formData.acceptTerms === false ? "text-primary" : "text-foreground"
              }`}>
                No
              </span>
            </div>
          </div>
        </div>

        {/* Consent 2: Brand Ambassador */}
        <div className="space-y-3">
          <p className="text-sm text-foreground font-medium">
            If selected, do you give consent to allow Faces to use you as a brand ambassador?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onChange("acceptAmbassador", true)}
              className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.acceptAmbassador === true
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                formData.acceptAmbassador === true ? "text-primary" : "text-foreground"
              }`}>
                Yes
              </span>
            </div>
            <div
              onClick={() => onChange("acceptAmbassador", false)}
              className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.acceptAmbassador === false
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className={`text-lg font-semibold ${
                formData.acceptAmbassador === false ? "text-primary" : "text-foreground"
              }`}>
                No
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={isSubmitting || formData.acceptTerms !== true}
        className="w-full h-14 text-lg font-semibold"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <Check className="w-5 h-5 mr-2" />
            Submit Application
          </>
        )}
      </Button>
    </div>
  );
};

export default ReviewStep;