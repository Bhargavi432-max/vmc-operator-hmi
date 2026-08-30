# VMC Operator HMI — Startup Guidance

A responsive full-stack HMI that walks a single VMC operator through startup:
**Machine Checks → Required Tools → Workpiece Setup → Ready Review → Operation**,
one stage at a time, with large touch-friendly controls.

## Assumed scenario

- **Operation**: Bracket Face & Bore — Op 20, Qty 25
- **Material / Drawing**: Aluminum 6061-T6, Rev C
- **CNC Program**: O1245
- **Fixture**: Vice-mounted fixture plate FX-114, work offset G54
- **Tools**: T01 Face Mill Ø63mm, T02 End Mill Ø12mm, T03 Drill Ø8.5mm, T04 Tap M10×1.5

These values are preloaded mock data (see `netlify/functions/lib/scenario.ts`) — order
creation/acceptance is out of scope per the assignment.

## Stack

- **Frontend**: React + TypeScript (Vite), Tailwind CSS
- **API**: Netlify Functions (TypeScript)
- **Persistence**: Netlify Blobs — a single session's progress survives reloads/deploys

## Running locally

```bash
npm install
npm start        # runs `netlify dev` — serves the frontend and API together on :8888
```

Open http://localhost:8888.

## API

| Method | Path           | Behavior                                              |
| ------ | -------------- | ------------------------------------------------------ |
| GET    | `/api/state`   | Current HMI state                                      |
| POST   | `/api/confirm` | `{ stage, id }` — confirm one checklist item           |
| POST   | `/api/next`    | Advance to the next stage (blocked until all confirmed) |
| POST   | `/api/start`   | READY/STOPPED → RUNNING                                |
| POST   | `/api/stop`    | RUNNING → STOPPED                                      |
| POST   | `/api/reset`   | Restart the simulation from Machine Checks             |

No login is required — the assignment's login note is conditional on restricted access,
and this HMI has a single operator with no sensitive data.
