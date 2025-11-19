"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import { cn, COLOR_CLASSES, NOW } from "@/lib/utils";
import { STANDARD_ENDDATE, WeekDay } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const excludedDays = [WeekDay.SUNDAY, WeekDay.THURSDAY];

export const StandardReservationsWeekly = () => {
  const now = NOW();
  const [currentWeek, setCurrentWeek] = useState<DateTime>(now);
  const startOfWeek = currentWeek.startOf("week");
  const endOfWeek = startOfWeek.endOf("week");

  const handlePreviousWeek = () =>
    setCurrentWeek((prev) => prev.minus({ weeks: 1 }));
  const handleNextWeek = () =>
    setCurrentWeek((prev) => prev.plus({ weeks: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, index) =>
    startOfWeek.plus({ days: index })
  ).filter((date) => !excludedDays.includes(date.weekday));

  return (
    <section className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-left">Standartní výpůjčky:</h3>

      <div className="flex items-center gap-4 mb-4 w-full">
        <Button
          variant="ghost"
          onClick={handlePreviousWeek}
          disabled={startOfWeek.minus({ weeks: 1 }) < now.startOf("week")}
        >
          <ArrowLeftIcon className="size-7 cursor-pointer bg-blue-600 rounded-full text-white p-0.5" />
        </Button>
        <span className="text-lg font-semibold flex-grow text-center">
          {startOfWeek.toFormat("dd.MM.yyyy")} -{" "}
          {endOfWeek.toFormat("dd.MM.yyyy")}
        </span>
        <Button
          variant="ghost"
          onClick={handleNextWeek}
          disabled={endOfWeek >= STANDARD_ENDDATE}
        >
          <ArrowRightIcon className="size-7 cursor-pointer bg-blue-600 rounded-full text-white p-0.5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {weekDays.map((date, index) => {
          const dateKey = date.toFormat("yyyy-MM-dd");
          const dayName = capitalizeFirstLetter(
            date.setLocale("cs").toFormat("EEEE")
          );
          const colorClasses =
            COLOR_CLASSES[index as keyof typeof COLOR_CLASSES];
          const isToday = date.day === now.day;

          return (
            <Link
              href={`/admin/reservations/day-sheet?date=${dateKey}`}
              key={dateKey}
              className={cn(
                `md:text-lg ${colorClasses.bg} ${colorClasses.text} font-semibold px-4 rounded-lg md:py-8 py-4 hover:opacity-80 transition-opacity`,
                isToday && `border-2 ${colorClasses.border}`
              )}
            >
              {dayName}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
