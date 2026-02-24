import { Dialog, DialogPanel } from "@headlessui/react";

export default function SeatPickerModal({
  open,
  onClose,
  selectedSession,
  seatsData,
  chosenSeats,
  plusChosenSeat,
  removeChosenSeat,
  plusPurchasedSeats,
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="glass-card w-full max-w-xl rounded-3xl p-5 sm:p-6 dialog-panel">
          <div className="items-center gap-4 rounded-xl border border-white/10 bg-slate-900 p-3 flex mb-5">
            <h3 className="text-2xl font-semibold text-yellow-300">{selectedSession?.movieTitle}</h3>
            <p className="mt-1 text-sm text-white/75">
              {selectedSession?.movieRating} · {selectedSession?.movieGenre} · {" "}
              {selectedSession?.movieDuration}
            </p>
          </div>
          <div className="flex flex-col items-center gap-8 p-10 bg-slate-900 rounded-xl">
            <div className="flex flex-col items-center gap-4  ">
              <div className="h-2 w-90 rounded-full bg-cyan-300/70 shadow-[0_0_24px_rgba(56,189,248,0.6)]" />
              <span className="text-sm text-slate-400">Экран</span>
            </div>

            <div className="flex flex-col gap-5 pr-10">
              {seatsData.map((rowSeats, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <span className="text-sm text-slate-400">Ряд {rowIndex + 1}</span>

                  <div className="grid grid-cols-10 gap-11">
                    {rowSeats.map((seat) => {
                      const purchasedSeats = selectedSession?.session?.purchasedSeats ?? [];
                      const isPurchased = purchasedSeats.some(
                        (entry) => entry[0] === seat.row && entry[1] === seat.seat,
                      );
                      const isSelected = chosenSeats.some(
                        ([r, s]) => r === seat.row && s === seat.seat,
                      );

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          disabled={isPurchased}
                          onClick={() =>
                            isPurchased
                              ? null
                              : isSelected
                                ? removeChosenSeat(seat.row, seat.seat)
                                : plusChosenSeat(seat.row, seat.seat)
                          }
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-t-lg transition-colors flex items-center justify-center text-[10px] ${
                            isPurchased
                              ? "cursor-not-allowed bg-red-900/60 text-red-400"
                              : isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-slate-700 text-slate-400 hover:bg-blue-500 hover:text-white"
                          }`}
                        >
                          {isPurchased ? (
                            <span className="text-red-400 text-xs font-bold leading-none select-none">{seat.seat}</span>
                          ) : (
                            seat.seat
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-sm bg-slate-700 inline-block" />Свободно
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-sm bg-blue-500 inline-block" />Выбрано
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-sm bg-red-900/60 inline-block" />Занято
              </div>
            </div>

            {chosenSeats.length > 0 ? (
              <div className="mt-3">
                <p className="mb-2 text-center text-sm font-semibold text-white/85">Выбранные места</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {chosenSeats.map(([row, seat], index) => (
                    <div
                      key={`${row}-${seat}-${index}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-sm text-white"
                    >
                      <span>Ряд {row}, место {seat}</span>
                      <button
                        type="button"
                        onClick={() => removeChosenSeat(row, seat)}
                        className="rounded-md border border-cyan-200/35 bg-cyan-200/10 px-1.5 py-0.5 text-xs leading-none text-cyan-100 transition hover:bg-cyan-200/20"
                        aria-label={`Удалить место ${seat} в ряду ${row}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button
                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-300/40 bg-gradient-to-r from-emerald-500/90 via-green-500/90 to-teal-500/90 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-[0_12px_28px_rgba(16,185,129,0.35)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:via-green-400 hover:to-teal-400 hover:shadow-[0_16px_34px_rgba(16,185,129,0.45)] active:translate-y-0 active:scale-[0.99]"
                    onClick={() => plusPurchasedSeats(chosenSeats)}
                  >
                    Купить
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-sm text-slate-400">Выберите места для бронирования</p>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
