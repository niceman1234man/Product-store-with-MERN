import React,{useState} from 'react'

function ForgotPassword() {
    const [email, setEmail] = useState("");
  return (
    <div className={` text-sky-600 h-screen`}>

    <div className="flex flex-col items-center justify-center mx-auto w-[500px] bg-slate-400 p-4  ">
      <h2 className="text-2xl">Forgot Password</h2>
      <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
        <label htmlFor="email" className="p-2 text-2xl">Email</label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="p-2 w-[400px] outline-green-400"
        />
        <button type="submit" className="p-2 bg-green-500 my-4 rounded-lg w-[30%] mx-auto font-semibold text-black">Login</button>
      </form>
     
    </div>
  </div>
  )
}

export default ForgotPassword