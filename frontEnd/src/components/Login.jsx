import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useColor } from "../Context/ColorContextProvider";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    const {color}=useColor();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    axios.post("https://product-store-with-mern.onrender.com/products/login", { email, password },{
      withCredentials:true
    })
      .then((response) => {
        if (response.data.success) {
          // // Store token in localStorage
          // localStorage.setItem("accessToken", response.data.accessToken);
          toast.success("Login successful!");
          navigate("/home");  // Redirect after successful login
        } else {
          toast.error(response.data.message || "Login failed.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className={`h-[90vh] ${color} text-sky-600  flex  justify-center items-center`}>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center mx-auto w-[50%] bg-slate-400 p-4 mt-12 ">
        <h2 className="text-sm md:text-xl ">LOGIN</h2>
        <form className="flex flex-col justify-center w-[80%] mx-auto " onSubmit={onSubmitHandler}>
          <label htmlFor="email" className="p-2 text-sm md:text-xl ">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2 w-[90%] outline-green-400"
          />
          <label htmlFor="password" className="p-2 text-sm md:text-xl ">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 w-[90%] outline-green-400"
          />
          <button type="submit" className="p-2 bg-green-500 my-4 rounded-lg w-[30%] mx-auto font-semibold text-black">Login</button>
        </form>
        <p className="text-sm md:text-xl ">
          Don't have an account? <Link to="/signup" className="text-violet-950">Sign Up</Link>

        </p>
        <p className="text-violet-950 text-sm md:text-xl "><Link to="/forget">Forgot Password</Link></p>
      </div>
    </div>
  );
}

export default Login;
