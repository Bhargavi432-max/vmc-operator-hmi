import { useEffect, useState } from 'react'
import { api } from './api'
import { ChecklistStage } from './components/ChecklistStage'
import { OperationStage } from './components/OperationStage'
import { ReadyStage } from './components/ReadyStage'
import { StageProgress } from './components/StageProgress'
import type { HmiState } from './types'

const OPERATION_NAME = 'Bracket Face & Bore — Op 20 · Qty 25'

function App() {
  const [state, setState] = useState<HmiState | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getState().then(setState).catch((e) => setError(e.message))
  }, [])

  async function guarded(action: () => Promise<HmiState>) {
    try {
      setError(null)
      const next = await action()
      setState(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'something went wrong')
    }
  }

  async function handleConfirm(stage: string, id: string) {
    setBusyId(id)
    await guarded(() => api.confirm(stage, id))
    setBusyId(null)
  }

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        {error ?? 'Loading HMI…'}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <StageProgress current={state.stage} />

        {error && (
          <p className="rounded-lg border border-rose-700 bg-rose-950/40 px-4 py-2 text-sm text-rose-300">{error}</p>
        )}

        {state.stage === 'machine_checks' && (
          <ChecklistStage
            title="Machine Checks"
            instruction="Confirm each check before proceeding to tool loading."
            items={state.machineChecks}
            confirmLabel="CONFIRM CHECK"
            onConfirm={(id) => handleConfirm('machine_checks', id)}
            nextLabel="NEXT: REQUIRED TOOLS"
            onNext={() => guarded(api.next)}
            busyId={busyId}
          />
        )}

        {state.stage === 'tools' && (
          <ChecklistStage
            title="Required Tools"
            instruction="Insert each tool into the spindle/turret and confirm."
            items={state.tools}
            confirmLabel="INSERT & CONFIRM"
            onConfirm={(id) => handleConfirm('tools', id)}
            nextLabel="NEXT: WORKPIECE SETUP"
            onNext={() => guarded(api.next)}
            busyId={busyId}
          />
        )}

        {state.stage === 'workpiece' && (
          <ChecklistStage
            title="Workpiece Setup"
            instruction="Arrange and clamp the workpiece per drawing, then confirm each step."
            items={state.workpiece}
            confirmLabel="CONFIRM"
            onConfirm={(id) => handleConfirm('workpiece', id)}
            nextLabel="NEXT: READY REVIEW"
            onNext={() => guarded(api.next)}
            busyId={busyId}
          />
        )}

        {state.stage === 'ready' && (
          <ReadyStage
            machineChecks={state.machineChecks}
            tools={state.tools}
            workpiece={state.workpiece}
            onProceed={() => guarded(api.next)}
          />
        )}

        {state.stage === 'operation' && (
          <OperationStage
            operationName={OPERATION_NAME}
            status={state.operationStatus}
            onStart={() => guarded(api.start)}
            onStop={() => guarded(api.stop)}
            onReset={() => guarded(api.reset)}
            busy={busyId !== null}
          />
        )}
      </div>
    </div>
  )
}

export default App
