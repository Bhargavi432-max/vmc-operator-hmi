import type { ChecklistItem } from '../types'

export function ChecklistStage({
  title,
  instruction,
  items,
  confirmLabel,
  onConfirm,
  nextLabel,
  onNext,
  busyId,
}: {
  title: string
  instruction: string
  items: ChecklistItem[]
  confirmLabel: string
  onConfirm: (id: string) => void
  nextLabel: string
  onNext: () => void
  busyId: string | null
}) {
  const allConfirmed = items.every((item) => item.confirmed)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-400">{instruction}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
              item.confirmed ? 'border-emerald-700 bg-emerald-950/40' : 'border-slate-700 bg-slate-900'
            }`}
          >
            <div>
              <p className="text-lg font-medium text-slate-100">{item.label}</p>
              {item.detail && <p className="text-sm text-slate-400">{item.detail}</p>}
            </div>
            <button
              type="button"
              disabled={item.confirmed || busyId === item.id}
              onClick={() => onConfirm(item.id)}
              className={`shrink-0 rounded-lg px-6 py-3 text-base font-semibold tracking-wide transition-colors ${
                item.confirmed
                  ? 'bg-emerald-600 text-emerald-50'
                  : 'bg-amber-400 text-slate-900 hover:bg-amber-300 disabled:opacity-60'
              }`}
            >
              {item.confirmed ? 'CONFIRMED ✓' : busyId === item.id ? 'CONFIRMING…' : confirmLabel}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!allConfirmed}
        onClick={onNext}
        className="mt-2 w-full rounded-xl bg-sky-500 py-4 text-xl font-bold tracking-wide text-white transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
      >
        {nextLabel}
      </button>
    </div>
  )
}
