"use client";
import useCollapsibleList from "@/hooks/useCollapsibleList";
import { Accordion } from "@/lib/shadcn/accordion";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Section } from "@/models/course";
import { useEffect, useState } from "react";
import SectionContent from "./section-content";
import SectionLayout from "./section-layout";
import { Plus } from "lucide-react";

interface Props {
  initShowContent?: string[];
  sections: Section[];
  className?: string;
  contentClassName?: string;
  onItemTrigger?: (value: string) => void;
  onEdit?: (id: string) => void;
  onSave?: (id: string) => void;
}
const SectionList = ({
  sections,
  initShowContent,
  className,
  contentClassName,
  onItemTrigger,
  onEdit,
  onSave,
}: Props) => {
  const { showContent, handleItemTrigger, collapseAll, setShowContent } =
    useCollapsibleList();

  const [sectionEditting, setSectionEditting] = useState<string[]>([]);

  useEffect(() => {
    if (initShowContent) setShowContent(initShowContent);
  }, []);

  const handleTriggerClick = (value: string) => {
    if (onItemTrigger) onItemTrigger(value);
    handleItemTrigger(value);
  };
  const handleEdit = (id: string) => {
    if (onEdit) onEdit(id);
    setSectionEditting([...sectionEditting, id]);
  };
  const handleSave = (id: string) => {
    if (onSave) onSave(id);
    setSectionEditting(sectionEditting.filter((item) => item !== id));
  };

  return (
    <div className="w-full">
      {sections.length > 0 && (
        <div className="w-full flex justify-end">
          <Button
            type="button"
            variant="link"
            onClick={collapseAll}
            className="p-0"
          >
            Collapse all
          </Button>
        </div>
      )}
      <Accordion
        value={showContent}
        type="multiple"
        className={cn("w-full flex flex-col gap-4", className)}
      >
        {sections.map((section, index) => {
          const { title, id, description, topics } = section;
          const isEditting = sectionEditting.includes(section.id);
          return (
            <SectionLayout
              key={index}
              title={title}
              value={id}
              isEditing={isEditting}
              showContent={showContent}
              onTrigger={handleTriggerClick}
              className={contentClassName}
              onEdit={() => handleEdit(id)}
              onSave={() => handleSave(id)}
            >
              <SectionContent
                desc={description}
                topics={topics}
                isEditting={isEditting}
              />
            </SectionLayout>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SectionList;
