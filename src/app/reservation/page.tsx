import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import Form from "@/components/reservationForm/Form";
import { getCachedSumOfReservations } from "../_actions/reservation/reservationActions";
import { SKI_SETS_LIMIT } from "@/lib/constants";

export default async function ReservationPage() {
  const reservations = await getCachedSumOfReservations();

  // if the limit of reservation is reached, return this component
  if (reservations._total >= SKI_SETS_LIMIT) {
    return (
      <Container className="max-w-2xl p-5 md:m-5 border-zinc-200 md:border rounded-lg md:shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Celoroční sety jsou na tuto sezónu vyprodány.
        </h1>
        <h2 className="text-center">Těšíme se na vás v příští sezóně!</h2>
      </Container>
    );
  }

  // base component with the form
  return (
    <Container className="max-w-2xl p-5 md:m-5 border-zinc-200 md:border rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Vytvořit rezervaci
      </h1>
      <HeadingUnderline />
      <Form />
    </Container>
  );
}
