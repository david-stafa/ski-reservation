"use client";

import { createReservation } from "@/app/_actions/formActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ReservationSchema } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TimeInput from "./TimeInput";

const [STARTDATE, ENDDATE] = ["2025-03-24", "2025-03-30"];

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    // getValues,
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
  });

  const onSubmitForm: SubmitHandler<ReservationSchema> = async (data) => {
    const res = await createReservation(null, data);

    console.log(res);

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
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Label htmlFor="firstName">Jméno</Label>
      <Input
        {...register("firstName")}
        aria-invalid={errors.firstName ? "true" : "false"}
        type="text"
        id="firstName"
      />
      {errors.firstName && (
        <p className="text-red-500">{errors.firstName.message}</p>
      )}

      <Label htmlFor="lastName">Příjmení</Label>
      <Input
        {...register("lastName")}
        aria-invalid={errors.lastName ? "true" : "false"}
        type="text"
        id="lastName"
      />
      {errors.lastName && (
        <p className="text-red-500">{errors.lastName.message}</p>
      )}

      <Label htmlFor="email">Email</Label>
      <Input
        {...register("email")}
        aria-invalid={errors.email ? "true" : "false"}
        type="email"
        id="email"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Label htmlFor="phone">Telefon</Label>
      <Input
        {...register("phone")}
        aria-invalid={errors.phone ? "true" : "false"}
        type="string"
        id="phone"

      />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      <Controller
        name="peopleCount"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(Number(value))} // Convert to number
            value={field.value?.toString()} // Ensure correct display
          >
            <SelectTrigger className="w-[180px] mt-2">
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
      {errors.peopleCount && (
        <p className="text-red-500">{errors.peopleCount.message}</p>
      )}

      <Label htmlFor="date">Datum</Label>
      <Input
        {...register("date")}
        aria-invalid={errors.date ? "true" : "false"}
        type="date"
        id="date"
        min={STARTDATE}
        max={ENDDATE}
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}


      <Label htmlFor="date">Čas</Label>
      <TimeInput
        register={register}
        date={watch("date")}
        peopleCount={watch("peopleCount")}
        error={errors.time}
        setValue={setValue}
      />

      <Button
        className={cn("mt-2", { "bg-red-500": isSubmitting })}
        type="submit"
      >
        Odeslat
      </Button>
    </form>
  );
};

export default Form;
