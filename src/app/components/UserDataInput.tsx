import H3 from "@/components/h3";
import { Input } from "@/components/ui/input";
import {
  ErrorType,
  ReservationType,
  SetReservationType,
} from "@/lib/types/types";
import { Label } from "@radix-ui/react-label";

interface UserDataInputProps {
  reservation: ReservationType;
  setReservation: SetReservationType;
  error: ErrorType;
}

export default function UserDataInput({
  reservation,
  setReservation,
  error,
}: UserDataInputProps) {
  return (
    <section>
      <H3>Vyplňte osobní údaje:</H3>
      <div className="flex gap-2">
        <span className="grow">
          {error?.firstName && (
            <div className="text-destructive">{error.firstName}</div>
          )}
          <Label htmlFor="firstName">Jméno:</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            onChange={(e) =>
              setReservation({
                ...reservation,
                firstName: e.target.value,
              })
            }
            defaultValue="David"
          />
        </span>
        <span className="grow">
          {error?.lastName && (
            <div className="text-destructive">{error.lastName}</div>
          )}
          <Label htmlFor="lastName">Příjmení:</Label>
          <Input
            name="lastName"
            id="lastName"
            type="text"
            onChange={(e) =>
              setReservation({
                ...reservation,
                lastName: e.target.value,
              })
            }
            defaultValue="Test"
          />
        </span>
      </div>
      {error?.email && <div className="text-destructive">{error.email}</div>}
      <Label htmlFor="email">Email:</Label>
      <Input
        id="email"
        name="email"
        type="email"
        onChange={(e) =>
          setReservation({
            ...reservation,
            email: e.target.value,
          })
        }
        defaultValue="d@s.cz"
      />
      {error?.phone && <div className="text-destructive">{error.phone}</div>}
      <Label htmlFor="phone">Telefon:</Label>
      <Input
        type="tel"
        name="phone"
        id="phone"
        onChange={(e) =>
          setReservation({
            ...reservation,
            phone: e.target.value,
          })
        }
        defaultValue="123 456 987"
      />
    </section>
  );
}
