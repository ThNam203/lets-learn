import { Button } from "@/lib/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/lib/shadcn/dialog";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <h5 className="text-orange-600 font-bold">Add a topic</h5>
        </DialogHeader>
        <div className="h-min flex flex-row"></div>
      </DialogContent>
    </Dialog>
  );
}
