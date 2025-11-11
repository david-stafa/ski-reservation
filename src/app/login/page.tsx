import { LoginForm } from "@/components/auth/loginForm/loginForm";
import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await getUser();

  if (user) {
    redirect("/admin/reservations");
  }

  return (
    <Container className="max-w-2xl md:mt-12 p-5 md:p-12 border-zinc-200 md:border rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Přihlášení</h1>
      <HeadingUnderline />
      <LoginForm />
    </Container>
  );
}
