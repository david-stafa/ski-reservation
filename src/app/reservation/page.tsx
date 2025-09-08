import Container from "@/components/container";

import HeadingUnderline from "@/components/headingUnderline";
import Form from "@/components/reservationForm/Form";

export default function ReservationPage() {
  return (
    <Container className="max-w-2xl p-5 border-zinc-200 md:border rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Vytvořit rezervaci
      </h1>
      <HeadingUnderline />
      <Form />
    </Container>
  );
}
