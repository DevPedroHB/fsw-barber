import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendamentos",
};

export default function Bookings() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Page Bookings</h1>
    </main>
  );
}
