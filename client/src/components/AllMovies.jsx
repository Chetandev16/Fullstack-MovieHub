import React, { useState, useEffect } from 'react'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import Swal from 'sweetalert2'
import { setMovies } from '../features/movies';

const AllMovies = () => {
  const [isLoding, setIsLoding] = useState(true)
  const url = import.meta.env.VITE_API_URL;

  const theme = useSelector(state => state.theme.value)
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.value)
  useEffect(() => {
    const getMovies = async () => {
      try {
        // const res = await fetch(`https://movie-backend-production-cedb.up.railway.app/api/movies/allmovies`,
        const res = await fetch(`${url}/api/movies/allmovies`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            // 'Authorization': 'Bearer ' + user.jwt
          }
        })
        const data = await res.json()
        dispatch(setMovies(data))
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Session Timed Out! Please Login Again',
        })
        return;
      }
    }

    getMovies()
    setTimeout(() => {
      setIsLoding(false)
    }, 2000)
  }, [])


  useEffect(() => {
    setTimeout(()=>{
      toast.success('Movies Loaded Successfully!!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: theme === 'dark' ? 'dark' : 'light',
      });
    },2500)
  },[])

  if (isLoding || movies.length === 0) {
    return (
      <>
        <div className='absolute top-1/2 left-[40%] lg:left-[45%] flex flex-col text-center items-center justify-center'>
          <ScaleLoader
            color="#222222"
            height={20}
            margin={5}
            radius={5}
            width={5}
          />
          <h1>LOADING</h1>
        </div>
      </>
    )
  } else {
    return (
      <div className='flex flex-col mt-10 gap-4 justify-center items-center'>
        <h2 className='text-center tracking-[0.5rem] text-3xl'>Moives Listed</h2>
        <div className='flex flex-col items-center md:grid-cols-2 lg:grid lg:grid-cols-4  h-fit w-[90%] mt-10 font-bold font-[oswald]'>
          {movies.map((movie) => {
            return (
              <Card key={movie.imdbId} movie={movie} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default AllMovies