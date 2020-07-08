import { Shape, ShapeType } from "../types";

export const getHeight = (shape: Shape): number => {
  switch(shape.type) {
    case ShapeType.Rectangle:
      return shape.figure.height

    case ShapeType.Circle:
      return shape.figure.radius
  }

  // throw new Error(`Undefined behaviour: Unreachable value type`)
}

export default getHeight
