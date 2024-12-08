"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import styles from "./timer.module.css";

export enum TimerStatus {
  RUNNING = "running",
  STOPPED = "stopped",
}

interface Props {
  timer: number; // use useTimer hook to get timer
  status?: TimerStatus;
  className?: string;
}
const Timer = ({ timer, status = TimerStatus.STOPPED, className }: Props) => {
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  const timerDate = new Date(0, 0, 0, hours, minutes, seconds);

  return (
    <div
      className={cn(
        styles["clock"],
        "w-20 h-20 rounded-full p-[1.5px]", // style for the clock animation
        "transition-all duration-200 select-none cursor-default", //UX style
        status === TimerStatus.RUNNING &&
          "opacity-50 hover:opacity-100 delay-1000 hover:delay-0", // style for the clock in the test
        status === TimerStatus.STOPPED && styles["scale-fade-out"], // style for the clock when the test is finished
        className
      )}
    >
      <div
        className={cn(
          styles["timer-runner"],
          status === TimerStatus.STOPPED && "opacity-0"
        )}
      />

      <div
        className={cn(
          styles["front-clock"],
          "w-20 h-20 rounded-full flex items-center justify-center bg-green-50 hover:bg-green-50 text-green-500"
        )}
      >
        <span className="text-sm">{format(timerDate, "HH:mm:ss")}</span>
      </div>
    </div>
  );
};

export default Timer;
