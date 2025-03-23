import Container from "../components/container";
import Form from "./components/Form/Form";
import { ModeToggle } from "@/components/modeToggle";

export default function Home() {
  return (
    <Container>
      <Container>
        <h1 className="font-bold text-3xl text-center flex-1">
          Rezervace celoročních setů
        </h1>
        <ModeToggle />
      </Container>
      {/* <Form /> */}
      <Form />
    </Container>
  );
}
