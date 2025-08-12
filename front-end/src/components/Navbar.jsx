import React from 'react'

const Navbar = () => {


    return (
        <div className={`bg-white shadow-md p-[14px] px-[20px] fixed flex flex-row justify-center items-center w-[100%]`}>
            <div className="flex flex-row justify-between items-center w-[100%] end:w-[1500px]">
            
            <div className={`flex flex-row sm2:flex-row-reverse gap-[14px] sm2:gap-[22px] md:gap-[30px] lg:gap-[36px] justify-center items-center`}>
                <div className="flex sm2:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div className={`hidden sm2:flex flex-row justify-center items-center gap-[14px] md:gap-[18px] lg:gap-[22px]`}>
                    <p className="flex flex-row justify-center items-center gap-[4px]">Shop <svg className="w-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    </p>
                    <p>On Sale</p>
                    <p>New Arrivals</p>
                    <p>Brands</p>
                </div>
                <p className={`title-name`}>Ecommerce</p>
            </div>

            <div className={`flex flex-row justify-center items-center gap-[14px] md:gap-[16px]`}>
                <div className="flex md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <div className="hidden md:flex flex-row justify-center items-center">
                    <div className="hidden md:flex flex-row justify-center items-center bg-gray-200 h-[33px] lg:h-[44px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input type='text' placeholder='Search For Products...' className="bg-gray-200 py-[6px] rounded-tr-[22px]
                    rounded-br-[22px] text-[14px] lg:text-[16px] lg:w-[300px] lg:py-[10px] lg2:w-[500px] xl:w-[550px]" />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>

            </div>
        </div>
    )

}
export default Navbar