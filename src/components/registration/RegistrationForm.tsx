import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FormProgress from "./FormProgress";
import WelcomeStep from "./steps/WelcomeStep";
import MainInfoStep from "./steps/MainInfoStep";
import AddressStep from "./steps/AddressStep";
import LanguagesStep from "./steps/LanguagesStep";
import PhysicalFeaturesStep from "./steps/PhysicalFeaturesStep";
import TalentsStep from "./steps/TalentsStep";
import AvailabilityStep from "./steps/AvailabilityStep";
import PhotoUploadStep from "./steps/PhotoUploadStep";
import ReviewStep from "./steps/ReviewStep";
import {
  mainInfoSchema,
  addressSchema,
  languagesSchema,
  physicalFeaturesSchema,
} from "@/lib/formValidation";

interface FormData {
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
  governorate: string;
  district: string;
  area: string;
  languages: string[];
  languageLevels: Record<string, number>;
  customLanguage: string;
  height: string;
  weight: string;
  pantSize: string;
  jacketSize: string;
  shoeSize: string;
  bust: string;
  waist: string;
  hips: string;
  eyeColor: string;
  hairColor: string;
  skinTone: string;
  hasTattoos: boolean;
  hasPiercings: boolean;
  customEyeColor: string;
  customHairColor: string;
  talents: string[];
  customTalent: string;
  experience: string;
  hasCar: boolean;
  hasLicense: boolean;
  hasPassport: boolean;
  canTravel: boolean;
  headshot: File | null;
  fullBody: File | null;
}

const initialFormData: FormData = {
  gender: "female",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  mobile: "",
  mobileCountryCode: "+961",
  whatsapp: "",
  whatsappCountryCode: "+961",
  otherNumber: "",
  otherNumberCountryCode: "+961",
  governorate: "",
  district: "",
  area: "",
  languages: [],
  languageLevels: {},
  customLanguage: "",
  height: "",
  weight: "",
  pantSize: "",
  jacketSize: "",
  shoeSize: "",
  bust: "",
  waist: "",
  hips: "",
  eyeColor: "",
  hairColor: "",
  skinTone: "",
  hasTattoos: false,
  hasPiercings: false,
  customEyeColor: "",
  customHairColor: "",
  talents: [],
  customTalent: "",
  experience: "",
  hasCar: false,
  hasLicense: false,
  hasPassport: false,
  canTravel: false,
  headshot: null,
  fullBody: null,
};

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const totalSteps = 9; // Reduced by 1 since we merged Contact into Main

  const updateFormData = (field: string, value: string | string[] | boolean | File | null | Record<string, number>) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenderSelect = (gender: "male" | "female") => {
    updateFormData("gender", gender);
    setCurrentStep(1);
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1: {
        const result = mainInfoSchema.safeParse(formData);
        if (!result.success) {
          const firstError = result.error.errors[0];
          toast({
            title: "Validation Error",
            description: firstError.message,
            variant: "destructive",
          });
          return false;
        }
        break;
      }
      case 2: {
        const result = addressSchema.safeParse(formData);
        if (!result.success) {
          const firstError = result.error.errors[0];
          toast({
            title: "Validation Error",
            description: firstError.message,
            variant: "destructive",
          });
          return false;
        }
        break;
      }
      case 3: {
        const result = languagesSchema.safeParse(formData);
        if (!result.success) {
          const firstError = result.error.errors[0];
          toast({
            title: "Validation Error",
            description: firstError.message,
            variant: "destructive",
          });
          return false;
        }
        break;
      }
      case 4: {
        const result = physicalFeaturesSchema.safeParse(formData);
        if (!result.success) {
          const firstError = result.error.errors[0];
          toast({
            title: "Validation Error",
            description: firstError.message,
            variant: "destructive",
          });
          return false;
        }
        break;
      }
      // Step 5 (Talents) is not mandatory
      // Step 6 (Availability) and Step 7 (Photos) are not mandatory
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call - HubSpot integration will be added later
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for registering with Faces Agency. We'll be in touch soon!",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 
          className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-wider"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          THANK YOU!
        </h1>
        <p className="text-lg text-foreground mb-6">
          Your application has been submitted successfully.
        </p>
        <p className="text-muted-foreground max-w-md mb-8">
          Keep an eye on your WhatsApp — our team will reach out to you soon!
        </p>
        
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onGenderSelect={handleGenderSelect} />;
      case 1:
        return <MainInfoStep data={formData} onChange={updateFormData} />;
      case 2:
        return <AddressStep data={formData} onChange={updateFormData} />;
      case 3:
        return <LanguagesStep data={formData} onChange={updateFormData} />;
      case 4:
        return <PhysicalFeaturesStep data={formData} gender={formData.gender} onChange={updateFormData} />;
      case 5:
        return <TalentsStep data={formData} onChange={updateFormData} />;
      case 6:
        return <AvailabilityStep data={formData} onChange={updateFormData} />;
      case 7:
        return <PhotoUploadStep data={formData} onChange={updateFormData} />;
      case 8:
        return <ReviewStep formData={formData} onSubmit={handleSubmit} onChange={updateFormData} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Progress */}
      {currentStep > 0 && (
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-4">
          <div className="max-w-md mx-auto">
            <FormProgress currentStep={currentStep} totalSteps={totalSteps - 1} />
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="animate-fade-in-up">{renderStep()}</div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentStep > 0 && currentStep < totalSteps - 1 && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-4">
          <div className="max-w-md mx-auto flex gap-3">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 h-12"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 h-12"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Back button only for review step */}
      {currentStep === totalSteps - 1 && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-4">
          <div className="max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={handleBack}
              className="w-full h-12"
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
