import RouteProtect from "@/components/protected/route-protect";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function QuizAttemptingLayout({ children }: Props) {
  return <RouteProtect>{children}</RouteProtect>;
}
