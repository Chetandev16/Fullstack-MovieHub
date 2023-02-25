import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { changeTheme } from '../features/theme'
import lightlogo from '../assets/light.png'
import { logout } from '../features/user'
import darklogo from '../assets/dark.png'

const Navbar = () => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.value)
    const [toggle, setToggle] = useState(theme === 'light' ? true : false);
    const toggleClass = "transform translate-x-7";
    const changeStyle = {
        backgroundColor: theme === 'dark' ? '#222222' : '#fff',
    }
    const shadow = theme === 'light' ? 'shadow-[#bdbdbd]' : 'shadow-[#111111]'
    const dislight = theme === 'light' ? 'block' : 'hidden'
    const disdark = theme === 'dark' ? 'block' : 'hidden'
    const img = theme === 'light' ? lightlogo : darklogo
    const toggleBackground = theme === 'light' ? 'bg-[#e6e6e6]' : 'bg-gray-400'
    const toggleBackground2 = theme === 'light' ? 'bg-gray-400' : 'bg-black'

    return (
        <div className={`py-9 px-8 flex transition-all duration-200 ease-linear justify-between items-center shadow-lg ${shadow} h-[1.8rem] w-full`} style={changeStyle}>
            <img src={img} alt="" width="80px" />
            <div className='flex gap-10'>
                <button onClick={
                    () => {
                        localStorage.removeItem('jwt')
                        dispatch(changeTheme('dark'))
                        dispatch(logout())
                    }
                } className='font-[oswald] tracking-wider hover:text-[#555555] transition-colors ease-linear'>Log Out</button>
                <div className="flex flex-col justify-center h-screen items-center ">

                    <div
                        className={`relative md:w-[3.8rem] md:h-7 w-14 h-6 flex items-center ${toggleBackground} rounded-full p-[6px] cursor-pointer`}
                        onClick={() => {
                            setToggle(!toggle);
                            dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'))
                        }}
                    >
                        <div
                            className={
                                `${toggleBackground2} md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out` +
                                (toggle ? null : toggleClass)
                            }
                        ></div>

                        <div className={`absolute right-[5px] text-black h-5 w-5 ${dislight}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className={`absolute left-[5px] text-orange-200 h-5 w-5 ${disdark}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                            </svg>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar