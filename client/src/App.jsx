import React, { useEffect } from "react"
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
import { login } from "./features/user"
import Review from "./components/Review"

function App() {
  const dispatch = useDispatch()
  // console.log(import.meta.env.VITE_API_URL);
  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      const token = JSON.parse(localStorage.getItem('token'))
      dispatch(login({
        email: '',
        password: '',
        isLogin: true,
        jwt: token
      }))
    }
  }, [])

  const theme = useSelector(state => state.theme.value)
  const user = useSelector(state => state.user.value)

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

          <Route path="/content/review/:id" element={<ProtectedMain>
            <Review />
          </ProtectedMain>} />
        
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>

  )
}

export default App
