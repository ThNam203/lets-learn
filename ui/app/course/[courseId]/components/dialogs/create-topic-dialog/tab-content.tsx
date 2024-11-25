import React from "react";
import { Tab } from "./statis-data";
import { TopicType } from "@/models/topic";
import TopicItem from "./topic-item";
import { colorMap, iconMap } from "../../topic/topic-map";
import { useTab } from "@/hooks/useTab";

interface Props {}
export default function TabContent({}: Props) {
  const tabContext = useTab<Tab>();
  const { selectedTab } = tabContext;
  const allTopicTypes = Object.values(TopicType);
  const activityTopicTypes = [
    TopicType.ASSIGNMENT,
    TopicType.MEETING,
    TopicType.QUIZ,
  ];

  const resourceTopicTypes = [TopicType.FILE, TopicType.LINK, TopicType.PAGE];

  return (
    <div className="flex flex-row w-full gap-3">
      {allTopicTypes.map((type, index) => {
        const Icon = iconMap[type];
        const iconColor = colorMap[type];
        let isBlur = false;
        if (selectedTab === Tab.ACTIVITIES)
          isBlur = !activityTopicTypes.includes(type);
        if (selectedTab === Tab.RESOURCES)
          isBlur = !resourceTopicTypes.includes(type);
        return (
          <TopicItem
            key={index}
            title={type}
            icon={<Icon className={iconColor} />}
            blur={isBlur}
          />
        );
      })}
    </div>
  );
}
