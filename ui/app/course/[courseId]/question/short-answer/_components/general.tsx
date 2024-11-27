"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { cn, scrollTo } from "@/lib/utils";
import { nanoid } from "@reduxjs/toolkit";
import { ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { QuestionStatus } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { ShortAnswerQuestionForm } from "./short-answer-question-ui";

export type ShortAnswerQuestionGeneralForm = {
  questionName: string;
  questionText: string;
  questionStatus: QuestionStatus;
  defaultMark: number;
};

interface Props {
  formData: ShortAnswerQuestionGeneralForm;
  onChange?: (data: ShortAnswerQuestionGeneralForm) => void;
}

const ShortAnswerQuestionGeneralSetting = ({ formData, onChange }: Props) => {
  const form = useFormContext<ShortAnswerQuestionForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;
  const { questionName, questionText, questionStatus, defaultMark } = formData;

  const handleSettingChange = (data: ShortAnswerQuestionGeneralForm) => {
    if (onChange) onChange(data);
  };
  const handleEditorChange = (
    key: keyof ShortAnswerQuestionGeneralForm,
    data: any
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleInputChange = (
    key: keyof ShortAnswerQuestionGeneralForm,
    data: string
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleComboboxChange = (
    key: keyof ShortAnswerQuestionGeneralForm,
    data: string
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  useEffect(() => {
    if (errors?.questionText) scrollTo("question-text", 140);
  }, [errors]);

  const questionStatusOptions = Object.values(QuestionStatus);
  const questionNameHtmlFor = nanoid();
  const defaultMarkHtmlFor = nanoid();

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Question name" htmlFor={questionNameHtmlFor}>
        <Input
          id={questionNameHtmlFor}
          className="min-w-[300px] w-1/2 focus:outline-none"
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
      <RowSetting
        id="question-text"
        title="Question text"
        className="items-start"
        errorMessage={errors?.questionText?.message}
      >
        <TinyEditor
          onChange={(data) => handleEditorChange("questionText", data)}
          initValue={questionText}
        />
      </RowSetting>
      <RowSetting title="Question status">
        <Combobox
          showSearch={false}
          initialValue={questionStatus}
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
          placeholder="Enter a number"
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
  id?: string;
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  errorMessage?: string;
}
const RowSetting = ({
  id,
  title,
  children,
  htmlFor,
  className,
  errorMessage,
}: RowProps) => {
  return (
    <div id={id} className={cn("flex flex-row items-center gap-2", className)}>
      <div className="relative w-[300px]">
        <label htmlFor={htmlFor} className="font-semibold">
          {title}
        </label>
        {errorMessage && (
          <p className="absolute top-full text-red-500 font-semibold">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="relative w-full flex flex-col">{children}</div>
    </div>
  );
};

export default ShortAnswerQuestionGeneralSetting;
