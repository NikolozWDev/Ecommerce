import React from "react";
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Product from "../../../components/Product";

const HomeArrival = (props) => {
  return (
    <>
      <div className="pt-[50px] pb-[50px] lg:pt-[60px] z-[20] bg-white px-[20px] flex flex-col justify-center items-center gap-[24px] sm2:gap-[30px]">
        <p className="font-oswald text-[40px] uppercase font-bold lg:text-[45px]">
          new arrivals
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
            {props.randomProducts.slice(0, 4).map((product) => {
              // const imgSrc =
              //   props.images[`../../public/assets/images/${product.image}`];
              return (
                <SwiperSlide>
                  <Product product={product} imgSrc={product.image} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <Link to="/shop" className="w-[100%] sm2:w-[230px] flex flex-row justify-center items-center"><button
          className="w-[100%] py-[8px] text-black border-[1px] border-gray-400 rounded-[24px] sm2:w-[230px] transition-all duration-[0.3s]
                hover:border-red-600"
        >
          View All
        </button></Link>
      </div>
    </>
  );
};
export default HomeArrival;