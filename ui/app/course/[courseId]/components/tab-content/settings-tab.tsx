"use client";
import { Course } from "@/models/course";
import SettingList from "./settings/setting-list";
import { updateCourse } from "@/services/course";
import { toast } from "react-toastify";
import { useState } from "react";

interface Props {
  course: Course;
  onCourseChange?: (data: Course) => void;
}
const SettingsTab = ({ course, onCourseChange }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateCourseSuccess = (data: Course) => {
    if (onCourseChange) onCourseChange(data);
    setIsLoading(false);
    toast.success("Updated course successfully");
  };
  const handleUpdateCourseFail = (error: any) => {
    toast.error(error);
    setIsLoading(false);
  };
  const handleUpdateCourse = (data: Course) => {
    setIsLoading(true);
    updateCourse(data, handleUpdateCourseSuccess, handleUpdateCourseFail);
  };
  return (
    <div className="mx-auto max-w-3xl">
      <SettingList
        course={course}
        onSubmitCourseSetting={handleUpdateCourse}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SettingsTab;
