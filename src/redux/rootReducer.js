const TABLE_RESIZE_COL = 'TABLE_RESIZE_COL'
const TABLE_RESIZE_ROW = 'TABLE_RESIZE_ROW'

export function rootReducer(action, state = {}) {
  switch (action.type) {
    case TABLE_RESIZE_COL: {
      const colState = state.colState
      colState[action.data.id] = action.data.value
      return { ...state, colState }
    }
    case TABLE_RESIZE_ROW: {
      const rowState = state.rowState
      rowState[action.data.id] = action.data.value
      return { ...state, rowState }
    }
  }
  return state
}
