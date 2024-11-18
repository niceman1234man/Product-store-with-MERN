import React from 'react'
import { useColor } from "../Context/ColorContextProvider";
function Footer() {
  const {color}=useColor();
    const year=new Date();
const currrentyear=year.getFullYear();
  return (
    
    <div className={ `${color} fixed h-[10%] w-full text-green-700 py-2`}>
        <div className='max-w-[1240px] text-center '>
        <p>{currrentyear} &copy; Yihunie T.</p>
        </div>

    </div>
  )
}

export default Footer