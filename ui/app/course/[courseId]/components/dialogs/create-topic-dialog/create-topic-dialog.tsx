"use client";

import TabList from "@/components/ui/tab-list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/lib/shadcn/dialog";
import { TabProvider } from "@/provider/tab-provider";
import { Tab } from "./statis-data";
import TabContent from "./tab-content";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}
export default function CreateTopicDialog({
  open,
  onOpenChange,
  trigger,
}: Props) {
  const tabs = Object.values(Tab);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl w-fit">
        <DialogHeader>
          <h5 className="text-orange-600 font-bold">Add a topic</h5>
        </DialogHeader>
        <TabProvider initTab={Tab.ALL}>
          <div className="w-full h-min flex flex-col gap-3">
            <TabList tabs={tabs} className="w-full" />
            <TabContent />
          </div>
        </TabProvider>
      </DialogContent>
    </Dialog>
  );
}
