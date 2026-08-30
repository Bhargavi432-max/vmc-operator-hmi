import { loadState, saveState, json } from './lib/store'
import { STAGE_ORDER, type HmiState } from './lib/scenario'

const CHECKLISTS: Partial<Record<HmiState['stage'], keyof HmiState>> = {
  machine_checks: 'machineChecks',
  tools: 'tools',
  workpiece: 'workpiece',
}

export default async () => {
  const state = await loadState()
  const listKey = CHECKLISTS[state.stage]

  if (listKey) {
    const allConfirmed = (state[listKey] as HmiState['machineChecks']).every((item) => item.confirmed)
    if (!allConfirmed) return json({ error: 'all items on this stage must be confirmed first' }, 409)
  }

  const currentIndex = STAGE_ORDER.indexOf(state.stage)
  const nextStage = STAGE_ORDER[currentIndex + 1]
  if (!nextStage) return json({ error: 'already at the final stage' }, 409)

  state.stage = nextStage
  await saveState(state)
  return json(state)
}

