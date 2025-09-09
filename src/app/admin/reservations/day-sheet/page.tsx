import { getReservationsByDate } from "@/app/_actions/reservation/reservationActions";
import Container from "@/components/container";
import AttendanceButtons from "@/components/admin/AttendanceButtons";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";

export default async function DaySheet({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
  label: string;
}) {
  const { date } = await searchParams;
  const reservations = await getReservationsByDate(date);

  return (
    <Container className="p-5">
      <h1 className="text-2xl font-bold mb-8">
        {DateTime.fromISO(date, { zone: "Europe/Prague" })
          .setLocale("cs")
          .toFormat("cccc")
          .toUpperCase()}
        ,{" "}
        {DateTime.fromISO(date, { zone: "Europe/Prague" })
          .setLocale("cs")
          .toFormat("dd.M.")}
      </h1>

      {/* Mobile cards (visible on small screens) */}
      <div className="md:hidden space-y-3">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className={cn(
              "border border-gray-200 rounded-lg bg-white shadow-sm p-4",
              reservation.attended === true && " bg-green-50",
              reservation.attended === false && " bg-red-50"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-base font-semibold text-gray-800">
                {DateTime.fromJSDate(reservation.startDate, {
                  zone: "Europe/Prague",
                }).toFormat("HH:mm")}{" "}
                -{" "}
                {DateTime.fromJSDate(reservation.endDate, {
                  zone: "Europe/Prague",
                }).toFormat("HH:mm")}
              </div>
              <AttendanceButtons
                reservationId={reservation.id}
                attended={reservation.attended}
              />
            </div>

            <div className="mt-3 text-sm flex justify-between">
              <div>
                <div className="text-gray-700 font-medium mb-1">
                  {reservation.firstName} {reservation.lastName}
                </div>
                <div className="text-gray-600">
                  <a
                    href={`tel:${reservation.phone}`}
                    className="hover:underline"
                  >
                    {reservation.phone}
                  </a>
                </div>
              </div>
              <div className="text-gray-600 mt-auto">
                Počet osob: {reservation.peopleCount}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
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
