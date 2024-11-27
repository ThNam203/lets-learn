import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn, getTimeStringByDuration } from "@/lib/utils";
import {
  AssignmentData,
  getSecondFromTimeLimitType,
  Test,
} from "@/models/quiz";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import GradingSummary from "../assignment/grading-summary";

interface Props {
  assignment: Test;
  className?: string;
}
const TabAssignment = ({ className, assignment }: Props) => {
  const router = useRouter();
  const thisUser = fakeUser;
  const { data, name, description, open, close } = assignment;
  const {} = data as AssignmentData;

  const openTime = format(new Date(open.value), "EEEE, dd MMMM yyyy, h:mm a");
  const closeTime = format(new Date(close.value), "EEEE, dd MMMM yyyy, h:mm a");

  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-300 text-gray-700">
        <p>
          <span className="font-bold">Open: </span>
          <span className="text-gray-500">{openTime}</span>
        </p>
        <p>
          <span className="font-bold">Close: </span>
          <span className="text-gray-500">{closeTime}</span>
        </p>
      </div>
      <EditorDisplay className="text-gray-500" htmlString={description} />
      <div className="space-y-4">
        <Button variant="cyan" className="w-fit rounded-lg">
          Grade
        </Button>

        <div className="font-bold text-orange-500">Grading summary</div>
        <GradingSummary
          hiddenFromStudent={0}
          assigned={40}
          submitted={36}
          needGrading={0}
        />
      </div>
    </div>
  );
};

export default TabAssignment;
