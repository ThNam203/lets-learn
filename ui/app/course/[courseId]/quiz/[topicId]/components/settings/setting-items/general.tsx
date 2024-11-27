"use client";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { nanoid } from "@reduxjs/toolkit";
import { useFormContext } from "react-hook-form";
import { QuizSettingForm } from "../setting-list";

export type GeneralSettingForm = {
  title: string;
  description: string;
};

interface GeneralSettingProps {
  formData: GeneralSettingForm;
  onChange?: (data: GeneralSettingForm) => void;
}

const GeneralSetting = ({ formData, onChange }: GeneralSettingProps) => {
  const form = useFormContext<QuizSettingForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;
  const { title, description } = formData;

  const handleSettingChange = (data: GeneralSettingForm) => {
    if (onChange) onChange(data);
  };
  const handleInputChange = (key: keyof GeneralSettingForm, data: string) => {
    handleSettingChange({ ...formData, [key]: data });
  };
  const handleEditorChange = (key: keyof GeneralSettingForm, data: any) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const titleHtmlFor = nanoid();
  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Quiz title" htmlFor={titleHtmlFor}>
        <Input
          id={titleHtmlFor}
          placeholder="Enter a name"
          defaultValue={title !== "" ? title : undefined}
          {...register("generalSettingForm.title")}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        {errors?.title && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.title.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Description">
        <TinyEditor
          onChange={(data) => handleEditorChange("description", data)}
          initValue={description}
        />
      </RowSetting>
    </div>
  );
};

interface RowProps {
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
}
const RowSetting = ({ title, children, htmlFor }: RowProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[180px] font-semibold">
        {title}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};

export default GeneralSetting;
