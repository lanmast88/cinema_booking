import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/useAuth";

const initialPromotions = [
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
      "Акция действует при предъявлении электронного билета на показ после 22:00.",
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
  {
    id: "promo-5",
    title: "День студента",
    subtitle: "Каждую среду при предъявлении студенческого",
    description: "Студентам — билет по скидке 15% любой сеанс дня.",
    details:
      "Акция действует по средам при предъявлении действующего студенческого билета. Скидка распространяется на один билет в одни руки.",
  },
  {
    id: "promo-6",
    title: "Именинникам — сюрприз",
    subtitle: "В день рождения и 3 дня после",
    description:
      "Отпразднуйте день рождения в кино и получите бесплатный билет.",
    details:
      "При предъявлении документа, подтверждающего дату рождения, имениннику предоставляется бесплатный билет.",
  },
];

// SVG-иконки для каждой карточки
const promoIcons = [
  // 0 — попкорн + %
  <svg
    viewBox="0 0 160 100"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M30 30 L20 85 L60 85 L50 30Z" fill="currentColor" />
    <rect x="20" y="25" width="30" height="10" rx="3" fill="currentColor" />
    <circle cx="32" cy="18" r="7" fill="currentColor" />
    <circle cx="43" cy="14" r="7" fill="currentColor" />
    <circle cx="54" cy="18" r="7" fill="currentColor" />
    <circle cx="38" cy="10" r="6" fill="currentColor" />
    <circle cx="50" cy="10" r="6" fill="currentColor" />
    <path d="M100 30 L90 85 L130 85 L120 30Z" fill="currentColor" />
    <rect x="90" y="25" width="30" height="10" rx="3" fill="currentColor" />
    <circle cx="102" cy="18" r="7" fill="currentColor" />
    <circle cx="113" cy="14" r="7" fill="currentColor" />
    <circle cx="124" cy="18" r="7" fill="currentColor" />
    <circle cx="108" cy="10" r="6" fill="currentColor" />
    <circle cx="120" cy="10" r="6" fill="currentColor" />
    <text
      x="70"
      y="62"
      fontSize="28"
      fill="currentColor"
      fontWeight="bold"
      textAnchor="middle"
      opacity="0.8"
    >
      %
    </text>
  </svg>,
  // 1 — три человека
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="22" cy="30" r="10" fill="currentColor" />
    <path d="M8 75 C8 58 12 50 22 50 C32 50 36 58 36 75Z" fill="currentColor" />
    <circle cx="78" cy="30" r="10" fill="currentColor" />
    <path
      d="M64 75 C64 58 68 50 78 50 C88 50 92 58 92 75Z"
      fill="currentColor"
    />
    <circle cx="50" cy="25" r="13" fill="currentColor" />
    <path
      d="M33 78 C33 58 38 48 50 48 C62 48 67 58 67 78Z"
      fill="currentColor"
    />
  </svg>,
  // 2 — луна
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M58 18 C38 22 24 38 24 55 C24 73 38 86 58 88 C42 84 30 70 30 55 C30 38 42 24 58 18Z"
      fill="currentColor"
    />
    <circle cx="72" cy="22" r="3" fill="currentColor" />
    <circle cx="82" cy="38" r="2" fill="currentColor" />
    <circle cx="68" cy="42" r="2" fill="currentColor" />
    <circle cx="78" cy="55" r="1.5" fill="currentColor" />
    <circle cx="62" cy="30" r="1.5" fill="currentColor" />
  </svg>,
  // 3 — часы
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="38"
      stroke="currentColor"
      strokeWidth="5"
      fill="none"
    />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
    <line
      x1="50"
      y1="50"
      x2="50"
      y2="22"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="50"
      x2="72"
      y2="50"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="14"
      x2="50"
      y2="20"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="80"
      x2="50"
      y2="86"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="14"
      y1="50"
      x2="20"
      y2="50"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="80"
      y1="50"
      x2="86"
      y2="50"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>,
  // 4 — диплом
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,18 88,38 50,52 12,38" fill="currentColor" />
    <polygon points="50,52 50,72 70,62" fill="currentColor" opacity="0.7" />
    <line
      x1="88"
      y1="38"
      x2="88"
      y2="58"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <ellipse cx="88" cy="62" rx="5" ry="7" fill="currentColor" />
    <rect
      x="28"
      y="74"
      width="44"
      height="16"
      rx="3"
      fill="currentColor"
      opacity="0.6"
    />
    <line
      x1="35"
      y1="80"
      x2="65"
      y2="80"
      stroke="#0d1b2e"
      strokeWidth="2"
      opacity="0.4"
    />
    <line
      x1="38"
      y1="85"
      x2="62"
      y2="85"
      stroke="#0d1b2e"
      strokeWidth="2"
      opacity="0.4"
    />
  </svg>,
  // 5 — торт
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="15" y="55" width="70" height="35" rx="4" fill="currentColor" />
    <rect x="22" y="42" width="56" height="16" rx="3" fill="currentColor" />
    <rect x="30" y="28" width="5" height="16" rx="2" fill="currentColor" />
    <rect x="47.5" y="24" width="5" height="20" rx="2" fill="currentColor" />
    <rect x="65" y="28" width="5" height="16" rx="2" fill="currentColor" />
    <ellipse cx="32.5" cy="25" rx="4" ry="5" fill="currentColor" />
    <ellipse cx="50" cy="21" rx="4" ry="5" fill="currentColor" />
    <ellipse cx="67.5" cy="25" rx="4" ry="5" fill="currentColor" />
    <circle cx="35" cy="63" r="3" fill="#0d1b2e" opacity="0.4" />
    <circle cx="50" cy="63" r="3" fill="#0d1b2e" opacity="0.4" />
    <circle cx="65" cy="63" r="3" fill="#0d1b2e" opacity="0.4" />
  </svg>,
];

// Позиции bento-сетки для первых 6 акций
const bentoLayout = [
  {
    col: "col-span-3 row-span-2 col-start-1 row-start-1",
    iconPos:
      "absolute opacity-5 pointer-events-none text-white w-[100%] h-[100%] -right-[33%] -bottom-[20%]",
  },
  {
    col: "col-span-3 row-span-3 col-start-1 row-start-3",
    iconPos:
      "absolute -right-[13%] -bottom-[0%] w-[85%] h-[85%] opacity-[0.055] pointer-events-none text-white",
  },
  {
    col: "col-span-2 row-span-5 col-start-4 row-start-1",
    iconPos:
      "absolute -right-[20%] -bottom-[30%] w-[85%] h-[85%] opacity-[0.055] pointer-events-none text-white",
  },
  {
    col: "col-span-3 row-span-5 col-start-6 row-start-1",
    iconPos:
      "absolute -left-[5%] -bottom-[5%] w-[85%] h-[85%] opacity-[0.055] pointer-events-none text-white",
  },
  {
    col: "col-span-4 row-span-3 col-start-1 row-start-6",
    iconPos:
      "absolute -right-[20%] -bottom-[20%] w-[85%] h-[85%] opacity-[0.055] pointer-events-none text-white",
  },
  {
    col: "col-span-4 row-span-3 col-start-5 row-start-6",
    iconPos:
      "absolute -right-[10%] -bottom-[20%] w-[85%] h-[85%] opacity-[0.055] pointer-events-none text-white",
  },
];

const emptyForm = { title: "", subtitle: "", description: "", details: "" };

export default function PromotionPage() {
  const { adm } = useAuth();
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [promoList, setPromoList] = useState(initialPromotions);
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

  // Акции, которые помещаются в bento (первые 6), остальные — в обычную сетку
  const bentoPromos = promoList.slice(0, 6);
  const extraPromos = promoList.slice(6);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a1628] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,60,120,0.5),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(20,80,160,0.35),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(10,40,100,0.3),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#1a3a6e]/40 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute right-0 top-14 h-80 w-80 rounded-full bg-[#1e4d8c]/30 blur-3xl animate-pulse-glow-delayed" />

      <Header />

      <main className="relative text-start mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl py-8 pr-8 mb-10">
          <div>
            <p className="text-3xl font-bold uppercase tracking-wider text-white-300/70 mb-2">
              Специальные предложения
            </p>
            <p className="mt-2 text-white/70">
              Здесь собрано всё, что поможет сэкономить и сделать ваш поход в
              кино ещё приятнее.
            </p>
          </div>
        </div>

        {/* Bento-сетка для первых 6 акций */}
        <div className="grid grid-cols-8 grid-rows-8 gap-4 h-screen">
          {bentoPromos.map((promo, i) => {
            const layout = bentoLayout[i];
            return (
              <div
                key={promo.id}
                className={`group overflow-hidden relative flex flex-col cursor-pointer ${layout.col} bg-gradient-to-br from-[#7C3AED]/10 to-[#8B5CF6]/10 rounded-2xl p-4 border border-white/10 hover:from-[#7C3AED]/20 hover:to-[#8B5CF6]/20 transition duration-300`}
                onClick={() => setSelectedPromo(promo)}
              >
                <div className={layout.iconPos}>{promoIcons[i]}</div>
                <div>
                  <p className="text-sm text-white/70">{promo.subtitle}</p>
                  <h3 className="text-3xl font-semibold">{promo.title}</h3>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  {promo.description}
                </p>
                <p className="mt-auto mb-2 ml-2 opacity-0 text-xs text-white/50 group-hover:opacity-100 transition duration-300">
                  {promo.details}
                </p>
                {adm && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPromoToDelete(promo);
                    }}
                    className="absolute top-3 right-3 rounded-xl border border-rose-300/50 bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-300 opacity-0 group-hover:opacity-100 transition hover:bg-rose-500/20"
                  >
                    Удалить
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Дополнительные акции (7+) — обычные карточки */}
        {extraPromos.length > 0 && (
          <div className="mt-8 grid gap-6">
            {extraPromos.map((promo) => (
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
                        onClick={() => setPromoToDelete(promo)}
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
        )}

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

      <Footer />

      {/* Диалог: подробности акции */}
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
          <DialogPanel className="glass-card w-full max-w-lg rounded-3xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-br from-[#7C3AED]/10 to-[#8B5CF6]/10" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-white">
                {selectedPromo?.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {selectedPromo?.subtitle}
              </p>
              <div className="mt-4 rounded-2xl bg-white/5 border border-blue-500/20 p-4 text-sm text-white/75 leading-relaxed">
                {selectedPromo?.details}
              </div>
              <button
                type="button"
                onClick={() => setSelectedPromo(null)}
                className="mt-6 w-full rounded-xl cursor-pointer bg-gradient-to-br from-[#7C3AED]/10 to-[#8B5CF6]/10 py-2.5 font-semibold text-white hover:from-[#7C3AED]/20 hover:to-[#8B5CF6]/20 transition"
              >
                Закрыть
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Диалог: добавить акцию */}
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

      {/* Диалог: подтверждение удаления */}
      <Dialog
        open={Boolean(promoToDelete)}
        onClose={() => setPromoToDelete(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
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
