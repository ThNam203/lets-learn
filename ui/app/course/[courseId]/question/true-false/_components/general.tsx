"use client";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { useForm, useFormContext } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { Combobox } from "@/components/ui/combobox";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuestionStatus } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { TrueFalseQuestionForm } from "./true-false-question-ui";

export type TrueFalseQuestionGeneralForm = {
  questionName: string;
  questionText: string;
  questionStatus: QuestionStatus;
  defaultMark: number;
};

interface Props {
  formData: TrueFalseQuestionGeneralForm;
  onChange?: (data: TrueFalseQuestionGeneralForm) => void;
}

const TrueFalseQuestionGeneralSetting = ({ formData, onChange }: Props) => {
  const { questionName, questionText, questionStatus, defaultMark } = formData;
  const form = useFormContext<TrueFalseQuestionForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;

  const handleSettingChange = (data: TrueFalseQuestionGeneralForm) => {
    if (onChange) onChange(data);
  };
  const handleEditorChange = (
    key: keyof TrueFalseQuestionGeneralForm,
    data: any
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleInputChange = (
    key: keyof TrueFalseQuestionGeneralForm,
    data: string
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleComboboxChange = (
    key: keyof TrueFalseQuestionGeneralForm,
    data: string | boolean
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const questionStatusOptions = Object.values(QuestionStatus);
  const questionNameHtmlFor = nanoid();
  const defaultMarkHtmlFor = nanoid();
  const correctAnswerOptions = ["True", "False"];

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Question name" htmlFor={questionNameHtmlFor}>
        <Input
          id={questionNameHtmlFor}
          className="flex-1 focus:outline-none"
          placeholder="Enter a name"
          defaultValue={questionName !== "" ? questionName : undefined}
          {...register("generalSettingForm.questionName")}
          onChange={(e) => handleInputChange("questionName", e.target.value)}
        />
        {errors?.questionName && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.questionName.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Question text" className="items-start">
        <TinyEditor
          onChange={(data) => handleEditorChange("questionText", data)}
          initValue={questionText}
        />
      </RowSetting>
      <RowSetting title="Question status">
        <Combobox
          showSearch={false}
          initialValue={questionStatusOptions[0]}
          options={questionStatusOptions}
          onChange={(value) => handleComboboxChange("questionStatus", value)}
          className="w-40"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {questionStatus}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
      <RowSetting title="Default mark" htmlFor={defaultMarkHtmlFor}>
        <Input
          id={defaultMarkHtmlFor}
          className="w-40 focus:outline-none"
          placeholder="Enter a name"
          type="number"
          defaultValue={defaultMark != 0 ? defaultMark : undefined}
          {...register("generalSettingForm.defaultMark", {
            valueAsNumber: true,
          })}
          onChange={(e) => handleInputChange("defaultMark", e.target.value)}
        />
        {errors?.defaultMark && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.defaultMark.message}
          </p>
        )}
      </RowSetting>
    </div>
  );
};

interface RowProps {
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
}
const RowSetting = ({ title, children, htmlFor, className }: RowProps) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      <label htmlFor={htmlFor} className="w-[300px] font-semibold">
        {title}
      </label>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};

export default TrueFalseQuestionGeneralSetting;
