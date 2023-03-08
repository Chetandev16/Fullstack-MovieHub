import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/user'
import { Link } from 'react-router-dom'
import wave from '../assets/waving-hand.png'
import Swal from 'sweetalert2'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const url = import.meta.env.VITE_API_URL;

    const handelLogin = async () => {
        if (email === '' || password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            })
            return;
        }
        const res = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const token = await res.json();
        // console.log(token);
        if (token == 'User does not exists') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User does not exists!',
            })
        }


        if (res.status === 200) {
            localStorage.setItem('jwt', token);
            localStorage.setItem('email', email);
            dispatch(login({
                email: email,
                password: password,
                isLogin: true,
                jwt: token
            }))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invaild credentials!',
            })
        }

    }
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
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="text" />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[oswald] text-xl tracking-widest'>Password:</h1>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="password" />
                        </div>
                    </div>

                    <button className='bg-[#555555] hover:bg-[#333333] transition-colors ease-linear w-[100px] py-3 rounded-lg font-[oswald] text-lg tracking-wider' onClick={
                        () => {
                            handelLogin();
                        }
                    } >LogIn</button>

                </div>
            </div>
        </div>
    )
}

export default Login