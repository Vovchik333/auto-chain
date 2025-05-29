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
  <Card className="rounded-2xl shadow-sm hover:border-primary transition-all theme-transition">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
      <CardTitle className="text-sm font-medium text-foreground theme-transition">{title}</CardTitle>
      <div className="p-2 rounded-xl bg-secondary/50 ring-1 ring-border theme-transition">
        {icon}
      </div>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground theme-transition">{value}</div>
      </div>
    </CardContent>
  </Card>
);
