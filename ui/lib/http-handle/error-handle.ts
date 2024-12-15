import { refreshToken } from "@/services/auth";

export const ErrorHandle = (onFail: (err?: any) => void) => {
  const handleParseDataError = (message = "Failed to parse data") => {
    onFail(message);
  };

  const handleFetchError = () => {
    onFail("Server error, please try again later");
  };

  const handleResponseError = async (res: Response) => {
    const resData = await res.json();
    const errorMessages: Record<number, string> = {
      400: "Bad request",
      401: "Unauthorized",
      403: "Please login to continue",
      404: "Not found",
      500: "Internal server error",
    };
    onFail(
      res.statusText ||
        resData.message ||
        errorMessages[res.status] ||
        "Something went wrong"
    );
  };

  const handleUnauthorizedError = async (
    callback: () => Promise<Response>
  ): Promise<Response> => {
    return new Promise((resolve, reject) => {
      const handleRefreshTokenSuccess = async () => {
        try {
          const res = await callback();
          resolve(res);
        } catch (err) {
          reject(err);
        }
      };

      const handleRefreshTokenFail = async () => {
        reject();
      };

      refreshToken(handleRefreshTokenSuccess, handleRefreshTokenFail);
    });
  };

  return {
    handleParseDataError,
    handleFetchError,
    handleResponseError,
    handleUnauthorizedError,
  };
};
