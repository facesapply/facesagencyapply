import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { governorates, districtsByGovernorate, areasByDistrict, Governorate } from "@/data/lebanese-locations";

interface AddressStepProps {
  data: {
    governorate: string;
    district: string;
    area: string;
  };
  onChange: (field: string, value: string) => void;
}

const AddressStep = ({ data, onChange }: AddressStepProps) => {
  const districts = data.governorate 
    ? districtsByGovernorate[data.governorate as Governorate] || []
    : [];

  const areas = data.district 
    ? areasByDistrict[data.district] || []
    : [];

  const handleGovernorateChange = (value: string) => {
    onChange("governorate", value);
    onChange("district", ""); // Reset district when governorate changes
    onChange("area", ""); // Reset area when governorate changes
  };

  const handleDistrictChange = (value: string) => {
    onChange("district", value);
    onChange("area", ""); // Reset area when district changes
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Where are you located?
        </h2>
        <p className="text-muted-foreground">Your address in Lebanon</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="governorate">Governorate *</Label>
          <Select
            value={data.governorate}
            onValueChange={handleGovernorateChange}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select governorate" />
            </SelectTrigger>
            <SelectContent>
              {governorates.map((gov) => (
                <SelectItem key={gov} value={gov}>
                  {gov}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">District *</Label>
          <Select
            value={data.district}
            onValueChange={handleDistrictChange}
            disabled={!data.governorate}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={data.governorate ? "Select district" : "Select governorate first"} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area *</Label>
          <Select
            value={data.area}
            onValueChange={(value) => onChange("area", value)}
            disabled={!data.district}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={data.district ? "Select area" : "Select district first"} />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
