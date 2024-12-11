"use client";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";

interface Props {
  title: string;
  icon: any;
  className?: string;
  href?: string;
}
export default function SidebarItem({ title, icon, className, href }: Props) {
  const router = useRouter();
  const path = usePathname();
  const isSelected = href ? path.startsWith(href) : false;
  const handleClick = () => {
    if (href) router.push(href);
  };
  return (
    <div
      className={cn(
        "w-full relative flex flex-row items-center gap-6 text-gray-500 pl-9 py-3 hover:bg-blue-50 hover:text-blue-700 rounded-r-full transition-all duration-200 cursor-pointer",
        isSelected && "bg-blue-50 text-blue-700",
        className
      )}
      onClick={handleClick}
    >
      {icon}
      <span className="font-bold text-sm">{title}</span>
    </div>
  );
}
