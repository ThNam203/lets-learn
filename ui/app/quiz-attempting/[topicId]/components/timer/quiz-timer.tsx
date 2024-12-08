"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import Timer from "./timer";
import useTimer from "@/hooks/useTimer";
import useCountdown from "@/hooks/useCountDown";
import { getSecondFromTimeLimitType, TimeLimitType } from "@/models/quiz";
import Countdown from "./countdown";

interface Props {
  timeLimit?: number | null;
  timeLimitUnit?: TimeLimitType;
  isTimerRunning: boolean;
  className?: string;
  onCountDownEnd?: () => void;
}
export default function QuizTimer({
  isTimerRunning = false,
  timeLimit,
  timeLimitUnit,
  className,
  onCountDownEnd,
}: Props) {
  const { startTimer, stopTimer, timer, status: timerStatus } = useTimer({});
  const {
    status: countdownStatus,
    countdownTimer,
    startCountdown,
    stopCountdown,
  } = useCountdown({
    countdown: getSecondFromTimeLimitType(
      timeLimit || 0,
      (timeLimitUnit as TimeLimitType) || TimeLimitType.HOURS
    ),
  });

  useEffect(() => {
    if (countdownTimer <= 0) stopCountdown(onCountDownEnd);
  }, [countdownTimer]);
  useEffect(() => {
    console.log(timer);
  }, [timer]);

  useEffect(() => {
    console.log("isTimerRunning", isTimerRunning);
    console.log("timeLimit", timeLimit);
    if (isTimerRunning) {
      if (timeLimit) startCountdown();
      else startTimer();
    } else {
      if (timeLimit) stopCountdown();
      else stopTimer();
    }
  }, [isTimerRunning]);
  return (
    <div className={cn(className)}>
      {timeLimit ? (
        <Countdown countdown={countdownTimer} status={countdownStatus} />
      ) : (
        <Timer timer={timer} status={timerStatus} />
      )}
    </div>
  );
}
