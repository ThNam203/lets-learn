import { FileSizeOption } from "@/models/assignment";
import { AssignmentTopic, TopicType } from "@/models/topic";

export const fakeAssignment: AssignmentTopic = {
  id: "2",
  title: "Final project",
  sectionId: "1",
  type: TopicType.ASSIGNMENT,
  data: {
    open: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    close: new Date(2024, 11, 10, 14, 30, 0, 0).toISOString(),
    description:
      "Write a minimum of 500 words on what you would need to take into consideration if you were to spend a night in the Alps. Justify your choices.",
    remindToGrade: new Date(2024, 11, 10, 10, 30, 0, 0).toISOString(),
    maximumFile: 1,
    maximumFileSize: FileSizeOption["5MB"],
  },
};
