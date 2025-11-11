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
import { ReservationFormValues } from "./ReservationForm";
import { ControllerRenderProps } from "react-hook-form";
import { DateTime } from "luxon";

type DatePickerProps = {
  min: Date;
  max: Date;
  disabledDays: number[];
  field: ControllerRenderProps<ReservationFormValues, "date">;
  hideNavigation: boolean;
  holidays: {from: DateTime, to: DateTime}[];
  whenToDisableFriday?: DateTime;
};

export function DatePicker({
  min,
  max,
  disabledDays,
  hideNavigation,
  field,
  holidays,
  whenToDisableFriday,
}: DatePickerProps) {
  const parsedDate = field.value ? parseISO(field.value) : undefined;
  const [open, setOpen] = React.useState(false);

  const startMonth =
    DateTime.now().setZone("Europe/Prague").startOf("month") <
    DateTime.fromJSDate(min).startOf("month")
      ? min
      : DateTime.now().setZone("Europe/Prague").startOf("month").toJSDate();

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
            field.onChange(date ? format(date, "yyyy-MM-dd") : "");
            setOpen(false);
          }}
          startMonth={startMonth}
          disabled={[
            { before: min },
            { after: max },
            { dayOfWeek: disabledDays },
            {
              before: DateTime.now()
                .setZone("Europe/Prague")
                .startOf("day")
                .toJSDate(),
            },
            (date: Date) => {
              return !!whenToDisableFriday && date >= whenToDisableFriday.toJSDate() && date.getDay() === 5;
            },
            ...(holidays?.map((holiday) => ({
              from: holiday.from.toJSDate(),
              to: holiday.to.toJSDate(),
            }))),
          ]}
          locale={cs}
          weekStartsOn={1} // optional if you need Monday as first day
          hideNavigation={hideNavigation}
          showOutsideDays={false}
        />
      </PopoverContent>
    </Popover>
  );
}
