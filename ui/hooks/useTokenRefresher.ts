import { refreshToken } from "@/services/auth";
import React, { useEffect } from "react";

export default function useTokenRefresher(ms: number = 60000 * 4) {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken(
        () => {},
        () => {}
      );
    }, ms);
    return () => clearInterval(interval);
  }, []);
}
