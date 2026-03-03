export default function InfoCard({
  title,
  subtitle,
  description,
  badge,
  badgeClassName = "border-cyan-300/40 bg-cyan-300/12 text-cyan-100",
  actionLabel,
  onAction,
  children,
  className = "",
}) {
  return (
    <article
      className={`glass-card group relative overflow-hidden rounded-3xl border border-white/10 p-5 transition hover:border-cyan-300/35 ${className}`}
    >
      {badge ? (
        <span
          className={`absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${badgeClassName}`}
        >
          {badge}
        </span>
      ) : null}

      <div className="pr-28">
        <h2 className="text-xl font-semibold text-white/95 sm:text-2xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-white/65">{subtitle}</p> : null}
        {description ? <p className="mt-3 text-sm text-white/75">{description}</p> : null}
      </div>

      {children}

      {actionLabel && onAction ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={onAction}
            className="rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
          >
            {actionLabel}
          </button>
        </div>
      ) : null}
    </article>
  );
}
