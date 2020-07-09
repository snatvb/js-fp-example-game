import { compose } from "ramda"
import curry from "lodash.curry"
import { Maybe } from 'monad-maniac'
import { Point, GFX, RigidBody, GFXType, ShapeType, Shape, Size, PhysicsObject } from "./types"
import { range, map, packList } from "./helpers/iters"
import randInt from "./helpers/randInt"

export type Settings = {
  gravity: number
}

export type Player = PhysicsObject & {
  gfx: GFX
}

export type Platform = PhysicsObject & {
  gfx: GFX
}

export type Platforms = Platform[]

export type State = {
  player: Player
  ctx: CanvasRenderingContext2D
  settings: Settings
  platforms: Platforms
}

const createPlatform = (position: Point, size: Size): Platform => {
  const shape: Shape = {
    type: ShapeType.Rectangle,
    figure: size,
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
      meta: Maybe.nothing(),
    },
  }
}

const PLATFORM_HEIGHT = 20
const PLATFORM_WIDTH_MIN = 50
const PLATFORM_WIDTH_MAX = 300
const randomizePlatform = curry((ctx: CanvasRenderingContext2D, maxY: number, num: number): Platform => {
  const width = randInt(PLATFORM_WIDTH_MIN, PLATFORM_WIDTH_MAX)
  const height = PLATFORM_HEIGHT
  const position = {
    x: randInt(0, ctx.canvas.width - width),
    y: randInt(0, maxY),
  }

  return createPlatform(position, { width, height })
})

const SPACE_Y = 200
const randomizePlatforms = (ctx: CanvasRenderingContext2D, count: number) => {
  const maxY = ctx.canvas.height - SPACE_Y
  return compose(
    packList,
    map(randomizePlatform(ctx, maxY)),
  )(range(1, count))
}

const FLOOR_HEIGHT = 20
const createFloor = (ctx: CanvasRenderingContext2D) => {
  const position = {
    y: ctx.canvas.height - FLOOR_HEIGHT,
    x: 0,
  }
  const size = {
    width: ctx.canvas.width,
    height: FLOOR_HEIGHT
  }

  return createPlatform(position, size)
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
        meta: Maybe.nothing(),
      },
    },
    settings: {
      gravity: 1000,
    },
    platforms: [
      createFloor(ctx),
      ...randomizePlatforms(ctx, 10)
    ],
  }
}
