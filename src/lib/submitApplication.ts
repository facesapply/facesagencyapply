import { supabase } from "@/integrations/supabase/client";

interface FormData {
  gender: "male" | "female";
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
      email: formData.email,
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

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
await sendToZapierDirect({
  email: formData.email,
  firstName: formData.firstName,
  lastName: formData.lastName,
  mobile: formData.mobile ? `${formData.mobileCountryCode ?? ""} ${formData.mobile}`.trim() : null,
  whatsapp: formData.whatsapp ? `${formData.whatsappCountryCode ?? ""} ${formData.whatsapp}`.trim() : null,
  governorate: formData.governorate ?? null,
  district: formData.district ?? null,
  area: formData.area ?? null,
  submittedAt: new Date().toISOString(),
});
