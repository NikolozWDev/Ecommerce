import React from 'react'
import products from '../../products.json'
import Product from '../../components/Product'

const Shop = () => {

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }
    const randomProducts = shuffleArray(products)

    const images = import.meta.glob('../../assets/images/*', { eager: true, import: 'default' });

    return (
        <div className="pt-[100px] pb-[100px] px-[20px]">
            
            <div>Home / Casual</div>

            <div className="flex flex-row justify-center items-center gap-[4px] shadow-md w-[100%] py-[8px] border-[1px] border-gray-300 mt-[10px]">
                <p className="text-[16px] text-black font-bold">Filters</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
            </div>

            <div>
                <div className="hidden"></div>
                <div className="flex flex-col justify-center items-center gap-[18px]">
                    <div className="flex flex-row justify-between items-center w-[100%]">
                        <p className="text-[24px] text-black font-bold">Casual</p>
                        <p>Showing 1-10 of 100 Products</p>
                    </div>
                    <div className="grid grid-cols-2 sm2:grid-cols-3 sm2:gap-[24px] gap-[18px]">
                        {
                            randomProducts.slice(0, 9).map((product) => {
                                const imgSrc = images[`../../assets/images/${product.image}`];
                                return (
                                    <Product product={product} imgSrc={imgSrc} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )

}
export default Shop