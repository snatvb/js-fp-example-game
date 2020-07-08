import curry from 'lodash.curry'
import { Player } from "../state"
import renderGfx from './gfx'

const render = curry(({ gfx, position }: Player, ctx: CanvasRenderingContext2D) => {
  renderGfx(ctx, position, gfx)
})

export default render
