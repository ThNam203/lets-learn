import { Card } from "@/lib/shadcn/card";

interface StickCardProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function StickyCard({ children }: StickCardProps) {
  return (
    <div className="sticky top-5 h-fit max-w-[320px] w-1/3">
      <Card className="p-4 space-y-4">{children}</Card>
    </div>
  );
}
