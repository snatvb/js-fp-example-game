import { Maybe } from 'monad-maniac'

export type Point = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type Rectangle = {
  width: number
  height: number
}

export type Circle = {
  center: Point
  radius: number
}

export enum ShapeType {
  Rectangle = 'Rectangle',
  Circle = 'Circle',
}

export type ShapePattern<Type, Figure> = {
  type: Type
  figure: Figure
}

export type Shape = (
  ShapePattern<ShapeType.Circle, Circle>
  | ShapePattern<ShapeType.Rectangle, Rectangle>
)

export enum GFXType {
  Primitive = 'Primitive',
}

export type GFXMeta = {
  fillStyle: string | CanvasGradient | CanvasPattern
}

export type GFXPattern<Type, GFXInfo> = {
  type: Type
  info: GFXInfo
  meta: GFXMeta
}

export type GFX = (
  GFXPattern<GFXType.Primitive, Shape>
)

export type RigidBodyMeta = {
  direction: Point
  velocity: number
}

export type RigidBody = {
  shape: Shape
  weight: number
  isTriggering: boolean
  isKinematic: boolean
  meta: Maybe.Shape<RigidBodyMeta>
}

export type PhysicsObject = {
  rigidbody: RigidBody
  position: Point
}
