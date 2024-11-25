import GLOBAL from "@/global";
import { ErrorHandle } from "./error-handle";

const HEADER = {
  "Content-Type": "application/json",
};

export const makeRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  uri: string,
  reqData: any | null,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const { handleFetchError, handleParseDataError, handleResponseError } =
    ErrorHandle(onFail);

  try {
    const res: Response = await fetch(GLOBAL.API_URL + uri, {
      headers: HEADER,
      method,
      body: reqData ? JSON.stringify(reqData) : undefined,
      credentials: "include",
    });

    if (!res.ok) {
      handleResponseError(res);
      return;
    }

    try {
      const data = await res.json();
      onSuccess(data);
    } catch {
      handleParseDataError();
    }
  } catch {
    handleFetchError();
  }
};

export const GET = async (
  uri: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("GET", uri, null, onSuccess, onFail);
};

export const POST = async (
  uri: string,
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("POST", uri, reqData, onSuccess, onFail);
};

export const PUT = async (
  uri: string,
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("PUT", uri, reqData, onSuccess, onFail);
};

export const DELETE = async (
  uri: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("DELETE", uri, null, onSuccess, onFail);
};
