import { PasswordRecoveryForm } from "@/components/features/settings/password-recovery-form";
import { requireUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Resetare parolă",
};

export default async function RecoveryPage() {
  await requireUser();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <PasswordRecoveryForm />
    </main>
  );
}