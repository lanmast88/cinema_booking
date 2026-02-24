import { Dialog, DialogPanel } from "@headlessui/react";

export default function DeleteMovieDialog({ movieToDelete, onClose, onConfirm }) {
  return (
    <Dialog open={Boolean(movieToDelete)} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="glass-card w-full max-w-sm rounded-2xl p-6">
          <div className="mb-1"><h3 className="text-lg font-semibold text-white">Удалить фильм?</h3></div>
          <p className="mt-3 text-sm text-white/65 leading-relaxed">Вы уверены, что хотите удалить <span className="font-semibold text-white/90">«{movieToDelete?.title}»</span>? Это действие необратимо.</p>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10">Отмена</button>
            <button type="button" onClick={onConfirm} className="flex-1 rounded-xl border border-rose-400/40 bg-gradient-to-r from-rose-500/90 to-red-500/85 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(244,63,94,0.3)] transition hover:from-rose-400 hover:to-red-400">Удалить</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
