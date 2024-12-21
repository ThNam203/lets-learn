import { Course } from "@/models/course";
import { LinkTopic } from "@/models/topic";

export const getLinkBreadcrumb = (course: Course, link: LinkTopic) => {
  const linkBreadcrumb = [
    {
      label: "Home",
      href: `/home`,
    },
    {
      label: course.title,
      href: `/course/${course.id}`,
    },
    {
      label: link.title,
      href: `/course/${course.id}/link/${link.id}`,
    },
  ];
  return linkBreadcrumb;
};
