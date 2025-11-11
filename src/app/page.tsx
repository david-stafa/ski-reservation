import AvailabilityDisplay from "@/components/landingPage/AvailabilityDisplay";
import LPHeader from "@/components/landingPage/LPHeader";
import OffSeasonLP from "@/components/landingPage/OffSeasonLP";
import { ReservationInfoComponents } from "@/components/landingPage/ReservationInfoComponents";
import { NOW, STANDARD_ENDDATE } from "@/lib/constants";
import Container from "../components/container";

export default async function Home() {
  if (NOW >= STANDARD_ENDDATE) {
    return (
      <Container className="p-5 flex flex-col h-[100dvh] justify-center md:justify-center w-full gap-6 xl:gap-12 relative max-w-2xl">
        <OffSeasonLP />
      </Container>
    );
  }

  return (
    // TODO: h-[100dvh] is not supported on older browsers - find some fallback or something
    <Container className="p-5 flex flex-col h-[100dvh] justify-between md:justify-center w-full gap-8 xl:gap-12 relative max-w-2xl">
      {/* Landing Page Header */}
      <LPHeader />

      {/* Display reservation info components in correct order */}
      <ReservationInfoComponents />

      {/* Display daily availability status of each day in the next two weeks */}
      <AvailabilityDisplay />
    </Container>
  );
}
