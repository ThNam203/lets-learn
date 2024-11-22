import { Topic } from "./topic";

export type AttachedFile = {
  data: File;
  cloudUrl: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  category: string | null;
  level: number | string | null;
  studentIds: number[];
  sections: Section[];
  isPublished: boolean;
};

export type Section = {
  id: string;
  courseId: string;
  title: string;
  desc: string | null;
  topics: Topic[];
};
