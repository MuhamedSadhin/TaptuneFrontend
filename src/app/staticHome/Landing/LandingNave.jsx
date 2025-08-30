import { Menu02Icon } from 'hugeicons-react'
import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Image/logo2.svg'
import { Link } from 'react-router-dom';


function LandingNave() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setScrolling(window.scrollY > 0);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
  return (
    <div className={`w-full z-[5000] fixed top-0 left-0 py-5 md:py-0 transition-all duration-500 ${scrolling ? 'bg-raisin-black shadow-xl' : ''}`}>
        <div className="flex items-center justify-between px-5 md:p-8 ">
          <Link to={'/'}>
            <img src={logo} className="w-32" alt="" />
          </Link>
          <div className="relative group">
            <div className="text-seasalt">
              <Menu02Icon size={45}/>
            </div>
            <div className=" absolute opacity-0 invisible shadow-lg group-hover:visible group-hover:opacity-100 transition-all duration-500 flex flex-col right-0 bg-seasalt rounded-3xl w-52 py-10 items-center gap-2 text-white font-medium">
              <Link to={'/'} className="text-raisin-black text-2xl custom hover:text-raisin-black-700">Home</Link>
              <Link to={'/about-us'} className="text-raisin-black text-2xl custom hover:text-raisin-black-700">About</Link>
              <Link to={''} className="text-raisin-black text-2xl custom hover:text-raisin-black-700">Help</Link>
              <Link to={'/docs'} className="text-raisin-black text-2xl custom hover:text-raisin-black-700">Docs</Link>
              <Link to={'/contact'} className="text-raisin-black text-2xl custom hover:text-raisin-black-700">Contact</Link>
              <Link to={'/auth'} className='bg-raisin-black-700 py-2 px-4 rounded-full text-lg font-light hover:bg-raisin-black-600 mt-2'>Get start</Link>
             
            </div>
          </div>
          
        </div>
      </div>
  )
}

export default LandingNave
