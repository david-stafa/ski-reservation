import { deleteReservation } from "@/app/_actions/reservation/formActions";
import { getReservationById } from "@/app/_actions/reservation/reservationActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteReservationButton } from "./components/DeleteReservationButton";
import { format } from "date-fns";

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ReservationDetailPage = async ({
  params,
}: ReservationDetailPageProps) => {
  const { id } = await params;
  const reservation = await getReservationById(id);
  console.log(reservation);

  if (!reservation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-8">  
        <div className="text-xl font-semibold">
          Rezervace nenalezena
        </div>
        <Link href={`/`}>
          <Button variant="default">Vrátit se na domovskou stránku</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        Detail vaší rezervace
      </h1>
      <div className="space-y-3 mb-8">
        <DetailComponent>
          <span className="text-zinc-500">Jméno:</span>{" "}
          <span className="font-medium">
            {reservation.firstName} {reservation.lastName}
          </span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Email:</span>{" "}
          <span className="font-medium">{reservation.email}</span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Telefon:</span>{" "}
          <span className="font-medium">{reservation.phone}</span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Počet osob:</span>{" "}
          <span className="font-medium">{reservation.peopleCount}</span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Datum rezervace:</span>{" "}
          <span className="font-medium">
            {format(reservation.startDate, "dd.MM.yyyy")}
          </span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Čas rezervace:</span>{" "}
          <span className="font-medium">
            {format(reservation.startDate, "HH:mm")} -{" "}
            {format(reservation.endDate, "HH:mm")}
          </span>
        </DetailComponent>
      </div>
      <div className="flex gap-4 justify-center">
        <Link href={`/reservation/${id}/edit`}>
          <Button variant="default">Upravit rezervaci</Button>
        </Link>
        <DeleteReservationButton id={id} />
      </div>
    </div>
  );
};

export default ReservationDetailPage;

const DetailComponent = ({ children }: { children: React.ReactNode }) => {
  return <p className="mb-1 text-base flex items-center gap-2">{children}</p>;
};
