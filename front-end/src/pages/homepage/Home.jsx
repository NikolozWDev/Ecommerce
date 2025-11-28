import React from 'react'
import { useRef } from 'react'
// JSON
// Axios (fetching data (Django Rest API))
import axios from 'axios'
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
import banner from '../../public/assets/icons/banner.png'
import pg1 from '../../public/assets/icons/pg1.png'
import pg2 from '../../public/assets/icons/pg2.png'
import pg3 from '../../public/assets/icons/pg3.png'
import pg4 from '../../public/assets/icons/pg4.png'
// Swiperjs
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import api from '../../api'

const Home = ({ homeArrival, homeSelling, homeBrowseStyle, ecommerceCont }) => {
    
    // This is how to use axios
    // const [products, setProducts] = React.useState([])
    // axios.get('/products.json').then((response) => { setProducts(response.data) })
    function shuffleArray(array) {
        if (!Array.isArray(array)) return [];
        return [...array].sort(() => Math.random() - 0.5);
        }
    const [comments, setComments] = React.useState([])
    const [randomProducts, setRandomProducts] = React.useState([])
    const [randomComments, setRandomComments] = React.useState([])
    React.useEffect(() => {
        api.get(`api/comments/`)
          .then((res) => {setComments(res.data.comments); setRandomComments(shuffleArray(res.data));})
          .catch((err) => console.error(err));
      }, [])
    const [products, setProducts] = React.useState([])
    React.useEffect(() => {
    api.get("/api/products/")
        .then(res => {
        setProducts(res.data);
        setRandomProducts(shuffleArray(res.data))
        })
        .catch(err => console.log(err));
    }, []);

    const swiperRef = useRef(null)

    return (
        <div className="bg-gray-100 pt-[100px] pb-[0px]">
            <div ref={ecommerceCont}>
            <HomeBanner banner={banner} />
            </div>
            <div ref={homeArrival}>
            <HomeArrival randomProducts={randomProducts} images={products.image}/>
            </div>
            <div ref={homeSelling}>
            <HomeSelling randomProducts={randomProducts} images={products.images} />
            </div>
            <div className="w-[100%] h-[3px] end:w-[1500px]"></div>
            <div ref={homeBrowseStyle}>
            <HomeBrowserStyle pg1={pg1} pg2={pg2} pg3={pg3} pg4={pg4} />
            </div>
            <HomeComments randomComments={randomComments} swiperRef={swiperRef} />

        </div>
    )

}
export default Home