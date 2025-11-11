"use client";

import {
  createSeasonalReservation,
  updateSeasonalReservation,
} from "@/app/_actions/seasonalReservation/seasonalFormActions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SEASONAL_ENDDATE, SEASONAL_HOLIDAYS, SEASONAL_STARTDATE } from "@/lib/constants";
import { SeasonalReservationSchema } from "@/lib/types/seasonalReservationTypes";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DatePicker } from "../DatePicker";
import { InputWithLabel } from "../InputWithLabel";
import { SuccessModal } from "../SuccessModal";
import SeasonalTimeInput from "./SeasonalTimeInput";

/* Type containing all form fields for reservation */
export type SeasonalReservationFormValues = {
  email: string;
  phone: string;
  date: string;
  peopleCount: number;
  firstName: string;
  lastName: string;
  time: string;
  isSeasonal: boolean;
};

const SeasonalReservationForm = ({
  reservationId,
  formFields,
}: {
  reservationId?: string;
  formFields?: SeasonalReservationFormValues | null;
}) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    reservationId: "",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SeasonalReservationSchema),
    defaultValues: {
      firstName: formFields?.firstName ?? "",
      lastName: formFields?.lastName ?? "",
      date: formFields?.date ?? "",
      time: formFields?.time ?? "",
      email: formFields?.email ?? "",
      phone: formFields?.phone ?? "",
      peopleCount: formFields?.peopleCount ?? 1,
      isSeasonal: true,
    },
    mode: "onBlur",
  });

  const onSubmitForm: SubmitHandler<SeasonalReservationSchema> = async (data) => {
    let res;
    try {
      if (reservationId) {
        res = await updateSeasonalReservation(null, data, reservationId);
      } else {
        res = await createSeasonalReservation(null, data);
      }

      // Show error messages if response is not successful
      if (!res.success) {
        for (const [field, messages] of Object.entries(res.error)) {
          setError("root", {
            type: "server",
            message: "Něco se pokazilo, zkuste to znovu později.",
          });
          setError(field as keyof SeasonalReservationSchema | "root", {
            type: "server",
            message: messages[0],
          });
        }
        throw new Error("Could not create reservation");
      }

      if (res.success) {
        reset();
        setModalState({
          isOpen: true,
          reservationId: res.reservationId,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="max-w-lg mx-auto flex flex-col"
      >
        <Label htmlFor="peopleCount" className="mt-4 mb-2">
          Počet osob (lyžařských setů)
        </Label>
        <Controller
          name="peopleCount"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(Number(value))} // Convert to number
              value={field.value?.toString()} // Ensure correct display
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vyberte počet osob" />
              </SelectTrigger>
              <SelectContent id="peopleCount">
                <SelectGroup>
                  <SelectLabel>Počet osob</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <Label htmlFor="date" className="mt-4 mb-2">
          Datum
        </Label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              min={SEASONAL_STARTDATE.toJSDate()}
              max={SEASONAL_ENDDATE.toJSDate()}
              disabledDays={[0, 6]}
              hideNavigation={true}
              field={field}
              holidays={SEASONAL_HOLIDAYS}
            />
          )}
        />
        {errors.date && (
          <p className="text-red-500 italic text-sm">{errors.date.message}</p>
        )}

        <SeasonalTimeInput
          register={register}
          date={watch("date")}
          peopleCount={watch("peopleCount")}
          error={errors.time}
          setValue={setValue}
          reservationTime={
            watch("date") === formFields?.date && formFields?.time
              ? (formFields?.time as `${number}:${number}:${number}`)
              : undefined
          }
          reservationPeopleCount={formFields?.peopleCount}
        />

        <InputWithLabel
          name="firstName"
          label="Jméno"
          error={errors.firstName}
          type="text"
          register={register}
        />

        <InputWithLabel
          name="lastName"
          label="Příjmení"
          error={errors.lastName}
          type="text"
          register={register}
        />

        <InputWithLabel
          name="email"
          label="Email"
          error={errors.email}
          type="email"
          register={register}
        />

        <InputWithLabel
          name="phone"
          label="Telefon"
          error={errors.phone}
          type="string"
          register={register}
        />

        <Button
          className={cn("mt-8 w-full max-w-3xs mx-auto")}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Odeslání..." : "Odeslat"}
        </Button>
      </form>

      <SuccessModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, reservationId: "" })}
        path={`/seasonal-reservation/${modalState.reservationId}`}
        isEdditing={!!reservationId}
      />
    </>
  );
};

export default SeasonalReservationForm;
