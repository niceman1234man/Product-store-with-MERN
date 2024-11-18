import React, {  useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for accessing URL parameters
import axios from 'axios';

function ResetPassword() {
  const { user, token } = useParams(); // Get UID and Token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/products/reset/${user}/${token}`, { password });
      setMessage('Password changed successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error changing password. Please try again.');
      console.error(error);
    }
  };


  return (
    <div className="text-sky-600 h-[90vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center mx-auto w-[500px] bg-slate-400 p-4">
        <h2 className="text-2xl">Reset Password</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
          <label htmlFor="password" className="p-2 text-2xl">New Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 w-[400px] outline-green-400"
          />
          <label htmlFor="confirm-password" className="p-2 text-2xl">Confirm Password</label>
          <input
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2 w-[400px] outline-green-400"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 my-4 rounded-lg w-[30%] mx-auto font-semibold text-black"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
