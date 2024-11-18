import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useColor } from '../Context/ColorContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { color } = useColor();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/products/forget', { email });
      if (res.data.success) {
        toast.success('Password reset link sent to your email!');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      toast.error('Failed to send password reset link. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className={`${color} text-sky-600 h-[90vh] flex justify-center items-center`}>
      <div className="flex flex-col items-center justify-center mx-auto w-[500px] bg-slate-400 p-4">
        <h2 className="text-2xl">Forgot Password</h2>
        <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
          <label htmlFor="email" className="p-2 text-2xl">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2 w-[400px] outline-green-400"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 my-4 rounded-lg w-[30%] mx-auto font-semibold text-black"
          >
            Send
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default ForgotPassword;
