import { identity } from 'ramda'
import { Maybe } from 'monad-maniac'

import { createLevel, State } from './state'
import updateState from './updateState'
import render from './render'
import { physicSimulation } from './actions'

const actionsRequired = [
  physicSimulation,
]

const run = (ctx: CanvasRenderingContext2D) => {
  let stopped = false
  let reqId = Maybe.nothing<number>()
  let actions = [...actionsRequired]

  const loop = (state: State) => {
    if (!stopped) {
      const newState = updateState(actions, state)
      render(newState)
      reqId = Maybe.of(requestAnimationFrame(() => loop(newState)))
      actions = [...actionsRequired]
    }
  }

  reqId = Maybe.of(requestAnimationFrame(() => {
    const initState = createLevel(ctx, { x: 0, y: 0 })
    loop(initState)
  }))

  return () => {
    stopped = true
    reqId.map(cancelAnimationFrame)
  }
}

export const start = (canvas: HTMLCanvasElement) => {
  const ctx = Maybe.of(canvas.getContext('2d')).caseOf({
    Just: identity,
    Nothing: () => {
      throw new Error('Cannot get 2d context of canvas')
    },
  })
  const updateCanvasSize = () => {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
  }

  const reqId = requestAnimationFrame(updateCanvasSize)
  window.addEventListener('resize', updateCanvasSize)

  const stop = run(ctx)
  return () => {
    cancelAnimationFrame(reqId)
    window.removeEventListener('resize', updateCanvasSize)
    stop()
  }
}
