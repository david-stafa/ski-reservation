import AvailabilityDisplay from "@/components/landingPage/AvailabilityDisplay";
import LPHeader from "@/components/landingPage/LPHeader";
import SeasonalSetsInfo from "@/components/landingPage/SeasonalSetsInfo";
import StandartReservationInfo from "@/components/landingPage/StandartReservationInfo";
import Container from "../components/container";

export default async function Home() {
  return (
    // TODO: h-[100dvh] is not supported on older browsers - find some fallback or something
    <Container className="p-5 flex flex-col h-[100dvh] justify-between md:justify-center w-full gap-8 xl:gap-12 relative max-w-2xl">
      {/* Landing Page Header */}
      <LPHeader />

      {/* Seasonal Sets Info */}
      <SeasonalSetsInfo />

      {/* Standard Reservation Info */}
      <StandartReservationInfo />

      {/* Display daily availability status of each day in the next two weeks */}
      <AvailabilityDisplay />
    </Container>
  );
}
