import React from "react";
import { Tab } from "./static-data";
import {
  activityTopics,
  colorMap,
  iconMap,
  resourceTopics,
  TopicType,
} from "@/models/topic";
import TopicItem from "./topic-item";
import { useTab } from "@/hooks/useTab";

interface Props {
  onSelect?: (type: TopicType) => void;
}
export default function TabContent({ onSelect }: Props) {
  const tabContext = useTab<Tab>();
  const { selectedTab } = tabContext;
  const allTopicTypes = Object.values(TopicType);

  const handleSelect = (type: TopicType) => () => {
    if (onSelect) onSelect(type);
  };

  return (
    <div className="flex flex-row w-full gap-3">
      {allTopicTypes.map((type, index) => {
        const Icon = iconMap[type];
        const iconColor = colorMap[type];
        let isHidden = false;
        if (selectedTab === Tab.ACTIVITIES)
          isHidden = !activityTopics.includes(type);
        if (selectedTab === Tab.RESOURCES)
          isHidden = !resourceTopics.includes(type);
        return (
          <TopicItem
            key={index}
            title={type}
            icon={<Icon className={iconColor} />}
            hidden={isHidden}
            onClick={handleSelect(type)}
          />
        );
      })}
    </div>
  );
}
