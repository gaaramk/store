import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImages({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  console.log(product);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 md:h-[500px]"
      >
        {product?.images?.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper md:h-[150px]"
      >
        {product?.images?.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
