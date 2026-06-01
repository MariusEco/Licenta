import { SettingsPanel } from "@/components/features/settings/settings-panel";
import { requireAuthenticatedUser } from "@/lib/api/auth";

export const metadata = {
  title: "Setări cont",
};

export default async function SettingsPage() {
  const user = await requireAuthenticatedUser();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <h1 className="text-3xl font-semibold text-foreground">Setări cont</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Actualizează numele afișat și trimite un email de resetare a parolei.
        </p>
      </section>

      <SettingsPanel email={user.email} username={user.username ?? null} />
    </main>
  );
}
