export enum Role {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: Role;
};
