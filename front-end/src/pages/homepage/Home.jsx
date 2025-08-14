import React from 'react'
import { useRef } from 'react'
// JSON
import products from '../../products.json'
import comments from '../../comments.json'
// components
import Product from '../../components/Product'
import Comment from '../../components/Comment'
import HomeBanner from './components/HomeBanner'
import HomeArrival from './components/HomeArrival'
import HomeSelling from './components/HomeSelling'
import HomeBrowserStyle from './components/HomeBrowseStyle'
import HomeComments from './components/HomeComments'
// images
import banner from '../../assets/icons/banner.png'
import pg1 from '../../assets/icons/pg1.png'
import pg2 from '../../assets/icons/pg2.png'
import pg3 from '../../assets/icons/pg3.png'
import pg4 from '../../assets/icons/pg4.png'
// Swiperjs
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

const Home = () => {

    const images = import.meta.glob('../../assets/images/*', { eager: true, import: 'default' });
    const swiperRef = useRef(null)

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }
    const randomProducts = shuffleArray(products)
    const randomComments = shuffleArray(comments)

    return (
        <div className="bg-gray-100 pt-[100px] pb-[0px]">

            <HomeBanner banner={banner} />
            <HomeArrival randomProducts={randomProducts} images={images}/>
            <HomeSelling randomProducts={randomProducts} images={images} />
            <div className="w-[100%] h-[3px] end:w-[1500px]"></div>
            <HomeBrowserStyle pg1={pg1} pg2={pg2} pg3={pg3} pg4={pg4} />
            <HomeComments randomComments={randomComments} swiperRef={swiperRef} />

        </div>
    )

}
export default Home