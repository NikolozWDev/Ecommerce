import React from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './CartContext'

const Navbar = () => {

    const {cart} = React.useContext(CartContext)
    const [allNum, setAllNum] = React.useState(0)
    React.useEffect(() => {
        function allProductsNum() {
            let total = 0
            for(let i = 0; i < cart.length; i++) {
                total += cart[i].productNum
            }
            setAllNum(total)
        }
        allProductsNum()
    }, [cart])

    const [menubar, setMenubar] = React.useState(false)
    const [searchbar, setSearchbar] = React.useState(false)

    function clickMenu() {
        if(menubar) {
            setMenubar(false)
        } else {
            setMenubar(true)
            setSearchbar(false)
        }
    }
    
    function clickSearch() {
        if(searchbar) {
            setSearchbar(false)
        } else {
            setSearchbar(true)
            setMenubar(false)
        }
    }


    return (
        <div className={`bg-white z-40 shadow-md p-[14px] px-[20px] fixed flex flex-row justify-center items-center w-[100%]`}>
            <div className="flex flex-row justify-between items-center w-[100%] end:w-[1500px]">
            
            <div className={`flex flex-row sm2:flex-row-reverse gap-[14px] sm2:gap-[22px] md:gap-[30px] lg:gap-[36px] justify-center items-center`}>
                {
                    menubar ? (
                        <div onClick={clickMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    ) : (
                <div onClick={clickMenu} className="flex sm2:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                    )
                }
                {
                    menubar ? (
                        <div className={`fixed z-30 left-[0] top-[55px] bg-white w-[40%] h-[100vh] shadow-md ${menubar ? "animate-menubar-in" : "animate-menubar-out"}`}>
                            <div className={`flex flex-col justify-around items-start h-[30%] pl-[10px]`}>
                                <Link to="/shop"><p className="selectori flex flex-row justify-center menu-border items-center gap-[4px]">Shop <svg className="w-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                                </p></Link>
                                <p className="menu-border selectori">On Sale</p>
                                <p className="menu-border selectori">New Arrivals</p>
                                <p className="menu-border selectori">Brands</p>
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
                {/* shops */}
                <div className={`hidden sm2:flex flex-row justify-center items-center gap-[14px] md:gap-[18px] lg:gap-[22px]`}>
                    <Link to="/shop"><p className="selectori flex flex-row justify-center items-center gap-[4px]">Shop <svg className="w-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    </p></Link>
                    <p className="selectori">On Sale</p>
                    <p className="selectori">New Arrivals</p>
                    <p className="selectori">Brands</p>
                </div>
                <Link to="/">
                    <p className={`title-name`}>E-commerce</p>
                </Link>
            </div>

            <div className={`flex flex-row justify-center items-center gap-[14px] md:gap-[16px]`}>
                {
                    searchbar ? (
                    <div className="fixed left-[50%] right-[50%] top-[55px] shadow-2xl flex flex-row justify-center items-center animate-searchbar">
                        <div className="flex flex-row justify-center items-center bg-gray-200 h-[33px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <input type='text' placeholder='Search For Products...' className="bg-gray-200 py-[6px] rounded-tr-[22px]
                        rounded-br-[22px] text-[14px] pl-[10px]" />
                    </div>
                    ) : (
                    <div onClick={clickSearch} className="flex md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    )
                }
                {
                    searchbar ? (
                        <div onClick={clickSearch} className="selectori">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    ) : (
                        null
                    )
                }
                <div className="hidden md:flex flex-row justify-center items-center cursor-pointer">
                    <div className="hidden md:flex flex-row justify-center items-center bg-gray-200 h-[33px] lg:h-[44px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input type='text' placeholder='Search For Products...' className="bg-gray-200 py-[6px] pl-[10px] rounded-tr-[22px]
                    rounded-br-[22px] text-[14px] lg:text-[16px] lg:w-[300px] lg:py-[10px] lg2:w-[500px] xl:w-[550px]" />
                </div>
                <Link to="/basket" className="selectori relative">
                    <div className="absolute z-[20] top-[-10px] right-[-10px] flex flex-row justify-center items-center w-[20px] h-[20px] bg-red-600 rounded-[50%]
                    text-white">{allNum}</div>
                    <svg className="z-[20]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </Link>
                <Link to="/login" className="selectori">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Link>
            </div>

            </div>
        </div>
    )

}
export default Navbar