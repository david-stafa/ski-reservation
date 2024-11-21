import H3 from "@/components/h3";
import { Input } from "@/components/ui/input";
import { ReservationType, SetReservationType } from "@/lib/types";
import { Label } from "@radix-ui/react-label";

interface UserDataInputProps {
  reservation: ReservationType;
  setReservation: SetReservationType;
}

export default function UserDataInput({
  reservation,
  setReservation,
}: UserDataInputProps) {
  return (
    <section>
      <H3>Vyplňte osobní údaje:</H3>
      <div className="flex gap-2">
        <span className="grow">
          <Label htmlFor="firstName">Jméno:</Label>
          <Input
            id="firstName"
            type="text"
            onChange={(e) =>
              setReservation({
                ...reservation,
                firstName: e.target.value,
              })
            }
          />
        </span>
        <span className="grow">
          <Label htmlFor="lastName">Příjmení:</Label>
          <Input
            id="lastName"
            type="text"
            onChange={(e) =>
              setReservation({
                ...reservation,
                lastName: e.target.value,
              })
            }
          />
        </span>
      </div>
      <Label htmlFor="email">Email:</Label>
      <Input
        id="email"
        type="email"
        onChange={(e) =>
          setReservation({
            ...reservation,
            email: e.target.value,
          })
        }
      />
      <Label htmlFor="phone">Telefon:</Label>
      <Input
        type="tel"
        id="phone"
        onChange={(e) =>
          setReservation({
            ...reservation,
            phone: e.target.value,
          })
        }
      />
    </section>
  );
}
