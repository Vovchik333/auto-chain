import { CheckCircle2, Copy } from "lucide-react";
import { toast } from "sonner";
import { SecondaryButton } from "../SecondaryButton";
import { useState } from "react";
import { useTranslations } from 'next-intl';

type Props = {
  text: string;
  isPreventDefault?: boolean;
}

export const CopyButton: React.FC<Props> = ({
  text,
  isPreventDefault = false,
}) => {
  const t = useTranslations('common');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(t('copiedToClipboard'));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SecondaryButton
      isPreventDefault={isPreventDefault}
      onClick={() => handleCopy(text)}
    >
      {copied ? (
        <CheckCircle2 className="w-4 h-4 text-primary theme-transition" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground theme-transition" />
      )}
    </SecondaryButton>
  );
}
