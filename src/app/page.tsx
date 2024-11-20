import Container from "../components/container";
import { ModeToggle } from "../components/modeToggle";
import Form from "./components/Form";

export default function Home() {
  return (
    <Container>
      <Container className="flex justify-between relative">
        <div className="w-32 h-9 bg-zinc-200 rounded-xl" />
        <h1 className="font-bold text-primary text-3xl text-center dark:text-white">
          Rezervace celoročních setů
        </h1>
        <ModeToggle />
      </Container>
      <Form />
    </Container>
  );
}
