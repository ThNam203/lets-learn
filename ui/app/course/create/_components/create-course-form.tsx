"use client";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Input } from "@/lib/shadcn/input";
import { openConfetti } from "@/redux/slices/confetti";
import { createCourse } from "@/services/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ZodType, z } from "zod";
import DataRow from "./data-row";

export type CreateCourseFormData = {
  title: string;
  price: number;
  category: string;
  level: string;
  isPublished: boolean;
};

const schema: ZodType<CreateCourseFormData> = z.object({
  title: z.string().min(1, "Course name muse be at least 1 character"),
  price: z.number().min(0),
  category: z.string(),
  level: z.string(),
  isPublished: z.boolean(),
});

const initCourseValue = {
  title: "",
  price: 0,
  category: "Academic",
  level: "Beginner",
  isPublished: false,
};

export default function CreateCourseForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initCourseValue,
  });
  const { setValue, watch, register } = form;
  const {
    errors: { title: error },
  } = form.formState;
  const { title, category, isPublished, level, price } = watch();
  const visibilityOptions = ["Private", "Public"];

  const visibilityDescriptions = [
    "Only participants can access the course",
    "Anyone can access the course",
  ];
  const handleComboboxChange = (value: string) => {
    setValue("isPublished", value === visibilityOptions[1]);
  };
  const handleInputChange = (key: keyof CreateCourseFormData) => (e: any) => {
    setValue(key, e.target.value);
  };

  const handleSuccess = (data: any) => {
    if (!data.id) {
      toast.error("Lost course id");
      return;
    }

    const url = `/course/${data.id}`;
    router.push(url);
    dispatch(openConfetti());
  };
  const handleFail = () => {
    toast.error("Failed to create course");
  };

  const onSubmit = (data: CreateCourseFormData) => {
    createCourse(data, handleSuccess, handleFail);
  };

  const nameHtmlFor = nanoid();
  const categoryHtmlFor = nanoid();
  const levelHtmlFor = nanoid();
  const priceHtmlFor = nanoid();
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <div className="space-y-2">
        <h4>Create your course</h4>
        <DataRow
          label="Name"
          htmlFor={nameHtmlFor}
          desc="What will you teach in this course?"
          errorMessage={error ? error.message : undefined}
        >
          <Input
            id={nameHtmlFor}
            placeholder="e.g. Introduce to Astronomy"
            defaultValue={title}
            {...register("title")}
            onChange={handleInputChange("title")}
          />
        </DataRow>
        <DataRow
          label="Category"
          htmlFor={categoryHtmlFor}
          desc="What subject area best describes your course?"
        >
          <Input
            id={categoryHtmlFor}
            placeholder="e.g. Astronomy"
            defaultValue={category}
            {...register("category")}
            onChange={handleInputChange("category")}
          />
        </DataRow>
        <DataRow
          label="Level"
          htmlFor={levelHtmlFor}
          desc="What level is your course?"
        >
          <Input
            id={levelHtmlFor}
            placeholder="e.g. Beginner"
            defaultValue={level}
            {...register("level")}
            onChange={handleInputChange("level")}
          />
        </DataRow>
        <DataRow
          label="Price"
          htmlFor={priceHtmlFor}
          desc="Set a price for your course or make it free by setting the price to 0."
        >
          <Input
            id="price"
            aria-label="price"
            placeholder="e.g. 1.99"
            type="number"
            step={0.01}
            min={0}
            max={999999999}
            {...register("price", { valueAsNumber: true })}
          />
        </DataRow>
        <DataRow
          label="Visibility"
          desc={
            isPublished ? visibilityDescriptions[1] : visibilityDescriptions[0]
          }
        >
          <Combobox
            options={visibilityOptions}
            initialValue={visibilityOptions[0]}
            popoverClassName="w-[200px] text-gray-800"
            showSearch={false}
            onChange={handleComboboxChange}
          >
            <Button
              variant="outline"
              className="w-[200px] justify-between text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 data-[state=open]:border-blue-500"
            >
              {isPublished ? visibilityOptions[1] : visibilityOptions[0]}
              <ChevronDown className="text-gray-500" />
            </Button>
          </Combobox>
        </DataRow>

        <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
