import { Label } from "@radix-ui/react-label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  type: string;
  label: string;
  isSelected: boolean;
}

export const TransactionTypeCard = ({ type, label, isSelected }: Props) => (
  <div className={`relative flex items-center justify-center p-4 rounded-box-lg border transition-all duration-200 theme-transition ${
    isSelected 
      ? 'border-primary bg-secondary/50 shadow-primary/10' 
      : 'border-border bg-background hover:border-primary hover:bg-secondary/50'
  }`}>
    <RadioGroupItem value={type} id={type} className="absolute left-4" />
    <Label htmlFor={type} className="flex flex-col items-center cursor-pointer w-full">
      <span className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'} theme-transition`}>
        {label}
      </span>
    </Label>
  </div>
);
