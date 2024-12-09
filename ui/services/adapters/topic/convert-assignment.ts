import { AssignmentTopic } from "@/models/topic";

export const convertAssignmentToRequestData = (assignment: AssignmentTopic) => {
  const { id, data } = assignment;
  return {
    ...assignment,
    id: id.length === 4 ? null : id,
    data: data ? JSON.stringify(data) : null,
  };
};

export const convertAssignmentFromResponseData = (
  assignment: any
): AssignmentTopic => {
  const parsedData = JSON.parse(assignment.data);
  return {
    ...assignment,
    data: parsedData,
  };
};
