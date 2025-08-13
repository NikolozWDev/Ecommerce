import React from 'react'
import products from '../../products.json'
import banner from '../../assets/icons/banner.png'

const images = import.meta.glob('../../assets/images/*', { eager: true, import: 'default' });

const Home = () => {


    return (
        <div className="bg-gray-100 pt-[100px] pb-[100px]">

            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-col justify-between items-center gap-[16px] px-[20px] lg:flex-row xl:gap-[0px] end:w-[1500px] end:px-[0px]">
                    <div className="flex flex-col justify-center items-center gap-[14px] sm2:gap-[20px] lg:items-start xl:w-[813px]">
                        <p className="text-[30px] font-bold text-black leading-[30px] uppercase font-oswald sm2:text-[50px] sm2:leading-[50px] lg2:text-[60px] lg2:leading-[60px]
                        xl:text-[70px] xl:leading-[70px]">find clothes that matches your style</p>
                        <p className="text-gray-500 lg2:w-[600px]">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style</p>
                        <button className="w-[100%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px]">Shop Now</button>
                        <div className="flex flex-wrap justify-center items-center gap-[16px] sm2:mt-[18px] lg2:mt-[30px] lg2:gap-[30px]">
                            <div className="flex flex-col justify-start items-start gap-[6px] pr-[12px] border-r-[1px] border-gray-300 leading-[30px]">
                                <p className="text-black font-bold text-[40px]">200+</p>
                                <p className="text-gray-500">International Brands</p>
                            </div>
                            <div className="flex flex-col justify-start items-start gap-[6px] pr-[12px] border-r-[1px] border-gray-300 leading-[30px]">
                                <p className="text-black font-bold text-[40px]">2,000+</p>
                                <p className="text-gray-500">High-Quality Products</p>
                            </div>
                            <div className="flex flex-col justify-start items-start gap-[6px] leading-[30px]">
                                <p className="text-black font-bold text-[40px]">30,000+</p>
                                <p className="text-gray-500">Happy Costumers</p>
                            </div>
                        </div>
                    </div>
                    <img src={banner} className="w-[100%] sm2:w-[80%] md:w-[60%] xl:w-[600px]" />
                </div>
            </div>
            
            <div className="flex flex-row justify-evenly items-center w-full bg-black text-white text-[14px] uppercase sm2:text-[24px] md:text-[30px] lg:text-[40px]
            lg:py-[20px] lg2:text-[44px]">
                <div className="flex flex-row justify-evenly items-center w-[100%] end:w-[1500px] end:justify-between">
                    <p className="font-oswald">versace</p>
                    <p className="font-playwritehu">zara</p>
                    <p className="font-quicksand">gucci</p>
                    <p className="font-merriweather">prada</p>
                    <p className="font-quicksand">Calvin Klein</p>
                </div>
            </div>

        </div>
    )

}
export default Home