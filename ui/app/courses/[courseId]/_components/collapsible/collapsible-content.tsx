"use client";
import IconBadge from "@/components/ui/simple/icon-badge";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/accordion";
import { cn } from "@/lib/utils";
import { ChevronRight, MoreVertical } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  value: string;
  title: ReactNode;
  onTrigger?: (value: string) => void;
  showContent: string[];
  children: ReactNode;
  className?: string;
  canEdit?: boolean;
}
const CollapsibleContent = ({
  title,
  value,
  canEdit = true,
  onTrigger,
  children,
  showContent,
  className,
}: Props) => {
  const handleTrigger = () => {
    if (onTrigger) onTrigger(value);
  };
  return (
    <AccordionItem value={value} className={className}>
      <div className="w-full flex flex-row items-center justify-between">
        <AccordionTrigger className="decoration-indigo-800 ">
          <div
            className="w-fit flex flex-row items-center justify-start gap-4 cursor-pointer"
            onClick={handleTrigger}
          >
            <IconBadge
              icon={<ChevronRight />}
              size="sm"
              className={cn(showContent.includes(value) && "rotate-90")}
              variant="indigo"
              onClick={handleTrigger}
            />
            <h5 className="text-indigo-800">{title}</h5>
          </div>
        </AccordionTrigger>
        {canEdit && <MoreVertical size={20} />}
      </div>

      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default CollapsibleContent;
