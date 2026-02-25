import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function requireAuth() {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    return {
      session: null,
      error: new Response("Unauthorized", { status: 401 }),
    };
  }

  return { session, error: null };
}
