import { Button } from "@/lib/shadcn/button";
import React from "react";

export default function CoursePageSkeleton() {
  return (
    <div className="">
      <div className="w-full h-[300px] rounded-lg animate-pulse bg-gray-400" />
      <div className="w-full flex justify-end">
        <Button variant="link" className="p-0">
          Collapse all
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {[...Array(10).keys()].map((_, index) => (
          <div
            key={index}
            className="w-full h-16 rounded-lg px-6 animate-pulse bg-gray-400"
          />
        ))}
      </div>
    </div>
  );
}
