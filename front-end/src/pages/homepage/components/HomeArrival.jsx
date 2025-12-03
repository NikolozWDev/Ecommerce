import React from "react";
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Product from "../../../components/Product";

const HomeArrival = (props) => {

  const sectionRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if(entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      }, {threshold: 0.2}
    )
    if(sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sectionRef} className="pt-[50px] pb-[50px] lg:pt-[60px] z-[20] bg-white px-[20px] flex flex-col justify-center items-center gap-[24px] sm2:gap-[30px]">
        <p className={`font-oswald text-[40px] uppercase font-bold lg:text-[45px] transition-all duration-[2s] ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}>
          new arrivals
        </p>
        <div className={`flex flex-row justify-center items-center w-full lg:gap-[10px] max-w-[1500px] transition-all duration-[1s] ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}>
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