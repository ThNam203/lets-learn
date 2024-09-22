import { Course } from "@/models/course";

import { fakeCategories } from "./category";
import { fakeSections } from "./section";

export const fakeCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Accounting",
    categoryId: "1",
    sections: fakeSections.filter((section) => section.courseId === "1"),
    description:
      "This is a course that introduces you to the basics of accounting.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWNjb3VudGluZ3xlbnwwfDB8MHx8fDI%3D",
    price: 79.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "2",
    title: "Introduction to Computer Science",
    categoryId: "2",
    sections: fakeSections.filter((section) => section.courseId === "2"),
    description:
      "This is a course that introduces you to the basics of computer science.",
    imageUrl:
      "https://images.unsplash.com/photo-1675495666895-9091741bfd78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfDB8MHx8fDI%3D",
    price: 59.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "3",
    title: "Introduction to Engineering",
    categoryId: "3",
    sections: fakeSections.filter((section) => section.courseId === "3"),
    description:
      "This is a course that introduces you to the basics of engineering.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5naW5lZXJpbmd8ZW58MHwwfDB8fHwy",
    price: 99.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "4",
    title: "Introduction to Filming",
    categoryId: "4",
    sections: fakeSections.filter((section) => section.courseId === "4"),
    description:
      "This is a course that introduces you to the basics of filming.",
    imageUrl:
      "https://images.unsplash.com/photo-1500705479396-0e1d0bee4076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbWluZ3xlbnwwfDB8MHx8fDI%3D",
    price: 12.49,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "5",
    title: "Introduction to Music",
    categoryId: "5",
    sections: fakeSections.filter((section) => section.courseId === "5"),
    description: "This is a course that introduces you to the basics of music.",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHwwfDB8fHwy",
    price: 29.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "6",
    title: "Introduction to Computer Science",
    description: "",
    imageUrl: "",
    price: 1.65,
    categoryId: null,
    level: null,
    students: null,
    sections: [],
    resources: [],
    isPublished: true,
  },
  {
    id: "7",
    title: "Introduction to React JS",
    description: "",
    imageUrl: "",
    price: 1.99,
    categoryId: null,
    level: null,
    students: null,
    sections: [],
    resources: [],
    isPublished: false,
  },
  {
    id: "8",
    title: "Introduction to Next JS",
    description: "",
    imageUrl: "",
    price: 1.65,
    categoryId: null,
    level: null,
    students: null,
    sections: [],
    resources: [],
    isPublished: false,
  },
  {
    id: "9",
    title: "Introduction to Computer Science",
    description: "Course 1 description",
    imageUrl: "",
    categoryId: null,
    price: 100,
    isPublished: true,
    level: "beginner",
    resources: [
      {
        cloudUrl:
          "https://res.cloudinary.com/dggtc5ucv/video/upload/v1724920739/avff2nj4g4pnlsmjmfeb.mp4",
        data: new File([""], "filename"),
      },
    ],
    students: 10,
    sections: fakeSections.filter((section) => section.courseId === "5"),
  },
];