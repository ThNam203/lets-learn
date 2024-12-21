"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { fakeTopics } from "@/fake-data/topic";
import { Course } from "@/models/course";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getCourse } from "@/services/course";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CoursePageSkeleton from "./components/skeletons/course-page";
import { Tab } from "./components/static/tabs";
import TabContent from "./components/tab-content/tab-content";
import Loading from "./loading";
import { getCourseBreadcrumb } from "./components/utils";

interface Props {
  params: {
    courseId: string;
  };
}
export default function CoursePage({ params }: Props) {
  const { courseId } = params;
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<Course>();

  const handleCourseChange = (course: Course) => {
    setCourse(course);
  };

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
    dispatch(setBreadcrumb(getCourseBreadcrumb(data)));
  };
  const handleGetCourseFail = (error: any) => {
    toast.error(error || "Failed to get course info");
  };
  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleGetCourseFail);
  }, [courseId]);
  const tabs = Object.values(Tab);

  if (!course) return <Loading />;
  return (
    <PageLayoutWithTab tabs={tabs}>
      {course && (
        <TabContent course={course} onCourseChange={handleCourseChange} />
      )}
    </PageLayoutWithTab>
  );
}
