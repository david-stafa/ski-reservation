import { LogOutButton } from "@/components/auth/logout/logOutButton";
import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";

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
        <h3>Celoroční sety</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 text-blue-500 p-4 rounded-lg">Všechny rezervace</div>
        </div>
        
      </section>
    </Container>
  );
};

export default AdminPage;
