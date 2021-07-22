import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header'
import { Toolbar } from './components/toolbar/Toolbar'
import { Formula } from './components/formula/Formula'
import { Table } from './components/table/Table'
import './scss/index.scss'
import { createStore } from './redux/createStore'
import { rootReducer } from './redux/rootReducer'
import { storage } from './core/utils'

const localStorageKey = 'excel-state'

const store = createStore(rootReducer, { colState: storage(localStorageKey).colState || {}, rowState: storage(localStorageKey).rowState || {} })

store.subscribe(state => {
  storage(localStorageKey, state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store: store,
})

excel.render()
