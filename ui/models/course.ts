import { Topic } from "./topic";

export type Category = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  category: string;
  level: string;
  studentIds: number[];
  sections: Section[];
  isPublished: boolean;
};

export type Section = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  position: number;
  topics: Topic[];
};
