import ServerSessionProvider from "@/components/Context/ServerSessionProvider";
import MainDashboard from "@/components/MainDashboard";

export default async function Home() {
  return (
    <>
      <ServerSessionProvider>
        <MainDashboard />
      </ServerSessionProvider>
    </>
  );
}
