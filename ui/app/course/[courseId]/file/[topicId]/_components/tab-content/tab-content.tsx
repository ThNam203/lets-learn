"use client";
import { useTab } from "@/hooks/useTab";
import { FileTopic } from "@/models/topic";
import { User } from "@/models/user";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabFile from "./tab-file";
import TabSetting from "./tab-setting";

interface Props {
  topic: FileTopic;
  user: User;
  onTopicChange?: (topic: FileTopic) => void;
}

const TabContent = ({ user, topic, onTopicChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.FILE:
      return <TabFile topic={topic} className="h-full" />;
    case Tab.SETTINGS:
      return <TabSetting topic={topic} onTopicChange={onTopicChange} />;

    default:
      return notFound();
  }
};

export default TabContent;
