import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  blur: boolean;
}
export default function TopicItem({ title, icon, blur }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 w-[100px] h-[100px] rounded-md shadow-md cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:shadow-lg",
        blur &&
          "filter blur-[2px] pointer-events-none select-none cursor-default"
      )}
    >
      {icon}
      <p className="text-gray-500 font-semibold capitalize text-sm">{title}</p>
    </div>
  );
}
