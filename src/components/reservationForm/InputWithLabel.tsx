import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegister } from "react-hook-form";
import { ReservationFormValues } from "./Form";

type InputWithLabelProps = {
  name: keyof ReservationFormValues;
  label: string;
  register: UseFormRegister<ReservationFormValues>;
  error: FieldError | undefined;
  type?: React.HTMLInputTypeAttribute;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputWithLabel = ({
  name,
  label,
  register,
  error,
  type = "text",
  ...props
}: InputWithLabelProps) => {
  return (
    <>
      <Label className="mb-2 mt-4" htmlFor={name}>
        {label}
      </Label>
      <Input
        {...register(name)}
        aria-invalid={!!error}
        type={type}
        id={name}
        className=""
        {...props}
        />
        {error && <p className="text-red-500 italic text-sm">{error.message}</p>}
    </>
  );
};
