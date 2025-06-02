import { PrimaryButton } from "@/components/PrimaryButton";
import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';

export interface ErrorModalProps {
  error: string;
  onClose: () => void;
}

export const ErrorModal = ({
  error,
  onClose
}: ErrorModalProps) => {
  const t = useTranslations('common');
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 theme-transition">
      <div className="flex flex-col gap-6 bg-background/95 p-6 rounded-box-xl shadow-lg max-w-sm w-full border border-destructive/30 theme-transition animate-in fade-in-0 zoom-in-95">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <h2 className="text-lg font-bold text-destructive">
            {t('error')}
          </h2>
        </div>
        <p className="text-sm text-foreground theme-transition">{error}</p>
        <div className="self-end">
          <PrimaryButton
            onClick={onClose}
            variant="ghost"
          >
            {t('close')}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
