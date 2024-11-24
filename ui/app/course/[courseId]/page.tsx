"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { fakeCourses } from "@/fake-data/course";
import { Course, Section } from "@/models/course";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getCourse } from "@/services/course";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CourseBackground from "./components/course-background";
import SectionList from "./components/section/section-list";
import { createSection } from "@/services/section";
import { Button } from "@/lib/shadcn/button";
import { Plus } from "lucide-react";
import { Spinner } from "@nextui-org/spinner";

interface Props {
  params: {
    courseId: string;
  };
}
export default function CoursePage({ params }: Props) {
  const { courseId } = params;
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<Course>();
  const [isLoading, setIsLoading] = useState(false);
  const sections = course?.sections || [];

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Home",
      href: "/home",
    },
  ];

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

  useEffect(() => {
    // fetch course data
    getCourse(courseId, handleGetCourseSuccess, handleGetCourseFail);
  }, [courseId]);

  const handleCreateSectionSuccess = (data: Section) => {
    if (!course) return;

    const updatedCourse: Course = {
      ...course,
      sections: [...course.sections, data],
    };
    setCourse(updatedCourse);
    setIsLoading(false);
  };
  const handleCreateSectionFail = (error: any) => {
    toast.error(error || "Failed to create section");
    setIsLoading(false);
  };

  const handleAddNewSection = () => {
    if (!course) return;
    const newSection: Section = {
      id: "",
      courseId: course.id,
      title: `Section ${sections.length + 1}`,
      description: "Description for this section here",
      position: sections.length + 1,
      topics: [],
    };
    setIsLoading(true);
    createSection(
      newSection,
      handleCreateSectionSuccess,
      handleCreateSectionFail
    );
  };
  const TABS = ["Course", "Activities", "People"];

  return (
    <PageLayoutWithTab tabs={TABS}>
      <CourseBackground course={fakeCourses[0]} />
      <SectionList sections={sections} />
      <div className="mt-4 w-full flex flex-row items-center justify-center gap-2">
        <Button
          variant="default"
          className="bg-indigo-700"
          onClick={handleAddNewSection}
        >
          {isLoading && <Spinner className="text-white" />}
          {!isLoading && <Plus size={20} className="text-white" />}
          <span>New section</span>
        </Button>
      </div>
    </PageLayoutWithTab>
  );
}
