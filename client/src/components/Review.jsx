import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Review = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [review, setReview] = useState('')
    const [movie, setMovie] = useState({})
    const [idx, setIdx] = useState(0)
    const theme = useSelector(state => state.theme.value)
    const [name,setName] = useState('')
    const email = localStorage.getItem('email');
    const [rerender, setRerender] = useState(0);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        getMovie();
    }, [rerender])
  

    useEffect(() => {
        const fetchName = async () => {
            const res = await fetch(`${url}/auth/getUsername/${email}`);
            const data = await res.text();
            if(data !== "user is not present"){
                setName(data);
            }
        }

        fetchName();
    },[])


    const handleCreateReview = async () => {
        const displayName = name.split(' ')[0];
        const response = await fetch(`${url}/api/movies/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                imdbId: movie.imdbId,
                name: displayName,
                body: review
            }),
        });

        if(response.status === 200) {
            toast.success('Review Added!!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: theme === 'dark' ? 'dark' : 'light',
              });
            navigate(`/content/review/${movie.imdbId}`);
            setRerender(rerender + 1);
        }else{
            console.log('error');
        }
    }

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

    const getMovie = async () => {
        try {
            //  const response = await fetch(`https://movie-backend-production-cedb.up.railway.app/api/movies/imdb/${id}`
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

    useEffect(() => {
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
                <div className={`relative`}>
                    <div className="blur-sm bg-no-repeat bg-cover h-screen overflow-auto flex justify-center items-center" style={{
                        backgroundImage: `url(${movie.backdrops[idx]})`,
                    }}>
                    </div >


                    <div className='absolute h-[700px] top-[16%] left-[16%] lg:top-[30%] lg:left-[14%] w-[70%] lg:h-[50%] flex flex-col lg:flex-row justify-around items-center'>
                        <img src={movie.poster} className="rounded-xl shadow-xl shadow-black cursor-pointer transition-transform ease-linear hover:scale-105 h-[400px] w-[300px] object-cover" alt="" />
                        <div className='flex flex-col lg:justify-between justify-evenly items-center h-full'>

                            <div className='flex flex-col gap-4'>
                                <h1 className="text-2xl lg:text-5xl underline font-[oswald] font-bold">{movie.title}</h1>
                                <div className='flex justify-center gap-3 items-center'>
                                    <input value={review} onChange={(e) => setReview(e.target.value)} className='w-[250px] lg:w-[450px] h-[30px] px-3 py-5 bg-[#222222] rounded-lg' type="text" placeholder='Add a review!' />
                                    <button onClick={() => {
                                        setReview('');
                                        handleCreateReview();
                                    }} className='bg-blue-500 transition-colors ease-linear hover:bg-blue-700 px-8 py-2 rounded-xl'>Add</button>
                                </div>
                            </div>

                            <div className='w-[340px] lg:w-[550px] h-[150px] lg:h-[300px] flex flex-col gap-2 overflow-y-scroll scrollbar-hide'>
                                {movie.reviewIds.slice(0).reverse().map((review) => {
                                    return (
                                        <div className='flex border border-black p-5 bg-[#222222]'>
                                            <h1 className="font-[oswald] ">{review.name} :</h1>
                                            <p className="font-[oswald] tracking-widest">{review.body}</p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>

                    <Link to={`/content/movie/${movie.imdbId}`} className={`absolute top-10 left-10 text-2xl font-bold text-gray-600 hover:text-gray-300 transition-all ease-linear delay-100 hover:scale-110`}>Back</Link>
                </div>
            </div>
        )
    }
}

export default Review