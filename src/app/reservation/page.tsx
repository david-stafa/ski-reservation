import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import Form from "@/components/reservationForm/ReservationForm";

export default async function ReservationPage() {


  // TODO: Add state when the season is over or not started yet

  // base component with the form
  return (
    <Container className="max-w-2xl p-5 md:m-5 border-zinc-200 md:border rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Rezervujte si termín do půjčovny
      </h1>
      <HeadingUnderline />
      <Form />
    </Container>
  );
}
