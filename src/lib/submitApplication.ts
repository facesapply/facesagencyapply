import { supabase } from "@/integrations/supabase/client";

interface FormData {
  gender: "male" | "female";
  firstName: string;
  middleName: string;
  lastName: string;
  email: string; // IMPORTANT
  dateOfBirth: string;
  nationality: string;

  mobile: string;
  mobileCountryCode: string;
  whatsapp: string;
  whatsappCountryCode: string;

  otherNumber: string;
  otherNumberCountryCode: string;

  instagram: string;

  governorate: string;
  district: string;
  area: string;

  languages: string[];
  languageLevels: Record<string, number>;

  height: string;
  weight: string;

  pantSize: string;
  jacketSize: string;
  shoeSize: string;

  bust: string;
  waist: string;
  hips: string;
  shoulders: string;

  eyeColor: string;
  hairColor: string;
  hairType: string;
  hairLength: string;
  skinTone: string;

  customEyeColor: string;
  customHairColor: string;

  talents: string[];
  talentLevels: Record<string, number>;

  sports: string[];
  sportLevels: Record<string, number>;

  experience: string;

  hasPassport: string;
  canTravel: string;
  hasCar: string;

  comfortableWithSwimwear: boolean | null;
}

export async function submitApplication(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // DEBUG: minimal insert to force a real error or a success
    const { data, error } = await supabase
      .from("applications")
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      })
      .select("id, created_at")
      .single();

    if (error) {
      alert("SUPABASE INSERT FAILED: " + error.message);
      console.error("Error submitting application:", error);
      return { success: false, error: error.message };
    }

    alert("Inserted! ID: " + data.id);
    return { success: true };
  } catch (err: any) {
    alert("UNEXPECTED ERROR: " + (err?.message || String(err)));
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
