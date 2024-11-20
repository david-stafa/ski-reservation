import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";

interface PeopleInputProps {
  setPeopleCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function PeopleInput({ setPeopleCount }: PeopleInputProps) {
  function handlePeopleClick(peopleCount: number) {
    setPeopleCount(peopleCount);
  }

  return (
    <section>
      <H3>Pro kolik lidi chcete set rezervovat?</H3>
      <PeopleButton numOfPeople={1} handleClick={handlePeopleClick} />
      <PeopleButton numOfPeople={2} handleClick={handlePeopleClick} />
      <PeopleButton numOfPeople={3} handleClick={handlePeopleClick} />
      <PeopleButton numOfPeople={4} handleClick={handlePeopleClick} />
      {/* dodelat dialog pokud uzivatel chce pujcit set pro 5 a vice lidi */}
      <Button type="button" variant="secondary">5+</Button>
    </section>
  );
}

interface PeopleButtonProps {
  numOfPeople: number;
  handleClick: (numOfPeople: number) => void;
}

function PeopleButton({ numOfPeople, handleClick }: PeopleButtonProps) {
  return (
    <Button
      onClick={() => handleClick(numOfPeople)}
      type="button"
      className="mr-2"
      variant="secondary"
    >
      {numOfPeople}
    </Button>
  );
}
