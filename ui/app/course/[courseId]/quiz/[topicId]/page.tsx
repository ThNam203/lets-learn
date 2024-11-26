"use client";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { fakeQuizTest } from "@/fake-data/test";
import { Test } from "@/models/test";
import { TabProvider } from "@/provider/tab-provider";
import { useEffect, useState } from "react";
import { Tab } from "./components/static-data";
import TabContent from "./components/tab-content/tab-content";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { iconMap } from "@/models/topic";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
export default function TopicQuiz({ params }: Props) {
  const { courseId, topicId } = params;
  const [quiz, setQuiz] = useState<Test>(fakeQuizTest);
  const [initTab, setInitTab] = useState<string>(Tab.QUIZ);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //this useEffect is used for setting breadcrumb when the page is loaded
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: "Home",
        href: "/home",
      },
      {
        label: "Introduce to Astronomy",
        href: `/course/${courseId}`,
      },
      {
        label: "Quiz",
        href: `/course/${courseId}/quiz/${topicId}`,
      },
    ];
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  useEffect(() => {
    //this useEffect is used for updating tab based on local storage
    let storageTab = localStorage.getItem(topicId);
    if (storageTab) setInitTab(storageTab);
  }, [topicId]);

  const handleQuizChange = (data: Test) => {
    setQuiz(data);
  };
  const handleTabSelected = (tab: string) => {
    localStorage.setItem(topicId, tab);
  };

  const Icon = iconMap.quiz;
  const tabs = Object.values(Tab);

  return (
    <PageLayout className="relative bg-pink-50 !overflow-y-hidden">
      <TabProvider initTab={initTab}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-quiz via-[#751540] via-75% to-[#751540] shadow-[inset_4px_4px_20px_0px_#751540] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <h3>Quiz</h3>
            </div>
            <TabList
              tabs={tabs}
              variant="white-text"
              onTabSelected={handleTabSelected}
            />
          </div>
        </div>
        <div className="z-10 mt-[150px] flex w-full default-scrollbar p-5">
          <div className="w-full min-h-full h-fit bg-white rounded-md p-5 shadow-md">
            <TabContent quiz={quiz} onQuizChange={handleQuizChange} />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
