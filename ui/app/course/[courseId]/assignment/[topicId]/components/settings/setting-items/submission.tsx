"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { FileSizeOption } from "@/models/assignment";
import { nanoid } from "@reduxjs/toolkit";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { AssignmentSettingForm } from "../setting-list";

export type SubmissionSettingForm = {
  maximumFile: {
    enabled: boolean;
    value: number;
  };
  maximumFileSize: {
    enabled: boolean;
    value: FileSizeOption;
  };
};

interface Props {
  formData: SubmissionSettingForm;
  onChange?: (data: SubmissionSettingForm) => void;
}

export default function SubmissionSetting({ formData, onChange }: Props) {
  const form = useFormContext<AssignmentSettingForm>();
  const { register } = form;
  const {
    errors: { submissionSettingForm: errors },
  } = form.formState;
  const { maximumFile, maximumFileSize } = formData;
  const handleSettingChange = (data: SubmissionSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleEnableChange =
    (key: keyof SubmissionSettingForm) => (value: boolean) => {
      handleSettingChange({
        ...formData,
        [key]: { ...formData[key], enabled: value },
      });
    };

  const handleNumberInputChange =
    (key: keyof SubmissionSettingForm) => (e: any) => {
      const iValue = parseInt(e.target.value);
      handleSettingChange({
        ...formData,
        [key]: { ...formData[key], value: iValue },
      });
    };

  const handleComboboxChange =
    (key: keyof SubmissionSettingForm) => (value: string) => {
      handleSettingChange({ ...formData, [key]: { ...formData[key], value } });
    };

  const fileSizeOptions = Object.values(FileSizeOption);
  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSettingWithCheckbox
        title="Maximum number of uploaded files"
        enabled={maximumFile.enabled}
        handleEnableChange={handleEnableChange("maximumFile")}
      >
        <Input
          type="number"
          defaultValue={maximumFile.value}
          disabled={!maximumFile.enabled}
          onChange={handleNumberInputChange("maximumFile")}
        />
      </RowSettingWithCheckbox>
      <RowSettingWithCheckbox
        title="Maximum submission size"
        enabled={maximumFileSize.enabled}
        handleEnableChange={handleEnableChange("maximumFileSize")}
      >
        <Combobox
          showSearch={false}
          options={fileSizeOptions}
          initialValue={maximumFileSize.value}
          onChange={handleComboboxChange("maximumFileSize")}
          popoverClassName="w-[150px]"
        >
          <Button
            variant="outline"
            className="w-[150px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
          >
            {maximumFileSize.value}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </RowSettingWithCheckbox>
    </div>
  );
}
interface RowProps {
  title: string;
  htmlFor?: string;
  children?: React.ReactNode[] | React.ReactNode;
  childrenClassName?: string;
}
const RowSetting = ({
  title,
  children,
  htmlFor,
  childrenClassName,
}: RowProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor={htmlFor} className="w-[180px] font-semibold">
        {title}
      </label>
      <div className={cn("relative w-full flex flex-col", childrenClassName)}>
        {children}
      </div>
    </div>
  );
};

interface RowSettingWithCheckboxProps {
  title: string;
  children?: React.ReactNode;
  enabled: boolean;
  handleEnableChange: (value: boolean) => void;
}
const RowSettingWithCheckbox = ({
  title,
  enabled,
  children,
  handleEnableChange,
}: RowSettingWithCheckboxProps) => {
  const htmlFor = nanoid();

  return (
    <div className="flex flex-row items-center gap-2">
      <label className="w-[180px] font-semibold">{title}</label>
      <div className="w-full flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id={htmlFor}
            defaultChecked={enabled}
            onCheckedChange={handleEnableChange}
          />
          <label htmlFor={htmlFor} className="cursor-pointer">
            Enable
          </label>
        </div>
        <div className="max-w-[250px]">{children}</div>
      </div>
    </div>
  );
};
