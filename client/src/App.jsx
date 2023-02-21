import React from "react"
import Background from "./components/Background"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllMovies from "./components/AllMovies.jsx"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import Content from "./components/Content"
import Movie from "./components/Movie"


function App() {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.value)

  const setstyle = {
    backgroundColor: theme === 'dark' ? '#444444' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
  }

  return (


    <div className="relative h-screen overflow-y-auto transition-colors duration-200 ease-linear" style={setstyle}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Background />} />
            {/* <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} /> */}
            <Route path="/content" element={<Content />} />
            <Route path="/allmovies" element={<AllMovies />} />
            <Route path="/content/movie/:id" element={<Movie/>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
    </div>

  )
}

export default App
