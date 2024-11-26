import { AttachedFile } from "./course";
import { Test } from "./test";
import {
  FileText,
  FileUp,
  Link,
  ListTodo,
  ScrollText,
  Video,
} from "lucide-react";

interface BaseTopic {
  id: string;
  sectionId: string;
  title: string;
  type: TopicType;
}

export enum TopicType {
  ASSIGNMENT = "assignment",
  FILE = "file",
  LINK = "link",
  MEETING = "meeting",
  PAGE = "page",
  QUIZ = "quiz",
}

export interface QuizTopic extends BaseTopic {
  type: TopicType.QUIZ;
  data: Test;
}
export interface AssignmentTopic extends BaseTopic {
  type: TopicType.ASSIGNMENT;
}
export interface MeetingTopic extends BaseTopic {
  type: TopicType.MEETING;
}
export interface LinkTopic extends BaseTopic {
  type: TopicType.LINK;
}

export interface FileTopic extends BaseTopic {
  type: TopicType.FILE;
  file: AttachedFile;
}
export interface PageTopic extends BaseTopic {
  type: TopicType.PAGE;
}

export type Topic =
  | LinkTopic
  | MeetingTopic
  | AssignmentTopic
  | FileTopic
  | QuizTopic
  | PageTopic;

export type TopicMap = {
  [TopicType.LINK]: any;
  [TopicType.MEETING]: any;
  [TopicType.ASSIGNMENT]: any;
  [TopicType.FILE]: any;
  [TopicType.QUIZ]: any;
  [TopicType.PAGE]: any;
};

export const colorMap: TopicMap = {
  link: "text-link",
  meeting: "text-meeting",
  assignment: "text-assignment",
  file: "text-file",
  quiz: "text-quiz",
  page: "text-page",
};

export const iconMap: TopicMap = {
  link: Link,
  meeting: Video,
  assignment: FileUp,
  file: FileText,
  quiz: ListTodo,
  page: ScrollText,
};

export const activityTopics = [
  TopicType.ASSIGNMENT,
  TopicType.MEETING,
  TopicType.QUIZ,
];

export const resourceTopics = [TopicType.FILE, TopicType.LINK, TopicType.PAGE];

export const isValidType = (type: string): boolean => {
  return type in iconMap;
};
