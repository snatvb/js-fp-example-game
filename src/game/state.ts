import { Point, GFX, RigidBody, GFXType, ShapeType, Shape } from "./types"
import { range, map, packList } from "./helpers/iters"
import { compose } from "ramda"
import curry from "lodash.curry"
import randInt from "./helpers/randInt"

export type Settings = {
  gravity: number
}

export type Player = {
  position: Point
  gfx: GFX
  rigidbody: RigidBody
}

export type Platform = {
  position: Point
  gfx: GFX
  rigidbody: RigidBody
}

export type Platforms = Platform[]

export type State = {
  player: Player
  ctx: CanvasRenderingContext2D
  settings: Settings
  platforms: Platforms
}

const PLATFORM_HEIGHT = 20
const PLATFORM_WIDTH_MIN = 50
const PLATFORM_WIDTH_MAX = 300
const randomizePlatform = curry((ctx: CanvasRenderingContext2D, maxY: number, num: number): Platform => {
  const width = randInt(PLATFORM_WIDTH_MIN, PLATFORM_WIDTH_MAX)
  const height = PLATFORM_HEIGHT
  console.log(ctx.canvas.width)
  const position = {
    x: randInt(0, ctx.canvas.width - width),
    y: randInt(0, maxY),
  }

  const shape: Shape = {
    type: ShapeType.Rectangle,
    figure: {
      width,
      height,
    },
  }

  return {
    position,
    gfx: {
      type: GFXType.Primitive,
      info: shape,
      meta: {
        fillStyle: 'black',
      },
    },
    rigidbody: {
      shape,
      weight: 1,
      isKinematic: true,
      isTriggering: false,
    },
  }
})

const SPACE_Y = 200
const randomizePlatforms = (ctx: CanvasRenderingContext2D, count: number) => {
  const maxY = ctx.canvas.height - SPACE_Y
  return compose(
    packList,
    map(randomizePlatform(ctx, maxY)),
  )(range(1, count))
}

export const createLevel = (ctx: CanvasRenderingContext2D, playerSpawnPoint: Point): State => {
  const playerShape: Shape = {
    type: ShapeType.Rectangle,
    figure: {
      width: 50,
      height: 50,
    },
  }

  return {
    ctx,
    player: {
      position: playerSpawnPoint,
      gfx: {
        type: GFXType.Primitive,
        info: playerShape,
        meta: {
          fillStyle: 'black',
        },
      },
      rigidbody: {
        shape: playerShape,
        weight: 1,
        isKinematic: false,
        isTriggering: false,
      },
    },
    settings: {
      gravity: 1000,
    },
    platforms: randomizePlatforms(ctx, 10),
  }
}
