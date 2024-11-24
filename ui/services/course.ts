import { get, post } from "@/lib/httpHandle";
import { Role, User } from "@/models/user";

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

export const getTeacherCourses = (
  user: User,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  console.log(user);
  if (user.role !== Role.TEACHER) return;
  console.log(user);

  const url = `/course?userId=${user.id}`;
  get(url, onSuccess, onFail);
};

export const getCourse = (
  id: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  get(`/course/${id}`, onSuccess, onFail);
};
