import ResetPasswordForm from "@/components/ResetPasswordForm";
import { SearchParamProps } from "@/types/SearchParams_Type";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  searchParams,
}: SearchParamProps) {
  const token = (await searchParams).token;
  console.log("x", token);
  // if no error, redirect to the main page
  if (!token) redirect("/auth/login");

  return (
    <div className="min-h-screen w-full bg-bg-primary flex items-center justify-center overflow-hidden relative">
      <ResetPasswordForm token={token} />
    </div>
  );
}
