import { loadState, json } from './lib/store'

export default async () => {
  const state = await loadState()
  return json(state)
}

