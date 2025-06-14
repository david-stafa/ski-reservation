import Container from "@/components/container";

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="min-h-screen">
      {/* <h1 className="text-center text-lg font-medium my-4">Rezervační formulář</h1> */}
      {children}
    </Container>
  );
}
