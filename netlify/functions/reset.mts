import { saveState, json } from './lib/store'
import { defaultState } from './lib/scenario'

export default async () => {
  const state = defaultState()
  await saveState(state)
  return json(state)
}

