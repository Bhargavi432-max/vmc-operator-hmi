import { getStore } from '@netlify/blobs'
import { defaultState, type HmiState } from './scenario'

const STORE_NAME = 'vmc-hmi'
const KEY = 'session'

export async function loadState(): Promise<HmiState> {
  const store = getStore(STORE_NAME)
  const existing = await store.get(KEY, { type: 'json' })
  if (existing) return existing as HmiState
  const fresh = defaultState()
  await store.setJSON(KEY, fresh)
  return fresh
}

export async function saveState(state: HmiState): Promise<void> {
  const store = getStore(STORE_NAME)
  await store.setJSON(KEY, state)
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
