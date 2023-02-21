import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from "./features/user"
import themeReducer from "./features/theme"
import movieReducer from "./features/movies"
const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    movies: movieReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>

)
