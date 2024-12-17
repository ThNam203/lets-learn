"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { iconMap, QuizTopic } from "@/models/topic";
import { TabProvider } from "@/provider/tab-provider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getTopic } from "@/services/topic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./components/static-data";
import TabContent from "./components/tab-content/tab-content";
import { getCourse } from "@/services/course";
import { Course } from "@/models/course";
import Loading from "./loading";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
export default function QuizPage({ params }: Props) {
  const { courseId, topicId } = params;
  const [course, setCourse] = useState<Course>();
  const [quiz, setQuiz] = useState<QuizTopic>();
  const [initTab, setInitTab] = useState<string>(Tab.QUIZ);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!quiz || !course) return;
    //this useEffect is used for setting breadcrumb when the page is loaded
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: "Home",
        href: `/home`,
      },
      {
        label: course.title,
        href: `/course/${courseId}`,
      },
      {
        label: quiz.title,
        href: `/course/${courseId}/quiz/${topicId}`,
      },
    ];

    dispatch(setBreadcrumb(breadcrumbItems));
  }, [course, quiz]);

  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleGetCourseFail);
  }, [courseId]);

  useEffect(() => {
    //this useEffect is used for updating tab based on local storage
    let storageTab = localStorage.getItem(`quiz-${topicId}`);
    if (storageTab) setInitTab(storageTab);

    getTopic(topicId, handleGetTopicSuccess, handleGetTopicFail);
  }, [topicId]);

  const handleQuizChange = (data: QuizTopic) => {
    setQuiz(data);
  };
  const handleTabSelected = (tab: string) => {
    localStorage.setItem(`quiz-${topicId}`, tab);
  };

  const handleGetTopicSuccess = (data: QuizTopic) => {
    setQuiz(data);
  };
  const handleGetTopicFail = (error: any) => {
    toast.error(error);
  };

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
  };
  const handleGetCourseFail = (error: any) => {
    toast.error(error);
  };

  const Icon = iconMap.quiz;
  const tabs = Object.values(Tab);

  if (!quiz) return <Loading />;
  return (
    <PageLayout className="relative bg-pink-50 !overflow-y-hidden">
      <TabProvider initTab={initTab}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-quiz via-[#751540] via-75% to-[#751540] shadow-[inset_4px_4px_20px_0px_#751540] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <h3>{quiz.title}</h3>
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
              courseId={courseId}
              quiz={quiz}
              onQuizChange={handleQuizChange}
            />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
