"use client";

import {
  createReservation,
  updateReservation,
} from "@/app/_actions/reservation/formActions";
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
import { ENDDATE, STARTDATE } from "@/lib/constants";
import { ReservationSchema } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InputWithLabel } from "./InputWithLabel";
import TimeInput from "./TimeInput";
import { DatePicker } from "./DatePicker";
import { SuccessModal } from "./SuccessModal";
import { useState } from "react";

/* Type containing all form fields for reservation */
export type ReservationFormValues = {
  email: string;
  phone: string;
  date: string;
  peopleCount: number;
  firstName: string;
  lastName: string;
  time: string;
};

const Form = ({
  reservationId,
  formFields,
}: {
  reservationId?: string;
  formFields?: ReservationFormValues | null;
}) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    path: "",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      firstName: formFields?.firstName ?? "",
      lastName: formFields?.lastName ?? "",
      date: formFields?.date ?? "",
      time: formFields?.time ?? "",
      email: formFields?.email ?? "asd@ase.cy",
      phone: formFields?.phone ?? "123 456 789",
      peopleCount: formFields?.peopleCount ?? 1,
    },
    mode: "onBlur",
  });

  const onSubmitForm: SubmitHandler<ReservationSchema> = async (data) => {
    let res;
    try {
      if (reservationId) {
        res = await updateReservation(null, data, reservationId);
      } else {
        res = await createReservation(null, data);
      }

      // Show error messages if response is not successful
      if (!res.success) {
        for (const [field, messages] of Object.entries(res.error)) {
          setError("root", {
            type: "server",
            message: "Něco se pokazilo, zkuste to znovu později.",
          });
          setError(field as keyof ReservationSchema | "root", {
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
          path: res.redirectUrl,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  console.log(getValues());

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
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

        <Label htmlFor="peopleCount" className="mt-4 mb-2">
          Počet lidí
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
                <SelectValue placeholder="Vyberte počet lidí" />
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
              min={new Date(STARTDATE)}
              max={new Date(ENDDATE)}
              field={field}
            />
          )}
        />
        {errors.date && (
          <p className="text-red-500 italic text-sm">{errors.date.message}</p>
        )}

        <TimeInput
          register={register}
          date={watch("date")}
          peopleCount={watch("peopleCount")}
          error={errors.time}
          setValue={setValue}
          reservationTime={formFields?.time}
          reservationPeopleCount={formFields?.peopleCount}
        />

        <Button
          className={cn("mt-8 w-full")}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Odeslání..." : "Odeslat"}
        </Button>
      </form>

      <SuccessModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, path: "" })}
        path={modalState.path}
        isEdditing={!!reservationId}
      />
    </>
  );
};

export default Form;
