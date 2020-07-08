import { compose, tap } from 'ramda'
import { State } from "../state"
import renderPlayer from './player'
import renderPlatforms from './platforms'

const clear = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const render = (state: State) => {
  compose(
    tap(renderPlatforms(state.platforms)),
    tap(renderPlayer(state.player)),
    tap(clear),
  )(state.ctx)
}

export default render
