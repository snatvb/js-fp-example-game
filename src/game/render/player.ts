import { Player } from "../state"
import renderGfx from './gfx'

const render = (ctx: CanvasRenderingContext2D, { gfx, position }: Player) => {
  renderGfx(ctx, position, gfx)
}

export default render
