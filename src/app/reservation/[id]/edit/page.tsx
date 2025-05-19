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
    <div>
      <h1>Edit Reservation {id}</h1>
      <Form reservationId={id} formFields={formData} />
    </div>
  );
};
export default ReservationEditPage;
