import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoStepProps {
  data: {
    mobile: string;
    whatsapp: string;
  };
  onChange: (field: string, value: string) => void;
}

const ContactInfoStep = ({ data, onChange }: ContactInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-muted-foreground">How can we reach you?</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center px-4 h-12 bg-secondary rounded-md text-sm">
              +961
            </div>
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
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center px-4 h-12 bg-secondary rounded-md text-sm">
              +961
            </div>
            <Input
              id="whatsapp"
              placeholder="Same as mobile or different"
              value={data.whatsapp}
              onChange={(e) => onChange("whatsapp", e.target.value)}
              className="h-12 flex-1"
              type="tel"
            />
          </div>
          <p className="text-xs text-muted-foreground">Leave blank if same as mobile</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep;