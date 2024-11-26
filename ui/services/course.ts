import { GET, POST, PUT } from "@/lib/http-handle/http-handle";
import { Course } from "@/models/course";
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

  POST("/course", reqData, onSuccess, onFail);
};

export const getTeacherCourses = (
  user: User,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  if (user.role !== Role.TEACHER) return;

  const url = `/course?userId=${user.id}`;
  GET(url, onSuccess, onFail);
};

export const getCourse = (
  id: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  GET(`/course/${id}`, onSuccess, onFail);
};

export const updateCourse = (
  data: Course,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const { id, title, price, category, level, isPublished, imageUrl } = data;
  let reqData = {
    title,
    price,
    category,
    level,
    isPublished,
    imageUrl,
  };

  PUT(`/course/${id}`, reqData, onSuccess, onFail);
};
