import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function RouteProtect({ children }: Props) {
  const cookie = cookies();
  if (!cookie.get("ACCESS_TOKEN")) redirect("/login");
  return children;
}
