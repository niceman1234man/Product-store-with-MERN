import axios from "axios";
import React, { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const onSubmitHandler=()=>{
    axios.post("http://localhost:3000/products/login",{
      email,
      password,
    })
  }


  

  return (
    <div className="bg-gray-950 text-sky-600  h-screen ">
      <div className=" flex flex-col items-center justify-center mx-auto w-[500px] bg-slate-400 p-4 rounded-md ">
        <h2 className="text-2xl">LOGIN</h2>
        <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
          <label htmlFor="email" className="p-2">
            Email
          </label>
          <input
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2  w-[400px] outline-green-400"
          />
          <label htmlFor="password" className="p-2">
            Password
          </label>
          <input
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2  w-[400px] outline-green-400"
          />
          <button type="submit" className="p-2 bg-sky-200 m-2 rounded-lg">
            Login
          </button>
        </form>
        <p>
          {" "}
          Have No An Account ? <Link to="/signup">Sign Up</Link>
        </p>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default Login;
