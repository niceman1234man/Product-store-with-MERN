import React, { useState } from "react";
import assets from "../assets/assets";
import { useColor } from "../Context/ColorContextProvider";
function Navbar() {
  const { color, toggleColor } = useColor();
  return (
    <div className={`fixed ${color} text-sky-400 px-auto w-full py-4 h-[10%]`}>
      <div className="flex items-center justify-between mx-60">
        <h2 className="flex gap-2 items-center justify-center py-4 font-bold cursor-pointer">
          PRODUCT STORE
          <img src={assets.product} alt="product logo" className="w-6" />
        </h2>
        <div className="flex justify-center items-center">
          <img
            src={assets.brightness}
            alt="brightness"
            onClick={toggleColor}
            className="bg-slate-400 w-5 cursor-pointer mx-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
