"use client";


import { updateAttendance } from "@/app/_actions/reservation/reservationActions";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AttendanceButtonsProps {
  reservationId: string;
  attended: boolean | null;
}

export default function AttendanceButtons({ 
  reservationId, 
  attended 
}: AttendanceButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAttendanceUpdate = async (attended: boolean) => {
    setIsLoading(true);
    try {
      await updateAttendance(reservationId, attended);
    } catch (error) {
      console.error("Failed to update attendance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleAttendanceUpdate(true)}
        disabled={isLoading || attended === true}
        className={cn(`px-3 py-1 text-sm rounded cursor-pointer ${
          attended === true
            ? "bg-green-500 text-white !cursor-not-allowed"
            : attended === false
            ? "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            : "bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
        }`)}
      >
        Ano
      </button>
      <button
        onClick={() => handleAttendanceUpdate(false)}
        disabled={isLoading || attended === false}
        className={`px-3 py-1 text-sm rounded cursor-pointer ${
          attended === false
            ? "bg-red-500 text-white !cursor-not-allowed"
            : attended === true
            ? "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            : "bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
        }`}
      >
        Ne
      </button>
    </div>
  );
} 