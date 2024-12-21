import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";

export enum Tab {
  TO_REVIEW = "To review",
  REVIEWED = "Reviewed",
}
export type CourseOption = {
  key: string;
  value: string;
};

export const toReviewBreadcrumb: BreadcrumbItem[] = [
  {
    label: "To Review",
    href: "/to-review",
  },
];
