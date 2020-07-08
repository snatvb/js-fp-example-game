import { Shape, GFX, GFXType, GFXMeta, ShapeType, Rectangle, Point } from "../types";
import curry from "lodash.curry";

const renderRectangle = curry((ctx: CanvasRenderingContext2D, position: Point, meta: GFXMeta, { width, height }: Rectangle) => {
  ctx.fillStyle = meta.fillStyle
  ctx.fillRect(position.x, position.y, width, height)
})

const renderPrimitive = curry((ctx: CanvasRenderingContext2D, position: Point, meta: GFXMeta, shape: Shape) => {
  switch (shape.type) {
    case ShapeType.Rectangle:
      renderRectangle(ctx, position, meta, shape.figure)
      break

    default:
      console.log('Probably not all render was implements, for example:', shape.type)
      break
  }
})

const render = curry((ctx: CanvasRenderingContext2D, position: Point, gfx: GFX) => {
  switch (gfx.type) {
    case GFXType.Primitive:
      renderPrimitive(ctx, position, gfx.meta, gfx.info)
      break

    default:
      break
  }
})

export default render
