"use client";
import { useEffect } from "react";
import SettingBoard from "./components/setting-board";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { settingBreadcrumb } from "./components/static-data";

export default function SettingPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb(settingBreadcrumb));
  }, []);
  return (
    <div className="w-full p-5 space-y-4 bg-gray-50">
      <h5>Profile setting</h5>
      <SettingBoard />
    </div>
  );
}
