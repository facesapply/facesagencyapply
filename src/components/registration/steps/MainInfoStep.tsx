import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { nationalities, countryCodes } from "@/data/lebanese-locations";

interface MainInfoStepProps {
  data: {
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
  };
  onChange: (field: string, value: string) => void;
}

const calculateAge = (dateOfBirth: string): number | null => {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const MainInfoStep = ({ data, onChange }: MainInfoStepProps) => {
  const age = calculateAge(data.dateOfBirth);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground">Basic information to get started</p>
      </div>

      <div className="space-y-4">
        {/* Name Fields */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name *</Label>
          <Input
            id="middleName"
            placeholder="Enter your middle name"
            value={data.middleName}
            onChange={(e) => onChange("middleName", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="h-12"
          />
        </div>

        {/* Date of Birth with Age */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <div className="flex items-center gap-3">
            <Input
              id="dateOfBirth"
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => onChange("dateOfBirth", e.target.value)}
              className="h-12 flex-1"
            />
            {age !== null && (
              <div className="flex items-center justify-center px-4 h-12 bg-secondary rounded-md text-sm font-medium whitespace-nowrap">
                {age} years old
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality *</Label>
          <Select
            value={data.nationality}
            onValueChange={(value) => onChange("nationality", value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              {nationalities.map((nationality) => (
                <SelectItem key={nationality} value={nationality}>
                  {nationality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact Information Section */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <div className="flex gap-2">
                <Select
                  value={data.mobileCountryCode || "+961"}
                  onValueChange={(value) => onChange("mobileCountryCode", value)}
                >
                  <SelectTrigger className="w-28 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.code} value={code.code}>
                        {code.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="mobile"
                  placeholder="XX XXX XXX"
                  value={data.mobile}
                  onChange={(e) => onChange("mobile", e.target.value)}
                  className="h-12 flex-1"
                  type="tel"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number *</Label>
              <div className="flex gap-2">
                <Select
                  value={data.whatsappCountryCode || "+961"}
                  onValueChange={(value) => onChange("whatsappCountryCode", value)}
                >
                  <SelectTrigger className="w-28 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.code} value={code.code}>
                        {code.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="whatsapp"
                  placeholder="XX XXX XXX"
                  value={data.whatsapp}
                  onChange={(e) => onChange("whatsapp", e.target.value)}
                  className="h-12 flex-1"
                  type="tel"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherNumber">Other Number *</Label>
              <div className="flex gap-2">
                <Select
                  value={data.otherNumberCountryCode || "+961"}
                  onValueChange={(value) => onChange("otherNumberCountryCode", value)}
                >
                  <SelectTrigger className="w-28 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.code} value={code.code}>
                        {code.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="otherNumber"
                  placeholder="XX XXX XXX"
                  value={data.otherNumber}
                  onChange={(e) => onChange("otherNumber", e.target.value)}
                  className="h-12 flex-1"
                  type="tel"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoStep;
