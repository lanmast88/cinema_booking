import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PlaceholderPage({ title }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />

      <Header />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 pt-20">
        <div className="glass-card rounded-3xl px-8 py-10 text-center">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-3 text-white/70">Раздел в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
