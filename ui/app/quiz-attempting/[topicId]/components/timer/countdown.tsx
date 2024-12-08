"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { useEffect, useRef } from "react";
import styles from "./timer.module.css";

export enum CountdownStatus {
  RUNNING = "running",
  STOPPED = "stopped",
}

interface Props {
  status?: CountdownStatus;
  className?: string;
  countdown: number;
}
const Countdown = ({
  status = CountdownStatus.STOPPED,
  className,
  countdown,
}: Props) => {
  const [startCountdown, setStartCountdown] = React.useState(countdown);
  const [countdownPercent, setCountdownPercent] = React.useState(100);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty(
        "--percent",
        `${(360 * countdownPercent) / 100}deg`
      );
    }
  }, [countdownPercent]);

  useEffect(() => {
    if (status === CountdownStatus.RUNNING) {
      const newPercent = (countdown / startCountdown) * 100;
      setCountdownPercent(newPercent);
    }
  }, [status, countdown, startCountdown]);

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;
  const toCountdown = new Date(0, 0, 0, hours, minutes, seconds);

  return (
    <div
      className={cn(
        styles["clock"],
        "w-20 h-20 rounded-full p-[1.5px]", // style for the clock animation
        "transition-all duration-200 select-none cursor-default", //UX style
        status === CountdownStatus.RUNNING &&
          "opacity-50 hover:opacity-100 delay-1000 hover:delay-0", // style for the clock in the test
        status === CountdownStatus.STOPPED && styles["scale-fade-out"], // style for the clock when the test is finished
        className
      )}
    >
      <div
        ref={ref}
        className={cn(
          styles["countdown-runner"],
          status === CountdownStatus.STOPPED && "opacity-0"
        )}
      />

      <div
        className={cn(
          styles["front-clock"],
          "w-20 h-20 rounded-full flex items-center justify-center bg-green-50 text-green-500"
        )}
      >
        <span className="text-sm">{format(toCountdown, "HH:mm:ss")}</span>
      </div>
    </div>
  );
};

export default Countdown;
