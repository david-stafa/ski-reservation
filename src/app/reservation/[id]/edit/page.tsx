import { getReservationById } from "@/app/_actions/reservation/reservationActions";
import Form, { ReservationFormValues } from "@/app/components/Form/Form";
import { format } from "date-fns";

type ReservationEditPageProps = {
  params: Promise<{ id: string }>;
};

const ReservationEditPage = async ({ params }: ReservationEditPageProps) => {
  const { id } = await params;

  const reservationData = await getReservationById(id);

  if (!reservationData) {
    return <div>Reservation not found</div>;
  }

  const formData: ReservationFormValues = {
    email: reservationData.email,
    phone: reservationData.phone,
    date: format(reservationData.startDate, "yyyy-MM-dd"),
    peopleCount: reservationData.peopleCount,
    firstName: reservationData.firstName,
    lastName: reservationData.lastName,
    time: format(reservationData.startDate, "HH:mm:ss"),
  };

  return (
    <div className="max-w-3xl my-auto md:mt-12 md:p-6 bg-white rounded-lg md:shadow-md ">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">
        Upravit rezervaci
      </h1>
      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-8" />

      <Form reservationId={id} formFields={formData} />
    </div>
  );
};
export default ReservationEditPage;
