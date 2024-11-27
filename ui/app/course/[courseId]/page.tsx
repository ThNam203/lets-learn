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

interface Props {
  params: {
    courseId: string;
  };
}
export default function CoursePage({ params }: Props) {
  const { courseId } = params;
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<Course>();

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Home",
      href: "/home",
    },
  ];
  useEffect(() => {
    // fetch course data
    getCourse(courseId, handleGetCourseSuccess, handleGetCourseFail);
  }, [courseId]);

  const handleCourseChange = (course: Course) => {
    setCourse(course);
  };

  const handleGetCourseSuccess = (data: any) => {
    setCourse(data);
    const updatedBreadcrumbItems = [...breadcrumbItems];
    updatedBreadcrumbItems.push({
      label: data.title,
      href: `/course/${data.id}`,
    });
    dispatch(setBreadcrumb(updatedBreadcrumbItems));
  };
  const handleGetCourseFail = (error: any) => {
    toast.error(error || "Failed to get course info");
  };

  const tabs = Object.values(Tab);

  return (
    <PageLayoutWithTab tabs={tabs}>
      {!course && <CoursePageSkeleton />}
      {course && (
        <TabContent course={course} onCourseChange={handleCourseChange} />
      )}
    </PageLayoutWithTab>
  );
}
