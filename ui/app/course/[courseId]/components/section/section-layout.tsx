"use client";
import IconBadge from "@/components/ui/simple/icon-badge";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/accordion";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Pen, RefreshCcw, Trash2 } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  value: string;
  title: string;
  showContent: string[];
  children: ReactNode;
  className?: string;
  canEdit?: boolean;
  isEditing?: boolean;
  onTitleChange?: (value: string) => void;
  onTrigger?: (value: string) => void;
  onEdit?: () => void;
  onSave?: () => void;
  onRefresh?: () => void;
}
export default function SectionLayout({
  title,
  value,
  canEdit = true,
  isEditing = false,
  children,
  showContent,
  className,
  onTitleChange,
  onTrigger,
  onEdit,
  onSave,
  onRefresh,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isSectionOpen = showContent.includes(value);
  const handleTrigger = () => {
    if (isEditing && isSectionOpen) return;
    if (onTrigger) onTrigger(value);
  };
  const handleContentClick = (e: any) => {
    e.stopPropagation();
  };
  const handleEdit = (e: any) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };
  const handleSave = (e: any) => {
    e.stopPropagation();
    if (onSave) onSave();
  };
  const handleTitleChange = (e: any) => {
    if (onTitleChange) onTitleChange(e.target.value);
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.value = title;
    }
  }, [title]);

  return (
    <AccordionItem
      value={value}
      className={cn(
        "w-full rounded-lg px-6 border-[0.5px] border-gray-300 duration-200",
        isEditing && "border-gray-400 shadow-md",
        !isEditing && "hover:border-gray-400 hover:shadow-md",
        className
      )}
      onClick={handleTrigger}
    >
      <div className="w-full flex flex-row items-center justify-between cursor-pointer">
        <AccordionTrigger
          className={cn(
            "w-full decoration-indigo-800",
            isEditing && "hover:no-underline"
          )}
        >
          <div
            className="w-full pr-4 flex flex-row items-center justify-start gap-4 cursor-pointer"
            onClick={handleTrigger}
          >
            <IconBadge
              icon={<ChevronRight />}
              variant="indigo"
              size="sm"
              className={cn(isSectionOpen && "rotate-90")}
              onClick={handleTrigger}
            />
            {!isEditing && <h5 className="text-indigo-800">{title}</h5>}
            {isEditing && (
              <Input
                ref={inputRef}
                defaultValue={title}
                variant="no-border"
                className="text-indigo-800 font-bold text-xl"
                onClick={(e) => e.stopPropagation()}
                onChange={handleTitleChange}
              />
            )}
          </div>
        </AccordionTrigger>
        {canEdit && !isEditing && (
          <Pen
            size={20}
            className="cursor-pointer text-gray-500 hover:text-gray-400 duration-200"
            onClick={handleEdit}
          />
        )}

        {canEdit && isEditing && (
          <div className="flex flex-row gap-2">
            <Trash2
              size={20}
              className="cursor-pointer text-red-500 hover:text-red-600 duration-200"
            />
            <RefreshCcw
              size={20}
              className="cursor-pointer text-gray-500 hover:text-gray-600 duration-200"
              onClick={onRefresh}
            />
            <Check
              size={20}
              className="cursor-pointer text-green-500 hover:text-green-600 duration-200"
              onClick={handleSave}
            />
          </div>
        )}
      </div>

      <AccordionContent onClick={handleContentClick}>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
