import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/useAuth";
import InfoCard from "../components/InfoCard";

const defaultPromotions = [
  {
    id: "promo-1",
    title: "Вдвое больше, вдвое дешевле",
    subtitle: "1 марта - 30 апреля",
    description: "При покупке от двух билетов попкорн со скидкой 50%.",
    details:
      "Скидка действует на любой вид попкорна в день сеанса. Применяется только при покупке двух и более билетов одним заказом.",
    badge: "ХИТ",
    badgeClassName:
      "border-cyan-300/40 bg-cyan-300/12 text-cyan-100 shadow-[0_8px_18px_rgba(34,211,238,0.25)]",
  },
  {
    id: "promo-2",
    title: "Три билета по цене двух",
    subtitle: "Каждое воскресенье",
    description: "Собирай друзей и получай 1 билет бесплатно.",
    details:
      "Акция работает на стандартные 2D и Dolby сеансы. Не суммируется с другими скидками.",
    badge: "WEEKEND",
    badgeClassName:
      "border-fuchsia-300/45 bg-fuchsia-300/12 text-fuchsia-100 shadow-[0_8px_18px_rgba(217,70,239,0.25)]",
  },
  {
    id: "promo-3",
    title: "Ночная премьера + подарок",
    subtitle: "Сеансы после 22:00",
    description: "На ночных премьерах выдаем маленький попкорн бесплатно.",
    details:
      "Достаточно показать электронный билет на кассе бара в день показа. Количество подарков ограничено.",
    badge: "NIGHT",
    badgeClassName:
      "border-indigo-300/45 bg-indigo-300/12 text-indigo-100 shadow-[0_8px_18px_rgba(99,102,241,0.25)]",
  },
  {
    id: "promo-4",
    title: "Счастливые часы",
    subtitle: "Будни 12:00 - 16:00",
    description: "Скидка 30% на дневные сеансы.",
    details:
      "Акция действует на билеты, купленные и онлайн, и в кассе. Не распространяется на спецпоказы.",
    badge: "DAYTIME",
    badgeClassName:
      "border-emerald-300/45 bg-emerald-300/12 text-emerald-100 shadow-[0_8px_18px_rgba(16,185,129,0.25)]",
  },
];

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  details: "",
  badge: "",
};

export default function PromotionPage() {
  const { adm } = useAuth();
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [promoList, setPromoList] = useState(defaultPromotions);
  const [form, setForm] = useState(emptyForm);

  const saveNewPromo = () => {
    const next = {
      id: `promo-${Date.now()}`,
      title: form.title.trim() || "Без названия",
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      details: form.details.trim(),
      badge: form.badge.trim() || "NEW",
      badgeClassName:
        "border-pink-300/45 bg-pink-300/12 text-pink-100 shadow-[0_8px_18px_rgba(236,72,153,0.25)]",
    };
    setPromoList((prev) => [next, ...prev]);
    setForm(emptyForm);
    setIsAddOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <section className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10 p-6 sm:p-8">
          <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100">
            OFFERS
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Акции и спецпредложения
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">
            Подобрали лучшие предложения для билетов, бара и групповых походов в
            кино. Выбирай, что выгодно именно тебе.
          </p>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {promoList.map((promo) => (
            <InfoCard
              key={promo.id}
              title={promo.title}
              subtitle={promo.subtitle}
              description={promo.description}
              badge={promo.badge}
              badgeClassName={promo.badgeClassName}
              actionLabel="Подробнее"
              onAction={() => setSelectedPromo(promo)}
            >
              {adm ? (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setPromoList((prev) => prev.filter((x) => x.id !== promo.id))
                    }
                    className="rounded-xl border border-rose-300/45 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                  >
                    Удалить
                  </button>
                </div>
              ) : null}
            </InfoCard>
          ))}
        </section>

        {adm ? (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setForm(emptyForm);
                setIsAddOpen(true);
              }}
              className="inline-flex rounded-xl border border-pink-300/50 bg-gradient-to-r from-pink-500/80 to-fuchsia-500/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(236,72,153,0.35)] transition hover:from-pink-400/90 hover:to-fuchsia-400/90"
            >
              Добавить акцию
            </button>
          </div>
        ) : null}
      </main>

      <Footer />

      <Dialog
        open={Boolean(selectedPromo)}
        onClose={() => setSelectedPromo(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="glass-card w-full max-w-xl rounded-3xl p-6">
            <h3 className="text-2xl font-semibold text-white">{selectedPromo?.title}</h3>
            <p className="mt-2 text-sm text-cyan-200">{selectedPromo?.subtitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {selectedPromo?.details}
            </p>
            <button
              type="button"
              onClick={() => setSelectedPromo(null)}
              className="mt-6 w-full rounded-xl border border-white/15 bg-white/[0.03] py-2.5 font-semibold text-white/90 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Закрыть
            </button>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="glass-card w-full max-w-2xl rounded-3xl p-6">
            <h3 className="text-xl font-semibold text-white">Новая акция</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-white/80">
                Название
                <input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Период
                <input
                  value={form.subtitle}
                  onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Краткое описание
                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80">
                Стикер
                <input
                  value={form.badge}
                  onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
                  placeholder="HIT / NEW / NIGHT"
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50"
                />
              </label>
              <label className="text-sm text-white/80 sm:col-span-2">
                Подробности
                <textarea
                  value={form.details}
                  onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
                  rows={4}
                  className="mt-1 w-full resize-none rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50"
                />
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={saveNewPromo}
                className="w-full rounded-xl bg-emerald-500 py-2 font-semibold text-white transition hover:bg-emerald-400"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="w-full rounded-xl bg-pink-500 py-2 font-semibold text-white transition hover:bg-pink-400"
              >
                Отмена
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
