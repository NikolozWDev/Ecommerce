import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Product from "../../../components/Product";

const HomeSelling = (props) => {
  return (
    <>
      <div className="pt-[50px] pb-[80px] lg:pt-[60px] z-[20] bg-white px-[20px] flex flex-col justify-center items-center gap-[24px] sm2:gap-[30px]">
        <p className="font-oswald text-[40px] uppercase font-bold lg:text-[45px]">
          top selling
        </p>
        <div className="flex flex-row justify-center items-center w-full lg:gap-[10px] max-w-[1500px]">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              600: { slidesPerView: 3 },
              800: { slidesPerView: 4 },
            }}
          >
            {props.randomProducts
              .filter((product) => product.down_price !== "0.00")
              .slice(0, 4)
              .map((product) => {
                return (
                  <SwiperSlide>
                    <Product product={product} imgSrc={product.image} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <button
          className="w-[100%] py-[8px] text-black border-[1px] border-gray-400 rounded-[24px] sm2:w-[230px] transition-all duration-[0.3s]
                        hover:border-red-600"
        >
          View All
        </button>
      </div>
    </>
  );
};
export default HomeSelling;