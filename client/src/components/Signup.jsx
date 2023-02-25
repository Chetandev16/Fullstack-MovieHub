import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import wave from '../assets/waving-hand.png'

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');


    const handelSubmit = async () => {
        if(name === '' || email === '' || password === '' || rePassword === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            })
            return;
        }

        if(password !== rePassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            })
            return;
        }

        const validate = await fetch(`http://localhost:8080/auth/validate/${email}`)

        const validateData = await validate.text();
        if(validateData === 'user is present'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email already exists!',
            })
            return;
        }

        const res = await fetch('http://localhost:8080/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                roles: "ROLE_USER",
            }),
        })

        if(res.status === 200){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registered Successfully! Please Login',
                showConfirmButton: false,
                timer: 3500
            })
            navigate('/login')
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[300px] h-[650px] lg:w-[400px] rounded-xl bg-[#222222] shadow-xl lg:h-[700px]'>
                <div className='flex flex-col justify-evenly h-full items-center'>
                    <div className='flex gap-2 '>
                        <Link className=' font-[oswald] transition-colors ease-linear tracking-wider text-[#555555] hover:text-[#444444] cursor-pointer' to='/login'>Login</Link>/
                        <p className='underline font-[oswald] tracking-wider cursor-pointer'>Signup</p>
                    </div>

                    <div className='flex items-center justify-center text-center h-[40px]'>
                        <h1 className='font-[oswald] font-bold text-3xl'>Welcome!!</h1>
                        <img className='h-6' src={wave} alt="" />
                    </div>

                    <div className='flex flex-col gap-6'>

                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[oswald] text-xl tracking-widest'>Name:</h1>
                            <input value={name} onChange={(e) => setName(e.target.value)} className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="text" />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[oswald] text-xl tracking-widest'>Email:</h1>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="text" />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[oswald] text-xl tracking-widest'>Password:</h1>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="password" />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[oswald] text-xl tracking-widest'>Re-Enter Password:</h1>
                            <input value={rePassword} onChange={(e)=>setRePassword(e.target.value)} className='px-2 w-full lg:w-[340px] h-[40px] rounded-lg bg-[#333333] text-white' type="password" />
                        </div>
                    </div>

                    <div>
                        <button onClick={()=>{
                            // console.log('====================================');
                            handelSubmit()
                        }} className='bg-[#555555] hover:bg-[#333333] transition-colors ease-linear py-3 w-[100px] rounded-lg font-[oswald] text-lg tracking-wider' >SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp