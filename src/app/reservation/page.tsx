import Container from "@/components/container";
import Form from "../components/Form/Form";
import HeadingUnderline from "@/components/headingUnderline";

export default function ReservationPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold text-center mb-4">Vytvořit rezervaci</h1>
      <HeadingUnderline />
      <Form />
    </Container>
  );
}
