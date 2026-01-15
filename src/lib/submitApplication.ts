import { supabase } from "@/integrations/supabase/client";

async function sendToZapier(formData: FormData): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('zapier-webhook', {
      body: {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality,
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
        talents: formData.talents,
        sports: formData.sports,
        experience: formData.experience,
        hasPassport: formData.hasPassport === "yes",
        canTravel: formData.canTravel === "yes",
        hasCar: formData.hasCar,
      },
    });

    if (error) {
      console.error('Zapier webhook error:', error);
    }
  } catch (err) {
    console.error('Failed to send to Zapier:', err);
  }
}

interface FormData {
  gender: "male" | "female";
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
  mobile: string;
  mobileCountryCode: string;
  whatsapp: string;
  whatsappCountryCode: string;
  otherNumber: string;
  otherNumberCountryCode: string;
  otherNumberRelationship: string;
  otherNumberPersonName: string;
  instagram: string;
  hasWhishAccount: string;
  whishNumber: string;
  whishCountryCode: string;
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
  hairType: string;
  hairLength: string;
  skinTone: string;
  hasTattoos: boolean;
  hasPiercings: boolean;
  customEyeColor: string;
  customHairColor: string;
  shoulders: string;
  talents: string[];
  talentLevels: Record<string, number>;
  sports: string[];
  sportLevels: Record<string, number>;
  modeling: string[];
  customTalent: string;
  customSport: string;
  customModeling: string;
  experience: string;
  interestedInExtra: string;
  hasCar: string;
  hasLicense: string;
  isEmployed: string;
  canTravel: string;
  hasPassport: string;
  hasMultiplePassports: string;
  passports: string[];
  comfortableWithSwimwear: boolean | null;
}

export async function submitApplication(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("applications").insert({
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      date_of_birth: formData.dateOfBirth,
      nationality: formData.nationality,
      mobile: `${formData.mobileCountryCode} ${formData.mobile}`,
      whatsapp: `${formData.whatsappCountryCode} ${formData.whatsapp}`,
      other_number: formData.otherNumber ? `${formData.otherNumberCountryCode} ${formData.otherNumber}` : null,
      instagram: formData.instagram || null,
      tiktok: null,
      website: null,
      governorate: formData.governorate,
      district: formData.district,
      area: formData.area,
      languages: formData.languages,
      language_levels: formData.languageLevels,
      eye_color: formData.customEyeColor || formData.eyeColor,
      hair_color: formData.customHairColor || formData.hairColor,
      hair_type: formData.hairType,
      hair_length: formData.hairLength,
      skin_tone: formData.skinTone,
      height: formData.height,
      weight: formData.weight,
      pant_size: formData.pantSize,
      jacket_size: formData.jacketSize,
      shoe_size: formData.shoeSize,
      waist: formData.waist || null,
      bust: formData.bust || null,
      hips: formData.hips || null,
      shoulders: formData.shoulders || null,
      talents: formData.talents,
      talent_levels: formData.talentLevels,
      sports: formData.sports,
      sport_levels: formData.sportLevels,
      experience: formData.experience || null,
      has_passport: formData.hasPassport === "yes",
      willing_to_travel: formData.canTravel === "yes",
      car_availability: formData.hasCar,
      is_brand_ambassador: false,
      photo_urls: [],
    });

    if (error) {
      console.error("Error submitting application:", error);
      return { success: false, error: error.message };
    }

    // Send to Zapier webhook after successful database insert
    await sendToZapier(formData);

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
