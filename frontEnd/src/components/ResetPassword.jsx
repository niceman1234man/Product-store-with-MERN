import React from 'react'

function ResetPassword() {
  return (
    <div className={` text-sky-600 h-screen`}>

    <div className="flex flex-col items-center justify-center mx-auto w-[500px] bg-slate-400 p-4  ">
      <h2 className="text-2xl">LOGIN</h2>
      <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
      <label htmlFor="password" className="p-2 text-2xl">New Password</label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="*******"
          className="p-2 w-[400px] outline-green-400"
        />
        <label htmlFor="password" className="p-2 text-2xl">Confirm Password</label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="*******"
          className="p-2 w-[400px] outline-green-400"
        />
        <button type="submit" className="p-2 bg-green-500 my-4 rounded-lg w-[30%] mx-auto font-semibold text-black">Change Password</button>
      </form>
     
    </div>
  </div>
  )
}

export default ResetPassword