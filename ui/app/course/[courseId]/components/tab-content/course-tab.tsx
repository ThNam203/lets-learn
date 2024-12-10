"use client";
import { Button } from "@/lib/shadcn/button";
import { Course, Section } from "@/models/course";
import { createSection, getSection, updateSection } from "@/services/section";
import { Spinner } from "@nextui-org/spinner";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import CourseBackground from "./course-tab/course-background";
import SectionList from "./course-tab/section/section-list";

interface Props {
  course: Course;
  onCourseChange?: (course: Course) => void;
}
export default function CourseTab({ course, onCourseChange }: Props) {
  const { sections } = course;
  const [isLoading, setIsLoading] = useState(false);

  const handleSectionChange = (section: Section) => {
    console.log("section changed", section);
    const updatedSections = sections.map((s) =>
      s.id === section.id ? section : s
    );
    const updatedCourse: Course = { ...course, sections: updatedSections };
    if (onCourseChange) onCourseChange(updatedCourse);
  };

  const handleCreateSectionSuccess = (data: Section) => {
    if (!course) return;

    const updatedCourse: Course = {
      ...course,
      sections: [...course.sections, data],
    };
    if (onCourseChange) onCourseChange(updatedCourse);
    setIsLoading(false);
  };
  const handleCreateSectionFail = (error: any) => {
    toast.error(error || "Failed to create section");
    setIsLoading(false);
  };

  const handleCreateSection = () => {
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

  const handleGetSectionSuccess = (data: Section) => {
    handleSectionChange(data);
  };
  const handleGetCourseFail = (error: any) => {
    toast.error(error);
  };

  const handleSaveSectionSuccess = (data: Section) => {
    getSection(data.id, handleGetSectionSuccess, handleGetCourseFail);
  };
  const handleSaveSectionFail = (error: any) => {
    toast.error(error);
  };
  const handleSaveSection = (section: Section) => {
    updateSection(section, handleSaveSectionSuccess, handleSaveSectionFail);
  };
  return (
    <div>
      <CourseBackground course={course} onCourseChange={onCourseChange} />
      <SectionList
        sections={sections}
        onSectionChange={handleSectionChange}
        onSave={handleSaveSection}
      />
      <div className="mt-4 w-full flex flex-row items-center justify-center gap-2">
        <Button
          variant="default"
          className="bg-indigo-700"
          onClick={handleCreateSection}
        >
          {isLoading && <Spinner className="text-white" />}
          {!isLoading && <Plus size={16} className="text-white" />}
          <span>New section</span>
        </Button>
      </div>
    </div>
  );
}
