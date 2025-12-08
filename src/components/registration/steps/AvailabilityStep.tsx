import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface AvailabilityStepProps {
  data: {
    hasCar: boolean;
    hasLicense: boolean;
    hasPassport: boolean;
    canTravel: boolean;
    availability: string;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const AvailabilityStep = ({ data, onChange }: AvailabilityStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Availability & Logistics
        </h2>
        <p className="text-muted-foreground">Practical information for bookings</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="hasCar" className="cursor-pointer">Do you have a car?</Label>
          <Switch
            id="hasCar"
            checked={data.hasCar}
            onCheckedChange={(checked) => onChange("hasCar", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="hasLicense" className="cursor-pointer">Do you have a driving license?</Label>
          <Switch
            id="hasLicense"
            checked={data.hasLicense}
            onCheckedChange={(checked) => onChange("hasLicense", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="hasPassport" className="cursor-pointer">Do you have a valid passport?</Label>
          <Switch
            id="hasPassport"
            checked={data.hasPassport}
            onCheckedChange={(checked) => onChange("hasPassport", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="canTravel" className="cursor-pointer">Are you available for international travel?</Label>
          <Switch
            id="canTravel"
            checked={data.canTravel}
            onCheckedChange={(checked) => onChange("canTravel", checked)}
          />
        </div>

        <div className="space-y-2 pt-4">
          <Label htmlFor="availability">General Availability</Label>
          <Textarea
            id="availability"
            placeholder="Describe your general availability for work (e.g., weekdays only, weekends preferred, full-time availability, etc.)"
            value={data.availability}
            onChange={(e) => onChange("availability", e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStep;