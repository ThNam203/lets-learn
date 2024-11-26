"use client";
import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { colorMap, iconMap } from "./topic-map";
import { Topic, TopicMap } from "@/models/topic";

interface Props {
  topic: Topic;
}

const CourseTopic = ({ topic }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const { title, type } = topic;

  const getTopicIcon = (type: keyof TopicMap) => {
    let icon;

    //logic to get file type from the url

    let fileType = "document";
    if (type === "file")
      icon = iconMap.file[fileType as keyof TopicMap["file"]];
    else icon = iconMap[type];
    return icon;
  };

  const getTopicColor = (type: keyof TopicMap) => {
    let color;
    if (type === "file") {
      //logic to get file type from the url
      let fileType = "document";
      color = colorMap.file[fileType as keyof TopicMap["file"]];
    } else color = colorMap[type];
    return color;
  };

  const handleLinkAction = () => {
    router.push(`${path}/link/${topic.id}`);
  };

  const handleMeetingAction = () => {};

  const handleLearningAction = () => {
    router.push(`${path}/learning/${topic.id}`);
  };

  const handleAssignmentAction = () => {
    router.push(`${path}/assignment/${topic.id}`);
  };
  const handleChoiceAction = () => {
    router.push(`${path}/choice/${topic.id}`);
  };
  const handleDocumentFileAction = () => {
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
    file: {
      document: handleDocumentFileAction,
      audio: handleAudioFileAction,
      video: handleVideoFileAction,
    },
    quiz: handleQuizAction,
    page: handlePageAction,
  };

  const handleTopicClick = () => {
    let action;
    if (type === "file") {
      //logic to get file type from the url
      let fileType = "document";
      action = actionMap.file[fileType as keyof TopicMap["file"]];
    } else action = actionMap[type];
    action();
  };

  const Icon = getTopicIcon(type);
  const color = getTopicColor(type);
  return (
    <>
      <Separator className="h-[0.5px]" />
      <div className="flex flex-row items-center gap-4 px-4 py-2">
        <Icon size={18} className={cn(color)} />
        <Button
          variant="link"
          className={cn("h-fit p-0 text-cyan-600")}
          onClick={handleTopicClick}
        >
          {title}
        </Button>
      </div>
    </>
  );
};

export default CourseTopic;
