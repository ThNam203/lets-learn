import PageLayout from "@/components/ui/util-layout/page-layout";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateCourseForm from "./_components/create-course-form";

export default function CreateCoursePage() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <PageLayout className="w-full flex flex-col p-5">
      <div
        className="w-fit h-fit p-3 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 duration-200"
        onClick={handleBack}
      >
        <ArrowLeft size={20} />
      </div>
      <CreateCourseForm />
    </PageLayout>
  );
}
