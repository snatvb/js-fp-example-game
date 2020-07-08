import { curry, clamp, evolve, compose } from "ramda"
import getHeight from "../helpers/getHeight"
import { RigidBody, Shape } from "../types"
import { State } from "../state"

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

export default physicSimulate
