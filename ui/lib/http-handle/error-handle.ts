export const ErrorHandle = (onFail: (err?: any) => void) => {
  const handleParseDataError = (message = "Failed to parse data") => {
    onFail(message);
  };

  const handleFetchError = () => {
    onFail("Server error, please try again later");
  };

  const handleResponseError = (res: Response) => {
    const errorMessages: Record<number, string> = {
      400: "Bad request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not found",
      500: "Internal server error",
    };
    onFail(
      errorMessages[res.status] || res.statusText || "Something went wrong"
    );
  };

  return {
    handleParseDataError,
    handleFetchError,
    handleResponseError,
  };
};
