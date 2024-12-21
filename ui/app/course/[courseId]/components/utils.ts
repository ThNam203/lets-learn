import { Course } from "@/models/course";

export const getCourseBreadcrumb = (course: Course) => {
  const courseBreadcrumb = [
    {
      label: "Home",
      href: `/home`,
    },
    {
      label: course.title,
      href: `/course/${course.id}`,
    },
  ];
  return courseBreadcrumb;
};
