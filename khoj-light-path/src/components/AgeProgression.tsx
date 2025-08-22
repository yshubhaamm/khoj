import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import person01_young from "@/assets/person01_young.png";
import person01_aged from "@/assets/person01_aged.png";
import person02_young from "@/assets/person02_young.png";
import person02_aged from "@/assets/person02_aged.png";
import person03_young from "@/assets/person03_young.png";
import person03_aged from "@/assets/person03_aged.png";
import person04_young from "@/assets/person04_young.png";
import person04_aged from "@/assets/person04_aged.png";
import person05_young from "@/assets/person05_young.png";
import person05_aged from "@/assets/person05_aged.png";
import person06_young from "@/assets/person06_young.png";
import person06_aged from "@/assets/person06_aged.png";
import person07_young from "@/assets/person07_young.png";
import person07_aged from "@/assets/person07_aged.png";
import person08_young from "@/assets/person08_young.png";
import person08_aged from "@/assets/person08_aged.png";
import person09_young from "@/assets/person09_young.png";
import person09_aged from "@/assets/person09_aged.png";
import person10_young from "@/assets/person10_young.png";
import person10_aged from "@/assets/person10_aged.png";
import person11_young from "@/assets/person11_young.png";
import person11_aged from "@/assets/person11_aged.png";

// Map input file names to aged images
const ageProgressionMap: Record<string, string> = {
  "person01_young.png": person01_aged,
  "person02_young.png": person02_aged,
  "person03_young.png": person03_aged,
  "person04_young.png": person04_aged,
  "person05_young.png": person05_aged,
  "person06_young.png": person06_aged,
  "person07_young.png": person07_aged,
  "person08_young.png": person08_aged,
  "person09_young.png": person09_aged,
  "person10_young.png": person10_aged,
  "person11_young.png": person11_aged,
};

const IMAGE_FRAME_SIZE = 300; // px

const AgeProgression = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progressedImage, setProgressedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProgressedImage(null);
    }
  };

  const handleAgeProgression = () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    const inputFileName = selectedFile.name.toLowerCase();
    const agedImageImport = ageProgressionMap[inputFileName];

    if (!agedImageImport) {
      toast({
        title: "No matching aged image found",
        description:
          "Showing demo aged image. Please upload person01_young.png to see mapping.",
        variant: "warning",
      });
      setProgressedImage(null);
      return;
    }

    toast({
      title: "Age Progression Preview",
      description: "Here's a preview of the aged version of your photo, created from prepared examples.",
    });

    setProgressedImage(agedImageImport);
  };

  const imageFrameStyle: React.CSSProperties = {
    width: `${IMAGE_FRAME_SIZE}px`,
    height: `${IMAGE_FRAME_SIZE}px`,
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.13)",
    background: "#e9ecef",
  };

  // Handle download of aged image
  const handleDownload = () => {
    if (!progressedImage) return;

    // Create an invisible link to download the image
    const link = document.createElement("a");
    link.href = progressedImage;
    // Suggest filename based on input file
    const suggestedName = selectedFile
      ? selectedFile.name.toLowerCase().replace("_young", "_aged")
      : "aged_image.png";
    link.download = suggestedName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Age Progression Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how missing persons might look today with our advanced age progression AI
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-1 gap-8 mb-12">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Original Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="upload-area cursor-pointer"
                  onClick={() => document.getElementById("age-file-input")?.click()}
                >
                  <input
                    id="age-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {previewUrl ? (
                    <div className="text-center">
                      <img
                        src={previewUrl}
                        alt="Original"
                        style={imageFrameStyle}
                        className="mx-auto mb-4"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Click to upload original photo
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleAgeProgression}
              disabled={!selectedFile}
              className="btn-primary w-full mt-6"
            >
              Generate Age Progression
            </Button>
          </div>

          {progressedImage && previewUrl && (
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-center">Before vs After Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">
                      Original
                    </h3>
                    <img
                      src={previewUrl}
                      alt="Original"
                      style={imageFrameStyle}
                      className="mx-auto"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4 text-accent">
                      Age Progressed
                    </h3>
                    <img
                      src={progressedImage}
                      alt="Age Progressed"
                      style={imageFrameStyle}
                      className="mx-auto"
                    />
                    <Button
                      onClick={handleDownload}
                      className="btn-secondary w-full mt-4"
                    >
                      Download Aged Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AgeProgression;
