"use client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import React, { ReactNode, useEffect, useState } from "react";
import DraggableItem from "./draggable-item";
import { nanoid } from "@reduxjs/toolkit";
import { cn } from "../utils";

interface Props<T> {
  data: T[];
  onReordered: (newData: T[]) => void;
  renderItem: (item: T, index: number) => ReactNode;
  containerClassName?: string;
  itemClassName?: string;
  controlButtonClassName?: string;
}
const DraggableContainer = <T,>({
  data,
  onReordered,
  renderItem,
  containerClassName,
  controlButtonClassName,
  itemClassName,
}: Props<T>) => {
  const handleDragEnd = (result: DropResult) => {
    const dragIndex = result.source.index;
    const dropIndex = result.destination?.index;
    if (dropIndex === undefined || dragIndex === dropIndex) return;

    const newData = [...data];
    const [removed] = newData.splice(dragIndex, 1);
    newData.splice(dropIndex, 0, removed);

    if (onReordered) onReordered(newData);
  };

  const droppableId = nanoid();
  return (
    <div className={cn(containerClassName)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="flex flex-col gap-2">
                {data.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <DraggableItem
                        provided={provided}
                        className={itemClassName}
                        controlButtonClassName={controlButtonClassName}
                      >
                        {renderItem(item, index)}
                      </DraggableItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableContainer;
