import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import { Upload } from "lucide-react";

type Props = {
  onSetFiles: (files: File[]) => void;
};

export const DropZone: React.FC<Props> = ({
  onSetFiles
}) => {
  const t = useTranslations('dropZone');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const fileList = e.dataTransfer.files;

    if (fileList !== null) {
      onSetFiles(Array.from(fileList))
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList !== null) {
      onSetFiles(Array.from(fileList))
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleFileDrop}
      className={cn(
        "border-2 border-dashed p-6 text-center rounded-2xl cursor-pointer transition-all theme-transition",
        dragOver ? "border-primary bg-primary/20" : "border-border bg-secondary/50"
      )}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center gap-2">
        <Upload className="w-6 h-6 text-muted-foreground theme-transition" />
        <p className="text-sm text-muted-foreground theme-transition">
          {dragOver ? t('dropHere') : t('dragAndDrop')}
        </p>
        <p className="text-xs text-muted-foreground/80 theme-transition">
          {t('orClickToUpload')}
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}