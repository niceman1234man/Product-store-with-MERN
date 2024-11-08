import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler=()=>{
    axios.post("http://localhost:3000/products/signup",{
        username,
        email,
        password,
    },{withCredentials:true})
  }

  return (
    <div className="bg-gray-950 text-sky-600  h-screen">
      <div className=" flex flex-col items-center justify-center bg-slate-400 p-4 mx-auto w-[500px] font-bold rounded-md shadow-2xl">
        <h2 className="text-2xl">Sign Up</h2>
        <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
          <label htmlFor="uname" className="p-2">
            User Name
          </label>
          <input
          onChange={(e)=>setUserName(e.target.value)}
            type="text"
            placeholder="User Name"
            className="p-2 outline-green-400 w-[400px]"
          />
          <label htmlFor="email" className="p-2">
            Email
          </label>
          <input
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2 outline-green-400 w-[400px]"
          />
          <label htmlFor="password" className="p-2">
            Password
          </label>
          <input
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 outline-green-400 w-[400px]"
          />
          <button type="submit" className="p-2 bg-sky-200 m-2 rounded-lg">
            Sign Up
          </button>
        </form>
        <p>
          Already Have An Account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
