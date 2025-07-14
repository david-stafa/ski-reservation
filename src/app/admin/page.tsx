import { LogOutButton } from "@/components/auth/logout/logOutButton";
import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import Link from "next/link";

const AdminPage = () => {
  return (
    <Container>
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin page
        </h1>
        <LogOutButton />
      </div>
      <HeadingUnderline />
      <section>
        <h3 className="text-xl font-bold mb-4 text-left">Celoroční sety:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin/reservations" className="text-lg bg-blue-50 text-blue-500 font-semibold p-4 rounded-lg py-8">Všechny rezervace</Link>
        </div>
      </section>
      {/* TODO: finis printing section */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-left">Připravit pro tisk:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin/reservations" className="text-lg bg-blue-50 text-blue-500 font-semibold p-4 rounded-lg py-8">Všechny rezervace</Link>
        </div>
      </section>
    </Container>
  );
};

export default AdminPage;
