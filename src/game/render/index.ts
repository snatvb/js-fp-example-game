import { State } from "../state"
import renderPlayer from './player'

const clear = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const render = (state: State) => {
  clear(state.ctx)
  renderPlayer(state.ctx, state.player)
}

export default render
