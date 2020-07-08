import { Point, GFX, RigidBody, GFXType, ShapeType, Shape } from "./types"

export type Settings = {
  gravity: number
}

export type Player = {
  position: Point
  gfx: GFX
  rigidbody: RigidBody
}

export type State = {
  player: Player
  ctx: CanvasRenderingContext2D,
  settings: Settings
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
      },
    },
    settings: {
      gravity: 1000,
    }
  }
}
