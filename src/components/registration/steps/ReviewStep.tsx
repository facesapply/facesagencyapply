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
    email: string;
    governorate: string;
    area: string;
    languages: string[];
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
    availability: string;
    headshot: File | null;
    fullBody: File | null;
  };
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ReviewStep = ({ formData, onSubmit, isSubmitting }: ReviewStepProps) => {
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
          <Field label="Email" value={formData.email} />
        </Section>

        <Section title="Location">
          <Field label="Governorate" value={formData.governorate} />
          <Field label="Area" value={formData.area} />
        </Section>

        <Section title="Languages">
          <Field label="Languages" value={formData.languages?.join(", ") || "-"} />
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
          {formData.availability && (
            <div className="text-sm">
              <span className="text-muted-foreground">Notes:</span>
              <p className="text-foreground mt-1">{formData.availability}</p>
            </div>
          )}
        </Section>

        <Section title="Photos">
          <Field label="Headshot" value={formData.headshot ? "Uploaded ✓" : "Not uploaded"} />
          <Field label="Full Body" value={formData.fullBody ? "Uploaded ✓" : "Not uploaded"} />
        </Section>
      </div>

      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
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