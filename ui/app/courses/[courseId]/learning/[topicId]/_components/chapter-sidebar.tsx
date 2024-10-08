import { Progress } from "@/lib/shadcn/progress";
import { Course } from "@/models/course";
import { cn } from "@/lib/utils";
import CourseSidebarChapter from "./course-sidebar-chapter";
import { fakePurchases } from "@/fake-data/purchase";
import { fakeChapters } from "@/fake-data/chapter";
import { fakeTopics } from "@/fake-data/topic";

interface Props {
  course: Course;
}
const CourseSidebar = ({ course }: Props) => {
  const userId = "1";
  const purchase = fakePurchases.find(
    (purchase) => purchase.courseId === course.id && purchase.userId === userId
  );
  const progress = 33;
  return (
    <div className="h-full overflow-y-auto shadow-sm flex flex-col border-r">
      <div className="h-[80px] py-4 px-6 border-b">
        <h1 className="font-semibold line-clamp-1">{course.title}</h1>
        <div className="mt-1">
          <Progress value={progress} />
          <span
            className={cn(
              "text-sm text-indigo-700",
              progress >= 100 && "text-green-500"
            )}
          >
            {Math.round(progress)}% Complete{" "}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full">
        {fakeChapters.map((chapter, index) => {
          const { userProgress, isFree } = chapter;
          return (
            <CourseSidebarChapter
              key={index}
              chapterId={chapter.id}
              courseId={course.id}
              label={chapter.title}
              isCompleted={
                userProgress[0] ? userProgress[0].isCompleted : false
              }
              isLocked={!isFree && !purchase}
              contents={fakeTopics}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;
