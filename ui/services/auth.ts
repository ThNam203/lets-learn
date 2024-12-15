import { GET, makeRequest, POST } from "@/lib/http-handle/http-handle";

export const signup = (
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err: any) => void
) => {
  POST("/auth/signup", reqData, onSuccess, onFail);
};
export const login = (
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err: any) => void
) => {
  POST("/auth/login", reqData, onSuccess, onFail);
};
export const refreshToken = (
  onSuccess: (data: any) => void,
  onFail: (err: any) => void
) => {
  GET("/auth/refresh", onSuccess, onFail);
};

export const logout = (
  onSuccess: (data: any) => void,
  onFail: (err: any) => void
) => {
  GET("/auth/logout", onSuccess, onFail);
};
