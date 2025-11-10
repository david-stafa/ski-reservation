import Link from "next/link";

export const ReservationsTableLink = () => {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-left">Tabulky:</h3>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <Link
          href={`/admin/reservations/table`}
          className={`md:text-lg bg-cyan-50 text-cyan-500 font-semibold rounded-lg px-4 md:py-8 py-4 block w-full`}
        >
          Přehled rezervací
        </Link>
      </div>
    </section>
  );
};
