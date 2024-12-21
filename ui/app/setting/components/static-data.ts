import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";

export enum Tab {
  PROFILE = "Profile",
  PASSWORD = "Password",
}
export const settingBreadcrumb: BreadcrumbItem[] = [
  {
    label: "Setting",
    href: "/setting",
  },
];
