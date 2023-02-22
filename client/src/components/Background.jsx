import React from 'react'
import video from '../assets/bg.mp4'
import { Link } from 'react-router-dom'

const Background = () => {
    return (
        <div className='w-full h-screen relative'>
            <video className='w-full h-full object-cover' src={video} autoPlay loop muted></video>
            <div className='absolute w-full h-full top-0 flex flex-col gap-6 text-white justify-end pb-[77%] lg:justify-end lg:pb-[17%] items-center'>
                <h1 className='font-[oswald] text-2xl lg:text-3xl '>WELCOME TO MOVIE REVIEW HUB!!</h1>
                <Link className='bg-green-600 px-4 py-2 rounded-lg hover:bg-green-800 transition-all delay-75 duration-200 ease-in-out' to="/login">Get Started</Link>
            </div>
        </div>
    )
}

export default Background