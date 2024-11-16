import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useColor } from "../Context/ColorContextProvider";
import { useCookies } from "react-cookie";
function Navbar() {
  const navigate = useNavigate();
  const {color,toggleColor}=useColor();
  const [cookies, removeCookie] = useCookies([]);
  const handleLogout = () => {
    removeCookie("token");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={`fixed ${color} text-sky-400 px-auto w-[1240px]  py-4 h-[10%]`}>
      <div className="flex items-center justify-between mx-60">
        <h2
          className="flex gap-2 items-center justify-center py-4 font-bold cursor-pointer"
      
        >
          PRODUCT STORE
          <img src={assets.product} alt="product logo" className="w-6" />
        </h2>
        <div className="flex justify-center items-center">
          <img
            src={assets.add}
            alt="add"
            onClick={() => navigate("/create")}
            className="bg-slate-400 w-6 cursor-pointer"
          />
          <img
            src={assets.brightness}
            alt="brightness"
            onClick={toggleColor}
            className="bg-slate-400 w-5 cursor-pointer mx-2"
          />
          <button onClick={handleLogout} className="text-white p-1 m-4 bg-red-500 rounded ">
        Logout
      </button>
     
        </div>
      </div>
    </div>
  );
}

export default Navbar;
