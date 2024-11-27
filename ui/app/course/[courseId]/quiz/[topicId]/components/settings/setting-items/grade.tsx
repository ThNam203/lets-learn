"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { QuizSettingForm } from "../setting-list";
import { attemptsAllowedOptions, GradingMethod } from "@/models/quiz";

export type GradeSettingForm = {
  gradeToPass: number;
  attemptAllowed: string;
  gradingMethod: GradingMethod;
};

interface GradeSettingProps {
  formData: GradeSettingForm;
  onChange?: (data: GradeSettingForm) => void;
}

const GradeSetting = ({ formData, onChange }: GradeSettingProps) => {
  const form = useFormContext<QuizSettingForm>();
  const { register } = form;
  const {
    errors: { gradeSettingForm: errors },
  } = form.formState;
  const { gradeToPass, attemptAllowed, gradingMethod } = formData;
  const handleSettingChange = (data: GradeSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleNumberChange = (key: keyof GradeSettingForm, value: number) => {
    handleSettingChange({ ...formData, [key]: value });
  };

  const handleComboboxChange = (key: keyof GradeSettingForm, value: string) => {
    handleSettingChange({ ...formData, [key]: value });
  };

  const gradingMethodOptions = Object.values(GradingMethod);

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Grade to pass" htmlFor="grade-setting-gradeToPass">
        <Input
          id="grade-setting-gradeToPass"
          className="w-[150px] focus:outline-none"
          placeholder="Enter a grade"
          type="number"
          defaultValue={gradeToPass !== 0 ? gradeToPass : undefined}
          {...register("gradeSettingForm.gradeToPass", { valueAsNumber: true })}
          onChange={(e) =>
            handleNumberChange("gradeToPass", Number(e.target.value))
          }
        />
        {errors?.gradeToPass && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.gradeToPass.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Attempts allowed">
        <Combobox
          showSearch={false}
          options={attemptsAllowedOptions}
          initialValue={attemptAllowed}
          onChange={(value) => handleComboboxChange("attemptAllowed", value)}
          popoverClassName="w-[150px]"
        >
          <Button
            variant="outline"
            className="w-[150px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
          >
            {attemptAllowed}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
      <RowSetting title="Grading method">
        <Combobox
          showSearch={false}
          options={gradingMethodOptions}
          initialValue={gradingMethod}
          onChange={(value) => handleComboboxChange("gradingMethod", value)}
          popoverClassName="w-[200px]"
        >
          <Button
            variant="outline"
            className="w-[200px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
          >
            {gradingMethod}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSetting>
    </div>
  );
};

interface RowSettingProps {
  title: string;
  htmlFor?: string;
  children?: ReactNode | ReactNode[];
}
const RowSetting = ({ title, children, htmlFor }: RowSettingProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <label className="w-[180px] font-semibold" htmlFor={htmlFor}>
        {title}
      </label>
      <div className="w-full flex flex-row items-center gap-4">{children}</div>
    </div>
  );
};

export default GradeSetting;
