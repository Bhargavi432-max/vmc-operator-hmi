export const SCENARIO = {
  operation: 'Bracket Face & Bore — Op 20',
  quantity: 25,
  material: 'Aluminum 6061-T6',
  drawingRevision: 'Rev C',
  cncProgram: 'O1245',
  fixture: 'Vice-mounted fixture plate FX-114',
  workOffset: 'G54',
}

export type ChecklistItem = {
  id: string
  label: string
  detail?: string
  confirmed: boolean
}

export type Stage = 'machine_checks' | 'tools' | 'workpiece' | 'ready' | 'operation'

export type OperationStatus = 'READY' | 'RUNNING' | 'STOPPED'

export type HmiState = {
  stage: Stage
  machineChecks: ChecklistItem[]
  tools: ChecklistItem[]
  workpiece: ChecklistItem[]
  operationStatus: OperationStatus
}

export const STAGE_ORDER: Stage[] = ['machine_checks', 'tools', 'workpiece', 'ready', 'operation']

export function defaultState(): HmiState {
  return {
    stage: 'machine_checks',
    machineChecks: [
      { id: 'power', label: 'Power / control available', confirmed: false },
      { id: 'estop', label: 'E-stop released', confirmed: false },
      { id: 'guard', label: 'Guard / door closed', confirmed: false },
      { id: 'alarm', label: 'No active alarm', confirmed: false },
      { id: 'lube', label: 'Lubrication / coolant ready', confirmed: false },
      { id: 'reference', label: 'Reference return complete', confirmed: false },
    ],
    tools: [
      {
        id: 't01',
        label: 'T01 — Face Mill Ø63mm',
        detail: `Roughing · Program ${SCENARIO.cncProgram} Rev C`,
        confirmed: false,
      },
      {
        id: 't02',
        label: 'T02 — End Mill Ø12mm, 4-flute',
        detail: `Finishing · Program ${SCENARIO.cncProgram} Rev C`,
        confirmed: false,
      },
      {
        id: 't03',
        label: 'T03 — Drill Ø8.5mm',
        detail: `Through hole · Program ${SCENARIO.cncProgram} Rev C`,
        confirmed: false,
      },
      {
        id: 't04',
        label: 'T04 — Tap M10 x 1.5',
        detail: `Threading · Program ${SCENARIO.cncProgram} Rev C`,
        confirmed: false,
      },
    ],
    workpiece: [
      {
        id: 'fixture',
        label: 'Mount fixture',
        detail: `${SCENARIO.fixture} — torque clamps to spec`,
        confirmed: false,
      },
      {
        id: 'orientation',
        label: 'Orient workpiece',
        detail: `${SCENARIO.material}, Drawing ${SCENARIO.drawingRevision} — datum A forward`,
        confirmed: false,
      },
      {
        id: 'clamping',
        label: 'Clamp workpiece',
        detail: 'Verify clamping pressure before release',
        confirmed: false,
      },
      {
        id: 'offset',
        label: 'Set work offset',
        detail: `${SCENARIO.workOffset} — confirm via edge finder / probe`,
        confirmed: false,
      },
      {
        id: 'program',
        label: 'Confirm CNC program',
        detail: `${SCENARIO.cncProgram} matches Drawing ${SCENARIO.drawingRevision}, Qty ${SCENARIO.quantity}`,
        confirmed: false,
      },
    ],
    operationStatus: 'READY',
  }
}
