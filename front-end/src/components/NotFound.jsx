import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <div className="w-[100%] h-[100vh] flex flex-row justify-center items-center px-[20px]">
            <div className="flex flex-col justify-start items-start max-w-[600px] gap-[12px]"> 
                <p className="text-[40px] font-bold">404: Page Not Found</p>
                <div className="w-[100%] h-[1px] bg-gray-400"></div>
                <p className="text-[30px] font-bold">Sorry, but this page doesn't exist. If something was here before, it's not here now.</p>
                <Link to="/" className="text-[18px] text-blue-500 underline decoration-wavy">Return HomePage</Link>
            </div>
        </div>
    )

}
export default NotFound