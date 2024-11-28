"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import TinyEditor from "@/lib/tinymce/editor";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { TrueFalseQuestionForm } from "./true-false-question-ui";

export type TrueFalseQuestionAnswerForm = {
  correctAnswer: boolean;
  feedbackOfTrue: string;
  feedbackOfFalse: string;
};
interface Props {
  formData: TrueFalseQuestionAnswerForm;
  onChange?: (data: TrueFalseQuestionAnswerForm) => void;
}

const TrueFalseQuestionAnswerSetting = ({ formData, onChange }: Props) => {
  const { correctAnswer, feedbackOfTrue, feedbackOfFalse } = formData;
  const form = useFormContext<TrueFalseQuestionForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;

  const handleSettingChange = (data: TrueFalseQuestionAnswerForm) => {
    if (onChange) onChange(data);
  };
  const handleEditorChange = (
    key: keyof TrueFalseQuestionAnswerForm,
    data: any
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleInputChange = (
    key: keyof TrueFalseQuestionAnswerForm,
    data: string
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };

  const handleComboboxChange = (
    key: keyof TrueFalseQuestionAnswerForm,
    data: string | boolean
  ) => {
    handleSettingChange({ ...formData, [key]: data });
  };
  const correctAnswerOptions = ["True", "False"];

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Correct answer">
        <Combobox
          showSearch={false}
          initialValue={correctAnswer ? "True" : "False"}
          options={correctAnswerOptions}
          onChange={(value) =>
            handleComboboxChange("correctAnswer", value === "True")
          }
          className="w-40"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {correctAnswer ? "True" : "False"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
      <RowSetting
        title="Feedback for the response 'True'"
        className="items-start"
      >
        <TinyEditor
          onChange={(data) => handleEditorChange("feedbackOfTrue", data)}
          initValue={feedbackOfTrue}
        />
      </RowSetting>
      <RowSetting
        title="Feedback for the response 'False'"
        className="items-start"
      >
        <TinyEditor
          onChange={(data) => handleEditorChange("feedbackOfFalse", data)}
          initValue={feedbackOfFalse}
        />
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

export default TrueFalseQuestionAnswerSetting;
