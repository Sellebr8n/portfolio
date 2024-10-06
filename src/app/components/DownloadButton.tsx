"use client";

import { Button } from '@/components/ui/button';

const DownloadButton = () => {
  return (
    <Button
      onClick={async () => {
        const res = await fetch('/resume/download');
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Ludvig_Sellebråten_CV@${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }}
      variant={'default'}>

      Download it
    </Button>
  );
};

export default DownloadButton;
