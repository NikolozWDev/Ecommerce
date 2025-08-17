import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {

    return (
        <Link to={`/product/${props.product.id}`}><div key={props.product.id} className="flex flex-row justify-center items-center group cursor-pointer transition-all duration-[0.3s] hover:scale-90 shadow-sm">
            <div className="flex flex-col justify-start items-start">
                <img src={props.imgSrc} className="product-image transition-all duration-[0.3s] group-hover:border-red-600" />
                <p className="text-black text-[14px] font-bold lg2:text-[16px]">{props.product.title}</p>
                <p>{"⭐".repeat(props.product.rate)}</p>
                    {
                        props.product.downPrice === 0 ? (
                            <p className="text-[black] text-[22px] lg2:text-[26px] font-bold">${props.product.price}</p>
                        ) : (
                            <div className="flex flex-row justify-center gap-[12px]">
                                <p className="text-[black] text-[22px] lg2:text-[26px] font-bold">${props.product.downPrice}</p>
                                <del className="text-gray-500 text-[22px] lg2:text-[26px] font-bold">${props.product.price}</del>
                            </div>
                        ) 
                    }
            </div>
        </div></Link>
    )

}
export default Product