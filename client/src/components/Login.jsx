import React from 'react'
import { useDispatch} from 'react-redux'
import { login } from '../features/user'
import { Link } from 'react-router-dom'
import wave from '../assets/waving-hand.png'

const Login = () => {
    const dispatch = useDispatch();
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[300px] h-[650px] lg:w-[400px] rounded-xl bg-[#222222] shadow-xl lg:h-[700px]'>
                <div className='flex flex-col justify-evenly h-full items-center px-2 py-2'>
                    <div className='flex gap-2 '>
                        <p className='underline font-[oswald] tracking-wider cursor-pointer'>Login</p>/
                        <Link className=' font-[oswald] transition-colors ease-linear tracking-wider text-[#555555] hover:text-[#444444] cursor-pointer' to="/signup">Signup</Link>
                    </div>
                    <div className='flex items-center justify-center text-center h-[40px]'>
                        <h1 className='font-[oswald] font-bold text-3xl'>Welcome!!</h1>
                        <img className='h-6' src={wave} alt="" />
                    </div>

                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[oswald] text-xl tracking-widest'>Email:</h1>
                            <input className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="text" />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[oswald] text-xl tracking-widest'>Password:</h1>
                            <input className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="password" />
                        </div>
                    </div>

                    <button className='bg-[#555555] hover:bg-[#333333] transition-colors ease-linear w-[100px] py-3 rounded-lg font-[oswald] text-lg tracking-wider' onClick={
                        () => dispatch(login({
                            email: '',
                            password: '',
                            isLogin: true
                        }))
                    } >LogIn</button>

                </div>
            </div>
        </div>
    )
}

export default Login