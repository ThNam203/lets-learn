import { Question } from "./question";

export enum TestType {
  QUIZ = "quiz",
  ASSIGNMENT = "assignment",
  CHOICE = "choice",
}

export interface Test {
  description: string;
  type: TestType;
  open: {
    enabled: boolean;
    value: string;
  };
  close: {
    enabled: boolean;
    value: string;
  };
  data: QuizData | AssignmentData;
}

export type QuizData = {
  timeLimit: {
    enabled: boolean;
    value: number;
    unit: TimeLimitType;
  };
  gradeToPass: number;
  gradingMethod: GradingMethod;
  attemptAllowed: "Unlimited" | number;
  questions: Question[];
};

export type AssignmentData = {
  submissionType: SubmissionType[];
  remindToGrade: {
    enabled: boolean;
    value: string;
  };
  wordLimit: {
    enabled: boolean;
    value: number;
  };
  maximumFile: {
    enabled: boolean;
    value: number;
  };
  maximumFileSize: {
    enabled: boolean;
    value: string;
  };
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

export enum SubmissionType {
  ONLINE_TEXT = "Online text",
  FILE_UPLOAD = "File upload",
}

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
export const maximumFileSizeOptions = [
  "1 MB",
  "2 MB",
  "3 MB",
  "4 MB",
  "5 MB",
  "6 MB",
  "7 MB",
  "8 MB",
  "9 MB",
  "10 MB",
];
