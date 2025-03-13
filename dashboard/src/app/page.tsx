// import Dashboard from "@/components/common/dashboard";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  // redirect to dashboard
  redirect("/dashboard");
  return (
    // <Dashboard/>
    // login in or redirect to dashboard
    <div>
      <p>Login or redirect to dashboard</p>
    </div>

  );
}
