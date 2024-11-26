"use client";
import { Combobox } from "@/components/ui/combobox";
import { dateToZonedDateTime, zonedDateTimeToDate } from "@/lib/nextui/utils";
import { Button } from "@/lib/shadcn/button";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { Input } from "@/lib/shadcn/input";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { nanoid } from "@reduxjs/toolkit";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { QuizSettingForm } from "../setting-list";
import { TimeLimitType } from "@/models/test";

export type TimingSettingForm = {
  open: {
    enabled: boolean;
    value: string;
  };
  close: {
    enabled: boolean;
    value: string;
  };
  timeLimit: {
    enabled: boolean;
    value: number;
    unit: TimeLimitType;
  };
};

interface TimingSettingProps {
  formData: TimingSettingForm;
  onChange?: (data: TimingSettingForm) => void;
}

const TimingSetting = ({ formData, onChange }: TimingSettingProps) => {
  const form = useFormContext<QuizSettingForm>();
  const { register } = form;
  const {
    errors: { timingSettingForm: errors },
  } = form.formState;
  const { open, close, timeLimit } = formData;
  const handleSettingChange = (data: TimingSettingForm) => {
    if (onChange) onChange(data);
  };

  const handleEnableChange = (key: keyof TimingSettingForm, value: boolean) => {
    handleSettingChange({
      ...formData,
      [key]: { ...formData[key], enabled: value },
    });
  };

  const handleDatePickerChange = (
    key: keyof TimingSettingForm,
    zoneDatetime: ZonedDateTime
  ) => {
    const date = zonedDateTimeToDate(zoneDatetime);
    handleSettingChange({
      ...formData,
      [key]: { ...formData[key], value: date.toISOString() },
    });
  };

  const handleInputChange = (key: keyof TimingSettingForm, value: number) => {
    const newSetting = { ...formData };
    newSetting[key].value = value;
    handleSettingChange(newSetting);
  };

  const handleComboboxChange = (
    key: keyof TimingSettingForm,
    value: string
  ) => {
    const newSetting = { ...formData };
    if ("unit" in newSetting[key] && typeof newSetting[key].unit === "string")
      newSetting[key].unit = value;
    handleSettingChange(newSetting);
  };

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSettingWithDatePicker
        title="Open the quiz"
        form={formData}
        keyProp="open"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithDatePicker
        title="Close the quiz"
        form={formData}
        keyProp="close"
        handleEnableChange={handleEnableChange}
        handleDatePickerChange={handleDatePickerChange}
      />
      <RowSettingWithCombobox
        title="Time limit"
        form={formData}
        keyProp="timeLimit"
        options={Object.values(TimeLimitType)}
        handleEnableChange={handleEnableChange}
        handleInputChange={handleInputChange}
        handleComboboxChange={handleComboboxChange}
      />
    </div>
  );
};

interface RowSettingWithDatePickerProps {
  title: string;
  keyProp: keyof TimingSettingForm;
  form: TimingSettingForm;
  showMonthAndYearPickers?: boolean;
  handleEnableChange: (key: keyof TimingSettingForm, value: boolean) => void;
  handleDatePickerChange: (
    key: keyof TimingSettingForm,
    zoneDatetime: ZonedDateTime
  ) => void;
}
const RowSettingWithDatePicker = ({
  title,
  keyProp,
  form,
  showMonthAndYearPickers = true,
  handleEnableChange,
  handleDatePickerChange,
}: RowSettingWithDatePickerProps) => {
  const htmlFor = nanoid();

  return (
    <div className="flex flex-row items-center gap-2">
      <label className="w-[180px] font-semibold">{title}</label>
      <div className="w-full flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id={htmlFor}
            defaultChecked={form[keyProp].enabled}
            onCheckedChange={(checked) =>
              handleEnableChange(keyProp, !!checked)
            }
          />
          <label htmlFor={htmlFor} className="cursor-pointer">
            Enable
          </label>
        </div>
        <DatePicker
          variant="bordered"
          isDisabled={!form[keyProp].enabled}
          hideTimeZone
          showMonthAndYearPickers={showMonthAndYearPickers}
          defaultValue={
            form[keyProp]
              ? dateToZonedDateTime(new Date(form[keyProp].value))
              : now(getLocalTimeZone())
          }
          radius="sm"
          className="w-full"
          color="primary"
          onChange={(zoneDatetime) =>
            handleDatePickerChange(keyProp, zoneDatetime)
          }
          dateInputClassNames={{
            inputWrapper: "border",
          }}
        />
      </div>
    </div>
  );
};

interface RowSettingWithComboboxProps {
  title: string;
  keyProp: keyof TimingSettingForm;
  form: TimingSettingForm;
  options: string[];
  handleEnableChange: (key: keyof TimingSettingForm, value: boolean) => void;
  handleInputChange: (key: keyof TimingSettingForm, value: number) => void;
  handleComboboxChange: (key: keyof TimingSettingForm, value: string) => void;
}
const RowSettingWithCombobox = ({
  title,
  keyProp,
  form,
  options,
  handleEnableChange,
  handleInputChange,
  handleComboboxChange,
}: RowSettingWithComboboxProps) => {
  const htmlFor = nanoid();
  let unit: string = "";
  if ("unit" in form[keyProp] && typeof form[keyProp].unit === "string")
    unit = form[keyProp].unit;
  else unit = options.length > 0 ? options[0] : "No unit";

  return (
    <div className="flex flex-row items-center gap-2">
      <label className="w-[180px] font-semibold">{title}</label>
      <div className="w-full flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id={htmlFor}
            defaultChecked={form[keyProp].enabled}
            onCheckedChange={(checked) =>
              handleEnableChange(keyProp, !!checked)
            }
          />
          <label htmlFor={htmlFor} className="cursor-pointer">
            Enable
          </label>
        </div>

        <Input
          className="w-[150px] focus:outline-none"
          placeholder="Enter time limit"
          disabled={!form[keyProp].enabled}
          type="number"
          defaultValue={form[keyProp].value}
          onChange={(e) => handleInputChange(keyProp, parseInt(e.target.value))}
        />
        <Combobox
          name="Unit"
          options={options}
          showSearch={false}
          initialValue={unit}
          onChange={(value) => handleComboboxChange(keyProp, value)}
          popoverClassName="w-[150px]"
        >
          <Button
            variant="outline"
            className="w-[150px] justify-between text-black border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
            disabled={!form[keyProp].enabled}
          >
            {unit}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Combobox>
      </div>
    </div>
  );
};

export default TimingSetting;
