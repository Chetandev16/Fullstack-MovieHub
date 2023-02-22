import React from "react"
import Background from "./components/Background"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllMovies from "./components/AllMovies.jsx"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import Content from "./components/Content"
import Movie from "./components/Movie"
import Login from "./components/Login"
import Signup from "./components/Signup"
import ProtectedMain from "./components/ProtectedMain"
import ProtectedLogin from "./components/ProtectedLogin"


function App() {
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
          <Route path='/login' element={<ProtectedLogin>
            <Login />
          </ProtectedLogin>} />
          <Route path='/signup' element={<ProtectedLogin>
            <Signup />
          </ProtectedLogin>} />
          <Route path="/content" element={
            <ProtectedMain>
              <Content />
            </ProtectedMain>
          } />
          <Route path="/allmovies" element={<ProtectedMain>
            <AllMovies />
          </ProtectedMain>} />
          <Route path="/content/movie/:id" element={<ProtectedMain>
            <Movie />
          </ProtectedMain>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>

  )
}

export default App
