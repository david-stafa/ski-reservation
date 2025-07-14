import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputWithLabelProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  type?: React.HTMLInputTypeAttribute;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputWithLabel = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  type = "text",
  ...props
}: InputWithLabelProps<T>) => {
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