import axios from "axios";
import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { useColor } from "../Context/ColorContextProvider";
function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const {color}=useColor();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/products/signup", {
        username,
        email,
        password,
      }, { withCredentials: true });
      console.log(result);
      alert("Sign up successful");
    } catch (err) {
      console.log(err);
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <div className={`${color} text-sky-600 h-[90vh] flex justify-center items-center p-2`}>
      <div className="flex flex-col items-center justify-center bg-slate-400  mx-auto w-[50%] font-bold shadow-2xl mt-8 py-4">
        <h2 className="text-sm md:text-xl ">Sign Up</h2>
        <form className="flex flex-col justify-center w-[80%] " onSubmit={onSubmitHandler}>
          <label htmlFor="username" className="p-2 text-sm md:text-xl">
            User Name
          </label>
          <input
            id="username" // Add id attribute
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="User Name"
            className="p-2 outline-green-400 w-[90%]"
          />
          <label htmlFor="email" className="p-2 text-sm md:text-xl">
            Email
          </label>
          <input
            id="email" // Add id attribute
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2 outline-green-400 w-[90%]"
          />
          <label htmlFor="password" className="p-2 text-sm md:text-xl">
            Password
          </label>
          <input
            id="password" // Add id attribute
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 outline-green-400 w-[90%]"
          />
          <button type="submit" className="p-2 bg-sky-200 my-4 rounded-lg w-[30%] mx-auto text-sm md:text-xl">
            Sign Up
          </button>
        </form>
        <p className="text-sm md:text-xl">
          Already Have An Account? <Link to="/" className="text-purple-900">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;