import { STAGE_ORDER, STAGE_TITLES, type Stage } from '../types'

export function StageProgress({ current }: { current: Stage }) {
  const currentIndex = STAGE_ORDER.indexOf(current)

  return (
    <ol className="flex w-full gap-2">
      {STAGE_ORDER.map((stage, index) => {
        const isDone = index < currentIndex
        const isActive = index === currentIndex
        return (
          <li key={stage} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={`h-2 w-full rounded-full transition-colors ${
                isDone ? 'bg-emerald-500' : isActive ? 'bg-amber-400' : 'bg-slate-700'
              }`}
            />
            <span
              className={`hidden text-[11px] font-medium uppercase tracking-wide sm:block ${
                isActive ? 'text-amber-300' : isDone ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              {STAGE_TITLES[stage]}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
