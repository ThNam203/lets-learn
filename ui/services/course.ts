import { post } from "@/lib/httpHandle";

export const createCourse = (
  data: any,
  onSuccess: (data: any) => void,
  onFail: () => void
) => {
  let reqData = {
    title: data.title,
    description: "",
    imageUrl: "",
    price: data.price > 0 ? data.price : null,
    category: data.category,
    level: data.level,
    isPublished: data.isPublished,
  };

  post("/course", reqData, onSuccess, onFail);
};
