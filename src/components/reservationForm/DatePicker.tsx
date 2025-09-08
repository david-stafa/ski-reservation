"use client";

import * as React from "react";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cs } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReservationFormValues } from "./Form";
import { ControllerRenderProps } from "react-hook-form";

type DatePickerProps = {
  min: Date;
  max: Date;
  field: ControllerRenderProps<ReservationFormValues, "date">;
};

export function DatePicker({ min, max, field }: DatePickerProps) {
  const parsedDate = field.value ? parseISO(field.value) : undefined;
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {parsedDate && isValid(parsedDate) ? (
            format(parsedDate, "PPPP", { locale: cs })
          ) : (
            <span>Zvolte datum</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={(date) => {
            field.onChange(date ? format(date, "yyyy-MM-dd") : "")
            setOpen(false)
          }}
          startMonth={new Date(min)}
          disabled={[{ before: min }, { after: max }, { dayOfWeek: [0, 6] }]}
          locale={cs}
          weekStartsOn={1} // optional if you need Monday as first day
          hideNavigation
        />
      </PopoverContent>
    </Popover>
  );
}
