import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners'

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({})
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (idx + 1 >= movie.backdrops.length) {
                setIdx(0);
            } else {
                setIdx(idx + 1);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [movie, idx])

    useEffect(() => {
        const preloadImages = async () => {
            const promises = movie.backdrops.map((image) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = image;
                });
            });

            try {
                await Promise.all(promises);
            } catch (error) {
                console.log('Error preloading images', error);
            }
        };

        preloadImages();
    }, [movie]);


    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/movies/imdb/${id}`)
                const data = await response.json();
                setMovie(data);
            } catch (e) {
                console.log(e);
            }
        }

        getMovie();
    }, [])


    if (movie.backdrops === undefined) {
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
            <div className='relative'>
                <div className="blur-sm bg-no-repeat bg-cover h-screen overflow-auto flex justify-center items-center" style={{
                    backgroundImage: `url(${movie.backdrops[idx]})`,
                }}>
                </div >


                <div className='absolute h-[700px]  top-[16%] left-[16%] lg:top-[30%] lg:left-[14%] w-[70%] lg:h-[50%] flex flex-col lg:flex-row justify-between items-center'>
                    <img src={movie.poster} className="rounded-xl shadow-xl shadow-black cursor-pointer transition-transform ease-linear hover:scale-105 h-[400px] w-[300px] object-cover" alt="" />
                    <div className='flex flex-col lg:justify-between justify-evenly items-center h-full'>
                        <h1 className="text-2xl lg:text-5xl underline font-[oswald] font-bold">{movie.title}</h1>

                        <button className='px-4 py-2 bg-blue-600 w-fit rounded-2xl hover:bg-blue-800 transition-all ease-linear delay-100 hover:scale-110' >Watch Trailer</button>
                        <button className='px-4 py-2 bg-blue-600 w-fit rounded-2xl hover:bg-blue-800 transition-all ease-linear delay-100 hover:scale-110' >Movie Review</button>

                        <div className='flex gap-2 lg:gap-6 justify-center'>
                            {movie.genres.map((genre) => {
                                return (
                                    <span className="text-md font-light font-[oswald] bg-gray-400 px-2 py-1 rounded-3xl justify-evenly">{genre}</span>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <Link to='/content' className='absolute top-10 left-10 text-2xl font-bold text-gray-600 hover:text-gray-300 transition-all ease-linear delay-100 hover:scale-110'>Back</Link>
            </div>
        )
    }
}

export default Movie