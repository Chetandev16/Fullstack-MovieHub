import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ movie }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            navigate(`/content/movie/${movie.imdbId}`)
        }} className='text-center w-fit flex flex-col gap-2 my-2'>
            <img className='h-[450px] w-[300px] object-cover rounded-xl transition-all ease-linear cursor-pointer shadow-black hover:scale-105 shadow-xl'
                src={movie.poster} alt="" />
            <h1>{movie.title}</h1>
        </div>
    )
}

export default Card