import { SEASONAL_ENDDATE } from "@/lib/constants";
import { NOW } from "@/lib/utils";
import SeasonalSetsInfo from "./SeasonalSetsInfo";
import StandartReservationInfo from "./StandartReservationInfo";

export const ReservationInfoComponents = () => {
  const now = NOW();
  // Show seasonal info first if within seasonal period, otherwise show standard info first
  const components =
    now <= SEASONAL_ENDDATE
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
