import Container from "@/components/container";
import { ReservationsTableLink } from "./components/ReservationsTableLink";
import { SeasonalReservationsDaily } from "./components/SeasonalReservationsDaily";
import { StandardReservationsWeekly } from "./components/StandardReservationsWeekly";
import { SEASONAL_ENDDATE } from "@/lib/constants";
import { NOW } from "@/lib/utils";

const AdminPage = () => {
  const now = NOW();
  return (
    <Container className="px-5 md:px-0 ">

      <StandardReservationsWeekly />

      {now <= SEASONAL_ENDDATE && <SeasonalReservationsDaily />}

      <ReservationsTableLink />
    </Container>
  );
};

export default AdminPage;
