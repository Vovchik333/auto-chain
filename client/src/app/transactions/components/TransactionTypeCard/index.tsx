import { Label } from "@radix-ui/react-label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  type: string;
  label: string;
  isSelected: boolean;
}

export const TransactionTypeCard = ({ type, label, isSelected }: Props) => (
  <div className={`relative flex items-center justify-center p-4 rounded-lg border transition-all duration-200 ${
    isSelected 
      ? 'border-[#00FFC6] bg-[#2A2F3A] shadow-[0_0_10px_rgba(0,255,198,0.1)]' 
      : 'border-[#2A2F3A] bg-[#1A1F27] hover:border-[#00FFC6] hover:bg-[#2A2F3A]'
  }`}>
    <RadioGroupItem value={type} id={type} className="absolute left-4" />
    <Label htmlFor={type} className="flex flex-col items-center cursor-pointer w-full">
      <span className={`font-medium ${isSelected ? 'text-[#00FFC6]' : 'text-[#F0F0F0]'}`}>
        {label}
      </span>
    </Label>
  </div>
);
