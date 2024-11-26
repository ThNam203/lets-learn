"use client";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { Copy, Pen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UpdateBackgroundDialog from "./dialogs/create-topic-dialog/update-background-dialog";
import { updateCourse } from "@/services/course";

interface Props {
  course: Course;
  onCourseChange?: (data: Course) => void;
}
export default function CourseBackground({ course, onCourseChange }: Props) {
  const [open, setOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(course.id);
    toast.success("Course ID copied to clipboard");
  };
  const handleUpdateBackgroundSuccess = (data: Course) => {
    if (onCourseChange) onCourseChange(data);
    toast.success("Updated successfully");
  };
  const handleUpdateBackgroundFail = (error: any) => {
    toast.error(error);
  };
  const handleUpdateBackground = (url: string) => {
    const updatedCourse = { ...course, imageUrl: url };
    updateCourse(
      updatedCourse,
      handleUpdateBackgroundSuccess,
      handleUpdateBackgroundFail
    );
  };
  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden z-0 flex items-center justify-center">
      <UpdateBackgroundDialog
        open={open}
        onOpenChange={setOpen}
        course={course}
        onUpdatedImage={handleUpdateBackground}
        trigger={
          <Button className="z-10 absolute top-6 right-6 bg-white hover:bg-gray-200 text-blue-700 font-bold">
            <Pen size={16} />
            Customize
          </Button>
        }
      />

      <Image
        src={course.imageUrl || "/astronomy-bg.jpg"}
        alt="Astronomy background"
        width={1000}
        height={400}
        className="absolute w-full h-full object-cover"
      />
      <div
        className={cn(
          "absolute bottom-0 p-6 w-full flex flex-row items-end justify-between",
          "text-white bg-gradient-to-b from-black/40 via-black/60 via-70% to-black",
          "shadow-[0px_-8px_24px_0px_rgba(0,0,0,0.5)]"
        )}
      >
        <div>
          <h2>{course.title}</h2>
          <h5 className="font-normal">{course.category}</h5>
        </div>
        <div className="h-full flex flex-row gap-4 items-center">
          <span>{course.id}</span>
          <Copy
            size={20}
            className="cursor-pointer hover:opacity-75"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
