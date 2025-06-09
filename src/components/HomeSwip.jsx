// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import img from "../assets/home.jpg";
import img1 from "../assets/home1.jpg";
import img2 from "../assets/home2.jpg";
import img3 from "../assets/home3.jpg";
import img4 from "../assets/home4.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function HomeSwip() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {[img, img1, img2, img3, img4].map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover brightness-[.6]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-10 right-5 md:right-20 z-20 text-white max-w-[80%] md:max-w-[40%] text-end">
        <p className="text-sm md:text-xl leading-relaxed mb-4">
          <span className="block font-bold text-2xl md:text-4xl mb-2">
            50% OFF
          </span>
          What are you looking for?
          <br />
          Shop for the best products in the world.
        </p>
        <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-2 rounded-xl shadow-lg">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
}
