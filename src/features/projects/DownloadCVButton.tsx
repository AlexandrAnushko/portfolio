"use client";

import { Button } from "@/shared/components/Button";
import { Download } from "lucide-react";

export const DownloadCVButton = () => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/documents/Anushko_Alexandr_CV.pdf";
    a.download = "Anushko_Alexandr_CV.pdf";
    a.click();
  };

  return (
    <Button
      text="Download CV"
      size="small"
      textTransform="normal-case"
      mode="transparent"
      onClick={handleDownload}
      rightIcon={<Download />}
    />
  );
};
