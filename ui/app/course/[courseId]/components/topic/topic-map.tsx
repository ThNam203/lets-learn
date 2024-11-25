import { TopicMap } from "@/models/topic";
import {
  FileText,
  FileUp,
  Link,
  ListTodo,
  ScrollText,
  Video,
} from "lucide-react";

const colorMap: TopicMap = {
  link: "text-link",
  meeting: "text-meeting",
  assignment: "text-assignment",
  file: "text-file",
  quiz: "text-quiz",
  page: "text-page",
};

const iconMap: TopicMap = {
  link: Link,
  meeting: Video,
  assignment: FileUp,
  file: FileText,
  quiz: ListTodo,
  page: ScrollText,
};

const isValidType = (type: string): boolean => {
  return type in iconMap;
};

export { colorMap, iconMap, isValidType };
