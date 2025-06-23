'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import login_background from '../../../public/Login_background.png'
import LoginForm from '@/components/LoginForm/LoginFrom'
function Login() {
  useEffect(()=>{
    if(localStorage.getItem('user')!=null)
      window.location.href = '/';
  },[])
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col lg:flex-row'>
        <div className='w-[100vw] lg:w-[50vw] lg:h-[100vh] h-[35vh] sm:h-[40vh]'>
            <Image src={login_background} className='w-[100vw] lg:w-[50vw] h-[25vh] sm:h-[35vh]  lg:h-[100vh] object-cover'  alt="Login Tree Background"/>
        </div>
        <div className='w-[100vw] lg:w-[50%] h-[75vh] sm:h-[65vh] lg:h-[100vh] flex justify-center items-center'>
            <div className='w-[90%] h-[95%] sm:h-auto sm:w-[70%] lg:w-[60%]'>
              <LoginForm/>
            </div>
            
        </div>
        <div>

        </div>
    </div>
  )
}

export default Login