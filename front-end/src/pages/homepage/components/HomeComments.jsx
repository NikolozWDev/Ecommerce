import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Comment from "../../../components/Comment";

const HomeComments = (props) => {
  return (
    <>

    <div className="flex flex-row justify-center items-center pt-[50px] pb-[180px] w-[100%] bg-white">
      <div className="w-[100%] px-[20px] flex flex-col justify-center items-center gap-[24px] end:w-[1500px] end:px-[0px]">
        <div className="w-[100%] flex flex-row justify-between items-center">
          <p className="font-oswald text-[40px] uppercase font-bold lg:text-[45px]">
            our happy customers
          </p>
          <div className="flex flex-row justify-center items-center gap-[12px]">
            <div
              onClick={() => props.swiperRef.current?.slidePrev()}
              className="cursor-pointer transition-all duration-[0.3s] hover:translate-x-[-5px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            <div
              onClick={() => props.swiperRef.current?.slideNext()}
              className="cursor-pointer transition-all duration-[0.3s] hover:translate-x-[5px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-[100%] end:w-[1500px]">
          <Swiper
            onSwiper={(swiper) => (props.swiperRef.current = swiper)}
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              400: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              976: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {props.randomComments.slice(0, 8).map((comment) => {
              return (
                <SwiperSlide>
                  <Comment comment={comment} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>

    </>
  );
};
export default HomeComments;