import { getReservationById } from "@/app/_actions/reservation/reservationActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteReservationButton } from "./components/DeleteReservationButton";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  TimerIcon,
  UserIcon,
} from "lucide-react";
import { PhoneIcon } from "lucide-react";
import { UsersIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import HeadingUnderline from "@/components/headingUnderline";
import Container from "@/components/container";
import { SINGLE_RESERVATION_DURATION } from "@/lib/constants";

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ReservationDetailPage = async ({
  params,
}: ReservationDetailPageProps) => {
  const { id } = await params;
  const reservation = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 10000)); test loading
    const data = await getReservationById(id);

    if (!data) {
      return null;
    }

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
    <Container className="max-w-3xl p-5 rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">
        Detail vaší rezervace
      </h1>
      <HeadingUnderline />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <DetailComponent
          icon={<CalendarIcon className="w-5 h-5" />}
          label="Datum rezervace:"
          value={reservationData.startDate}
        />

        <DetailComponent
          icon={<ClockIcon className="w-5 h-5" />}
          label="Začátek rezervace:"
          value={`${reservationData.startTime}`}
        />

        <DetailComponent
          icon={<UserIcon className="w-5 h-5" />}
          label="Jméno:"
          value={`${reservationData.firstName} ${reservationData.lastName}`}
        />

        <DetailComponent
          icon={<MailIcon className="w-5 h-5" />}
          label="Email:"
          value={reservationData.email}
        />

        <DetailComponent
          icon={<PhoneIcon className="w-5 h-5" />}
          label="Telefon:"
          value={reservationData.phone}
        />

        <DetailComponent
          icon={<UsersIcon className="w-5 h-5" />}
          label="Počet osob:"
          value={reservationData.peopleCount}
        />

        <DetailComponent
          icon={<TimerIcon className="w-5 h-5" />}
          label="Přibližná doba rezervace:"
          value={`${reservationData.peopleCount * SINGLE_RESERVATION_DURATION} minut`}
        />
      </div>
      <Separator className="mb-8" />
      <div className="flex gap-4 justify-center">
        <Link href={`/reservation/${id}/edit`}>
          <Button variant="default">Upravit rezervaci</Button>
        </Link>
        <DeleteReservationButton id={id} />
      </div>
    </Container>
  );
};

export default ReservationDetailPage;

type DetailComponentProps = React.HTMLAttributes<HTMLParagraphElement> & {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const DetailComponent = ({
  icon,
  label,
  value,
  className,
}: DetailComponentProps) => {
  return (
    <div
      className={cn(
        "mb-1 flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-md p-4",
        className
      )}
    >
      {icon}
      <div className="ml-2 flex flex-col">
        <span className="text-sm font-medium text-zinc-500">{label}</span>
        <span className="text-base md:text-lg font-semibold">{value}</span>
      </div>
    </div>
  );
};
