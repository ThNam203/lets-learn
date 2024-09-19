"use client";
import TabList from "@/components/ui/tab-list";
import { fakeCourses } from "@/fake-data/course";
import { fakeTopics } from "@/fake-data/topic";
import { cn } from "@/lib/utils";
import { TabProvider } from "@/provider/TabProvider";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";
import { colorMap, iconMap } from "../../_components/topic-map";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}

const QuizIdPage = ({ params }: Props) => {
  const { topicId, courseId } = params;

  //get course by id
  const course = useMemo(() => {
    return fakeCourses.find((course) => course.id === courseId);
  }, [courseId]);

  //get topics by id
  const topic = useMemo(() => {
    return fakeTopics.find((topic) => topic.id === topicId);
  }, [topicId]);

  if (!topic) return notFound();
  const sectionId = topic.sectionId;
  if (!course) return notFound();
  const section = course.sections.find((section) => section.id === sectionId);
  if (!section) return notFound();

  const Icon = iconMap.quiz;
  const color = colorMap.quiz;
  const tabs = Object.values(Tab);

  return (
    <TabProvider initTab={Tab.QUIZ}>
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-row items-center gap-2 mb-4">
            <MiniLink href={`/courses/${course.id}`}>{course.title}</MiniLink>
            <span className="text-slate-600">/</span>
            <MiniLink href={`/courses/${course.id}#section-${section.id}`}>
              {section.title}
            </MiniLink>
            <span className="text-slate-600">/</span>
            <MiniLink>{topic.title}</MiniLink>
          </div>
          <div className={cn("flex flex-row items-center gap-4", color)}>
            <Icon size={24} />
            <h1 className="text-2xl font-bold">{topic.title}</h1>
          </div>
          <TabList tabs={tabs} className="mt-4" />
        </div>
        <TabContent className="max-w-3xl mx-auto" />
      </div>
    </TabProvider>
  );
};

interface MiniLinkProps {
  href?: string;
  children: React.ReactNode;
}
const MiniLink = ({ href, children }: MiniLinkProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="text-cyan-600 hover:underline underline-offset-2 decoration-1 cursor-pointer"
        >
          {children}
        </Link>
      ) : (
        <div className="text-indigo-700 underline underline-offset-2 decoration-1 cursor-default">
          {children}
        </div>
      )}
    </>
  );
};

export default QuizIdPage;
