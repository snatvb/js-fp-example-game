import { State } from "./state";
import { compose, reduce, clamp, evolve } from "ramda";
import curry from "lodash.curry";
import { ActionType, Action } from "./actions";
import { RigidBody, Shape } from "./types";
import getHeight from "./helpers/getHeight";

const ACCELERATION = 9.8
const RADIUS = 40

const applyGravityClamp = curry((ctx: CanvasRenderingContext2D, force: number, shape: Shape, y: number) => {
  return clamp(0, ctx.canvas.height - getHeight(shape), y + force)
})

const getGravityForce = curry((rigidbody: RigidBody, state: State) => {
  return ACCELERATION * (state.player.rigidbody.weight * state.settings.gravity) / Math.pow(RADIUS, 2)
})

const playerSimulate = (state: State) => {
  return evolve({
    player: {
      position: {
        y: applyGravityClamp(state.ctx, getGravityForce(state.player.rigidbody, state), state.player.rigidbody.shape),
      },
    },
  }, state)
}

const physicSimulate = compose(
  playerSimulate,
)


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
