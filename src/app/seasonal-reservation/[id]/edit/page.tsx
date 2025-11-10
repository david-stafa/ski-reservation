import { getSeasonalReservationById } from "@/app/_actions/seasonalReservation/seasonalReservationActions";
import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import { ReservationFormValues } from "@/components/reservationForm/ReservationForm";
import SeasonalReservationForm from "@/components/reservationForm/seasonalReservationForm/SeasonalReservationForm";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ReservationEditPageProps = {
  params: Promise<{ id: string }>;
};

const ReservationEditPage = async ({ params }: ReservationEditPageProps) => {
  const { id } = await params;

  const reservationData = await getSeasonalReservationById(id);

  if (!reservationData) {
    return <div>Rezervace nebyla nalezena</div>;
  }

  const formData: ReservationFormValues = {
    email: reservationData.email,
    phone: reservationData.phone,
    date: format(reservationData.startDate, "yyyy-MM-dd"),
    peopleCount: reservationData.peopleCount,
    firstName: reservationData.firstName,
    lastName: reservationData.lastName,
    time: formatInTimeZone(
      reservationData.startDate,
      "Europe/Prague",
      "HH:mm:ss"
    ),
    isSeasonal: true,
  };

  return (
    <Container className="max-w-2xl p-5 md:m-5 rounded-lg md:shadow-md">
      <div className="flex justify-center items-center relative">
        <Link
          href={`/reservation/${id}`}
          className="items-center gap-2 hidden md:flex md:absolute left-2 top-0 hover:bg-blue-50 hover:text-blue-500 transition-colors duration-200 rounded-full p-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Zpět</span>
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Upravit rezervaci
        </h1>
      </div>
      <HeadingUnderline />

      <SeasonalReservationForm reservationId={id} formFields={formData} />
    </Container>
  );
};
export default ReservationEditPage;
