import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface PhotoUploadStepProps {
  data: {
    headshot: File | null;
    fullBody: File | null;
  };
  onChange: (field: string, value: File | null) => void;
}

const PhotoUploadStep = ({ data, onChange }: PhotoUploadStepProps) => {
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [fullBodyPreview, setFullBodyPreview] = useState<string | null>(null);

  const handleFileChange = (
    field: "headshot" | "fullBody",
    file: File | null
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "headshot") {
          setHeadshotPreview(reader.result as string);
        } else {
          setFullBodyPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (field === "headshot") {
        setHeadshotPreview(null);
      } else {
        setFullBodyPreview(null);
      }
    }
    onChange(field, file);
  };

  const handleDrop = (
    e: React.DragEvent,
    field: "headshot" | "fullBody"
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(field, file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Upload Your Photos
        </h2>
        <p className="text-muted-foreground">
          Please upload clear, high-quality photos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Headshot Upload */}
        <div className="space-y-2">
          <Label>Take a Selfie or upload a headshot if you can</Label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              headshotPreview
                ? "border-primary"
                : "border-border hover:border-primary/50"
            }`}
            onDrop={(e) => handleDrop(e, "headshot")}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("headshot-input")?.click()}
          >
            {headshotPreview ? (
              <div className="relative">
                <img
                  src={headshotPreview}
                  alt="Headshot preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileChange("headshot", null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-8">
                <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Face clearly visible, good lighting
                </p>
              </div>
            )}
            <input
              id="headshot-input"
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={(e) =>
                handleFileChange("headshot", e.target.files?.[0] || null)
              }
            />
          </div>
        </div>

        {/* Full Body Upload */}
        <div className="space-y-2">
          <Label>Full Body Photo</Label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              fullBodyPreview
                ? "border-primary"
                : "border-border hover:border-primary/50"
            }`}
            onDrop={(e) => handleDrop(e, "fullBody")}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("fullbody-input")?.click()}
          >
            {fullBodyPreview ? (
              <div className="relative">
                <img
                  src={fullBodyPreview}
                  alt="Full body preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileChange("fullBody", null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-8">
                <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Full body visible, neutral pose
                </p>
              </div>
            )}
            <input
              id="fullbody-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleFileChange("fullBody", e.target.files?.[0] || null)
              }
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Photos should be recent, in good lighting, with minimal editing.
        Professional photos are a plus but not required.
      </p>
    </div>
  );
};

export default PhotoUploadStep;