import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { Copy } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

interface Props {
  course: Course;
}
export default function CourseBackground({ course }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(course.id);
    toast.success("Course ID copied to clipboard");
  };
  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
      <Image
        src="/astronomy-bg.jpg"
        alt="Astronomy background"
        width={1000}
        height={1000}
        className="absolute w-full h-[300px] object-cover"
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
