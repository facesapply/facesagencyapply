import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AvailabilityStepProps {
  data: {
    hasCar: boolean;
    hasLicense: boolean;
    hasPassport: boolean;
    canTravel: boolean;
  };
  onChange: (field: string, value: boolean) => void;
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
      </div>
    </div>
  );
};

export default AvailabilityStep;