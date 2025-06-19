import Container from "@/components/container";
import Form from "../components/Form/Form";
import HeadingUnderline from "@/components/headingUnderline";

export default function ReservationPage() {
  return (
    <Container className="max-w-2xl md:mt-12 md:p-12 border-zinc-200 border rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Vytvořit rezervaci</h1>
      <HeadingUnderline />
      <Form />
    </Container>
  );
}
