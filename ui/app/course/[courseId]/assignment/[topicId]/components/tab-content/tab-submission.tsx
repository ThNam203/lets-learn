"use client";
import { fakeUserList } from "@/fake-data/user";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { StudentResponse } from "@/models/student-response";
import { Test } from "@/models/quiz";
import { User } from "@/models/user";
import { useEffect, useRef, useState } from "react";
import { submisisonFilterKeys } from "../static-data";
import FilterButton from "../submission/filter-button";
import SubmissionTable from "../submission/submission-table";
import SubmissionDefaultView from "../submission/submission-view/default-view";
import SubmissionSubmittedView from "../submission/submission-view/submitted-view";
import { fakeStudentResponses } from "@/fake-data/student-response";
import { X } from "lucide-react";

interface Props {
  assignment: Test;
  className?: string;
}
export function TabSubmission({ className, assignment }: Props) {
  const refInput = useRef<HTMLInputElement>(null);
  const [filterKey, setFilterKey] = useState<string>("");
  const [studentResponses, setStudentResponses] =
    useState<StudentResponse[]>(fakeStudentResponses);
  const [selectedStudentResponse, setSelectedStudentResponse] =
    useState<StudentResponse | null>(null);
  const [students, setStudents] = useState<User[]>(fakeUserList);

  const handleInputChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!refInput.current) return;
    refInput.current.value = e.target.value;
  };
  const handleResponseSelect = (studentResponse: StudentResponse) => {
    setSelectedStudentResponse(studentResponse);
  };

  const handleCloseSubmittedView = () => {
    setSelectedStudentResponse(null);
  };

  return (
    <div className={cn(className)}>
      <h4 className="font-bold text-orange-500">Submissions</h4>
      <div className="relative w-full h-full flex flex-row">
        {selectedStudentResponse !== null && (
          <X
            className="absolute top-0 right-0 text-gray-500 hover:text-red-500 duration-100 ease-linear cursor-pointer"
            onClick={handleCloseSubmittedView}
          />
        )}
        <div className="flex flex-col gap-4 p-6 pl-0 border-r-1 border-gray-400">
          <div className="flex flex-row items-center gap-2">
            <Input
              placeholder="Search anything..."
              onChange={handleInputChange}
              className="max-w-sm shrink-0 md:w-[300px] max-md:w-auto py-2"
            />
            <FilterButton selectedKey={filterKey} data={submisisonFilterKeys} />
          </div>
          <SubmissionTable
            selectedStudentResponse={selectedStudentResponse}
            studentResponses={studentResponses}
            students={students}
            onResponseSelect={handleResponseSelect}
          />
        </div>
        {selectedStudentResponse === null && (
          <SubmissionDefaultView
            assignment={assignment}
            studentResponses={studentResponses}
            className="w-full flex flex-col gap-4 p-6"
          />
        )}
        {selectedStudentResponse !== null && (
          <SubmissionSubmittedView
            assignment={assignment}
            studentResponse={selectedStudentResponse}
            className="w-full flex flex-col gap-4 p-6"
          />
        )}
      </div>
    </div>
  );
}
