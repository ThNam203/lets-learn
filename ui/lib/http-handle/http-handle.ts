import GLOBAL from "@/global";
import { ErrorHandle } from "./error-handle";

const HEADER = {
  "Content-Type": "application/json",
};

export const makeRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  uri: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void,
  reqData?: any
) => {
  const {
    handleFetchError,
    handleParseDataError,
    handleResponseError,
    handleUnauthorizedError,
  } = ErrorHandle(onFail);

  try {
    const fetchData = () => {
      return fetch(GLOBAL.API_URL + uri, {
        headers: HEADER,
        method,
        body: reqData ? JSON.stringify(reqData) : undefined,
        credentials: "include",
      });
    };
    let res: Response = await fetchData();

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        // retry by refreshing token
        res = await handleUnauthorizedError(res, fetchData);
      } else {
        handleResponseError(res);
        return;
      }
    }

    if (res.status === 204) {
      // No content
      onSuccess({});
      return;
    }

    try {
      const data = await res.json();
      onSuccess(data);
    } catch {
      handleParseDataError();
    }
  } catch (err: any) {
    handleFetchError(err);
  }
};

export const GET = async (
  uri: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("GET", uri, onSuccess, onFail);
};

export const POST = async (
  uri: string,
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("POST", uri, onSuccess, onFail, reqData);
};

export const PUT = async (
  uri: string,
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("PUT", uri, onSuccess, onFail, reqData);
};

export const DELETE = async (
  uri: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("DELETE", uri, onSuccess, onFail);
};
