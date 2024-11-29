import React from "react";
import SidebarItem from "./sidebar-item";
import {
  Calendar,
  ClipboardList,
  Home,
  Settings,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarCollapsibleItem from "./sidebar-colapsible-item";
import IconPeople from "@/components/icons/people";
import SidebarCourseItem from "./sidebar-course-item";
import Image from "next/image";

interface Props {
  className?: string;
}
export default function Sidebar({ className }: Props) {
  return (
    <div
      className={cn(
        "w-[350px] h-[calc(100%-60px)] flex flex-col border-r-[0.5px] border-gray-400 bg-white",
        className
      )}
    >
      <Group>
        <SidebarItem title="Home" icon={<Home />} />
        <SidebarItem title="Calendar" icon={<Calendar />} />
      </Group>
      <Group>
        <SidebarCollapsibleItem
          trigger={
            <SidebarItem
              title="Teaching"
              icon={<IconPeople color="#6b7280" />}
            />
          }
        >
          <SidebarItem title="To review" icon={<ClipboardList />} />
          <SidebarCourseItem
            courseName="Introduction to Astronomy"
            category="Astronomy"
            image={
              <Image
                src="/astronomy-bg.jpg"
                alt="Astronomy background"
                width={100}
                height={100}
                className="w-8 h-8 rounded-full object-fill"
              />
            }
          />
        </SidebarCollapsibleItem>
      </Group>
      <Group hasBorder={false}>
        <SidebarItem title="Settings" icon={<Settings />} />
      </Group>
    </div>
  );
}

interface GroupProps {
  children: React.ReactNode;
  className?: string;
  hasBorder?: boolean;
}
const Group = ({ children, className, hasBorder = true }: GroupProps) => {
  return (
    <div
      className={cn(
        "w-full pr-5 py-3",
        hasBorder && "border-b-[0.5px] border-gray-400",
        className
      )}
    >
      {children}
    </div>
  );
};
