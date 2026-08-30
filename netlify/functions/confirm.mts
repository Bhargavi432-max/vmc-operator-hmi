import { loadState, saveState, json } from './lib/store'
import type { HmiState } from './lib/scenario'

const LISTS: Record<string, keyof HmiState> = {
  machine_checks: 'machineChecks',
  tools: 'tools',
  workpiece: 'workpiece',
}

export default async (req: Request) => {
  const { stage, id } = (await req.json()) as { stage: string; id: string }
  const listKey = LISTS[stage]
  if (!listKey) return json({ error: 'invalid stage' }, 400)

  const state = await loadState()
  if (state.stage !== stage) return json({ error: 'not the active stage' }, 409)

  const list = state[listKey] as HmiState['machineChecks']
  const item = list.find((entry) => entry.id === id)
  if (!item) return json({ error: 'unknown item' }, 404)

  item.confirmed = true
  await saveState(state)
  return json(state)
}

