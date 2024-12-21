"use client";
import useCollapsibleList from "@/hooks/useCollapsibleList";
import { Accordion } from "@/lib/shadcn/accordion";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Section } from "@/models/course";
import {
  AssignmentTopic,
  FileTopic,
  LinkTopic,
  MeetingTopic,
  QuizTopic,
  Topic,
  TopicType,
} from "@/models/topic";
import { useEffect, useState } from "react";
import SectionContent from "./section-content";
import SectionLayout from "./section-layout";
import {
  initAssignment,
  initFileTopic,
  initLink,
  initMeeting,
  initQuiz,
} from "./static/init-topic";

interface Props {
  initShowContent?: string[];
  sections: Section[];
  className?: string;
  contentClassName?: string;
  onSectionChange: (section: Section) => void;
  onItemTrigger?: (value: string) => void;
  onEdit?: (id: string) => void;
  onSave?: (section: Section) => void;
  canEdit?: boolean;
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
  canEdit,
}: Props) => {
  const { showContent, handleItemTrigger, collapseAll, setShowContent } =
    useCollapsibleList();

  const [sectionEditting, setSectionEditting] = useState<string[]>([]);
  const [sectionToRefresh, setSectionToRefresh] = useState<Section[]>(sections);

  useEffect(() => {
    if (initShowContent) setShowContent(initShowContent);
  }, []);

  useEffect(() => {
    console.log("show content ", showContent);
  }, [showContent]);

  const toggleEdit = (id: string) => {
    if (sectionEditting.includes(id)) {
      setSectionEditting(sectionEditting.filter((item) => item !== id));
    } else {
      setSectionEditting([...sectionEditting, id]);
    }
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
    if (toRefresh) onSectionChange(toRefresh);
    toggleEdit(sectionId);
  };

  const handleCreateTopic = (section: Section) => (type: TopicType) => {
    if (type === TopicType.QUIZ) handleCreateQuizTopic(section);
    else if (type === TopicType.ASSIGNMENT)
      handleCreateAssignmentTopic(section);
    else if (type === TopicType.MEETING) handleCreateMeetingTopic(section);
    else if (type === TopicType.FILE) handleCreateFileTopic(section);
    else if (type === TopicType.LINK) handleCreateLinkTopic(section);
  };

  const handleCreateQuizTopic = (section: Section) => {
    const newQuiz: QuizTopic = {
      ...initQuiz,
      sectionId: section.id,
    };
    const newSection: Section = {
      ...section,
      topics: [...section.topics, newQuiz],
    };
    onSectionChange(newSection);
  };

  const handleCreateAssignmentTopic = (section: Section) => {
    const newAssignment: AssignmentTopic = {
      ...initAssignment,
      sectionId: section.id,
    };
    const newSection: Section = {
      ...section,
      topics: [...section.topics, newAssignment],
    };
    onSectionChange(newSection);
  };

  const handleCreateMeetingTopic = (section: Section) => {
    const newMeeting: MeetingTopic = {
      ...initMeeting,
      sectionId: section.id,
    };
    const newSection: Section = {
      ...section,
      topics: [...section.topics, newMeeting],
    };
    onSectionChange(newSection);
  };

  const handleCreateFileTopic = (section: Section) => {
    const newFileTopic: FileTopic = {
      ...initFileTopic,
      sectionId: section.id,
    };
    const newSection: Section = {
      ...section,
      topics: [...section.topics, newFileTopic],
    };
    onSectionChange(newSection);
  };
  const handleCreateLinkTopic = (section: Section) => {
    const newLink: LinkTopic = {
      ...initLink,
      sectionId: section.id,
    };
    const newSection: Section = {
      ...section,
      topics: [...section.topics, newLink],
    };
    onSectionChange(newSection);
  };

  const handleReorderedTopic = (section: Section) => (data: Topic[]) => {
    const newSection: Section = {
      ...section,
      topics: data,
    };
    onSectionChange(newSection);
  };

  const handleDeleteTopic = (section: Section) => (id: string) => {
    const newSection: Section = {
      ...section,
      topics: section.topics.filter((topic) => topic.id !== id),
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
        {sections.map((section) => {
          const { id } = section;
          const isEditting = sectionEditting.includes(id);

          return (
            <SectionLayout
              key={id}
              section={section}
              isEditing={isEditting}
              showContent={showContent}
              onSectionChange={onSectionChange}
              onTrigger={handleTriggerClick}
              onEdit={() => handleEdit(id)}
              onSave={handleSaveSection(section)}
              onRefresh={handleRefreshSection(id)}
              canEdit={canEdit}
              className={contentClassName}
            >
              <SectionContent
                section={section}
                isEditting={isEditting}
                onSectionChange={onSectionChange}
                onCreateTopic={handleCreateTopic(section)}
                onReorderedTopic={handleReorderedTopic(section)}
                onDeleteTopic={handleDeleteTopic(section)}
              />
            </SectionLayout>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SectionList;
