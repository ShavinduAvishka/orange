import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import bgpic from '../orange-bg.jpg'

import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'



interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }
  
  
    const [open, setOpen] = useState(false)

    // handle toggle 
    const toggle = () =>{
        setOpen(!open)
    }


  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Orange</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <img
        src="https://rb.gy/we8jfx"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-8 drop-shadow-2xl"
        width={180}
        height={180}
      />
      <Image
      src={bgpic}
      layout="fill"
      className="-z-10 !hidden opacity-100 sm:!inline"
      objectFit="cover"/>

     
  
      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 
        outline outline-offset-2 outline-1 outline-[#ffa600]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold hover:text-[#ffa600]">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full caret-[#ffa600]">
            <input
              type="email"
              placeholder="Email"
              className={`input ${
                errors.email && 'border-b-2 border-[#ffa600]'
              }`}
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[15px] font-light  text-[#ffa600]">
                Please enter a valid Email Address.
              </p>
            )}

          </label>
          <label className="inline-block w-full caret-[#ffa600]">
          
            <input
              type={(open === false)? 'password' :'text'}
              {...register('password', { required: true })}
              placeholder="Password"
              className={`input ${
                errors.password && 'border-b-2 border-[#ffa600]'
              }`}
            />
             
            {errors.password && (
              <p className="p-1 text-[15px] font-light  text-[#ffa600]">
                Your Password should be at least 6 characters.
              </p>
            )}

            <div className='absolute inset-y-0 right-16 pr-2 flex items-center text-xl leading-5 hover:text-[#ffa600]'>
                      {
                          (open === false)? <AiFillEye onClick={toggle}/>:
                          <AiFillEyeInvisible onClick={toggle}/>

                      }
                      
                      
            </div> 
          </label>
        </div>

        <button
          className="w-full rounded bg-[#ffa500] py-3 font-semibold transition ease-in-out delay-120  hover:-translate-y-1 hover:scale-105 hover:bg-[#ffb500] duration-300"
          onClick={() => setLogin(true)}
          type="submit"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to <b>Orange?</b>{' '}
          <button
            className="cursor-pointer text-white hover:underline decoration-2 decoration-[#ffa600]"
            onClick={() => setLogin(false)}
            type="submit"
          >
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login