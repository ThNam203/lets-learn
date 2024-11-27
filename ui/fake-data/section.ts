import { Section } from "@/models/course";
import { fakeTopics } from "./topic";

export const fakeSections: Section[] = [
  {
    id: "1",
    courseId: "1",
    title: "Introduction",
    description:
      "Welcome everyone! Below is some documents needed for this course. Hope all of you enjoy this course.",
    topics: fakeTopics.filter((topic) => topic.sectionId === "1"),
    position: 1,
  },
  {
    id: "2",
    courseId: "1",
    title: "Lesson 1",
    description: null,
    topics: fakeTopics.filter((topic) => topic.sectionId === "2"),
    position: 2,
  },
  {
    id: "3",
    courseId: "1",
    title: "Lesson 2",
    description: null,
    topics: fakeTopics.filter((topic) => topic.sectionId === "3"),
    position: 3,
  },
];
