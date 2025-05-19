import { AppRoute } from "@/common/enums/app-route";
import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link 
      href={AppRoute.ROOT} 
      className="font-bold uppercase text-[#F0F0F0] hover:text-[#00FFC6] transition duration-200"
    >
      Auto Chain
    </Link>
  );
}
