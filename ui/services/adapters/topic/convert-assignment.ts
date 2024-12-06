import { AssignmentTopic } from "@/models/topic";

export const convertAssignmentToRequestData = (assignment: AssignmentTopic) => {
  const { id, data } = assignment;
  return {
    ...assignment,
    id: id.length === 4 ? null : id,
    data: JSON.stringify(data),
  };
};
