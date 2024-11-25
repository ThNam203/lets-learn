"use client";
import { fakeCourses } from "@/fake-data/course";
import { Course, Section } from "@/models/course";
import { createSection, updateSection } from "@/services/section";
import { toast } from "react-toastify";
import CourseBackground from "../course-background";
import SectionList from "../section/section-list";
import { Button } from "@/lib/shadcn/button";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Plus } from "lucide-react";

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
    console.log("updated course", updatedCourse);
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

  const handleSaveSectionSuccess = (data: Section) => {
    handleSectionChange(data);
  };
  const handleSaveSectionFail = (error: any) => {
    toast.error(error);
  };
  const handleSaveSection = (section: Section) => {
    updateSection(section, handleSaveSectionSuccess, handleSaveSectionFail);
  };
  return (
    <div>
      <CourseBackground course={course} />
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
