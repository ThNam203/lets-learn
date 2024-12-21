"use client";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { fakePage } from "@/fake-data/page";
import { Course } from "@/models/course";
import { iconMap, PageTopic } from "@/models/topic";
import { TabProvider } from "@/provider/tab-provider";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getCourse } from "@/services/course";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./components/static-data";
import TabContent from "./components/tab-content/tab-content";
import { getPageBreadcrumb } from "./components/utils";
import Loading from "./loading";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
export default function PagePage({ params }: Props) {
  const { courseId, topicId } = params;
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<Course>();
  const [page, setPage] = useState<PageTopic>(fakePage);
  const [initTab, setInitTab] = useState<string>(Tab.PAGE);
  const handlePageChange = (data: PageTopic) => {
    setPage(data);
  };

  const handleTabSelected = (tab: string) => {
    localStorage.setItem(`page-${topicId}`, tab);
  };

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };
  const handleGetPageSuccess = (data: PageTopic) => {
    setPage(data);
  };

  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleFail);
  }, [courseId]);

  useEffect(() => {
    if (!page || !course) return;
    dispatch(setBreadcrumb(getPageBreadcrumb(course, page)));
  }, [course, page]);

  useEffect(() => {
    let storageTab = localStorage.getItem(`page-${topicId}`);
    if (storageTab) setInitTab(storageTab);
    // getTopic(topicId, handleGetPageSuccess, handleFail);
  }, [topicId]);

  const tabs = Object.values(Tab);
  const Icon = iconMap.page;
  if (!page) return <Loading />;
  return (
    <PageLayout className="relative bg-fuchsia-50">
      <TabProvider initTab={initTab}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-page via-[#823690] via-75% to-[#823690] shadow-[inset_4px_4px_20px_0px_#823690] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <h3>Astronomy conception</h3>
            </div>
            <TabList
              tabs={tabs}
              variant="white-text"
              onTabSelected={handleTabSelected}
            />
          </div>
        </div>
        <div className="z-10 mt-[150px] flex w-full overflow-y-scroll default-scrollbar p-5">
          <div className="w-full min-h-full h-fit bg-white rounded-md p-5 shadow-md">
            <TabContent page={page} onPageChange={handlePageChange} />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
