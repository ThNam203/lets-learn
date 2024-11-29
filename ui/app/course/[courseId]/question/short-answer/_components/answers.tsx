"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import TinyEditor from "@/lib/tinymce/editor";
import { cn, scrollTo } from "@/lib/utils";
import { nanoid } from "@reduxjs/toolkit";
import { ChevronsUpDown, CirclePlus, Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { ShortAnswerQuestionForm } from "./short-answer-question-ui";
import { gradePercentOptions } from "../../_components/static-data";
import { QuestionChoice } from "@/models/question";

export type ShortAnswerQuestionAnswerForm = {
  answers: QuestionChoice[];
};

interface Props {
  formData: ShortAnswerQuestionAnswerForm;
  onChange?: (data: ShortAnswerQuestionAnswerForm) => void;
}

const ShortAnswerQuestionAnswerSetting = ({ formData, onChange }: Props) => {
  const form = useFormContext<ShortAnswerQuestionForm>();
  const {
    errors: { answerSettingForm: errors },
  } = form.formState;
  const { answers } = formData;
  const handleSettingChange = (data: ShortAnswerQuestionAnswerForm) => {
    if (onChange) onChange(data);
  };

  const handleAnswerChange = (index: number, answer: QuestionChoice) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    handleSettingChange({ ...formData, answers: newAnswers });
  };

  const handleAddAnswer = () => {
    const newAnswers = [
      ...answers,
      {
        id: nanoid(),
        questionId: nanoid(4),
        text: "",
        gradePercent: 100,
        feedback: "",
      },
    ];
    handleSettingChange({ ...formData, answers: newAnswers });
  };

  const handleRemoveAnswer = () => {
    const newAnswers = answers.slice(0, answers.length - 1);
    handleSettingChange({ ...formData, answers: newAnswers });
  };

  useEffect(() => {
    if (errors?.answers) {
      if (!errors.answers.findIndex) return;
      const errorChoiceIndex = errors.answers.findIndex((answer) => answer);
      scrollTo(`answer-${errorChoiceIndex + 1}`, 60);
    }
  }, [errors]);

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      {answers.map((answer, index) => (
        <AnswerRowSetting
          key={index}
          rowIndex={index}
          shortAnswer={answer}
          textError={errors?.answers?.[index]?.text?.message}
          onAnswerChange={handleAnswerChange}
        />
      ))}

      <div className="flex flex-row justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddAnswer}
        >
          <CirclePlus size={16} />
          Add new answer
        </Button>
        {answers.length > 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-red-500 border-red-600 hover:bg-red-50"
            onClick={handleRemoveAnswer}
          >
            <Trash size={16} />
            Remove last answer
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
  shortAnswer: QuestionChoice;
  textError?: string;
  onAnswerChange?: (index: number, answer: QuestionChoice) => void;
  errorMessage?: string;
}
const AnswerRowSetting = ({
  rowIndex,
  className,
  shortAnswer,
  textError,
  onAnswerChange,
  errorMessage,
}: AnswerRowProps) => {
  const textHtmlFor = nanoid();

  const onTextChange = (text: string) => {
    if (onAnswerChange) onAnswerChange(rowIndex, { ...shortAnswer, text });
  };

  const onGradePercentChange = (gradePercent: number) => {
    if (onAnswerChange)
      onAnswerChange(rowIndex, { ...shortAnswer, gradePercent });
  };

  const onFeedbackChange = (feedback: string) => {
    if (onAnswerChange) onAnswerChange(rowIndex, { ...shortAnswer, feedback });
  };

  return (
    <div
      id={`answer-${rowIndex + 1}`}
      className={cn(
        "py-6 px-8 rounded-md bg-slate-50 flex flex-col gap-4",
        className
      )}
    >
      <RowSetting
        title={`Answer ${rowIndex + 1}`}
        htmlFor={textHtmlFor}
        errorMessage={errorMessage}
      >
        <div className="flex flex-row items-center gap-4">
          <div>
            <Input
              id={textHtmlFor}
              className="w-[300px] focus:outline-none"
              placeholder="Enter an answer"
              defaultValue={
                shortAnswer.text !== "" ? shortAnswer.text : undefined
              }
              onChange={(e) => onTextChange(e.target.value)}
            />
            {textError && (
              <p className="absolute top-full text-red-500 text-xs font-semibold">
                {textError}
              </p>
            )}
          </div>
          <span className="w-[100px] font-semibold">Grade percent</span>
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
              {`${shortAnswer.gradePercent} %`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </Combobox>
        </div>
      </RowSetting>
      <RowSetting title="Feedback" className="items-start">
        <TinyEditor
          onChange={(data) => onFeedbackChange(data)}
          initValue={shortAnswer.feedback}
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

export default ShortAnswerQuestionAnswerSetting;
