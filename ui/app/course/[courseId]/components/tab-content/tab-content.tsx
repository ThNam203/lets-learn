import { useTab } from "@/hooks/useTab";
import React from "react";
import { Tab } from "../static/tabs";
import CourseTab from "./course-tab";
import { Course } from "@/models/course";
import ActivitiesTab from "./activities-tab";

interface Props {
  course: Course;
  onCourseChange?: (course: Course) => void;
}
export default function TabContent({ course, onCourseChange }: Props) {
  const tabContext = useTab<Tab>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.COURSE:
      return <CourseTab course={course} onCourseChange={onCourseChange} />;
    case Tab.ACTIVITIES:
      return <ActivitiesTab />;
    case Tab.PEOPLE:
      return <div>Students</div>;
    case Tab.GRADES:
      return <div>Settings</div>;
    case Tab.SETTINGS:
      return <div>Settings</div>;
    default:
      return <div>Overview</div>;
  }
}
