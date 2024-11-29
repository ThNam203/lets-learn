import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  icon: any;
  className?: string;
}
export default function SidebarItem({ title, icon, className }: Props) {
  return (
    <div
      className={cn(
        "w-full relative flex flex-row items-center gap-6 text-gray-500 pl-9 py-3 hover:bg-blue-50 hover:text-blue-700 rounded-r-full transition-all duration-200 cursor-pointer",
        className
      )}
    >
      {icon}
      <span className="font-bold text-sm">{title}</span>
    </div>
  );
}
