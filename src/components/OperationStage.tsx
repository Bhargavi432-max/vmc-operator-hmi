import type { OperationStatus } from '../types'

const STATUS_STYLES: Record<OperationStatus, string> = {
  READY: 'border-sky-700 bg-sky-950/40 text-sky-300',
  RUNNING: 'border-emerald-700 bg-emerald-950/40 text-emerald-300',
  STOPPED: 'border-rose-700 bg-rose-950/40 text-rose-300',
}

export function OperationStage({
  operationName,
  status,
  onStart,
  onStop,
  onReset,
  busy,
}: {
  operationName: string
  status: OperationStatus
  onStart: () => void
  onStop: () => void
  onReset: () => void
  busy: boolean
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Operation</h1>
        <p className="mt-1 text-sm text-slate-400">{operationName}</p>
      </div>

      <div className={`rounded-xl border p-8 text-center ${STATUS_STYLES[status]}`}>
        <p className="text-sm font-medium uppercase tracking-widest opacity-80">Status</p>
        <p className="mt-1 text-5xl font-black tracking-wide">{status}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          disabled={status === 'RUNNING' || busy}
          onClick={onStart}
          className="rounded-xl bg-emerald-500 py-5 text-xl font-bold tracking-wide text-white transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
        >
          START
        </button>
        <button
          type="button"
          disabled={status !== 'RUNNING' || busy}
          onClick={onStop}
          className="rounded-xl bg-rose-500 py-5 text-xl font-bold tracking-wide text-white transition-colors hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
        >
          STOP
        </button>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="self-center text-xs font-medium uppercase tracking-wide text-slate-500 underline underline-offset-4 hover:text-slate-300"
      >
        Restart simulation
      </button>
    </div>
  )
}
