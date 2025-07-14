import { getCachedAllReservations } from "@/app/_actions/reservation/reservationActions";
import { LogOutButton } from "@/components/auth/logout/logOutButton";
import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import { getUser } from "@/lib/dal";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const Reservations = async () => {
  const reservations = await getCachedAllReservations();
  const user = await getUser();
  console.log(user);

  return (
    <Container>
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Přehled rezervací
        </h1>
        <LogOutButton />
      </div>
      <HeadingUnderline />
      <div className="container mx-auto pb-10">
        <DataTable columns={columns} data={reservations} />
      </div>
    </Container>
  );
};

export default Reservations;
