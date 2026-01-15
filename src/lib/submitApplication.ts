import { supabase } from "@/integrations/supabase/client";

export type FormData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  nationality?: string;

  mobile?: string;
  mobileCountryCode?: string;
  whatsapp?: string;
  whatsappCountryCode?: string;

  otherNumber?: string;
  otherNumberCountryCode?: string;

  instagram?: string;

  governorate?: string;
  district?: string;
  area?: string;

  languages?: string[];
  languageLevels?: Record<string, number>;

  height?: string;
  weight?: string;

  pantSize?: string;
  jacketSize?: string;
  shoeSize?: string;

  bust?: string;
  waist?: string;
  hips?: string;
  shoulders?: string;

  eyeColor?: string;
  hairColor?: string;
  hairType?: string;
  hairLength?: string;
  skinTone?: string;

  customEyeColor?: string;
  customHairColor?: string;

  talents?: string[];
  talentLevels?: Record<string, number>;

  sports?: string[];
  sportLevels?: Record<string, number>;

  experience?: string;

  hasPassport?: string;
  canTravel?: string;
  hasCar?: string;

  comfortableWithSwimwear?: boolean | null;
};

export async function submitApplication(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: any = {
      first_name: formData.firstName,
      middle_name: formData.middleName ?? null,
      last_name: formData.lastName,
      email: formData.email,

      date_of_birth: formData.dateOfBirth ?? null,
      nationality: formData.nationality ?? null,

      mobile: formData.mobile ? `${formData.mobileCountryCode ?? ""} ${formData.mobile}`.trim() : null,
      whatsapp: formData.whatsapp ? `${formData.whatsappCountryCode ?? ""} ${formData.whatsapp}`.trim() : null,

      other_number: formData.otherNumber
        ? `${formData.otherNumberCountryCode ?? ""} ${formData.otherNumber}`.trim()
        : null,

      instagram: formData.instagram ?? null,

      governorate: formData.governorate ?? null,
      district: formData.district ?? null,
      area: formData.area ?? null,

      languages: formData.languages ?? [],
      language_levels: formData.languageLevels ?? {},

      height: formData.height ?? null,
      weight: formData.weight ?? null,

      pant_size: formData.pantSize ?? null,
      jacket_size: formData.jacketSize ?? null,
      shoe_size: formData.shoeSize ?? null,

      bust: formData.bust ?? null,
      waist: formData.waist ?? null,
      hips: formData.hips ?? null,
      shoulders: formData.shoulders ?? null,

      eye_color: (formData.customEyeColor || formData.eyeColor) ?? null,
      hair_color: (formData.customHairColor || formData.hairColor) ?? null,

      hair_type: formData.hairType ?? null,
      hair_length: formData.hairLength ?? null,
      skin_tone: formData.skinTone ?? null,

      talents: formData.talents ?? [],
      talent_levels: formData.talentLevels ?? {},

      sports: formData.sports ?? [],
      sport_levels: formData.sportLevels ?? {},

      experience: formData.experience ?? null,

      has_passport: formData.hasPassport === "yes",
      willing_to_travel: formData.canTravel === "yes",
      car_availability: formData.hasCar ?? null,

      is_brand_ambassador: false,
      photo_urls: [],
    };

    const { error } = await supabase.from("applications").insert(payload);

    if (error) {
      console.error("Error submitting application:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return { success: false, error: err?.message || "An unexpected error occurred" };
  }
}
