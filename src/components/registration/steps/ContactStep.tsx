import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryCodes } from "@/data/lebanese-locations";
interface ContactStepProps {
  data: {
    mobile: string;
    mobileCountryCode: string;
    whatsapp: string;
    whatsappCountryCode: string;
    otherNumber: string;
    otherNumberCountryCode: string;
    instagram: string;
    tiktok: string;
    website: string;
  };
  onChange: (field: string, value: string) => void;
  className?: string;
}
const ContactStep = ({
  data,
  onChange,
  className
}: ContactStepProps) => {
  return <div className={`space-y-6 ${className || ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-sans text-center">
          Contact Information
        </h2>
        <p className="text-muted-foreground">How can we reach you?</p>
      </div>

      <div className="space-y-4 md:space-y-5">
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <div className="flex gap-2 md:gap-3">
            <Select value={data.mobileCountryCode || "+961"} onValueChange={value => onChange("mobileCountryCode", value)}>
              <SelectTrigger className="w-28 md:w-32 h-12 md:h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map(code => <SelectItem key={code.code} value={code.code}>
                    {code.code}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Input id="mobile" placeholder="XX XXX XXX" value={data.mobile} onChange={e => onChange("mobile", e.target.value)} className="h-12 md:h-14 flex-1" type="tel" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number *</Label>
          <div className="flex gap-2 md:gap-3">
            <Select value={data.whatsappCountryCode || "+961"} onValueChange={value => onChange("whatsappCountryCode", value)}>
              <SelectTrigger className="w-28 md:w-32 h-12 md:h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map(code => <SelectItem key={code.code} value={code.code}>
                    {code.code}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Input id="whatsapp" placeholder="XX XXX XXX" value={data.whatsapp} onChange={e => onChange("whatsapp", e.target.value)} className="h-12 md:h-14 flex-1" type="tel" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherNumber">Other Number *</Label>
          <div className="flex gap-2 md:gap-3">
            <Select value={data.otherNumberCountryCode || "+961"} onValueChange={value => onChange("otherNumberCountryCode", value)}>
              <SelectTrigger className="w-28 md:w-32 h-12 md:h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map(code => <SelectItem key={code.code} value={code.code}>
                    {code.code}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Input id="otherNumber" placeholder="XX XXX XXX" value={data.otherNumber} onChange={e => onChange("otherNumber", e.target.value)} className="h-12 md:h-14 flex-1" type="tel" />
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="pt-6 border-t border-border my-[100px]">
        <h3 className="text-lg text-foreground mb-4 md:mb-5 text-center font-bold md:text-3xl font-sans"><span className="text-muted-foreground text-sm font-normal">Social Media</span>
        </h3>
        
        <div className="space-y-4 md:space-y-5">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
              <Input id="instagram" placeholder="username" value={data.instagram} onChange={e => onChange("instagram", e.target.value)} className="h-12 md:h-14 pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
              <Input id="tiktok" placeholder="username" value={data.tiktok} onChange={e => onChange("tiktok", e.target.value)} className="h-12 md:h-14 pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="https://yourwebsite.com" value={data.website} onChange={e => onChange("website", e.target.value)} className="h-12 md:h-14" type="url" />
          </div>
        </div>
      </div>
    </div>;
};
export default ContactStep;