import RouteProtect from "@/components/protected/route-protect";
import MainLayout from "@/components/ui/util-layout/main-layout";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function HomeLayout({ children }: Props) {
  return (
    <RouteProtect>
      <MainLayout>{children}</MainLayout>
    </RouteProtect>
  );
}
