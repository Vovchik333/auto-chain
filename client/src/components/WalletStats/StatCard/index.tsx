import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, icon }: Props) => (
  <Card className="rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A] hover:border-[#00FFC6] transition-all">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-[#CFCFCF]">{title}</CardTitle>
      <div className="p-2 rounded-lg bg-[#2A2F38] ring-1 ring-[#353B45]">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </CardContent>
  </Card>
);
