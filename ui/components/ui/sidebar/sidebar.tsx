"use client";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { Role } from "@/models/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCourses } from "@/redux/slices/course";
import { getPublicCourses, getTeacherCourses } from "@/services/course";
import {
  Calendar,
  ClipboardList,
  GraduationCap,
  Home,
  ListCheck,
  Settings,
  Users,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";
import SidebarCollapsibleItem from "./sidebar-colapsible-item";
import SidebarCourseItem from "./sidebar-course-item";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";
import SidebarSkeleton from "./sidebar-skeleton";

interface Props {
  className?: string;
  isSidebarOpen: boolean;
}
export default function Sidebar({ className, isSidebarOpen }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const courses = useAppSelector((state) => state.courses.value);
  const role = user ? user.role : Role.STUDENT;
  const studentCourseList = user ? user.courses : [];

  const handleGetTeacherCourseSuccess = (data: any) => {
    dispatch(setCourses(data));
  };
  const handleGetTeacherCourseFail = (error: any) => {
    toast.error(error);
  };
  const handleGetPublicCoursesSuccess = (data: Course[]) => {
    const joinedCourseIdList = user
      ? user.courses.map((course) => course.id)
      : [];
    // filter to get only public courses that user has not joined
    const filteredCourses = data.filter(
      (course) => !joinedCourseIdList.includes(course.id)
    );
    dispatch(setCourses(filteredCourses));
  };
  const handleGetPublicCoursesFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    // for student
    if (!user) return;
    if (user.role !== Role.STUDENT) return;
    getPublicCourses(handleGetPublicCoursesSuccess, handleGetPublicCoursesFail);
  }, [user]);

  useEffect(() => {
    // for teacher
    if (!user) return;
    if (user.role !== Role.TEACHER) return;
    getTeacherCourses(
      user,
      handleGetTeacherCourseSuccess,
      handleGetTeacherCourseFail
    );
  }, [user]);

  if (!user) return <SidebarSkeleton className={className} />;

  return (
    <div
      className={cn(
        "w-[350px] h-full border-r-[0.5px] border-gray-400 bg-white overflow-hidden transition-all duration-500",
        className
      )}
    >
      <div className="w-[350px] h-full flex flex-col shrink-0">
        <SidebarGroup hasBorder={false}>
          <SidebarItem
            title="Home"
            icon={<Home />}
            href="/home"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            title="Calendar"
            icon={<Calendar />}
            href="/calendar"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            title="Setting"
            icon={<Settings />}
            href="/setting"
            isSidebarOpen={isSidebarOpen}
          />
        </SidebarGroup>
        <SidebarGroup>
          {role === Role.TEACHER && (
            <SidebarCollapsibleItem
              trigger={
                <SidebarItem
                  title="Teaching"
                  icon={<Users />}
                  isSidebarOpen={isSidebarOpen}
                />
              }
              isSideBarOpen={isSidebarOpen}
            >
              <SidebarItem
                title="To review"
                icon={<ClipboardList />}
                href="/to-review"
                isSidebarOpen={isSidebarOpen}
              />
              <div className="max-h-[calc(100vh-350px)] min-h-fit default-scrollbar">
                {courses.map((course) => (
                  <SidebarCourseItem
                    key={course.id}
                    courseName={course.title}
                    category={course.category}
                    href={`/course/${course.id}`}
                    isSidebarOpen={isSidebarOpen}
                    image={
                      course.imageUrl ? (
                        <CldImage
                          src={course.imageUrl}
                          alt={`${course.title} background`}
                          width={100}
                          height={100}
                          className="w-8 h-8 rounded-full object-fill"
                        />
                      ) : (
                        <Image
                          src="/astronomy-bg.jpg"
                          alt="Astronomy background"
                          width={100}
                          height={100}
                          className="w-8 h-8 rounded-full object-fill"
                        />
                      )
                    }
                  />
                ))}
              </div>
            </SidebarCollapsibleItem>
          )}
          {role === Role.STUDENT && (
            <SidebarCollapsibleItem
              trigger={
                <SidebarItem
                  title="Enrolled"
                  icon={<GraduationCap />}
                  isSidebarOpen={isSidebarOpen}
                />
              }
              isSideBarOpen={isSidebarOpen}
            >
              <SidebarItem
                title="To do"
                icon={<ListCheck />}
                href="/to-do"
                isSidebarOpen={isSidebarOpen}
              />
              <div className="max-h-[calc(100vh-350px)] min-h-fit default-scrollbar">
                {studentCourseList.map((course) => (
                  <SidebarCourseItem
                    key={course.id}
                    courseName={course.title}
                    category={course.category}
                    href={`/course/${course.id}`}
                    isSidebarOpen={isSidebarOpen}
                    image={
                      course.imageUrl ? (
                        <CldImage
                          src={course.imageUrl}
                          alt={`${course.title} background`}
                          width={100}
                          height={100}
                          className="w-8 h-8 rounded-full object-fill"
                        />
                      ) : (
                        <Image
                          src="/astronomy-bg.jpg"
                          alt="Astronomy background"
                          width={100}
                          height={100}
                          className="w-8 h-8 rounded-full object-fill"
                        />
                      )
                    }
                  />
                ))}
              </div>
            </SidebarCollapsibleItem>
          )}
        </SidebarGroup>
      </div>
    </div>
  );
}
