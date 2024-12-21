import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import { Course } from "@/models/course";
import { AssignmentTopic } from "@/models/topic";

export const getAssignmentBreadcrumb = (
  course: Course,
  assignment: AssignmentTopic
) => {
  const assignmentBreadcrumb: BreadcrumbItem[] = [
    {
      label: "Home",
      href: `/home`,
    },
    {
      label: course.title,
      href: `/course/${course.id}`,
    },
    {
      label: assignment.title,
      href: `/course/${course.id}/assignment/${assignment.id}`,
    },
  ];
  return assignmentBreadcrumb;
};
