import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useColor } from "../Context/ColorContextProvider";

function Navbar() {
  const navigate = useNavigate();
  const {color,toggleColor}=useColor();

  return (
    <div className={`${color} text-sky-400 px-auto  py-4`}>
      <div className="flex items-center justify-between mx-60">
        <h2
          className="flex gap-2 items-center justify-center py-4 font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          PRODUCT STORE
          <img src={assets.product} alt="product logo" className="w-6" />
        </h2>
        <div className="flex gap-1">
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
            className="bg-slate-400 w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
