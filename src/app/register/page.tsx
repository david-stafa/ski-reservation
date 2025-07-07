import Container from "@/components/container";
import HeadingUnderline from "@/components/headingUnderline";
import { SignupForm } from "@/components/auth/signupForm/signupForm";

const Register = () => {
  return (
    <Container className="max-w-2xl md:mt-12 md:p-12  border-zinc-200 md:border rounded-lg md:shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Registrace</h1>
      <HeadingUnderline />
      <SignupForm />
    </Container>
  );
};

export default Register;
