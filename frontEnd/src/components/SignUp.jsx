import React from 'react'

function SignUp() {
  return (
    <div className='bg-gray-950 text-sky-600  h-screen'>
        <div className=' flex flex-col items-center justify-center bg-slate-400 p-4 mx-auto w-[500px] font-bold rounded-lg shadow-2xl'>
            <h2 className='text-2xl'>Sign Up</h2>
            <form className='flex flex-col justify-center'>
                <label htmlFor="fname" className='p-2'>First Name</label>
                <input type="text"  placeholder='first Name' className='p-2 w-[400px] outline-green-400' />
                <label htmlFor="lname" className='p-2'>Last Name</label>
                <input type="text"  placeholder='Last Name' className='p-2 outline-green-400'/>
                <label htmlFor="uname" className='p-2'>User Name</label>
                <input type="text"  placeholder='User Name' className='p-2 outline-green-400' />
                <label htmlFor="email" className='p-2'>Email</label>
                <input type="email"  placeholder='Email' className='p-2 outline-green-400'/>
                <label htmlFor="password" className='p-2'>Password</label>
                <input type="password" placeholder='*******' className='p-2 outline-green-400' />
                <button type='submit' className='p-2 bg-sky-200 m-2 rounded-lg'>Sign Up</button>
            </form>
            <p>Already Have An Account ? Login</p>
        </div>
    </div>
  )
}

export default SignUp