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
  console.log("Starting application submission for:", formData.email);
  
  try {
    // 1. Insert into Supabase
    // @ts-ignore - email column was added manually
    const { data: dbData, error: dbError } = await supabase.from("applications").insert({
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      date_of_birth: formData.dateOfBirth,
      nationality: formData.nationality,
      email: formData.email,
      mobile: `${formData.mobileCountryCode} ${formData.mobile}`.trim(),
      whatsapp: `${formData.whatsappCountryCode} ${formData.whatsapp}`.trim(),
      other_number: formData.otherNumber ? `${formData.otherNumberCountryCode} ${formData.otherNumber}`.trim() : null,
      instagram: formData.instagram || null,
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
    }).select('id').single();

    if (dbError) {
      console.error("Supabase Database Error:", dbError);
      return { success: false, error: dbError.message };
    }

    const supabaseId = dbData?.id;
    console.log("Supabase Database Insert Successful, ID:", supabaseId);

    // 2. Call HubSpot Edge Function via Direct Fetch
    try {
      const functionUrl = `https://boohvdvpdgnvabfhiaxi.supabase.co/functions/v1/hubspot-upsert-contact`;
      
      console.log("Calling HubSpot Function directly:", functionUrl);
      
      // Prepare comprehensive payload matching HubSpot custom properties
      const hubspotPayload = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        mobile: `${formData.mobileCountryCode} ${formData.mobile}`.trim(),
        whatsapp: `${formData.whatsappCountryCode} ${formData.whatsapp}`.trim(),
        instagram: formData.instagram || null,
        gender: formData.gender,
        nationality: formData.nationality,
        dateOfBirth: formData.dateOfBirth,
        governorate: formData.governorate,
        district: formData.district,
        area: formData.area,
        height: formData.height,
        weight: formData.weight,
        eyeColor: formData.customEyeColor || formData.eyeColor,
        hairColor: formData.customHairColor || formData.hairColor,
        hairType: formData.hairType,
        hairLength: formData.hairLength,
        skinTone: formData.skinTone,
        pantSize: formData.pantSize,
        jacketSize: formData.jacketSize,
        shoeSize: formData.shoeSize,
        bust: formData.bust,
        waist: formData.waist,
        hips: formData.hips,
        shoulders: formData.shoulders,
        hasPassport: formData.hasPassport,
        canTravel: formData.canTravel,
        hasCar: formData.hasCar,
        hasLicense: formData.hasLicense,
        isEmployed: formData.isEmployed,
        hasWhishAccount: formData.hasWhishAccount,
        whishNumber: formData.whishNumber ? `${formData.whishCountryCode} ${formData.whishNumber}`.trim() : null,
        otherNumber: formData.otherNumber ? `${formData.otherNumberCountryCode} ${formData.otherNumber}`.trim() : null,
        otherNumberName: formData.otherNumberPersonName,
        otherNumberRelationship: formData.otherNumberRelationship,
        comfortableWithSwimwear: formData.comfortableWithSwimwear,
        languages: formData.languages,
        languageLevels: formData.languageLevels,
        talents: formData.talents,
        talentLevels: formData.talentLevels,
        sports: formData.sports,
        sportLevels: formData.sportLevels,
        modeling: formData.modeling,
        experience: formData.experience,
        supabaseId: supabaseId
      };

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(supabase as any).supabaseKey || ''}`
        },
        body: JSON.stringify(hubspotPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("HubSpot Function Direct Call Failed:", errorText);
      } else {
        const data = await response.json();
        console.log("HubSpot Sync Successful:", data);
      }
    } catch (hsInvokeErr) {
      console.error("Critical Error in HubSpot Direct Call:", hsInvokeErr);
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected submission error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
