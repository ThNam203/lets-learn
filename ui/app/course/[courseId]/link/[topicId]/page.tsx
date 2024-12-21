"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { fakeLink } from "@/fake-data/link";
import { Course } from "@/models/course";
import { iconMap, LinkTopic } from "@/models/topic";
import { TabProvider } from "@/provider/tab-provider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";
import Loading from "./loading";
import { getLinkBreadcrumb } from "./_components/utils";
import { getCourse } from "@/services/course";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
export default function LinkPage({ params }: Props) {
  const { courseId, topicId } = params;
  const [course, setCourse] = useState<Course>();
  const user = useAppSelector((state) => state.profile.value);
  const [topic, setTopic] = useState<LinkTopic>();
  const [initTab, setInitTab] = useState<string>(Tab.LINK);
  const dispatch = useAppDispatch();

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
  };
  const handleGetCourseFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    if (!topic || !course) return;
    dispatch(setBreadcrumb(getLinkBreadcrumb(course, topic)));
  }, [course, topic]);

  useEffect(() => {
    let storageTab = localStorage.getItem(`link-${topicId}`);
    if (storageTab) setInitTab(storageTab);
    // getTopic(topicId, handleGetLinkTopicSuccess, handleGetLinkTopicFail);
  }, [topicId]);

  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleGetCourseFail);
  }, [courseId]);

  const handleGetLinkTopicSuccess = (data: LinkTopic) => {
    setTopic(data);
  };
  const handleGetLinkTopicFail = (error: any) => {
    toast.error(error);
  };
  const handleTopicChange = (data: LinkTopic) => {
    setTopic(data);
  };
  const handleTabSelected = (tab: string) => {
    localStorage.setItem(`link-${topicId}`, tab);
  };

  const Icon = iconMap.link;

  const tabs = Object.values(Tab);

  // if (!topic || !user) return <Loading />;
  if (!user) return <Loading />;

  return (
    <PageLayout className="relative bg-teal-50 !overflow-y-hidden">
      <TabProvider initTab={initTab}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-link via-[#09524A] via-75% to-[#09524A] shadow-[inset_4px_4px_20px_0px_#09524A] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <h3>Link</h3>
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
              user={user}
              topic={fakeLink}
              onTopicChange={handleTopicChange}
            />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
