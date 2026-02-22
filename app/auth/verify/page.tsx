import SendEmailVerification from "@/components/SendEmailVerification";
import { SearchParamProps } from "@/types/SearchParams_Type";
import { redirect } from "next/navigation";

export default async function VerifyPage({ searchParams }: SearchParamProps) {
  const sp = await searchParams;

  // if no error, redirect to the main page
  if (!sp.error) redirect("/");

  return (
    <div className="min-h-screen w-full bg-bg-primary flex items-center justify-center overflow-hidden relative">
      <SendEmailVerification sp={sp} />
    </div>
  );
}
