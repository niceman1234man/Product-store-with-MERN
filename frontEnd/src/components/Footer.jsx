import React from 'react'

function Footer() {
    const year=new Date();
const currrentyear=year.getFullYear();
  return (
    
    <div className=' fixed h-[10%] w-full bg-black text-white py-2'>
        <div className='max-w-[1240px] text-center '>
        <p>{currrentyear} &copy; Yihunie T.</p>
        </div>

    </div>
  )
}

export default Footer