import React from "react";
import { cn } from "@/lib/utils";
import Tab from "./tab";
import { useTab } from "@/hooks/useTab";

interface Props {
  tabs: string[];
  className?: string;
  variant?: "default" | "white-text";
  onTabSelected?: (tab: string) => void;
}
const TabList = ({
  tabs,
  className,
  variant = "default",
  onTabSelected,
}: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab, handleTabSelected: onSelectTab } = tabContext;
  const handleTabSelected = (tab: string) => {
    onSelectTab(tab);
    if (onTabSelected) onTabSelected(tab);
  };
  return (
    <div
      className={cn(
        "px-5 flex flex-row items-center border-b-[1px]",
        variant === "default" && "border-gray-400",
        variant === "white-text" && "border-white",
        className
      )}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab}
          isSelected={tab === selectedTab}
          variant={variant}
          onClick={() => handleTabSelected(tab)}
        />
      ))}
    </div>
  );
};

export default TabList;
