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
import { ChoiceQuestionForm } from "./choice-question-ui";
import { QuestionStatus } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";

export type ChoiceQuestionGeneralForm = {
  questionName: string;
  questionText: string;
  questionStatus: QuestionStatus;
  defaultMark: number;
  multipleChoice: boolean;
};

interface Props {
  formData: ChoiceQuestionGeneralForm;
  onChange?: (data: ChoiceQuestionGeneralForm) => void;
}

const ChoiceQuestionGeneralSetting = ({ formData, onChange }: Props) => {
  const form = useFormContext<ChoiceQuestionForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;
  const {
    questionName,
    questionText,
    questionStatus,
    defaultMark,
    multipleChoice,
  } = formData;

  const handleSettingChange = (data: ChoiceQuestionGeneralForm) => {
    if (onChange) onChange(data);
  };
  const handleEditorChange = (
    key: keyof ChoiceQuestionGeneralForm,
    data: any
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleInputChange = (
    key: keyof ChoiceQuestionGeneralForm,
    data: string | number
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleComboboxChange = (
    key: keyof ChoiceQuestionGeneralForm,
    data: string | boolean
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
          placeholder="Enter a name"
          type="number"
          defaultValue={defaultMark != 0 ? defaultMark : undefined}
          {...register("generalSettingForm.defaultMark", {
            valueAsNumber: true,
          })}
          onChange={(e) =>
            handleInputChange("defaultMark", Number(e.target.value))
          }
        />
        {errors?.defaultMark && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.defaultMark.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Multiple correct answers">
        <Combobox
          showSearch={false}
          initialValue={multipleChoice ? "Yes" : "No"}
          options={["Yes", "No"]}
          onChange={(value) =>
            handleComboboxChange(
              "multipleChoice",
              value === "Yes" ? true : false
            )
          }
          className="w-40"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {multipleChoice ? "Yes" : "No"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
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

export default ChoiceQuestionGeneralSetting;
