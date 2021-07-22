export function createStore(rootReducer, initialState = {}) {
  const state = rootReducer({ type: '__INIT__' }, initialState)
  let listeners = []

  return {
    dispatch(action) {
      const newState = rootReducer(action, state)
      listeners.forEach(listener => listener(newState))
    },

    subscribe(fn) {
      listeners.push(fn)

      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener != fn)
        },
      }
    },

    getState() {
      return state
    },
  }
}
