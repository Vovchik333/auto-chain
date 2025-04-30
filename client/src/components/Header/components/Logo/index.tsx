import { AppRoute } from "@/common/enums/app-route";
import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link href={AppRoute.ROOT} className="font-bold uppercase" >
      Auto Chain
    </Link>
  );
}
