export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Zona privată va include locațiile favorite și comparațiile salvate
          după conectarea Supabase Auth.
        </p>
      </section>
    </main>
  );
}
