import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Check, Clock } from "lucide-react";

interface ReviewStepProps {
  formData: {
    gender: "male" | "female";
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    mobile: string;
    mobileCountryCode: string;
    whatsapp: string;
    whatsappCountryCode: string;
    otherNumber: string;
    otherNumberCountryCode: string;
    instagram: string;
    tiktok: string;
    website: string;
    governorate: string;
    district: string;
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
    acceptTerms?: boolean;
    acceptAmbassador?: boolean;
  };
  onSubmit: () => void;
  onChange: (field: string, value: boolean) => void;
  isSubmitting: boolean;
}

const timeSlots = [
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "1:00 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: false },
  { time: "5:00 PM", available: true },
  { time: "6:00 PM", available: true },
];

const ReviewStep = ({ formData, onSubmit, onChange, isSubmitting }: ReviewStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
          <Field label="First Name" value={formData.firstName} />
          <Field label="Middle Name" value={formData.middleName} />
          <Field label="Last Name" value={formData.lastName} />
          <Field label="Gender" value={formData.gender === "male" ? "Male" : "Female"} />
          <Field label="Date of Birth" value={formData.dateOfBirth} />
          <Field label="Nationality" value={formData.nationality} />
        </Section>

        <Section title="Contact">
          <Field label="Mobile" value={`${formData.mobileCountryCode} ${formData.mobile}`} />
          <Field label="WhatsApp" value={`${formData.whatsappCountryCode} ${formData.whatsapp}`} />
          <Field label="Other Number" value={`${formData.otherNumberCountryCode} ${formData.otherNumber}`} />
        </Section>

        <Section title="Social Media">
          <Field label="Instagram" value={formData.instagram ? `@${formData.instagram}` : "-"} />
          <Field label="TikTok" value={formData.tiktok ? `@${formData.tiktok}` : "-"} />
          <Field label="Website" value={formData.website || "-"} />
        </Section>

        <Section title="Location">
          <Field label="Governorate" value={formData.governorate} />
          <Field label="District" value={formData.district} />
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

      {/* Photo Shoot Booking */}
      <div className="space-y-4 border-t border-border pt-6">
        <h3 className="text-primary font-semibold text-sm uppercase tracking-wider">
          Book Your Photo Shoot Now
        </h3>
        <p className="text-sm text-muted-foreground">
          Select a date and time for your professional photo shoot
        </p>
        
        <div className="flex flex-col items-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="rounded-lg border border-border pointer-events-auto"
          />
        </div>

        {selectedDate && (
          <div className="space-y-3 mt-4">
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Available times for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot.time}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 text-sm transition-all ${
                    !slot.available
                      ? "border-border bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50"
                      : selectedTime === slot.time
                      ? "border-primary bg-primary/10 text-primary font-semibold cursor-pointer"
                      : "border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer"
                  }`}
                >
                  {slot.available ? slot.time : "Booked"}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDate && selectedTime && (
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-sm text-foreground">
              Your appointment: <span className="font-semibold text-primary">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}</span>
            </p>
          </div>
        )}
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