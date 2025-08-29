import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiStar, HiOutlineStar } from "react-icons/hi2";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Landing.css';
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';



function LandingCards() {
  const [cards, setCards] = useState([])
    const navigate = useNavigate();

    const [hoveredCardId, setHoveredCardId] = useState(null);

    const handleMouseEnter = (id) => {
        setHoveredCardId(id); 
    };

    const handleMouseLeave = () => {
        setHoveredCardId(null); 
    };

    useEffect(()=>{
      const fetch = async () => {
        const data = await getAllDocument('cards')
        setCards(data)
      }
      fetch()
    }, [])
    // Function to navigate to order page
    const handleOrdr = (id) => {
      if(user){
        navigate(`/order/${id}`);
      }else{
        navigate('/login')
      }
    };
  return (
    <>
      {cards.length > 0 && <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="w-full pb-10"
      >
        {cards.map((item)=>{
          const isHovered = hoveredCardId === item.id;
          return (
            <SwiperSlide key={item.id} className=''>
              <div
            className=" shadow-sm group transition-all duration-300 border rounded-3xl overflow-hidden flex flex-col bg-white relative"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
        >
            <div className='w-full aspect-[3.5/2] relative '>
            <img
                className="w-full h-full object-cover rounded-2xl transition-all duration-500 absolute inset-0"
                src={item.frontDesign}
                alt="Card Design"
               
            />
            <img
                className={`w-full ${isHovered ? 'opacity-100': 'opacity-0'} h-full object-cover rounded-2xl transition-all duration-500 absolute inset-0`}
                src={item.backDesign}
                alt="Card Design"
               
            />
            </div>
            <div className='mt-5 min-h-40 flex flex-col justify-between mb-5 px-6'>
              <div className=''>
                <h1 className='font-semibold text-raisin_black-700 text-xl'>{item.name}</h1>
                <p className='text-gray-800 text-sm mt-1 capitalize font-medium'><span className='font-light'>Category : </span>{item.category}</p>
              </div>
                {/* <p className='text-gray-600 text-xs mt-1 capitalize '> inctio quibusdam eum eius nobis eligendi debitis quisquam reiciendis inventore.</p> */}
                <div className='flex items-center gap-1  text-yellow-500'>
                  <span className='text-gray-800 font-medium text-sm'>Rating : </span><HiStar/><HiStar/><HiStar/><HiStar/><HiOutlineStar/>
                </div>
                <div className='flex items-center justify-between mt-4'>
                <h1 className='text-2xl md:text-3xl font-semibold text-raisin_black-400'><span className='font-normal text-xl'>₹ </span>{item.price}/-</h1>
                <button className="hover:bg-raisin_black-600 bg-violet-400 transition-all border px-3 text-sm text-white rounded-full py-2" onClick={() => handleOrdr(item.id)}>
                    Order Now
                </button>
                </div>
            </div>
        </div></SwiperSlide>
          )
        })}
        
        
      </Swiper>}
    </>
  )
}

export default LandingCards