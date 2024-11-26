"use client";
import { Input } from "@/lib/shadcn/input";
import { nanoid } from "@reduxjs/toolkit";
import { useFormContext } from "react-hook-form";
import { CourseSettingForm } from "../setting-list";

export type GeneralSettingForm = {
  name: string;
  category: string;
  level: string;
  price: number;
};

interface GeneralSettingProps {
  formData: GeneralSettingForm;
  onChange?: (data: GeneralSettingForm) => void;
}

const GeneralSetting = ({ formData, onChange }: GeneralSettingProps) => {
  const form = useFormContext<CourseSettingForm>();
  const { register } = form;
  const {
    errors: { generalSettingForm: errors },
  } = form.formState;
  const { name, category, level, price } = formData;
  console.log("GeneralSetting -> formData", formData);

  const handleSettingChange = (data: GeneralSettingForm) => {
    if (onChange) onChange(data);
  };
  const handleInputChange = (key: keyof GeneralSettingForm) => (e: any) => {
    handleSettingChange({ ...formData, [key]: e.target.value });
  };

  const nameHtmlFor = nanoid();
  const categoryHtmlFor = nanoid();
  const levelHtmlFor = nanoid();
  const priceHtmlFor = nanoid();
  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <RowSetting title="Name" htmlFor={nameHtmlFor}>
        <Input
          id={nameHtmlFor}
          placeholder="e.g. Introduce to Astronomy"
          defaultValue={name !== "" ? name : undefined}
          {...register("generalSettingForm.name")}
          onChange={handleInputChange("name")}
        />
        {errors?.name && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.name.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Category" htmlFor={categoryHtmlFor}>
        <Input
          id={categoryHtmlFor}
          placeholder="e.g. Academic"
          defaultValue={category !== "" ? category : undefined}
          {...register("generalSettingForm.category")}
          onChange={handleInputChange("category")}
        />
        {errors?.category && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.category.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Level" htmlFor={levelHtmlFor}>
        <Input
          id={levelHtmlFor}
          placeholder="e.g. Beginner"
          defaultValue={level !== "" ? level : undefined}
          {...register("generalSettingForm.level")}
          onChange={handleInputChange("level")}
        />
        {errors?.level && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.level.message}
          </p>
        )}
      </RowSetting>
      <RowSetting title="Price" htmlFor={priceHtmlFor}>
        <Input
          id={priceHtmlFor}
          placeholder="e.g. 1.99"
          type="number"
          step={0.01}
          min={0}
          max={999999999}
          {...register("generalSettingForm.price", { valueAsNumber: true })}
        />
        {errors?.price && (
          <p className="absolute top-full text-red-500 text-xs font-semibold">
            {errors.price.message}
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
