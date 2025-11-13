import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const images = [
"https://i.ibb.co.com/dwZ9P2RR/IMG-6579.jpg",
"https://i.ibb.co.com/C39s6pWm/IMG-6597.jpg",
"https://i.ibb.co.com/Z1BccLCj/IMG-6588.jpg",
"https://i.ibb.co.com/M5ZhZFZD/IMG-6596.jpg",
"https://i.ibb.co.com/jknVdJHt/IMG-6600.jpg",
"https://i.ibb.co.com/xtzmwKk0/IMG-6569.jpg",
"https://i.ibb.co.com/tP3r66nC/IMG-6586.jpg",
"https://i.ibb.co.com/zVGynrSh/IMG-6587.jpg",
"https://i.ibb.co.com/vC3sq06P/IMG-6572.jpg",
"https://i.ibb.co.com/bjpvQj2s/IMG-6589.jpg",
"https://i.ibb.co.com/V0vWDyfx/IMG-6601.webp",
"https://i.ibb.co.com/5q3NPsn/IMG-6582.jpg",
"https://i.ibb.co.com/2pLSd88/IMG-6595.jpg",
"https://i.ibb.co.com/PvGjPzjk/IMG-6598.jpg",
"https://i.ibb.co.com/f5DFBkh/IMG-6573.jpg",
"https://i.ibb.co.com/NnGfJrtr/IMG-6590.jpg",
"https://i.ibb.co.com/qL6tR8HB/IMG-6610.jpg",
"https://i.ibb.co.com/f52X2RV/IMG-6603.jpg",
"https://i.ibb.co.com/7JmNCg21/IMG-6604.jpg",
"https://i.ibb.co.com/xKCK0jX6/IMG-6607.webp",
"https://i.ibb.co.com/1tb7bM0Y/IMG-6585.jpg",
"https://i.ibb.co.com/8g4329yz/IMG-6591.jpg",
"https://i.ibb.co.com/kVBNRQWX/IMG-6584.jpg",
"https://i.ibb.co.com/60v4MqKK/IMG-6593.jpg",
"https://i.ibb.co.com/qMrqSFjV/IMG-6594.jpg",
"https://i.ibb.co.com/932kNYh8/IMG-6581.jpg",
"https://i.ibb.co.com/h1CJwVZt/IMG-6599.jpg",
"https://i.ibb.co.com/Mknq0vBn/IMG-6609.jpg",
"https://i.ibb.co.com/N2hKxHB1/IMG-6576.jpg",
"https://i.ibb.co.com/n88rSSyD/IMG-6605.jpg",
"https://i.ibb.co.com/pjXyPYXz/IMG-6606.jpg",
"https://i.ibb.co.com/spWM7JRh/IMG-6571.jpg",
"https://i.ibb.co.com/sD04rfm/IMG-6574.jpg",
"https://i.ibb.co.com/V0dZ48Sv/IMG-6592.jpg",
"https://i.ibb.co.com/GvjC8zPP/IMG-6583.jpg"

];

const GallerySlider = () => {
    return (
        <section className="my-16 bg-base-100 flex justify-center">
            <div className="w-full max-w-[1536px] px-4">
                <Swiper
                    modules={[EffectCoverflow, Pagination]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                        scale: 1.2 
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 1.5 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {images.map((src, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src={src}
                                    alt={`Slide ${idx + 1}`}
                                    className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default GallerySlider;
