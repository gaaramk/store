// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function ProductsSwip({ products, title }) {
  return (
    <>
      <div className="container py-15">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold py-7">{title}</h2>

          <Link
            to="/products"
            className="text-black dark:text-white text-end hover:underline hover:text-primary"
          >
            show more...
          </Link>
        </div>

        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="mySwiper"
        >
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
