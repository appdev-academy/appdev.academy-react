import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allReducers from './redux/reducers/index'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

// Router
import routes from './routes'

let logger = createLogger({
  collapsed: true
})

let store = createStore(
  allReducers,
  applyMiddleware(thunk, promise, logger)
)

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)