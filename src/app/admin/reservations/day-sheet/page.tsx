import { getReservationsByDate } from "@/app/_actions/reservation/reservationActions";
import Container from "@/components/container";
import AttendanceButtons from "@/components/admin/AttendanceButtons";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";

export default async function DaySheet({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) {
  const { date } = await searchParams;
  const reservations = await getReservationsByDate(date);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-8">
        Pondělí, {DateTime.fromISO(date).toFormat("dd.M.")}
      </h1>

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b border-r border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/6">
                Dorazil/a
              </th>
              <th className="border-b border-r border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
                Čas
              </th>
              <th className="border-b border-r border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                Jméno
              </th>
              <th className="border-b border-r border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
                Telefon
              </th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/6">
                Počet osob
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className={cn(
                  "hover:bg-gray-50 border-b border-gray-200 last:border-b-0",
                  reservation.attended === true && " bg-green-50",
                  reservation.attended === false && " bg-red-50"
                )}
              >
                <td className="border-r border-gray-300 px-4 py-3 text-sm font-medium whitespace-nowrap">
                  <AttendanceButtons
                    reservationId={reservation.id}
                    attended={reservation.attended}
                  />
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-sm font-medium whitespace-nowrap">
                  {DateTime.fromJSDate(reservation.startDate, {
                    zone: "Europe/Prague",
                  }).toFormat("HH:mm")}{" "}
                  -{" "}
                  {DateTime.fromJSDate(reservation.endDate, {
                    zone: "Europe/Prague",
                  }).toFormat("HH:mm")}
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {reservation.firstName} {reservation.lastName}
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-sm whitespace-nowrap">
                  {reservation.phone}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {reservation.peopleCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reservations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Žádné rezervace pro tento den</p>
        </div>
      )}
    </Container>
  );
}
