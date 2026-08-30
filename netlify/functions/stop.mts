import { loadState, saveState, json } from './lib/store'

export default async () => {
  const state = await loadState()
  if (state.operationStatus !== 'RUNNING') return json({ error: 'operation is not RUNNING' }, 409)

  state.operationStatus = 'STOPPED'
  await saveState(state)
  return json(state)
}

