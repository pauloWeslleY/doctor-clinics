"use client";

import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { type HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import useSelectedDatePicker from "./use-selected-date-picker";

const SelectedDatePicker = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { date, handleDateSelect, validateDateCurrent } =
    useSelectedDatePicker();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {validateDateCurrent}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectedDatePicker;
