import { loadState, saveState, json } from './lib/store'

export default async () => {
  const state = await loadState()
  if (state.stage !== 'operation') return json({ error: 'not ready for operation' }, 409)
  if (state.operationStatus === 'RUNNING') return json({ error: 'operation is already RUNNING' }, 409)

  state.operationStatus = 'RUNNING'
  await saveState(state)
  return json(state)
}

