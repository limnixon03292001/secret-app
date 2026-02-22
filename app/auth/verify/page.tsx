import SendEmailVerification from "@/components/SendEmailVerification";
import { redirect } from "next/navigation";

type VerifyPageProps = {
  searchParams: Promise<{ error: string }>;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const sp = await searchParams;

  // if no error, redirect to the main page
  if (!sp.error) redirect("/");

  return (
    <div className="min-h-screen w-full bg-bg-primary flex items-center justify-center overflow-hidden relative">
      <SendEmailVerification />
    </div>
  );
}
