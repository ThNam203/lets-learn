"use client";
import IconButton from "@/components/buttons/icon-button";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { Topic } from "@/models/topic";
import { getAllWorkOfUser } from "@/services/topic";
import { format } from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Calendar from "./_components/calendar/calendar";
import { CalendarRange } from "./_components/calendar/static-data";
import { getDateAfterNDays } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { calendarBreadcrumb } from "./_components/static-data";

type Option = {
  key: string;
  value: string;
};

export default function CalendarPage() {
  const dispatch = useAppDispatch();
  const [workOfUser, setWorkOfUser] = useState<Topic[]>([]);
  const options: Option[] = useMemo(() => {
    let init = [{ key: "all", value: "All courses" }];
    let checkIds: string[] = [];
    workOfUser.forEach((topic) => {
      if (topic.course && !checkIds.includes(topic.course.id)) {
        init.push({ key: topic.course.id, value: topic.course.title });
        checkIds.push(topic.course.id);
      }
    });
    return init;
  }, [workOfUser]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].value
  );

  const [calendarRange, setCalendarRange] = useState<CalendarRange>({
    start: new Date(),
    end: getDateAfterNDays(6),
  });

  const formatCalendarRange = (range: { start: Date; end: Date }) => {
    const startText = format(range.start, "MMM d");
    const endText = format(range.end, "MMM d, yyyy");
    return `${startText} - ${endText}`;
  };

  const handleGetAllWorkOfUserSuccess = (data: Topic[]) => {
    setWorkOfUser(data);
  };

  const handleGetAllWorkOfUserFail = (error: any) => {
    toast.error(error);
  };

  const handleComboboxCourseChange = (courseName: string, index: number) => {
    setSelectedIndex(index);
    setSelectedOption(courseName);
  };

  const handlePreviosRange = () => {
    const newEnd = getDateAfterNDays(-1, calendarRange.start);
    const newStart = getDateAfterNDays(-6, newEnd);
    setCalendarRange({ start: newStart, end: newEnd });
  };

  const handleNextRange = () => {
    const newStart = getDateAfterNDays(1, calendarRange.end);
    const newEnd = getDateAfterNDays(6, newStart);
    setCalendarRange({ start: newStart, end: newEnd });
  };

  useEffect(() => {
    dispatch(setBreadcrumb(calendarBreadcrumb));
    getAllWorkOfUser(handleGetAllWorkOfUserSuccess, handleGetAllWorkOfUserFail);
  }, []);

  const filteredWorkOfUser = useMemo(() => {
    if (selectedIndex === 0) return workOfUser;

    const selectedCourseId = options[selectedIndex].key;
    return workOfUser.filter(
      (topic) => topic.course && topic.course.id === selectedCourseId
    );
  }, [selectedIndex, workOfUser, options]);
  return (
    <div className="w-full p-5 text-gray-700 space-y-2">
      <div className="flex flex-row items-center justify-between">
        <Combobox
          name="Course"
          initialValue={options[0].value}
          options={options.map((option) => option.value)}
          onChange={handleComboboxCourseChange}
          popoverClassName="min-w-[250px]"
        >
          <Button
            variant="outline"
            className="min-w-[250px] flex justify-between"
          >
            {selectedOption}
            <ChevronDown />
          </Button>
        </Combobox>
        <div className="flex flex-row items-center gap-2">
          <IconButton onClick={handlePreviosRange}>
            <ChevronLeft />
          </IconButton>
          <span className="font-semibold select-none">
            {formatCalendarRange(calendarRange)}
          </span>
          <IconButton onClick={handleNextRange}>
            <ChevronRight />
          </IconButton>
        </div>
        {/* Trick for UI */}
        <div className="min-w-[250px] opacity-0"></div>
      </div>
      <div className="h-[calc(100%-60px)]">
        <Calendar range={calendarRange} topics={filteredWorkOfUser} />
      </div>
    </div>
  );
}
