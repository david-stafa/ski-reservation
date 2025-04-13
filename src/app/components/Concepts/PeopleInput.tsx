import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";

interface PeopleInputProps {
  setSelectedPeopleCount: React.Dispatch<React.SetStateAction<number>>;
  selectedPeopleCount: number;
}

export default function PeopleInput({
  setSelectedPeopleCount,
  selectedPeopleCount,
}: PeopleInputProps) {
  
  function handlePeopleClick(peopleCount: number) {
    setSelectedPeopleCount(peopleCount);
  }

  return (
    <section>
      <H3>Pro kolik lidi chcete set rezervovat?</H3>
      <PeopleButton
        numOfPeople={1}
        handleClick={handlePeopleClick}
        selectedPeopleCount={selectedPeopleCount}
      />
      <PeopleButton
        numOfPeople={2}
        handleClick={handlePeopleClick}
        selectedPeopleCount={selectedPeopleCount}
      />
      <PeopleButton
        numOfPeople={3}
        handleClick={handlePeopleClick}
        selectedPeopleCount={selectedPeopleCount}
      />
      <PeopleButton
        numOfPeople={4}
        handleClick={handlePeopleClick}
        selectedPeopleCount={selectedPeopleCount}
      />
      <input
        type="number"
        name="peopleCount"
        id="peopleCount"
        value={selectedPeopleCount || 0}
        readOnly
        hidden
      />
      {/* dodelat dialog pokud uzivatel chce pujcit set pro 5 a vice lidi */}
      <Button type="button" variant="secondary">
        5+
      </Button>
    </section>
  );
}

interface PeopleButtonProps {
  numOfPeople: number;
  handleClick: (numOfPeople: number) => void;
  selectedPeopleCount: number;
}

function PeopleButton({
  numOfPeople,
  handleClick,
  selectedPeopleCount,
}: PeopleButtonProps) {
  return (
    <Button
      onClick={() => handleClick(numOfPeople)}
      type="button"
      className="mr-2"
      variant={selectedPeopleCount === numOfPeople ? "default" : "secondary"}
      name="peopleCount"
    >
      {numOfPeople}
    </Button>
  );
}
