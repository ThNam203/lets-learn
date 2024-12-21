import { Course } from "@/models/course";
import { PageTopic } from "@/models/topic";

export const getPageBreadcrumb = (course: Course, page: PageTopic) => {
  const pageBreadcrumb = [
    {
      label: "Home",
      href: `/home`,
    },
    {
      label: course.title,
      href: `/course/${course.id}`,
    },
    {
      label: page.title,
      href: `/course/${course.id}/page/${page.id}`,
    },
  ];
  return pageBreadcrumb;
};
