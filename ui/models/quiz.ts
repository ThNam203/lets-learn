import { Question } from "./question";

export type QuizData = {
  description: string;
  open: string | null;
  close: string | null;
  timeLimitValue: number | null;
  timeLimitUnit: TimeLimitType;
  gradeToPass: number;
  gradingMethod: GradingMethod;
  attemptAllowed: "Unlimited" | string;
  questions: Question[];
};
export enum TimeLimitType {
  SECONDS = "Seconds",
  MINUTES = "Minutes",
  HOURS = "Hours",
  DAYS = "Days",
  WEEKS = "Weeks",
}

// function to get seconds from time limit value and unit
export const getSecondFromTimeLimitType = (
  value: number,
  unit: TimeLimitType | string,
  onUnitError?: () => void
) => {
  let second = 0;
  switch (unit) {
    case TimeLimitType.SECONDS:
      second = value;
      break;
    case TimeLimitType.MINUTES:
      second = value * 60;
      break;
    case TimeLimitType.HOURS:
      second = value * 60 * 60;
      break;
    case TimeLimitType.DAYS:
      second = value * 60 * 60 * 24;
      break;
    case TimeLimitType.WEEKS:
      second = value * 60 * 60 * 24 * 7;
      break;
    default:
      if (onUnitError) onUnitError();
      break;
  }
  return second;
};

export enum GradingMethod {
  HIGHEST_GRADE = "Highest Grade",
  AVERAGE_GRADE = "Average Grade",
  FIRST_GRADE = "First Grade",
  LAST_GRADE = "Last Grade",
}

export const attemptsAllowedOptions = [
  "Unlimited",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
