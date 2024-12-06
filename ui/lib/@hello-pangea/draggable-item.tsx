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
  draggable?: boolean;
}
const DraggableItem = ({
  provided,
  moveIcon,
  className,
  children,
  controlButtonClassName,
  draggable = true,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center overflow-hidden rounded-md",
        className
      )}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      {draggable && (
        <div
          {...provided.dragHandleProps}
          className={cn("p-2", controlButtonClassName)}
        >
          <div className="cursor-pointer">
            {moveIcon ? moveIcon : <ChevronsUpDown size={20} />}
          </div>
        </div>
      )}
      <div className="w-full py-2 px-4">{children}</div>
    </div>
  );
};

export default DraggableItem;
