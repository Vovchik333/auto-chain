import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

type Props = {
  onSetFiles: (files: File[]) => void;
};

export const DropZone: React.FC<Props> = ({
  onSetFiles
}) => {
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
        "border-2 border-dashed p-4 text-center rounded-md cursor-pointer transition",
        dragOver ? "border-[#00FFC6] bg-[#00FFC650]" : "border-[#A3A3A3] bg-[#2A2F38]"
      )}
      onClick={() => fileInputRef.current?.click()}
    >
      <p className="text-sm text-[#A3A3A3]">
        Drag & drop CSV file here or click to browse
      </p>
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