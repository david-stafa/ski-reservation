import Container from "@/components/container";

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="min-h-screen flex justify-center items-center">
      {children}
    </Container>
  );
}
