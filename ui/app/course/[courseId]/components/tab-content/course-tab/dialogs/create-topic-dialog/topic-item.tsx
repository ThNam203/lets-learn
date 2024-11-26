import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  hidden: boolean;
  onClick?: () => void;
}
export default function TopicItem({ title, icon, hidden, onClick }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 w-[100px] h-[100px] rounded-md shadow-md cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:shadow-lg",
        hidden &&
          "pointer-events-none select-none cursor-default opacity-0 scale-0"
      )}
      onClick={onClick}
    >
      {icon}
      <p className="text-gray-500 font-semibold capitalize text-sm">{title}</p>
    </div>
  );
}
