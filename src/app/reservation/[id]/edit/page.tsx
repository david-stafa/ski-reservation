import { getReservationById } from "@/app/_actions/reservation/reservationActions";

import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import Form, { ReservationFormValues } from "@/components/reservationForm/Form";
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
    <Container className="max-w-3xl md:mt-12 md:p-6 rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Upravit rezervaci</h1>
      <HeadingUnderline />

      <Form reservationId={id} formFields={formData} />
    </Container>
  );
};
export default ReservationEditPage;
