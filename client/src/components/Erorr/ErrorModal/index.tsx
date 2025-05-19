import { PrimaryButton } from "@/components/PrimaryButton";

export const ErrorModal = ({
  error,
  onClose
}: {
  error: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="flex flex-col gap-6 bg-[#1A1F27] p-6 rounded-2xl shadow-xl max-w-sm w-full border border-[#FF6B6B]/30">
      <h2 className="text-lg font-bold text-[#FF4C4C]">Error</h2>
      <p className="text-sm text-[#F0F0F0]">{error}</p>
      <div className="self-end">
        <PrimaryButton
          onClick={onClose}
        >
          Close
        </PrimaryButton>
      </div>
    </div>
  </div>
);
