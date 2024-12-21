import { Course } from "@/models/course";
import { FileTopic } from "@/models/topic";

export const getFileBreadcrumb = (course: Course, file: FileTopic) => {
  const fileBreadcrumb = [
    {
      label: "Home",
      href: `/home`,
    },
    {
      label: course.title,
      href: `/course/${course.id}`,
    },
    {
      label: file.title,
      href: `/course/${course.id}/file/${file.id}`,
    },
  ];
  return fileBreadcrumb;
};
