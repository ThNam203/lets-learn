"use client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ReactNode } from "react";
import { cn } from "../utils";
import DraggableItem from "./draggable-item";

interface Props<T> {
  data: T[];
  onReordered?: (newData: T[]) => void;
  renderItem: (item: T, index: number) => ReactNode;
  containerClassName?: string;
  itemClassName?: string;
  draggable?: boolean;
}

interface Identifiable {
  id: string;
}

export default function DraggableContainer<T extends Identifiable>({
  data,
  onReordered,
  renderItem,
  containerClassName,
  itemClassName,
  draggable = true,
}: Props<T>) {
  const handleDragEnd = (result: DropResult) => {
    const dragIndex = result.source.index;
    const dropIndex = result.destination?.index;
    if (dropIndex === undefined || dragIndex === dropIndex) return;

    const newData = [...data];
    const [removed] = newData.splice(dragIndex, 1);
    newData.splice(dropIndex, 0, removed);

    if (onReordered) onReordered(newData);
  };

  return (
    <div className={cn(containerClassName)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="flex flex-col gap-2">
                {data.map((item, index) => {
                  console.log("item: ", item);
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <DraggableItem
                          provided={provided}
                          className={itemClassName}
                          draggable={draggable}
                        >
                          {renderItem(item, index)}
                        </DraggableItem>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
