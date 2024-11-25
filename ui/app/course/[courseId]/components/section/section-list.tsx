"use client";
import useCollapsibleList from "@/hooks/useCollapsibleList";
import { Accordion } from "@/lib/shadcn/accordion";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Section } from "@/models/course";
import { Topic, TopicType } from "@/models/topic";
import { useEffect, useState } from "react";
import SectionContent from "./section-content";
import SectionLayout from "./section-layout";
import { initQuizTopic } from "./static/init-quiz-topic";

interface Props {
  initShowContent?: string[];
  sections: Section[];
  className?: string;
  contentClassName?: string;
  onSectionChange: (section: Section) => void;
  onItemTrigger?: (value: string) => void;
  onEdit?: (id: string) => void;
  onSave?: (section: Section) => void;
}
const SectionList = ({
  sections,
  initShowContent,
  className,
  contentClassName,
  onSectionChange,
  onItemTrigger,
  onEdit,
  onSave,
}: Props) => {
  const { showContent, handleItemTrigger, collapseAll, setShowContent } =
    useCollapsibleList();

  const [sectionEditting, setSectionEditting] = useState<string[]>([]);
  const [sectionToRefresh, setSectionToRefresh] = useState<Section[]>(sections);

  useEffect(() => {
    if (initShowContent) setShowContent(initShowContent);
  }, []);

  const toggleEdit = (id: string) => {
    if (sectionEditting.includes(id)) {
      setSectionEditting(sectionEditting.filter((item) => item !== id));
    } else {
      setSectionEditting([...sectionEditting, id]);
    }
  };
  const handleSectionChange =
    (section: Section, key: keyof Section) => (value: string) => {
      const updatedSection: Section = {
        ...section,
        [key]: value,
      };
      onSectionChange(updatedSection);
    };

  const handleTriggerClick = (value: string) => {
    if (onItemTrigger) onItemTrigger(value);
    handleItemTrigger(value);
  };
  const handleEdit = (id: string) => {
    if (onEdit) onEdit(id);
    setSectionEditting([...sectionEditting, id]);
  };
  const handleSaveSection = (section: Section) => () => {
    if (onSave) onSave(section);
    // remove id from sectionEditting
    toggleEdit(section.id);
  };
  const handleRefreshSection = (sectionId: string) => () => {
    const toRefresh = sectionToRefresh.find((s) => s.id === sectionId);
    console.log("toRefresh", toRefresh);
    if (toRefresh) onSectionChange(toRefresh);
  };
  const handleCreateTopic = (section: Section) => (type: TopicType) => {
    switch (type) {
      case TopicType.QUIZ: {
        const newSection: Section = {
          ...section,
          topics: [...section.topics, initQuizTopic],
        };
        onSectionChange(newSection);
        break;
      }

      case TopicType.MEETING:
        break;
      case TopicType.ASSIGNMENT:
        break;
      case TopicType.FILE:
        break;
      default:
        break;
    }
  };

  const handleReorderedTopic = (section: Section) => (data: Topic[]) => {
    const newSection: Section = {
      ...section,
      topics: data,
    };
    onSectionChange(newSection);
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
              value={id}
              title={title}
              onTitleChange={handleSectionChange(section, "title")}
              isEditing={isEditting}
              showContent={showContent}
              onTrigger={handleTriggerClick}
              onEdit={() => handleEdit(id)}
              onSave={handleSaveSection(section)}
              onRefresh={handleRefreshSection(id)}
              className={contentClassName}
            >
              <SectionContent
                desc={description}
                topics={topics ?? []}
                isEditting={isEditting}
                onCreateTopic={handleCreateTopic(section)}
                onReorderedTopic={handleReorderedTopic(section)}
                onDescriptionChange={handleSectionChange(
                  section,
                  "description"
                )}
              />
            </SectionLayout>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SectionList;
