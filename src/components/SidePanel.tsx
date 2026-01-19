type Props = {
  children: React.ReactNode;
};

export function SidePanel({ children }: Props) {
  return <div className="flex flex-col gap-6">{children}</div>;
}
