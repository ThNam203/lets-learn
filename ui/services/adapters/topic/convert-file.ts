import { AssignmentTopic, FileTopic } from "@/models/topic";
import { convertAssignmentResponseFromResponseData } from "../student-response/assignment-response";

export const convertFileToRequestData = (file: FileTopic) => {
  const { id, data } = file;
  return {
    ...file,
    id: id.length === 4 ? null : id,
    data: data ? JSON.stringify(data) : null,
  };
};

export const convertFileFromResponseData = (file: any): FileTopic => {
  const parsedData = JSON.parse(file.data);

  return {
    ...file,
    data: parsedData,
  };
};
