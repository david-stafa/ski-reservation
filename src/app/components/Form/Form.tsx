"use client";

import { createReservation } from "@/app/_actions/formActions";
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

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      email: "asd@ase.cy",
      phone: "123 456 789",
      date: "",
      peopleCount: 1,
    },
    mode: "onBlur",
  });

  const onSubmitForm: SubmitHandler<ReservationSchema> = async (data) => {
    const res = await createReservation(null, data);

    if (!res.success) {
      for (const [field, messages] of Object.entries(res.error)) {
        setError(field as keyof ReservationSchema | "root", {
          type: "server",
          message: messages[0],
        });
      }
      throw new Error("Could not create reservation");
    }

    if (res.success) reset();
  };

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

        <InputWithLabel
          name="date"
          label="Datum"
          error={errors.date}
          type="date"
          register={register}
          min={STARTDATE}
          max={ENDDATE}
        />

        <TimeInput
          register={register}
          date={watch("date")}
          peopleCount={watch("peopleCount")}
          error={errors.time}
          setValue={setValue}
        />

        <Button
          className={cn("mt-8 w-full", { "bg-red-500": isSubmitting })}
          type="submit"
        >
          Odeslat
        </Button>
      
      </form>
    </>
  );
};

export default Form;
