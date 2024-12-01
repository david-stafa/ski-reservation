import H3 from "@/components/h3";
import { Input } from "@/components/ui/input";
import { ErrorType } from "@/lib/types/types";
import { Label } from "@radix-ui/react-label";

interface UserDataInputProps {
  error: ErrorType;
}

export default function UserDataInput({ error }: UserDataInputProps) {
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
            defaultValue="Test"
          />
        </span>
      </div>
      {error?.email && <div className="text-destructive">{error.email}</div>}
      <Label htmlFor="email">Email:</Label>
      <Input id="email" name="email" type="email" defaultValue="d@s.cz" />
      {error?.phone && <div className="text-destructive">{error.phone}</div>}
      <Label htmlFor="phone">Telefon:</Label>
      <Input type="tel" name="phone" id="phone" defaultValue="123 456 987" />
    </section>
  );
}

// TODO - finish phone number format
// function phoneNumFormat(telNum:string | undefined){

//   if (telNum == undefined) return

//   let formattedNum: string[] = telNum.split("")

//   if (formattedNum.length == 3) {
//     formattedNum = telNum.split("");
//     formattedNum.push(" ");
//   }

//   console.log(formattedNum);
// }
