import ServerSessionProvider from "@/components/Context/ServerSessionProvider";
import MainDashboard from "@/components/MainDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <>
      <ServerSessionProvider>
        <MainDashboard />
      </ServerSessionProvider>
    </>
  );
}
