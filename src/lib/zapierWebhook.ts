// Zapier webhook URL - set this to your webhook URL
const ZAPIER_WEBHOOK_URL = "";

interface ZapierFormData {
  gender: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  email: string;
  mobile: string;
  whatsapp: string;
  instagram: string;
  governorate: string;
  district: string;
  area: string;
  languages: string[];
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  hairType: string;
  hairLength: string;
  skinTone: string;
  talents: string[];
  sports: string[];
  experience: string;
  hasPassport: boolean;
  canTravel: boolean;
  hasCar: string;
}

export async function sendToZapier(formData: ZapierFormData): Promise<{ success: boolean; error?: string }> {
  // If no webhook URL is configured, skip silently
  if (!ZAPIER_WEBHOOK_URL) {
    console.log("Zapier webhook URL not configured, skipping...");
    return { success: true };
  }

  try {
    console.log("Sending form data to Zapier webhook...");
    
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // Handle CORS for Zapier webhooks
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        triggered_from: typeof window !== "undefined" ? window.location.origin : "lovable-app",
        ...formData,
      }),
    });

    // Since we're using no-cors, we won't get a proper response status
    // The request is considered successful if no error was thrown
    console.log("Form data sent to Zapier successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending to Zapier:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send to Zapier" 
    };
  }
}

// Helper to transform form data for Zapier
export function prepareDataForZapier(formData: {
  gender: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  email: string;
  mobile: string;
  mobileCountryCode: string;
  whatsapp: string;
  whatsappCountryCode: string;
  instagram: string;
  governorate: string;
  district: string;
  area: string;
  languages: string[];
  height: string;
  weight: string;
  eyeColor: string;
  customEyeColor: string;
  hairColor: string;
  customHairColor: string;
  hairType: string;
  hairLength: string;
  skinTone: string;
  talents: string[];
  sports: string[];
  experience: string;
  hasPassport: string;
  canTravel: string;
  hasCar: string;
}): ZapierFormData {
  return {
    gender: formData.gender,
    firstName: formData.firstName,
    middleName: formData.middleName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
    nationality: formData.nationality,
    email: formData.email,
    mobile: `${formData.mobileCountryCode} ${formData.mobile}`,
    whatsapp: `${formData.whatsappCountryCode} ${formData.whatsapp}`,
    instagram: formData.instagram,
    governorate: formData.governorate,
    district: formData.district,
    area: formData.area,
    languages: formData.languages,
    height: formData.height,
    weight: formData.weight,
    eyeColor: formData.customEyeColor || formData.eyeColor,
    hairColor: formData.customHairColor || formData.hairColor,
    hairType: formData.hairType,
    hairLength: formData.hairLength,
    skinTone: formData.skinTone,
    talents: formData.talents,
    sports: formData.sports,
    experience: formData.experience,
    hasPassport: formData.hasPassport === "yes",
    canTravel: formData.canTravel === "yes",
    hasCar: formData.hasCar,
  };
}
