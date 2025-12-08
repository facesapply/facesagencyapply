import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { nationalities } from "@/data/lebanese-locations";

interface MainInfoStepProps {
  data: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
  };
  onChange: (field: string, value: string) => void;
}

const MainInfoStep = ({ data, onChange }: MainInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground">Basic information to get started</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange("dateOfBirth", e.target.value)}
            className="h-12"
          />
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
      </div>
    </div>
  );
};

export default MainInfoStep;