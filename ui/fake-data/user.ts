import { Role, User } from "@/models/user";

export const fakeUser: User = {
  id: "1",
  username: "Pham Tien Dat",
  email: "ptdat@gmail.com",
  password: "",
  image: "",
  role: Role.TEACHER,
};

export const fakeUserList: User[] = [
  {
    id: "1",
    username: "Nguyen Van A",
    email: "nva@gmail.com",
    password: "",
    image: "",
    role: Role.STUDENT,
  },
  {
    id: "2",
    username: "Nguyen Van B",
    email: "nvb@gmail.com",
    password: "",
    image: "",
    role: Role.STUDENT,
  },
  {
    id: "3",
    username: "Nguyen Van C",
    email: "nvc@gmail.com",
    password: "",
    image: "",
    role: Role.STUDENT,
  },
  {
    id: "4",
    username: "Nguyen Van D",
    email: "nvd@gmail.com",
    password: "",
    image: "",
    role: Role.STUDENT,
  },
  {
    id: "5",
    username: "Nguyen Van E",
    email: "nve@gmail.com",
    password: "",
    image: "",
    role: Role.STUDENT,
  },
  {
    id: "6",
    username: "Nguyen Van F",
    email: "nvf@gmail.com",
    password: "",
    image: "",
    role: Role.STUDENT,
  },
];
