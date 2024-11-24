import { post } from "@/lib/httpHandle";
import { Section } from "@/models/course";

export const createSection = (
  data: any,
  onSuccess: (data: Section) => void,
  onFail: (err?: any) => void
) => {
  const { position, title, description, courseId } = data;
  let reqData = {
    position,
    title,
    description,
    courseId,
  };

  post("/section", reqData, onSuccess, onFail);
};
