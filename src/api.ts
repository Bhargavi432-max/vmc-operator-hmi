import type { HmiState } from './types'

async function call(path: string, body?: unknown): Promise<HmiState> {
  const res = await fetch(`/api/${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: body === undefined ? undefined : { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? 'request failed')
  return data as HmiState
}

export const api = {
  getState: () => call('state'),
  confirm: (stage: string, id: string) => call('confirm', { stage, id }),
  next: () => call('next', {}),
  start: () => call('start', {}),
  stop: () => call('stop', {}),
  reset: () => call('reset', {}),
}
