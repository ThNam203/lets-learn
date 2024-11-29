"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/accordion";
import { ChevronRight } from "lucide-react";
import React from "react";

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
}
export default function SidebarCollapsibleItem({ trigger, children }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleTrigger = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="w-full py-0 hover:no-underline text-gray-500"
          onClick={toggleTrigger}
        >
          <ChevronRight className="absolute left-2 transition-all duration-200" />
          {trigger}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
