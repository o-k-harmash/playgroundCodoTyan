export type Listener = () => void

export function createStore<T>(initial: T) {
  let state = initial
  const listeners = new Set<Listener>()

  return {
    get: () => state,
    set: (fn: (prev: T) => T) => {
      state = fn(state)
      listeners.forEach((l) => l())
    },
    subscribe: (l: Listener) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
  }
}
