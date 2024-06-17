import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className='flex justify-between bg-slate-500 text-white py-3'>
            <div className="logo">
                <span className="font-bold text-xl mx-8 cursor-no-drop hover:font-light duration-1000">iTask</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar