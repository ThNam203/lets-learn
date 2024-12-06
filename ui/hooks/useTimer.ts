import { TimerStatus } from "@/app/courses/[courseId]/quiz/[topicId]/_components/tab-content/_components/quiz-attempting-tab/quiz-timer";
import { useEffect, useRef, useState } from "react";

interface Props {
  step?: number;
}
const useTimer = ({ step = 1 }: Props) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const timer = useRef<number>(0);
  const timerValue = timer.current;

  const [status, setStatus] = useState<TimerStatus>(TimerStatus.STOPPED);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (startTime?: Date) => {
    if (timerValue > 0) return;
    if (startTime) setStartTime(startTime);
    const interval = setInterval(() => {
      timer.current += step;
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
      timer.current = duration;
    }
  }, [status]);

  const setTimer = (time: number) => {
    timer.current = time;
  };

  return { timerValue, setTimer, startTimer, stopTimer, status };
};

export default useTimer;
