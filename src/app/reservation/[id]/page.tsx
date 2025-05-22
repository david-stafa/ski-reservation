import { getReservationById } from "@/app/_actions/reservation/reservationActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteReservationButton } from "./components/DeleteReservationButton";
import { format } from "date-fns";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ReservationDetailPage = async ({
  params,
}: ReservationDetailPageProps) => {
  const { id } = await params;
  const reservation = async () => {
    const data = await getReservationById(id);
    const formattedData = {
      ...data,
      startDate: DateTime.fromJSDate(data?.startDate, {
        zone: "Europe/Prague",
      }).toFormat("dd.M.yyyy"),
      startTime: DateTime.fromJSDate(data?.startDate, {
        zone: "Europe/Prague",
      }).toFormat("HH:mm"),
      endTime: DateTime.fromJSDate(data?.endDate, {
        zone: "Europe/Prague",
      }).toFormat("HH:mm"),
    };
    return formattedData;
  };
  const reservationData = await reservation();

  if (!reservationData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <div className="text-xl font-semibold">Rezervace nenalezena</div>
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
        <DetailComponent className="text-lg font-semibold">
          <span className="text-zinc-500">Datum rezervace:</span>{" "}
          <span className="font-medium">{reservationData.startDate}</span>
        </DetailComponent>
        <DetailComponent className="text-lg font-semibold">
          <span className="text-zinc-500">Čas rezervace:</span>{" "}
          <span className="font-medium">
            {reservationData.startTime} - {reservationData.endTime}
          </span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Jméno:</span>{" "}
          <span className="font-medium">
            {reservationData.firstName} {reservationData.lastName}
          </span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Email:</span>{" "}
          <span className="font-medium">{reservationData.email}</span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Telefon:</span>{" "}
          <span className="font-medium">{reservationData.phone}</span>
        </DetailComponent>
        <DetailComponent>
          <span className="text-zinc-500">Počet osob:</span>{" "}
          <span className="font-medium">{reservationData.peopleCount}</span>
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

type DetailComponentProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

const DetailComponent = ({ children, className }: DetailComponentProps) => {
  return (
    <p className={cn("mb-1 text-base flex items-center gap-2", className)}>
      {children}
    </p>
  );
};
