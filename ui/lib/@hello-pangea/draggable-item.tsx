import { cn } from "@/lib/utils";
import { DraggableProvided } from "@hello-pangea/dnd";
import { ChevronsUpDown, Grip } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  provided: DraggableProvided;
  moveIcon?: ReactNode;
  className?: string;
  controlButtonClassName?: string;
  children?: React.ReactNode;
}
const DraggableItem = ({
  provided,
  moveIcon,
  className,
  children,
  controlButtonClassName,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center overflow-hidden",
        className
      )}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div
        {...provided.dragHandleProps}
        className={cn("p-2", controlButtonClassName)}
      >
        <div className="cursor-pointer">
          {moveIcon ? moveIcon : <ChevronsUpDown size={20} />}
        </div>
      </div>

      {children}
    </div>
  );
};

export default DraggableItem;
