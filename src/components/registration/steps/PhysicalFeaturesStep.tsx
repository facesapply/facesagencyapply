import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { eyeColors, hairColors, skinTones } from "@/data/lebanese-locations";

interface PhysicalFeaturesStepProps {
  data: {
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
    skinTone: string;
    hasTattoos: boolean;
    hasPiercings: boolean;
    customEyeColor?: string;
    customHairColor?: string;
  };
  gender: "male" | "female";
  onChange: (field: string, value: string | boolean) => void;
}

const PhysicalFeaturesStep = ({ data, gender, onChange }: PhysicalFeaturesStepProps) => {
  const [showCustomEyeColor, setShowCustomEyeColor] = useState(data.eyeColor === "Other");
  const [showCustomHairColor, setShowCustomHairColor] = useState(data.hairColor === "Other");

  const handleEyeColorChange = (value: string) => {
    onChange("eyeColor", value);
    setShowCustomEyeColor(value === "Other");
    if (value !== "Other") {
      onChange("customEyeColor", "");
    }
  };

  const handleHairColorChange = (value: string) => {
    onChange("hairColor", value);
    setShowCustomHairColor(value === "Other");
    if (value !== "Other") {
      onChange("customHairColor", "");
    }
  };

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
            <Label htmlFor="pantSize">Pant Size *</Label>
            <Input
              id="pantSize"
              type="text"
              placeholder="32"
              value={data.pantSize}
              onChange={(e) => onChange("pantSize", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jacketSize">Jacket Size *</Label>
            <Input
              id="jacketSize"
              type="text"
              placeholder="M"
              value={data.jacketSize}
              onChange={(e) => onChange("jacketSize", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shoeSize">Shoe Size *</Label>
            <Input
              id="shoeSize"
              type="text"
              placeholder="42"
              value={data.shoeSize}
              onChange={(e) => onChange("shoeSize", e.target.value)}
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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Eye Color *</Label>
            <Select
              value={data.eyeColor}
              onValueChange={handleEyeColorChange}
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
            {showCustomEyeColor && (
              <Input
                placeholder="Specify eye color..."
                value={data.customEyeColor || ""}
                onChange={(e) => onChange("customEyeColor", e.target.value)}
                className="h-12 mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label>Hair Color *</Label>
            <Select
              value={data.hairColor}
              onValueChange={handleHairColorChange}
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
            {showCustomHairColor && (
              <Input
                placeholder="Specify hair color..."
                value={data.customHairColor || ""}
                onChange={(e) => onChange("customHairColor", e.target.value)}
                className="h-12 mt-2"
              />
            )}
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