import { getCachedAllReservations } from "@/app/_actions/reservation/reservationActions";
import Container from "@/components/container";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const Reservations = async () => {
  const reservations = await getCachedAllReservations();

  return (
    <Container>
      <h1>Reservations</h1>
      <p>This is the reservations page.</p>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={reservations} />
      </div>
    </Container>
  );
};

export default Reservations;
