"use client";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";

import { Input } from "@/lib/shadcn/input";
import { Topic, TopicMap } from "@/models/topic";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import TopicFileExtension from "./topic-file-extension";
import { colorMap, iconMap, isValidType } from "@/models/topic";

interface Props {
  topic: Topic;
  isEditing?: boolean;
  onDelete?: () => void;
}

const CourseTopic = ({ topic, isEditing = false, onDelete }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const { title, type } = topic;

  const getTopicIcon = (type: keyof TopicMap) => {
    let icon;

    //logic to get file type from the url

    // let fileType = "document";
    // if (type === "file") {
    //   icon = iconMap.file[fileType as keyof TopicMap["file"]];
    //   icon = iconMap[type];
    // } else icon = iconMap[type];
    icon = iconMap[type];
    return icon;
  };

  const getTopicColor = (type: keyof TopicMap) => {
    let color;
    // if (type === "file") {
    //   //logic to get file type from the url
    //   let fileType = "document";
    //   color = colorMap.file[fileType as keyof TopicMap["file"]];
    //   color = colorMap[type];
    // } else color = colorMap[type];
    color = colorMap[type];
    return color;
  };

  const handleLinkAction = () => {
    router.push(`${path}/link/${topic.id}`);
  };

  const handleMeetingAction = () => {};

  const handleAssignmentAction = () => {
    router.push(`${path}/assignment/${topic.id}`);
  };

  const handleFileAction = () => {
    //download file
    router.push(`${path}/file/${topic.id}`);
  };

  const handleAudioFileAction = () => {
    //download file

    router.push(`${path}/file/${topic.id}`);
  };

  const handleVideoFileAction = () => {
    //download file

    router.push(`${path}/file/${topic.id}`);
  };

  const handleQuizAction = () => {
    router.push(`${path}/quiz/${topic.id}`);
  };

  const handlePageAction = () => {
    router.push(`${path}/page/${topic.id}`);
  };

  const actionMap: TopicMap = {
    link: handleLinkAction,
    meeting: handleMeetingAction,
    assignment: handleAssignmentAction,
    file: handleFileAction,
    quiz: handleQuizAction,
    page: handlePageAction,
  };

  const handleTopicClick = () => {
    let action;
    if (type === "file") {
      //logic to get file type from the url
      // let fileType = "document";
      // action = actionMap.file[fileType as keyof TopicMap["file"]];
      // action = actionMap[type];
    } else action = actionMap[type];
    action();
  };

  const Icon = getTopicIcon(type);
  const color = getTopicColor(type);

  //check if the title is empty -> show the file name with extension at the end of the title
  //else show the title
  let topicTitle = title;
  if (type === "file" && title === "") topicTitle = topic.file.data.name;

  if (!isValidType(type)) return null;

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between px-4 py-6 border-t-[0.5px] duration-200",
        isEditing && "border-transparent",
        !isEditing && "border-gray-300"
      )}
    >
      <div className="w-full flex flex-row items-center gap-4 pr-4">
        <Icon size={18} className={cn(color)} />
        {!isEditing && (
          <Button
            variant="link"
            className={cn("h-fit p-0 text-cyan-500 gap-0")}
            onClick={handleTopicClick}
          >
            {topicTitle}
            {type === "file" && (
              <TopicFileExtension
                fileName={topic.file.data.name}
                className="no-underline"
              />
            )}
          </Button>
        )}

        {isEditing && (
          <Input
            variant="no-border"
            placeholder="Topic title here"
            defaultValue={topicTitle}
            className="w-full text-cyan-500"
          />
        )}
      </div>
      {isEditing && (
        <div className="flex flex-row gap-4">
          <Trash2
            size={18}
            className="text-red-500 cursor-pointer hover:text-red-600 duration-200"
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default CourseTopic;
