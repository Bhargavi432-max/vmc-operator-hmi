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

export const STAGE_TITLES: Record<Stage, string> = {
  machine_checks: 'Machine Checks',
  tools: 'Required Tools',
  workpiece: 'Workpiece Setup',
  ready: 'Ready Review',
  operation: 'Operation',
}
