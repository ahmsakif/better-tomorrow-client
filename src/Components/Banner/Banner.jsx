import React from 'react';
import bannerImg from '../../assets/banner.jpg'

const Banner = () => {
    return (
        <div className=' '>
            <div className=' relative '>
                <img  className=' object-cover w-full max-h-180 ' src={bannerImg} alt="Better tomorrow" />
            </div>
            <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 bg-black/20 py-10 px-20 w-full">
                <div>
                    <h1 className=' text-5xl text-white font-bold text-center z-30 flex flex-col space-y-2'><span className=''>Explore Events</span> <span className=''>Make Connections</span><span>Create Memories</span></h1>
                </div>

                <div className=' mx-auto max-w-[1536px] text-center mt-6 space-x-8 '>
                    <button className=' btn btn-primary btn-lg hover:bg-linear-to-r from-primary to-secondary border-0 shadow-none ease-linear transform duration-300 transition-all ' >Explore Events</button>
                    <button className=' btn btn-outline btn-primary text-primary-content btn-lg  border-4 shadow-none ease-linear transform duration-200 transition-all ' >Donate Now</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;