import { NOW, SEASONAL_ENDDATE } from "@/lib/constants";
import SeasonalSetsInfo from "./SeasonalSetsInfo";
import StandartReservationInfo from "./StandartReservationInfo";

export const ReservationInfoComponents = () => {
  // Show seasonal info first if within seasonal period, otherwise show standard info first
  const components =
    NOW <= SEASONAL_ENDDATE
      ? [
          <SeasonalSetsInfo key="seasonal" />,
          <StandartReservationInfo key="standard" />,
        ]
      : [
          <StandartReservationInfo key="standard" />,
          <SeasonalSetsInfo key="seasonal" />,
        ];

  return components;
};
