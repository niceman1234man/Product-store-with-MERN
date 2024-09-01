import React from 'react'

function Login() {
  return (
   

    <div className='bg-gray-950 text-sky-600  h-screen'>
        <div className=' flex flex-col items-center justify-center mx-auto w-[500px] bg-slate-400 p-4 rounded-md'>
            <h2 className='text-2xl'>LOGIN</h2>
            <form className='flex flex-col justify-center'>
               
                <label htmlFor="email" className='p-2'>Email</label>
                <input type="email"  placeholder='Email' className='p-2  w-[400px]'/>
                <label htmlFor="password" className='p-2'>Password</label>
                <input type="password" placeholder='*******' className='p-2  w-[400px]' />
                <button type='submit' className='p-2 bg-sky-200 m-2 rounded-lg'>Login</button>
            </form>
            <p> Have No An Account ? Sign Up</p>
        </div>
    </div>
  )
}

export default Login