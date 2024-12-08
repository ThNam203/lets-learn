import { TimerStatus } from "@/app/courses/[courseId]/quiz/[topicId]/_components/tab-content/_components/quiz-attempting-tab/quiz-timer";
import { useEffect, useRef, useState } from "react";

interface Props {
  step?: number;
}
const useTimer = ({ step = 1 }: Props) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timer, setTimer] = useState<number>(0);

  const [status, setStatus] = useState<TimerStatus>(TimerStatus.STOPPED);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (startTime?: Date) => {
    if (timer > 0) return;
    setStartTime(startTime || new Date());
    const interval = setInterval(() => {
      setTimer((prev) => prev + step);
    }, 1000);
    setStatus(TimerStatus.RUNNING);
    timerRef.current = interval;
  };

  const stopTimer = (endTime?: Date) => {
    if (timerRef.current) {
      if (endTime) setEndTime(endTime);

      setStatus(TimerStatus.STOPPED);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (status === TimerStatus.STOPPED) {
      const duration =
        Math.floor(endTime.getTime() / 1000) -
        Math.floor(startTime.getTime() / 1000);
      setTimer(duration);
    }
  }, [status]);

  return { timer, setTimer, startTimer, stopTimer, status };
};

export default useTimer;
