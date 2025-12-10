import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";

interface FileUpload {
  file: File | null;
  preview: string | null;
}

interface FileUploadFieldProps {
  label: string;
  fileState: FileUpload;
  setFileState: React.Dispatch<React.SetStateAction<FileUpload>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<FileUpload>>
  ) => void;
}

export function FileUploadField({
  label,
  fileState,
  setFileState,
  inputRef,
  onFileChange,
}: FileUploadFieldProps) {
  const removeFile = (setter: React.Dispatch<React.SetStateAction<FileUpload>>) => {
    setter({ file: null, preview: null });
  };

  return (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={(e) => onFileChange(e, setFileState)}
        className="hidden"
      />
      {fileState.preview ? (
        <div className="relative rounded-lg border border-border overflow-hidden bg-secondary/30">
          <img
            src={fileState.preview}
            alt={label}
            className="w-full h-24 object-cover"
          />
          <button
            type="button"
            onClick={() => removeFile(setFileState)}
            className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
          <div className="p-2 bg-secondary/50">
            <p className="text-xs text-muted-foreground truncate">{fileState.file?.name}</p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-24 rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/50 transition-colors flex flex-col items-center justify-center gap-2"
        >
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Click to upload</span>
        </button>
      )}
    </div>
  );
}