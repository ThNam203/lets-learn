"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { AssignmentTopic, iconMap } from "@/models/topic";
import { TabProvider } from "@/provider/tab-provider";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { useEffect, useState } from "react";
import { Tab } from "./components/static-data";
import TabContent from "./components/tab-content/tab-content";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
export default function TopicQuiz({ params }: Props) {
  const { courseId, topicId } = params;
  const [assignment, setAssignment] = useState<AssignmentTopic>();
  const [initTab, setInitTab] = useState<string>(Tab.ASSIGNMENT);
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
        label: "Assignment",
        href: `/course/${courseId}/assignment/${topicId}`,
      },
    ];
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  useEffect(() => {
    //this useEffect is used for updating tab based on local storage
    let storageTab = localStorage.getItem(topicId);
    if (storageTab) setInitTab(storageTab);
  }, [topicId]);
  const handleAssignmentChange = (data: AssignmentTopic) => {
    setAssignment(data);
  };
  const handleTabSelected = (tab: string) => {
    localStorage.setItem(topicId, tab);
  };

  const Icon = iconMap["assignment"];
  const tabs = Object.values(Tab);

  if (!assignment) return null;

  return (
    <PageLayout className="relative bg-purple-50 !overflow-y-hidden">
      <TabProvider initTab={initTab}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-assignment via-[#480373] via-75% to-[#480373] shadow-[inset_4px_4px_20px_0px_#480373] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <h3>Assignment</h3>
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
            <TabContent
              assignment={assignment}
              onAssignmentChange={handleAssignmentChange}
            />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
