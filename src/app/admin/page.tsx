import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import Link from "next/link";

const ADMIN_DAYS_CONFIG = [
  {
    key: "2025-09-15",
    label: "Pondělí",
    color: "bg-blue-50 text-blue-500",
  },
  {
    key: "2025-09-16",
    label: "Úterý",
    color: "bg-green-50 text-green-500",
  },
  {
    key: "2025-09-17",
    label: "Středa",
    color: "bg-yellow-50 text-yellow-500",
  },
  {
    key: "2025-09-18",
    label: "Čtvrtek",
    color: "bg-purple-50 text-purple-500",
  },
  {
    key: "2025-09-19",
    label: "Pátek",
    color: "bg-orange-50 text-orange-500",
  },
];

const AdminPage = () => {
  return (
    <Container>
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin page</h1>
      </div>
      <HeadingUnderline />
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-left">Celoroční sety:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ADMIN_DAYS_CONFIG.map(({ key, label, color }) => (
            <Link
              key={key}
              href={`/admin/reservations/day-sheet?date=${key}`}
              className={`text-lg ${color} font-semibold px-4 rounded-lg py-8`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-left">Tabulky:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href={`/admin/reservations/table`}
            className={`text-lg bg-cyan-50 text-cyan-500 font-semibold rounded-lg px-4 py-8 block w-full`}
          >
            Přehled rezervací
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default AdminPage;
