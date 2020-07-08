import curry from 'lodash.curry'
// const toUpperCase = (x) => x.toUpperCase()
// const includes = (x) => (v) => v.includes(x)
// const slice = (start, end) => (arr) => arr.slice(start, end)
// const startsWith = (starts) => (str) => str.startsWith(starts)
// const startsWithNot = (starts) => (str) => !str.startsWith(starts)


export const range = curry(function* (from: number, to: number) {
  for (let i = from; i <= to; i++) {
    yield i
  }
})

export const map = <T, R>(f: (v: T) => R) => {
  return function* (iter: IterableIterator<T>) {
    for (const item of iter) {
      yield f(item)
    }
  }
}

export const filter = <T>(f: (v: T) => boolean) => {
  return function* (iter: IterableIterator<T>) {
    for (const item of iter) {
      if (f(item) === true) {
        yield item
      }
    }
  }
}

export const packList = <T>(iter: IterableIterator<T>) => {
  let result = []
  for (const item of iter) {
    result.push(item)
  }
  return result
}
