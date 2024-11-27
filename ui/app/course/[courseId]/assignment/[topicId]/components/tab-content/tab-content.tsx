import { useTab } from "@/hooks/useTab";
import { AssignmentData, Test } from "@/models/quiz";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabAssignment from "./tab-assignment";
import TabSetting from "./tab-setting";
import { TabSubmission } from "./tab-submission";
import { StudentResponse } from "@/models/student-response";

interface Props {
  assignment: Test;
  onAssignmentChange?: (quiz: Test) => void;
}

const TabContent = ({ assignment, onAssignmentChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  const { data } = assignment;
  const {} = data as AssignmentData;

  switch (selectedTab) {
    case Tab.ASSIGNMENT:
      return <TabAssignment assignment={assignment} className="h-full" />;
    case Tab.SETTINGS:
      return (
        <TabSetting
          assignment={assignment}
          onAssignmentChange={onAssignmentChange}
        />
      );
    case Tab.SUBMISSIONS:
      return <TabSubmission assignment={assignment} className="h-full" />;
    default:
      return notFound();
  }
};

export default TabContent;
