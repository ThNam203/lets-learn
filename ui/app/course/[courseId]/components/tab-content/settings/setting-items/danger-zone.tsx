"use client";
import { Button } from "@/lib/shadcn/button";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { CourseSettingForm } from "../setting-list";

export type DangerZoneSettingForm = {
  isPublished: boolean;
};

interface DangerZoneSettingProps {
  formData: DangerZoneSettingForm;
  onChange?: (data: DangerZoneSettingForm) => void;
}

const DangerZoneSetting = ({ formData, onChange }: DangerZoneSettingProps) => {
  const form = useFormContext<CourseSettingForm>();
  const { register } = form;
  const {
    errors: { dangerZoneSettingForm: errors },
  } = form.formState;
  const { isPublished } = formData;
  const handleSettingChange = (data: DangerZoneSettingForm) => {
    if (onChange) onChange(data);
  };

  const changeCourseVisibilityDescription = `This repository is currently ${
    isPublished ? "public" : "private"
  }.`;
  const changeCourseVisibilityButtonContent = `Change to ${
    isPublished ? "private" : "public"
  }`;

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting
        title="Change course visibility"
        description={changeCourseVisibilityDescription}
      >
        <Button className="bg-gray-100 border-1 text-red-600 font-bold hover:bg-gray-200">
          {changeCourseVisibilityButtonContent}
        </Button>
      </RowSetting>
      <RowSetting
        title="Delete this course"
        description="Once you delete this course, there is no going back. Please be certain."
      >
        <Button className="bg-gray-100 border-1 text-red-600 font-bold hover:bg-gray-200">
          Delete this course
        </Button>
      </RowSetting>
    </div>
  );
};

interface RowSettingProps {
  title: string;
  description: string;
  children?: ReactNode | ReactNode[];
}
const RowSetting = ({ title, description, children }: RowSettingProps) => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <div className="w-full flex flex-col">
        <span className="font-bold">{title}</span>
        <span>{description}</span>
      </div>
      <div className="flex flex-row items-center gap-4">{children}</div>
    </div>
  );
};

export default DangerZoneSetting;
