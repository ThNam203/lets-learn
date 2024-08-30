import React, { useEffect } from "react";

const useProgress = () => {
  const [progress, setProgress] = React.useState(0);
  const [isloading, setIsLoading] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout>();

  const start = (totalSize: number) => {
    if (totalSize === 0) return;
    setIsLoading(true);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return prev;
        else if (prev >= 90) return prev + 0.05;
        else if (prev >= 70) return prev + 0.1;
        else if (prev >= 50) return prev + 0.2;
        else if (prev >= 30) return prev + 0.5;
        else if (prev >= 10) return prev + 1;
        return prev + 5;
      });
    }, 20);
    setIntervalId(id);
  };

  const finish = async () => {
    return await new Promise((resolve, reject) => {
      setProgress(100);
      setIsLoading(false);
      clearInterval(intervalId);
      resolve(true);
    });
  };

  const error = async () => {
    return await new Promise((resolve, reject) => {
      clearInterval(intervalId);
      setProgress((prev) => -prev);
      setIsLoading(false);
      if (progress === 100) resolve;
    });
  };

  return { progress, isloading, start, finish, setProgress, error };
};

export default useProgress;