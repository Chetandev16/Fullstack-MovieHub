import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners'
import { useSelector } from 'react-redux';

const Movie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector(state => state.user.value)
    const [movie, setMovie] = useState({})
    const [idx, setIdx] = useState(0)
    const [display, setDisplay] = useState('hidden')
    const [display2, setDisplay2] = useState('block')
    const [embedUrl, setEmbedUrl] = useState('https://www.youtube.com/embed/');
    const filter = display === 'block' ? 'filter blur-sm grayscale' : ''
    const url = import.meta.env.VITE_API_URL;

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


        const convertToEmbedLink = async (url) => {
            var videoId = '';
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            if (match && match[7].length == 11) {
                videoId = match[7];
            }
            return 'https://www.youtube.com/embed/' + videoId;
        }

        preloadImages();
        convertToEmbedLink(movie.trailerLink).then((res) => {
            setEmbedUrl(res);
        })

    }, [movie]);


    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await fetch(`${url}/api/movies/imdb/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    }
                })
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
                <div className={`${filter} relative`}>
                    <div className="blur-sm bg-no-repeat bg-cover h-screen overflow-auto flex justify-center items-center" style={{
                        backgroundImage: `url(${movie.backdrops[idx]})`,
                    }}>
                    </div >


                    <div className=' absolute h-[700px]  top-[16%] left-[16%] lg:top-[30%] lg:left-[14%] w-[70%] lg:h-[50%] flex flex-col lg:flex-row justify-between items-center'>
                        <img src={movie.poster} className="rounded-xl shadow-xl shadow-black cursor-pointer transition-transform ease-linear hover:scale-105 h-[400px] w-[300px] object-cover" alt="" />
                        <div className='flex flex-col lg:justify-between justify-evenly items-center h-full'>
                            <h1 className="text-2xl lg:text-5xl underline font-[oswald] font-bold">{movie.title}</h1>

                            <button onClick={() => {
                                setDisplay('block');
                                setDisplay2('hidden');
                            }} className='px-4 py-2 bg-blue-600 w-fit rounded-2xl hover:bg-blue-800 transition-all ease-linear delay-100 hover:scale-110' >Watch Trailer</button>
                            <button
                                onClick={() => {
                                    navigate(`/content/review/${movie.imdbId}`)
                                }}
                                className='px-4 py-2 bg-blue-600 w-fit rounded-2xl hover:bg-blue-800 transition-all ease-linear delay-100 hover:scale-110' >Movie Review</button>

                            <div className='flex gap-2 lg:gap-6 justify-center'>
                                {movie.genres.map((genre, id) => {
                                    return (
                                        <span key={id} className="text-md font-light font-[oswald] bg-gray-400 px-2 py-1 rounded-3xl justify-evenly">{genre}</span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <Link to='/content' className={`${display2} absolute top-10 left-10 text-2xl font-bold text-gray-600 hover:text-gray-300 transition-all ease-linear delay-100 hover:scale-110`}>Back</Link>
                </div>

                <svg onClick={() => {
                    setDisplay('hidden');
                    setDisplay2('block');
                }} className={`${display} absolute top-10 left-10 text-white hover:text-[#111111] transition-colors ease-linear h-16 cursor-pointer`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <iframe className={`${display} absolute top-[30%] lg:top-[15%] lg:left-[10%] h-[300px] w-[400px] lg:w-[80%] lg:h-[70%]`} src={embedUrl} title="YouTube video player" allowFullScreen ></iframe>
            </div>
        )
    }
}

export default Movie