import { CountdownStatus } from "@/app/courses/[courseId]/quiz/[topicId]/_components/tab-content/_components/quiz-attempting-tab/quiz-countdown";
import { useEffect, useRef, useState } from "react";

interface Props {
  step?: number;
  countdown: number;
}
const useCountdown = ({ step = 1, countdown }: Props) => {
  const [countdownTimer, setCountdownTimer] = useState(countdown);
  const countDownRef = useRef<NodeJS.Timeout | null>(null);

  const [status, setStatus] = useState<CountdownStatus>(
    CountdownStatus.STOPPED
  );

  const startCountdown = () => {
    if (countdownTimer < countdown) return;
    const interval = setInterval(() => {
      setCountdownTimer((prev) => prev - step / 100);
    }, 10);
    setStatus(CountdownStatus.RUNNING);
    countDownRef.current = interval;
  };

  const stopCountdown = (callback?: () => void) => {
    if (countDownRef.current) {
      setCountdownTimer(0);
      setStatus(CountdownStatus.STOPPED);
      clearInterval(countDownRef.current);
      if (callback) callback();
    }
  };

  useEffect(() => {
    if (countdownTimer <= 0) stopCountdown();
  }, [countdownTimer]);

  return {
    countdownTimer,
    status,
    startCountdown,
    stopCountdown,
  };
};

export default useCountdown;
