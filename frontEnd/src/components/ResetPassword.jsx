import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log("User ID:", id, "Token:", token); // Debugging

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.'); // Show error toast
      return;
    }

    try {
      const response = await axios.post(
        `https://product-store-with-mern-back2.onrender.com/products/reset/${id}/${token}`,
        { password }
      );

      if (response.data.success) {
        toast.success('Password changed successfully!'); // Show success toast
        navigate("/"); // Redirect to the home page after success
      } else {
        toast.error('Error changing password. Please try again.'); // Error toast
      }
    } catch (error) {
      toast.error('Error changing password. Please try again.'); // Show error toast if axios request fails
      console.error("Axios Error:", error);
    }
  };

  return (
    <div className="text-sky-600 h-[90vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center mx-auto w-[50%] bg-slate-400 p-4">
        <h2 className="text-sm md:text-xl ">Reset Password</h2>
        <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
          <label htmlFor="password" className="p-2 text-sm md:text-xl ">New Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 w-[90%] outline-green-400"
          />
          <label htmlFor="confirm-password" className="p-2 text-2xl">Confirm Password</label>
          <input
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 w-[90%] outline-green-400"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 my-4 rounded-lg w-[30%] mx-auto font-semibold text-black text-sm md:text-xl "
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
