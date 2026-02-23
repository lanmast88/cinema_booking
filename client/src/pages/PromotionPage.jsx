import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Header from "../components/Header";
import { useAuth } from "../components/useAuth";

const promotions = [
  {
    id: "promo-1",
    title: "Вдвое больше — вдвое дешевле!",
    subtitle: "С 1 марта по 30 апреля",
    description: "При покупке 2 и более билетов — попкорн со скидкой 50%",
    details:
      "Акция действует при покупке двух и более билетов на один сеанс. Скидка распространяется на все виды попкорна в нашем ассортименте.",
  },
  {
    id: "promo-2",
    title: "Третий — НЕ лишний!",
    subtitle: "Каждое воскресенье",
    description:
      "Три места по цене двух — отличная возможность провести выходной с семьёй.",
    details: "Акция действует при покупке трёх и более билетов в один сеанс.",
  },
  {
    id: "promo-3",
    title: "Ночная премьера: попкорн в подарок",
    subtitle: "Премьеры и специальные показы",
    description:
      "Посетите ночную премьеру и получите бесплатный маленький попкорн на кассе.",
    details:
      "Акция действует при предъявлении электронного билета на показ после 22:00. ",
  },
  {
    id: "promo-4",
    title: "Счастливые часы",
    subtitle: "В будние дни с 12:00 до 16:00",
    description:
      "Посетите сеанс в счастливые часы и получите скидку 30% на билет.",
    details:
      "Акция действует при покупке билетов в будние дни с 12:00 до 16:00. Скидка распространяется на все виды билетов.",
  },
];

const emptyForm = { title: "", subtitle: "", description: "", details: "" };

export default function PromotionPage() {
  const { adm } = useAuth();
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [promoList, setPromoList] = useState(promotions);
  const [promoToDelete, setPromoToDelete] = useState(null);
  const [form, setForm] = useState(emptyForm);
  
  const openAdd = () => {
    setForm(emptyForm);
    setIsAddOpen(true);
  };

  const saveNewPromo = () => {
    const next = {
      id: `promo-${Date.now()}`,
      title: form.title || "Без названия",
      subtitle: form.subtitle || "",
      description: form.description || "",
      details: form.details || "",
    };
    setPromoList((p) => [next, ...p]);
    setIsAddOpen(false);
  };

  const deletePromo = (id) => setPromoList((p) => p.filter((x) => x.id !== id));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070911] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,58,255,0.28),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,188,255,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(169,0,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#5f3bff]/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#00b7ff]/20 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative z-20 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Акции и предложения
        </h1>

        <p className="mt-3 text-white/70">
          Здесь собрано всё, что поможет сэкономить и сделать ваш поход в кино
          ещё приятнее.
        </p>

        <div className="mt-8 grid gap-6 ">
          {promoList.map((promo) => (
            <article
              key={promo.id}
              className="glass-card overflow-hidden rounded-3xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white/95">
                    {promo.title}
                  </h2>
                  <div className="mt-1 text-sm text-white/70">
                    {promo.subtitle}
                  </div>
                  <p className="mt-3 text-sm text-white/75">
                    {promo.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPromo(promo)}
                    className="rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
                  >
                    Подробнее
                  </button>
                  {adm && (
                    <button
                      type="button"
                      onClick={() => deletePromo(promo.id)}
                      className="mt-2 rounded-xl border border-rose-300/50 bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
                    >
                      Удалить
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {adm && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex whitespace-normal rounded-xl border border-pink-300/50 bg-gradient-to-r from-pink-500/80 to-fuchsia-500/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(236,72,153,0.35)] transition hover:from-pink-400/90 hover:to-fuchsia-400/90"
            >
              Добавить акцию
            </button>
          </div>
        )}
      </main>

      <Dialog
        open={Boolean(selectedPromo)}
        onClose={() => setSelectedPromo(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="glass-card w-full max-w-lg rounded-3xl p-6">
            <h3 className="text-2xl font-semibold text-white">
              {selectedPromo?.title}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {selectedPromo?.subtitle}
            </p>
            <div className="mt-4 text-sm text-white/75">
              {selectedPromo?.details}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedPromo(null)}
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2 font-semibold text-white hover:bg-pink-400 transition"
              >
                Закрыть
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="glass-card w-full max-w-2xl rounded-3xl p-6">
            <h3 className="text-xl font-semibold text-white">Добавить акцию</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-white/80">
                Название
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none"
                />
              </label>
              <label className="text-sm text-white/80">
                Детали
                <input
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subtitle: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none"
                />
              </label>
              <label className="text-sm text-white/80">
                Краткое описание
                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none"
                />
              </label>
              <label className="text-sm text-white/80">
                Подробное описание
                <input
                  value={form.details}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, details: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none"
                />
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={saveNewPromo}
                className="w-full rounded-xl bg-emerald-500 py-2 font-semibold text-white hover:bg-emerald-400 transition"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="w-full rounded-xl bg-pink-500 py-2 font-semibold text-white hover:bg-pink-400 transition"
              >
                Отмена
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={Boolean(promoToDelete)}
        onClose={() => setPromoToDelete(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="glass-card w-full max-w-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">Удалить акцию?</h3>
            <p className="mt-3 text-sm text-white/65 leading-relaxed">
              Вы уверены, что хотите удалить{" "}
              <span className="font-semibold text-white/90">
                «{promoToDelete?.title}»
              </span>
              ? Это действие необратимо.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setPromoToDelete(null)}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={() => {
                  deletePromo(promoToDelete.id);
                  setPromoToDelete(null);
                }}
                className="flex-1 rounded-xl border border-rose-400/40 bg-gradient-to-r from-rose-500/90 to-red-500/85 py-2.5 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-red-400"
              >
                Удалить
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
