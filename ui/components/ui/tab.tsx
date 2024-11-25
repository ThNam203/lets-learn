import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  isSelected: boolean;
  variant?: "default" | "white-text";
  onClick?: () => void;
}
const Tab = ({ title, isSelected, variant = "default", onClick }: Props) => {
  return (
    <div
      className={cn(
        "w-fit h-[40px] flex items-center px-4 border-b-2 border-transparent transition-all duration-300 font-semibold cursor-pointer",
        !isSelected &&
          variant === "default" &&
          "text-gray-500 hover:text-blue-700",
        isSelected && variant === "default" && "border-blue-700 text-blue-700",
        !isSelected &&
          variant === "white-text" &&
          "text-white/60 hover:text-white/90",
        isSelected && variant === "white-text" && "border-gray-200 text-white"
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Tab;
