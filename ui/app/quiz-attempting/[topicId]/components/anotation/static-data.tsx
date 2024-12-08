import { Circle, CircleCheckBig } from "lucide-react";
import { ReactNode } from "react";
import { FlagIcon } from "../../../../course/[courseId]/quiz/[topicId]/components/tab-content/_components/icons";

type SymbolAnnotation = {
  symbol: ReactNode;
  description: string;
};
export const symbolAnnotations: SymbolAnnotation[] = [
  {
    symbol: <span className="text-green-500">✓</span>,
    description: "You selected the correct answer!",
  },
  {
    symbol: <span className="text-yellow-500">✓</span>,
    description: "You didn't select this correct answer!",
  },
  {
    symbol: <span className="text-red-500">✗</span>,
    description: "You selected the incorrect answer!",
  },
  {
    symbol: <CircleCheckBig size={16} className="text-cyan-600" />,
    description: "You selected this answer!",
  },
  {
    symbol: <Circle size={16} className="text-cyan-600" />,
    description: "You didn't select this answer!",
  },
  {
    symbol: <FlagIcon variant="default" />,
    description: "The question is unflagged!",
  },
  {
    symbol: <FlagIcon variant="active" />,
    description: "The question is flagged!",
  },
];
type ColorAnnotation = {
  colorClassName: string;
  description: string;
};
export const colorAnnotations: ColorAnnotation[] = [
  {
    colorClassName: "bg-cyan-600",
    description: "This color represents the default answer!",
  },
  {
    colorClassName: "bg-green-500",
    description: "This color represents the correct answer!",
  },
  {
    colorClassName: "bg-red-500",
    description: "This color represents the incorrect answer!",
  },
  {
    colorClassName: "bg-yellow-500",
    description: "This color represents the missing answer!",
  },
];

export enum QuizOpenCloseState {
  NOT_OPEN = "NOT_OPEN",
  OPEN = "OPEN",
  ENDED = "Ended",
}
