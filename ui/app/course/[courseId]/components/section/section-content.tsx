import DraggableContainer from "@/lib/@hello-pangea/draggable-container";
import { Button } from "@/lib/shadcn/button";
import { Topic, TopicType } from "@/models/topic";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateTopicDialog from "../dialogs/create-topic-dialog/create-topic-dialog";
import CourseTopic from "../topic/course-topic";
import SectionDescription from "./section-description";

interface Props {
  desc: string | null;
  topics: Topic[];
  isEditting?: boolean;
  onDescriptionChange?: (value: string) => void;
  onCreateTopic?: (type: TopicType) => void;
  onReorderedTopic?: (data: Topic[]) => void;
}
export default function SectionContent({
  desc,
  topics,
  isEditting,
  onDescriptionChange,
  onCreateTopic,
  onReorderedTopic,
}: Props) {
  const [openCreateTopicDialog, setOpenCreateTopicDialog] = useState(false);

  return (
    <div className="w-full space-y-5">
      {desc && (
        <SectionDescription
          desc={desc}
          isEditting={isEditting}
          onChange={onDescriptionChange}
        />
      )}
      <div className="flex flex-col">
        {isEditting && (
          <DraggableContainer
            data={topics}
            onReordered={onReorderedTopic}
            renderItem={(topic, index) => (
              <CourseTopic key={index} topic={topic} isEditing={isEditting} />
            )}
          />
        )}

        {!isEditting && (
          <div>
            {topics.map((topic, index) => (
              <CourseTopic key={index} topic={topic} isEditing={isEditting} />
            ))}
          </div>
        )}

        <div className="w-full flex justify-center pb-6">
          {isEditting && (
            <CreateTopicDialog
              open={openCreateTopicDialog}
              onOpenChange={setOpenCreateTopicDialog}
              onSelect={onCreateTopic}
              trigger={
                <Button variant="default" className="bg-indigo-700">
                  <Plus size={20} className="text-white" />
                  <span>New topic</span>
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
