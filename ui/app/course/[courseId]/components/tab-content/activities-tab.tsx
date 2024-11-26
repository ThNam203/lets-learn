import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { activityTopics } from "@/models/topic";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {}
export default function ActivitiesTab({}: Props) {
  const choices = ["All activities", ...activityTopics];
  const [selectedChoice, setSelectedChoice] = useState<string>(choices[0]);
  const handleChoiceChange = (choice: string) => {
    setSelectedChoice(choice);
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <Combobox
        showSearch={false}
        initialValue={choices[0]}
        renderItem={(item) => <span className="capitalize">{item}</span>}
        options={choices}
        onChange={handleChoiceChange}
        className="w-[400px]"
        popoverClassName="w-[400px]"
      >
        <Button variant="outline" className="w-full justify-between">
          <span className="capitalize">{selectedChoice}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Combobox>
    </div>
  );
}
