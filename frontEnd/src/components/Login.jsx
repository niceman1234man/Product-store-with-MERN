import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:3000/products/login", { email, password },{
      withCredentials:true
    })
      .then((response) => {
        if (response.data.success) {
          // // Store token in localStorage
          // localStorage.setItem("accessToken", response.data.accessToken);
          toast.success("Login successful!");
          navigate("/");  // Redirect after successful login
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
    <div className="bg-gray-950 text-sky-600 h-screen">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center mx-auto w-[500px] bg-slate-400 p-4 rounded-md">
        <h2 className="text-2xl">LOGIN</h2>
        <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
          <label htmlFor="email" className="p-2">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2 w-[400px] outline-green-400"
          />
          <label htmlFor="password" className="p-2">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 w-[400px] outline-green-400"
          />
          <button type="submit" className="p-2 bg-sky-200 m-2 rounded-lg">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
