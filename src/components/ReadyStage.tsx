import type { ChecklistItem } from '../types'

function Group({ title, items }: { title: string; items: ChecklistItem[] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      <ul className="mt-2 flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm text-slate-200">
            <span className="text-emerald-400">✓</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ReadyStage({
  machineChecks,
  tools,
  workpiece,
  onProceed,
}: {
  machineChecks: ChecklistItem[]
  tools: ChecklistItem[]
  workpiece: ChecklistItem[]
  onProceed: () => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-emerald-700 bg-emerald-950/40 p-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-400">Machine Status</p>
        <p className="mt-1 text-4xl font-black tracking-wide text-emerald-300">READY</p>
      </div>

      <div className="grid gap-6 rounded-xl border border-slate-700 bg-slate-900 p-5 sm:grid-cols-3">
        <Group title="Machine Checks" items={machineChecks} />
        <Group title="Tools" items={tools} />
        <Group title="Workpiece" items={workpiece} />
      </div>

      <button
        type="button"
        onClick={onProceed}
        className="w-full rounded-xl bg-sky-500 py-4 text-xl font-bold tracking-wide text-white transition-colors hover:bg-sky-400"
      >
        PROCEED TO OPERATION
      </button>
    </div>
  )
}
