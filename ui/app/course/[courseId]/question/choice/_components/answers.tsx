"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import TinyEditor from "@/lib/tinymce/editor";
import { cn, scrollTo } from "@/lib/utils";
import { QuestionChoice } from "@/models/question";
import { ChevronsUpDown, CirclePlus, Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { ChoiceQuestionForm } from "./choice-question-ui";
import { gradePercentOptions } from "../static-data";

export type ChoiceQuestionAnswerForm = {
  choices: QuestionChoice[];
};

interface Props {
  formData: ChoiceQuestionAnswerForm;
  onChange?: (data: ChoiceQuestionAnswerForm) => void;
}

const ChoiceQuestionAnswerSetting = ({ formData, onChange }: Props) => {
  const form = useFormContext<ChoiceQuestionForm>();
  const {
    errors: { answerSettingForm: errors },
  } = form.formState;
  const { choices } = formData;

  const handleSettingChange = (data: ChoiceQuestionAnswerForm) => {
    if (onChange) onChange(data);
  };

  const handleChoiceChange = (index: number, choice: QuestionChoice) => {
    const newChoices = [...choices];
    newChoices[index] = choice;
    handleSettingChange({ ...formData, choices: newChoices });
  };

  const handleAddChoice = () => {
    const newChoices = [...choices];
    newChoices.push({ text: "", gradePercent: 0, feedback: "" });
    handleSettingChange({ ...formData, choices: newChoices });
  };

  const handleRemoveChoice = () => {
    const newChoices = [...choices];
    newChoices.pop();
    handleSettingChange({ ...formData, choices: newChoices });
  };

  useEffect(() => {
    if (errors?.choices) {
      if (!errors.choices.findIndex) return;
      const errorChoiceIndex = errors.choices.findIndex((choice) => choice);
      scrollTo(`choice-${errorChoiceIndex + 1}`, 60);
    }
  }, [errors]);

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      {choices.map((choice, index) => {
        return (
          <AnswerRowSetting
            key={index}
            rowIndex={index}
            choice={choice}
            onChoiceChange={handleChoiceChange}
            errorMessage={errors?.choices?.[index]?.text?.message}
          />
        );
      })}

      <div className="flex flex-row justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddChoice}
        >
          <CirclePlus size={16} />
          Add new choice
        </Button>
        {choices.length > 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-red-500 border-red-600 hover:bg-red-50"
            onClick={handleRemoveChoice}
          >
            <Trash size={16} />
            Remove last choice
          </Button>
        )}
      </div>
    </div>
  );
};

interface RowProps {
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  errorMessage?: string;
}
const RowSetting = ({
  title,
  children,
  htmlFor,
  className,
  errorMessage,
}: RowProps) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      <div className="w-[252px] relative">
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

interface AnswerRowProps {
  rowIndex: number;
  className?: string;
  choice: QuestionChoice;
  errorMessage?: string;
  onChoiceChange?: (index: number, choice: QuestionChoice) => void;
}
const AnswerRowSetting = ({
  rowIndex,
  className,
  choice,
  errorMessage,
  onChoiceChange,
}: AnswerRowProps) => {
  const onEditorChange = (value: string) => {
    if (onChoiceChange) onChoiceChange(rowIndex, { ...choice, text: value });
  };

  const onGradePercentChange = (gradePercent: number) => {
    if (onChoiceChange) onChoiceChange(rowIndex, { ...choice, gradePercent });
  };

  return (
    <div
      id={`choice-${rowIndex + 1}`}
      className={cn(
        "py-6 px-8 rounded-md bg-slate-50 flex flex-col gap-4",
        className
      )}
    >
      <RowSetting
        title={`Choice ${rowIndex + 1}`}
        className="items-start"
        errorMessage={errorMessage}
      >
        <TinyEditor
          onChange={(data) => onEditorChange(data)}
          initValue={choice.text}
        />
      </RowSetting>
      <RowSetting title="Grade">
        <Combobox
          showSearch={false}
          initialValue={gradePercentOptions[0]}
          options={gradePercentOptions}
          renderItem={(item) => <OptionUI>{item}</OptionUI>}
          onChange={(value) => onGradePercentChange(parseInt(value))}
          className="w-40"
          popoverClassName="w-40"
        >
          <Button variant="outline" className="w-full justify-between">
            {choice.gradePercent} %
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
      <RowSetting title="Feedback" className="items-start">
        <TinyEditor
          onChange={(data) => onEditorChange(data)}
          initValue={choice.feedback}
        />
      </RowSetting>
    </div>
  );
};

interface OptionUIProps {
  children?: React.ReactNode;
}
const OptionUI = ({ children }: OptionUIProps) => {
  return <div className="">{children} %</div>;
};

export default ChoiceQuestionAnswerSetting;
