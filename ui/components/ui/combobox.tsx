"use client";

import { Check } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/shadcn/popover";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  name?: string;
  initialValue?: string | null;
  options: string[];
  renderItem?: (item: string, index: number) => ReactNode;
  onChange?: (value: string) => void;
  onMultipleChange?: (value: string[]) => void;
  children: React.ReactNode;
  optionDescription?: string[];
  multiple?: boolean;
  showSearch?: boolean;
  className?: ClassValue;
  popoverClassName?: ClassValue;
}

export function Combobox({
  name,
  initialValue,
  options,
  renderItem,
  onChange,
  onMultipleChange,
  children,
  optionDescription,
  multiple = false,
  showSearch = true,
  className,
  popoverClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    if (initialValue) setValue([initialValue]);
  }, []);

  const handleSelected = (currentValue: string) => {
    if (!multiple) {
      const newValue = currentValue === value[0] ? [] : [currentValue];
      setValue(newValue);
      if (onChange) onChange(currentValue);
      setOpen(false);
    } else {
      let newValue;
      if (value.includes(currentValue))
        newValue = value.filter((v) => v !== currentValue);
      else newValue = [...value, currentValue];

      setValue(newValue);
      if (onMultipleChange) onMultipleChange(newValue);
    }
  };

  const handleSelectAll = () => {
    if (!options) return;
    let newValue: string[] = [];
    if (value.length === options.length) newValue = [];
    else newValue = options;
    setValue(newValue);
    if (onMultipleChange) onMultipleChange(newValue);
  };

  return (
    <div className={cn(className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className={cn("p-0", popoverClassName)}>
          <Command>
            {showSearch && (
              <CommandInput
                placeholder={`Search ${name && name.toLowerCase()}...`}
              />
            )}
            <CommandList>
              <CommandEmpty>{`No ${
                name ? name.toLowerCase() : "result"
              } found.`}</CommandEmpty>
              <CommandGroup>
                {multiple && (
                  <CommandItem
                    key="All"
                    onSelect={handleSelectAll}
                    className="space-x-2"
                  >
                    <Check
                      size={16}
                      className={cn(
                        value.length === options.length
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div className="w-full flex flex-col">
                      <div className="text-sm font-semibold">Select all</div>
                    </div>
                  </CommandItem>
                )}
                {options.map((option, index) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={handleSelected}
                    className="space-x-2"
                  >
                    <Check
                      size={16}
                      className={cn(
                        value.includes(option) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="w-full flex flex-col">
                      <div className="text-sm font-semibold">
                        {renderItem ? (
                          renderItem(option, index)
                        ) : (
                          <span>{option}</span>
                        )}
                      </div>
                      {optionDescription && (
                        <div className="text-xs text-gray-500">
                          {optionDescription[index]}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
