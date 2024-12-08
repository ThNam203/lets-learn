import { cn } from "@/lib/utils";
import { DraggableProvided } from "@hello-pangea/dnd";

interface Props {
  provided: DraggableProvided;
  className?: string;
  children?: React.ReactNode;
  draggable?: boolean;
}
const DraggableItem = ({
  provided,
  className,
  children,
  draggable = true,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center overflow-hidden rounded-md py-2 pl-4 pr-3",
        className
      )}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
