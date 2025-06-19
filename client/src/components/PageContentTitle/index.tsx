type Props = {
  text: string;
};

export const PageContentTitle: React.FC<Props> = ({
  text
}) => {
  return (
    <h1 className="text-2xl font-semibold text-foreground theme-transition">{text}</h1>
  );
}
