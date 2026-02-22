import { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SessionProvider } from "@/components/Context/SessionContext"; // client provider

interface ServerSessionProviderProps {
  children: ReactNode;
}

export default async function ServerSessionProvider({
  children,
}: ServerSessionProviderProps) {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    redirect("/auth/login"); // server-side redirect
  }

  // Wrap children in the client context provider
  return <SessionProvider initialSession={session}>{children}</SessionProvider>;
}
