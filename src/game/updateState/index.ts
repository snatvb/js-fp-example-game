import { compose, reduce } from "ramda";
import curry from "lodash.curry";
import { State } from "../state";
import { ActionType, Action } from "../actions";
import physicSimulate from './physics'


const handlePhysics = curry((action: Action, state: State): State => {
  if (action.type === ActionType.PhysicSimulation) {
    return physicSimulate(state)
  } else {
    return state
  }
})

const update = (actions: Action[], state: State): State => (
  reduce(
    (accState, action) => compose(handlePhysics(action))(accState),
    state,
    actions,
  )
)

export default update
