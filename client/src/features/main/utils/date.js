export function getBaseDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getDateByOffset(offset) {
  const date = getBaseDate();
  date.setDate(date.getDate() + offset);
  return date;
}

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatTabTitle(date, offset) {
  if (offset === 0) return "Сегодня";
  if (offset === 1) return "Завтра";

  const weekday = new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(
    date,
  );
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

export function formatDateLabel(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);
}

export function getHour(time) {
  return Number(time.split(":")[0]);
}
