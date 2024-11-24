import { get } from "@/lib/httpHandle";

export const getMyInfo = (
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  get("/user/me", onSuccess, onFail);
};
