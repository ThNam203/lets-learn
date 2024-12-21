import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import { Course } from "@/models/course";
import { MeetingTopic } from "@/models/topic";

export const getMeetingBreadcrumb = (course: Course, meeting: MeetingTopic) => {
  const meetingBreadcrumb: BreadcrumbItem[] = [
    {
      label: "Home",
      href: `/home`,
    },
    {
      label: course.title,
      href: `/course/${course.id}`,
    },
    {
      label: meeting.title,
      href: `/course/${course.id}/meeting/${meeting.id}`,
    },
  ];
  return meetingBreadcrumb;
};
