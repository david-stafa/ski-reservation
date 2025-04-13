import Container from "../components/container";
import { getSumOfReservations } from "./_actions/reservationActions";
import { ModeToggle } from "@/components/modeToggle";

export default async function Home() {

  // Fetch data from the server
  const reservations = await getSumOfReservations();

  return (
    <Container>
      <Container>
        <h1 className="font-bold text-3xl text-center flex-1">
          Rezervace celoročních setů
        </h1>
        <ModeToggle />
        <div>Celkem vytvořených rezervací: {reservations}</div>
      </Container>
    </Container>
  );
}
