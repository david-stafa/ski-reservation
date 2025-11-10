import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import { ReservationsTableLink } from "./components/ReservationsTableLink";
import { SeasonalReservationsDaily } from "./components/SeasonalReservationsDaily";
import { StandardReservationsWeekly } from "./components/StandardReservationsWeekly";
import { NOW, SEASONAL_ENDDATE } from "@/lib/constants";

const AdminPage = () => {
  return (
    <Container className="px-5">
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin page</h1>
      </div>
      <HeadingUnderline />

      <StandardReservationsWeekly />

      {NOW <= SEASONAL_ENDDATE && <SeasonalReservationsDaily />}

      <ReservationsTableLink />
    </Container>
  );
};

export default AdminPage;
