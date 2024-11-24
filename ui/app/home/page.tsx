"use client";
import CourseCard from "@/components/ui/complex/course-card";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { Course } from "@/models/course";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getTeacherCourses } from "@/services/course";
import { getMyInfo } from "@/services/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "Home",
    href: "/home",
  },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState();
  const [courses, setCourses] = useState([]);

  const handleGetInfoSuccess = (data: any) => {
    setUser(data);
  };
  const handleGetInfoFail = (error: any) => {
    toast.error(error || "Failed to get user info");
  };

  const handleGetTeacherCourseSuccess = (data: any) => {
    setCourses(data);
  };
  const handleGetTeacherCourseFail = (error: any) => {
    toast.error(error || "Failed to get teacher courses");
  };

  useEffect(() => {
    if (!user) {
      console.log("get user");
      getMyInfo(handleGetInfoSuccess, handleGetInfoFail);
      return;
    }

    getTeacherCourses(
      user,
      handleGetTeacherCourseSuccess,
      handleGetTeacherCourseFail
    );
  }, [user]);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);
  return (
    <PageLayout>
      <div className="w-full h-fit grid grid-cols-3 gap-5 m-5">
        {courses.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </PageLayout>
  );
};

export default HomePage;
