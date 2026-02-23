import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (session) {
    redirect("/"); // only redirects if session is VALID
  }

  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
