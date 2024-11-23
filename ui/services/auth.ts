import { post } from "@/lib/httpHandle";

export const signup = (
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err: any) => void
) => {
  post("/auth/signup", reqData, onSuccess, onFail);
};
export const login = (
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err: any) => void
) => {
  post("/auth/login", reqData, onSuccess, onFail);
};
