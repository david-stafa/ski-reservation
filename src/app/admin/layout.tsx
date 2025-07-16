import { LogOutButton } from "@/components/auth/logout/logOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="mx-auto p-5 bg-blue-100">
        <div className="container flex items-center gap-2 mx-auto justify-between px-5">
            <Link href="/admin">
              <Button size="sm">
                Domů
              </Button>
            </Link>
            <LogOutButton />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default AdminLayout;
