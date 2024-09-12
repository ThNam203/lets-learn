"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import TabList from "../../../../../components/ui/tab-list";
import { course, topics } from "../../_components/fake-data";
import { colorMap, iconMap } from "../../_components/topic-map";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
const LinkIdPage = ({ params }: Props) => {
  const { topicId, courseId } = params;
  const topic = topics.find((topic) => topic.id === topicId);

  const [selectedTab, setSelectedTab] = useState<string>(Tab.URL);
  const handleTabSelected = (tab: string) => {
    setSelectedTab(tab);
  };

  if (!topic) return notFound();
  const sectionId = topic.sectionId;
  if (!course) return notFound();
  const section = course.sections.find((section) => section.id === sectionId);
  if (!section) return notFound();

  const Icon = iconMap.link;
  const color = colorMap.link;
  const tabs = Object.values(Tab);

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-row items-center gap-2 mb-4">
          <Link
            href={`/courses/${course.id}`}
            className="text-cyan-600 hover:underline underline-offset-2 decoration-1"
          >
            {course.title}
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href={`/courses/${course.id}#section-${section.id}`}
            className="text-cyan-600 hover:underline underline-offset-2 decoration-1"
          >
            {section.title}
          </Link>
          <span className="text-slate-600">/</span>
          <span>{topic.title}</span>
        </div>
        <div className={cn("flex flex-row items-center gap-4", color)}>
          <Icon size={24} />
          <h1 className="text-2xl font-bold">{topic.title}</h1>
        </div>
        <TabList
          tabs={tabs}
          selectedTab={selectedTab}
          className="mt-4"
          onSelected={handleTabSelected}
        />
        <TabContent selectedTab={selectedTab} />
      </div>
    </div>
  );
};

export default LinkIdPage;
