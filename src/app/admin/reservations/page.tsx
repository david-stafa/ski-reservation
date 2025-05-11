import { getAllReservations } from "@/app/_actions/reservationActions";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Container from "@/components/container";

const Reservations = async () => {
  const reservations = await getAllReservations();

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
