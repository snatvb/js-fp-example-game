import { forEach } from 'ramda'
import curry from 'lodash.curry'
import { Platforms } from "../state"
import renderGfx from './gfx'

const render = curry((platforms: Platforms, ctx: CanvasRenderingContext2D) => {
  forEach(({ position, gfx }) => {
    renderGfx(ctx, position, gfx)
  }, platforms)
})

export default render
