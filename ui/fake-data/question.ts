import {
  QuestionStatus,
  QuestionType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";
import { Question } from "@/models/question";

export const fakeQuestions: Question[] = [
  {
    id: "1",
    questionName: "What is your name ?",
    questionText: "<b>What is your name ?</b>",
    type: QuestionType.CHOICE,
    status: QuestionStatus.READY,
    defaultMark: 10,
    createdBy: "John Doe",
    createdAt: new Date(2024, 0, 1).toISOString(),
    modifiedAt: "2021-10-01",
    modifiedBy: "John Doe",
    usage: 10,
    data: {
      multiple: false,
      choices: [
        {
          text: "John Doe",
          gradePercent: 0,
          feedback: "Incorrect",
          id: "1",
          questionId: "1",
        },
        {
          text: "Jane Doe",
          gradePercent: 0,
          feedback: "Incorrect",
          id: "1",
          questionId: "1",
        },
        {
          text: "John Smith hahaaaaaaaaaaaaaaa",
          gradePercent: 100,
          feedback: "Correct",
          id: "1",
          questionId: "1",
        },
        {
          text: "Jane Smith",
          gradePercent: 0,
          feedback: "Incorrect",
          id: "1",
          questionId: "1",
        },
      ],
    },
  },
  {
    id: "2",
    questionName: "What is your age ?",
    questionText: "What is your age ?",
    type: QuestionType.SHORT_ANSWER,
    status: QuestionStatus.READY,
    defaultMark: 10,
    createdBy: "John Doe",
    createdAt: "2021-10-01",
    modifiedAt: "2021-10-01",
    modifiedBy: "John Doe",
    usage: 10,
    data: {
      choices: [
        {
          text: "20",
          gradePercent: 100,
          feedback: "Correct",
          id: "1",
          questionId: "1",
        },
      ],
    },
  },
  {
    id: "3",
    questionName: "The giraffe is tall, right?",
    questionText: "The giraffe is tall, right?",
    type: QuestionType.TRUE_FALSE,
    status: QuestionStatus.READY,
    defaultMark: 10,
    createdBy: "John Doe",
    createdAt: "2021-10-01",
    modifiedAt: "2021-10-01",
    modifiedBy: "John Doe",
    usage: 10,
    data: {
      correctAnswer: false,
      feedbackOfTrue: "Correct",
      feedbackOfFalse: "Incorrect",
    },
  },
  {
    id: "4",
    questionName: "What is your hobby ?",
    questionText: "What is your hobby ?",
    type: QuestionType.CHOICE,
    status: QuestionStatus.READY,
    defaultMark: 10,
    createdBy: "John Doe",
    createdAt: "2021-10-01",
    modifiedAt: "2021-10-01",
    modifiedBy: "John Doe",
    usage: 10,
    data: {
      multiple: true,
      choices: [
        {
          text: "Music",
          gradePercent: 25,
          feedback: "Wow",
          id: "1",
          questionId: "1",
        },
        {
          text: "Science",
          gradePercent: 25,
          feedback: "Impressive",
          id: "1",
          questionId: "1",
        },
        {
          text: "Math",
          gradePercent: 50,
          feedback: "Good",
          id: "1",
          questionId: "1",
        },
        {
          text: "Biology",
          gradePercent: 0,
          feedback: "Be de",
          id: "1",
          questionId: "1",
        },
      ],
    },
  },
  {
    id: "5",
    questionName: "What is your favorite color ?",
    questionText: "What is your favorite color ?",
    type: QuestionType.CHOICE,
    status: QuestionStatus.READY,
    defaultMark: 10,
    createdBy: "John Doe",
    createdAt: "2021-10-01",
    modifiedAt: "2021-10-01",
    modifiedBy: "John Doe",
    usage: 10,
    data: {
      multiple: false,
      choices: [
        {
          text: "Red",
          gradePercent: 0,
          feedback: "Incorrect",
          id: "1",
          questionId: "1",
        },
        {
          text: "Green",
          gradePercent: 0,
          feedback: "Incorrect",
          id: "1",
          questionId: "1",
        },
        {
          text: "Blue",
          gradePercent: 100,
          feedback: "Correct",
          id: "1",
          questionId: "1",
        },
        {
          text: "Yellow",
          gradePercent: 0,
          feedback: "Incorrect",
          id: "1",
          questionId: "1",
        },
      ],
    },
  },
];
