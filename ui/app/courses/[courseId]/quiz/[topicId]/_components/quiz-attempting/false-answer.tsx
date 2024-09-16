"use client";
import React, { useEffect, useState } from "react";
import { answerKeys } from "../static-data";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const answerVariants = cva(
  "w-full flex items-center justify-center py-2 px-6 rounded-md cursor-pointer transition-all duration-300 bg-red-800 hover:bg-red-700",
  {
    variants: {
      variant: {
        default: "text-white/50",
        selected:
          "bg-gradient-to-br from-red-600 to-red-400 text-white shadow-md",
        correct: "bg-green-500 text-white",
        incorrect: "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props extends VariantProps<typeof answerVariants> {
  correctAnswer: boolean;
  selected?: boolean;
  showCorrectAnswer?: boolean;
  onSelect?: () => void;
  variant?: "default" | "selected" | "correct" | "incorrect";
}
const FalseAnswer = ({
  correctAnswer,
  selected,
  showCorrectAnswer,
  onSelect,
  variant = "default",
}: Props) => {
  const [state, setState] = useState(variant);
  const value = false;
  const handleSelectAnswer = () => {
    setState("selected");
    if (onSelect) onSelect();
  };

  useEffect(() => {
    if (showCorrectAnswer) {
      const newState = correctAnswer === value ? "correct" : "incorrect";
      setState(newState);
    }
  }, [showCorrectAnswer, correctAnswer, value]);

  useEffect(() => {
    if (showCorrectAnswer) return;
    if (selected === value) setState("selected");
    else setState("default");
  }, [showCorrectAnswer, selected, value]);

  return (
    <div
      className={cn(answerVariants({ variant: state }))}
      onClick={handleSelectAnswer}
    >
      <span>False</span>
    </div>
  );
};

export default FalseAnswer;
