// Redux, Thunk & Root Reducer imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'redux/reducers/rootReducer'

// initialize middleware
const middleware = [thunk, createDebounce()]

// dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create Store
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

export default store