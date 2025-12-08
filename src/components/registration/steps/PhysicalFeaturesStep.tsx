import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { eyeColors, hairColors, skinTones } from "@/data/lebanese-locations";

interface PhysicalFeaturesStepProps {
  data: {
    height: string;
    weight: string;
    bust: string;
    waist: string;
    hips: string;
    eyeColor: string;
    hairColor: string;
    skinTone: string;
    hasTattoos: boolean;
    hasPiercings: boolean;
  };
  gender: "male" | "female";
  onChange: (field: string, value: string | boolean) => void;
}

const PhysicalFeaturesStep = ({ data, gender, onChange }: PhysicalFeaturesStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Physical Features
        </h2>
        <p className="text-muted-foreground">Your measurements and appearance</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm) *</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={data.height}
              onChange={(e) => onChange("height", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg) *</Label>
            <Input
              id="weight"
              type="number"
              placeholder="60"
              value={data.weight}
              onChange={(e) => onChange("weight", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bust">{gender === "male" ? "Chest" : "Bust"} (cm)</Label>
            <Input
              id="bust"
              type="number"
              placeholder="90"
              value={data.bust}
              onChange={(e) => onChange("bust", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waist">Waist (cm)</Label>
            <Input
              id="waist"
              type="number"
              placeholder="70"
              value={data.waist}
              onChange={(e) => onChange("waist", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hips">Hips (cm)</Label>
            <Input
              id="hips"
              type="number"
              placeholder="95"
              value={data.hips}
              onChange={(e) => onChange("hips", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Eye Color *</Label>
            <Select
              value={data.eyeColor}
              onValueChange={(value) => onChange("eyeColor", value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {eyeColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Hair Color *</Label>
            <Select
              value={data.hairColor}
              onValueChange={(value) => onChange("hairColor", value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {hairColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Skin Tone *</Label>
            <Select
              value={data.skinTone}
              onValueChange={(value) => onChange("skinTone", value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {skinTones.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="tattoos" className="cursor-pointer">Do you have any tattoos?</Label>
          <Switch
            id="tattoos"
            checked={data.hasTattoos}
            onCheckedChange={(checked) => onChange("hasTattoos", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <Label htmlFor="piercings" className="cursor-pointer">Do you have any visible piercings?</Label>
          <Switch
            id="piercings"
            checked={data.hasPiercings}
            onCheckedChange={(checked) => onChange("hasPiercings", checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default PhysicalFeaturesStep;