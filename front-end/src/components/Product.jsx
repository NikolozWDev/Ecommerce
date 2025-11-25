import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({product, imgSrc}) => {

    const Star = () => {
        return (
            <svg className="w-[10px] h-[10px]" width="15px" height="15px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
            <g transform="translate(0 -1028.4)">
            <path d="m12 1028.4 4 9 8 1-6 5 2 9-8-5-8 5 2-9-6-5 8-1z" fill="#f39c12"/>
            <path d="m12 1028.4-4 9-6.9688 0.8 4.9688 4.2-0.1875 0.8 0.1875 0.2-1.75 7.8 7.75-4.8 7.75 4.8-1.75-7.8 0.188-0.2-0.188-0.8 4.969-4.2-6.969-0.8-4-9z" fill="#f1c40f"/>
            </g>
            </svg>
        )
    }

    return (
        <Link to={`/product/${product.id}`}><div key={product.id} className="flex flex-row justify-center items-center group cursor-pointer transition-all duration-[0.3s] hover:scale-90 shadow-sm">
            <div className="flex flex-col justify-start items-start">
                <img src={imgSrc} className="product-image transition-all duration-[0.3s] group-hover:border-red-600 object-cover" />
                <p className="text-black text-[14px] font-bold lg2:text-[16px]">{product.title}</p>
                    <p className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                            index < product.rate ? <Star key={index} /> : null
                        ))}
                        | {product.rate}/5
                    </p>
                    {
                        product.down_price === "0.00" ? (
                            <p className="text-[black] text-[22px] lg2:text-[26px] font-bold">${product.price}</p>
                        ) : (
                            <div className="flex flex-row justify-center gap-[12px]">
                                <p className="text-[black] text-[22px] lg2:text-[26px] font-bold">${product.down_price}</p>
                                <del className="text-gray-500 text-[22px] lg2:text-[26px] font-bold">${product.price}</del>
                            </div>
                        ) 
                    }
            </div>
        </div></Link>
    )

}
export default Product