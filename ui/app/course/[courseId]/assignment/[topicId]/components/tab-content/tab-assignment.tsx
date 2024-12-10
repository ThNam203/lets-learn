import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn } from "@/lib/utils";

import { AssignmentTopic } from "@/models/topic";
import { format } from "date-fns";
import GradingSummary from "../assignment/grading-summary-table";
import { Role } from "@/models/user";
import GradingView from "../assignment/grading-view";
import SubmissionView from "../assignment/submission-view";

interface Props {
  role: Role;
  assignment: AssignmentTopic;
  className?: string;
}
const TabAssignment = ({ className, assignment, role }: Props) => {
  const { data } = assignment;
  const { open, close, description } = data;

  const openTime = open
    ? format(new Date(open), "EEEE, dd MMMM yyyy, h:mm a")
    : null;
  const closeTime = close
    ? format(new Date(close), "EEEE, dd MMMM yyyy, h:mm a")
    : null;

  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-300 text-gray-700">
        {openTime && (
          <p>
            <span className="font-bold">Open: </span>
            <span className="text-gray-500">{openTime}</span>
          </p>
        )}
        {closeTime && (
          <p>
            <span className="font-bold">Close: </span>
            <span className="text-gray-500">{closeTime}</span>
          </p>
        )}
      </div>
      <EditorDisplay className="text-gray-500" htmlString={description} />
      {/* {role === Role.TEACHER && <GradingView />}
      {role === Role.STUDENT && <SubmissionView />} */}
      <SubmissionView />
    </div>
  );
};

export default TabAssignment;
