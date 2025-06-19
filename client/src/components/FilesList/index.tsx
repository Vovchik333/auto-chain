import { useTranslations } from 'next-intl';
import { File } from 'lucide-react';

type Props = {
  files: File[];
}

export const FilesList: React.FC<Props> = ({files}) => {
  const t = useTranslations('files');

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground theme-transition">
        {t('selectedFiles', { count: files.length })}:
      </p>
      <ul className="space-y-2">
        {files.map((file, idx) => (
          <li 
            key={file.name + idx} 
            className="flex items-center gap-2 text-foreground text-sm p-3 bg-secondary/50 rounded-md border border-border theme-transition"
          >
            <File className="w-4 h-4 text-primary theme-transition" />
            <span className="truncate">{file.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
