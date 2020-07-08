
export enum ActionType {
  PhysicSimulation = 'PhysicSimulation',
}

export type ActionPattern<Type, Payload = void> = Payload extends void ? {
  type: Type
} : {
  type: Type
  payload: Payload
}

export type PhysicSimulation = ActionPattern<ActionType.PhysicSimulation>

export type Action = (
  PhysicSimulation
)

export const physicSimulation: PhysicSimulation = {
  type: ActionType.PhysicSimulation,
}
