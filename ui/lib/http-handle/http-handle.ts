import GLOBAL from "@/global";
import { ErrorHandle } from "./error-handle";

const HEADER = {
  "Content-Type": "application/json",
};

export const makeRequest = async (
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  uri: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void,
  reqData?: any,
  host: string = GLOBAL.API_URL
) => {
  const {
    handleFetchError,
    handleParseDataError,
    handleResponseError,
    handleUnauthorizedError,
  } = ErrorHandle(onFail);

  const url = host + uri;
  try {
    const fetchData = () => {
      return fetch(url, {
        headers: HEADER,
        method,
        body: reqData ? JSON.stringify(reqData) : undefined,
        credentials: "include",
      });
    };
    let res: Response = await fetchData();

    if (!res.ok) {
      if (res.status === 403) {
        // retry by refreshing token
        res = await handleUnauthorizedError(fetchData);
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
    } catch (e: any) {
      console.log("Error in parsing data", e);
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

export const PATCH = async (
  uri: string,
  reqData: any,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  makeRequest("PATCH", uri, onSuccess, onFail, reqData);
};
