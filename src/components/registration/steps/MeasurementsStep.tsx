import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sizeGuides = {
  pants: {
    title: "Pants Size Guide",
    headers: ["US", "UK", "EU"],
    rows: [
      ["28", "28", "44"],
      ["30", "30", "46"],
      ["32", "32", "48"],
      ["34", "34", "50"],
      ["36", "36", "52"],
      ["38", "38", "54"],
      ["40", "40", "56"],
    ],
  },
  jacket: {
    title: "Jacket/Blouse Size Guide",
    headers: ["US", "UK", "EU"],
    rows: [
      ["XS", "6", "34"],
      ["S", "8-10", "36-38"],
      ["M", "12-14", "40-42"],
      ["L", "16", "44"],
      ["XL", "18", "46"],
      ["XXL", "20", "48"],
    ],
  },
  shoes: {
    title: "Shoe Size Guide",
    headers: ["US Men", "UK", "EU"],
    rows: [
      ["7", "6", "39"],
      ["8", "7", "40"],
      ["9", "8", "42"],
      ["10", "9", "43"],
      ["11", "10", "44"],
      ["12", "11", "45"],
      ["13", "12", "46"],
    ],
  },
  womenBody: {
    title: "Women's Body Measurements",
    headers: ["Size", "Bust (cm)", "Waist (cm)", "Hips (cm)"],
    rows: [
      ["XS (6)", "81-84", "61-64", "86-89"],
      ["S (8)", "84-89", "64-69", "89-94"],
      ["M (10)", "89-94", "69-74", "94-99"],
      ["L (12)", "94-99", "74-79", "99-104"],
      ["XL (14)", "99-104", "79-84", "104-109"],
      ["XXL (16)", "104-109", "84-89", "109-114"],
    ],
  },
};

const SizeGuideTable = ({ guide }: { guide: typeof sizeGuides.pants }) => (
  <div className="text-xs">
    <div className="font-semibold mb-2 text-foreground">{guide.title}</div>
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border">
          {guide.headers.map((header) => (
            <th key={header} className="px-2 py-1 text-left font-medium text-muted-foreground">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {guide.rows.map((row, idx) => (
          <tr key={idx} className="border-b border-border/50">
            {row.map((cell, cellIdx) => (
              <td key={cellIdx} className="px-2 py-1 text-foreground">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface MeasurementsStepProps {
  data: {
    height: string;
    weight: string;
    pantSize: string;
    jacketSize: string;
    shoeSize: string;
    bust: string;
    waist: string;
    hips: string;
    shoulders: string;
  };
  gender: "male" | "female";
  onChange: (field: string, value: string) => void;
}

const MeasurementsStep = ({ data, gender, onChange }: MeasurementsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Measurements
        </h2>
        <p className="text-muted-foreground">Your body measurements and sizes</p>
      </div>

      {/* Size Guide Panel */}
      <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Size Conversion Guide</span>
        </div>
        <div className={`grid ${gender === "female" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"} gap-2`}>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-xs bg-background hover:bg-accent border border-border rounded px-3 py-2 transition-colors">
                Pants
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <SizeGuideTable guide={sizeGuides.pants} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-xs bg-background hover:bg-accent border border-border rounded px-3 py-2 transition-colors">
                {gender === "male" ? "Jacket" : "Blouse"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <SizeGuideTable guide={sizeGuides.jacket} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-xs bg-background hover:bg-accent border border-border rounded px-3 py-2 transition-colors">
                Shoes
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <SizeGuideTable guide={sizeGuides.shoes} />
            </PopoverContent>
          </Popover>
          {gender === "female" && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-xs bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary rounded px-3 py-2 transition-colors font-medium">
                  Body Guide
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <SizeGuideTable guide={sizeGuides.womenBody} />
              </PopoverContent>
            </Popover>
          )}
        </div>
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
            <Label htmlFor="jacketSize">{gender === "male" ? "Jacket" : "Blouse"} Size *</Label>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="waist">Waist (cm) *</Label>
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
            <Label htmlFor="bust">{gender === "male" ? "Chest" : "Bust"} (cm) *</Label>
            <Input
              id="bust"
              type="number"
              placeholder="90"
              value={data.bust}
              onChange={(e) => onChange("bust", e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hips">Hips (cm) *</Label>
            <Input
              id="hips"
              type="number"
              placeholder="95"
              value={data.hips}
              onChange={(e) => onChange("hips", e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shoulders">Shoulders (cm) *</Label>
            <Input
              id="shoulders"
              type="number"
              placeholder="45"
              value={data.shoulders}
              onChange={(e) => onChange("shoulders", e.target.value)}
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsStep;