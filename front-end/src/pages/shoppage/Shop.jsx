import React from 'react'
// import products from '../../products.json'
import Product from '../../components/Product'
import { Range } from "react-range";
import api from '../../api';

const Shop = () => {

    // getting products from back-end
    const [products, setProducts] = React.useState([])
    React.useEffect(() => {
        api.get("/api/products/").then(res => setProducts(res.data)).catch(err => console.log(err))
    }, [])

    // radnom products shuffle
    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }
    const [randomProducts] = React.useState(() => shuffleArray(products))

    // image generator
    const images = import.meta.glob('../../public/assets/images/*', { eager: true, import: 'default' });

    // filer bar open/close
    const [filter, setFilter] = React.useState(false)

    function filterFunction() {
        if(filter) {
            setFilter(false)
        } else {
            setFilter(true)
        }
    }

    // colors generator
    const [colors] = React.useState([
        {name: 'green', class: 'bg-green-500'}, {name: 'red', class:'bg-red-500'}, {name: 'yellow', class: 'bg-yellow-500'},
        {name: 'orange', class: 'bg-orange-500'}, {name: 'aqua', class: 'bg-aqua-500'}, {name: 'blue', class: 'bg-blue-500'}, {name: 'purple', class: 'bg-purple-500'},
        {name: 'pink', class: 'bg-pink-500'}, {name: 'white', class: 'bg-white'}, {name: 'black', class: 'bg-black'}
    ])
    const [pickColor, setPickColor] = React.useState(null)
    function colorPicker(colorName) {
        if(pickColor === colorName) {
            setPickColor(null)
        } else {
            setPickColor(colorName)
        }
    }

    // size generator
    const [sizes] = React.useState([
        {name: 'XX-Small'}, {name: 'X-Small'}, {name: 'Small'}, {name: 'Medium'},
        {name: 'Large'}, {name: 'X-Large'}, {name: 'XX-Large'}, {name: '3X-Large'}, {name: '4X-Large'}
    ])
    const [pickSize, setPickSize] = React.useState(null)
    function sizePicker(sizeName) {
        if(pickSize === sizeName) {
            setPickSize(null)
        } else {
            setPickSize(sizeName)
        }
    }

    // min-max generator
    const [values, setValues] = React.useState([50, 200])

    return (
        <div className="flex flex-row justify-center items-center">
        <div className="pt-[90px] pb-[120px] px-[20px] end:px-[0px] relative end:w-[1500px]">
            
            <div className="pb-[10px]">
                <p>Home / Casual</p>
            </div>

            <div onClick={filterFunction} className="flex lg:hidden flex-row justify-center items-center gap-[4px] shadow-md w-[100%] py-[8px] border-[1px] border-gray-300 mt-[10px]">
                <p className="text-[16px] text-black font-bold">Filters</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
            </div>

            {
                filter ? (
                    <div className="w-[100%] h-[100%] fixed z-[30] left-[0] top-[60px] bg-white overflow-y-auto p-[20px] pt-[50px] pb-[80px]">
                        <div onClick={filterFunction} className="bg-gray-100 p-[10px] flex flex-row justify-center items-center left-[10px] top-[70px] fixed rounded-[50%]
                        shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[100%] gap-[12px] mt-[20px] border-t-[1px] border-b-[1px] border-gray-300 py-[16px]">
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>T-shirts</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Shorts</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Shirts</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Hoodie</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Jeans</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-start py-[10px] w-[100%] border-b-[1px] border-gray-300">
                            <p className="text-[20px] text-black font-bold">Price</p>
                            <div className="w-[100%] flex flex-row justify-center items-center">
                                <div className="w-[100%]">
                                <Range
                                    step={1}
                                    min={0}
                                    max={500}
                                    values={values}
                                    onChange={(newValues) => setValues(newValues)}
                                    renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                        height: "6px",
                                        background: "lightgray",
                                        position: "relative",
                                        borderRadius: "3px"
                                        }}
                                    >
                                        <div
                                        style={{
                                            position: "absolute",
                                            height: "6px",
                                            background: "black",
                                            borderRadius: "3px",
                                            left: `${(values[0] / 500) * 100}%`,
                                            width: `${((values[1] - values[0]) / 500) * 100}%`
                                        }}
                                        />
                                        {children}
                                    </div>
                                    )}
                                    renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                        height: "20px",
                                        width: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "black"
                                        }}
                                    />
                                    )}
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>${values[0]}</span>
                                <span>${values[1]}</span>
                            </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start gap-[14px] py-[20px] w-[100%] border-b-[1px] border-gray-300">
                            <p className="text-[20px] text-black font-bold">Colors</p>
                            <div className="flex flex-wrap justify-start items-center gap-[12px]">
                            {
                                colors.map((color) => {
                                    return (
                                        <div onClick={() => colorPicker(color.name)} className={`flex flex-row justify-center items-center border-[1px] border-gray-500 rounded-[50%] w-[60px] h-[60px] ${color.class} cursor-pointer`}>
                                            {
                                                pickColor === color.name ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                                ) : ( null )
                                            }
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start gap-[14px] py-[20px] w-[100%] border-b-[1px] border-gray-300">
                            <p className="text-[20px] text-black font-bold">Size</p>
                            <div className="flex flex-wrap justify-start items-center gap-[12px]">
                                {
                                    sizes.map((size) => {
                                        return (
                                            <div onClick={() => sizePicker(size.name)} className={`py-[8px] px-[14px] rounded-[24px] shadow-sm bg-gray-200 text-gray-500
                                                flex flex-row justify-center items-center text-[14px] border-[1px] hover:border-red-600 transition-all duration-[0.3s]
                                                ${pickSize === size.name ? 'bg-gray-900 text-white' : ''}`}>{size.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start w-[100%] gap-[12px] mt-[20px] pt-[15px]">
                            <p className="text-[20px] text-black font-bold">Dress Styles</p>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Casual</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Formal</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Party</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Gym</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                        <button className="w-[100%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600 mt-[40px]">
                        Apply Filter
                        </button>

                    </div>
                ) : (
                    null
                )
            }
            <div className="flex flex-row justify-center lg:justify-between lg:gap-[20px] items-center lg:items-start w-[100%]">

                    <div className="hidden lg:block w-[400px] h-[100%] bg-white overflow-y-auto p-[20px] pt-[20px] pb-[20px] border-[2px] border-gray-200
                    rounded-[20px]">
                        <div onClick={filterFunction} className="lg:hidden bg-gray-100 p-[10px] flex flex-row justify-center items-center left-[10px] top-[70px] fixed rounded-[50%]
                        shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="flex flex-row justify-between items-center w-[100%]">
                            <p className="text=[26px] text-black font-bold">Filters</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[100%] gap-[12px] mt-[20px] border-t-[1px] border-b-[1px] border-gray-300 py-[16px]">
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>T-shirts</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Shorts</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Shirts</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Hoodie</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Jeans</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center items-start py-[10px] w-[100%] border-b-[1px] border-gray-300">
                            <p className="text-[20px] text-black font-bold">Price</p>
                            <div className="w-[100%] flex flex-row justify-center items-center">
                                <div className="w-[100%]">
                                <Range
                                    step={1}
                                    min={0}
                                    max={500}
                                    values={values}
                                    onChange={(newValues) => setValues(newValues)}
                                    renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                        height: "6px",
                                        background: "lightgray",
                                        position: "relative",
                                        borderRadius: "3px"
                                        }}
                                    >
                                        <div
                                        style={{
                                            position: "absolute",
                                            height: "6px",
                                            background: "black",
                                            borderRadius: "3px",
                                            left: `${(values[0] / 500) * 100}%`,
                                            width: `${((values[1] - values[0]) / 500) * 100}%`
                                        }}
                                        />
                                        {children}
                                    </div>
                                    )}
                                    renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                        height: "20px",
                                        width: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "black"
                                        }}
                                    />
                                    )}
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>${values[0]}</span>
                                <span>${values[1]}</span>
                            </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start gap-[14px] py-[20px] w-[100%] border-b-[1px] border-gray-300">
                            <p className="text-[20px] text-black font-bold">Colors</p>
                            <div className="flex flex-wrap justify-start items-center gap-[12px]">
                            {
                                colors.map((color) => {
                                    return (
                                        <div onClick={() => colorPicker(color.name)} className={`flex flex-row justify-center items-center border-[1px] border-gray-500 rounded-[50%] w-[60px] h-[60px] ${color.class} cursor-pointer`}>
                                            {
                                                pickColor === color.name ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                                ) : ( null )
                                            }
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start gap-[14px] py-[20px] w-[100%] border-b-[1px] border-gray-300">
                            <p className="text-[20px] text-black font-bold">Size</p>
                            <div className="flex flex-wrap justify-start items-center gap-[12px]">
                                {
                                    sizes.map((size) => {
                                        return (
                                            <div onClick={() => sizePicker(size.name)} className={`py-[8px] px-[14px] rounded-[24px] shadow-sm bg-gray-200 text-gray-500
                                                flex flex-row justify-center items-center text-[14px] cursor-pointer border-[1px] hover:border-red-600 transition-all duration-[0.3s]
                                                ${pickSize === size.name ? 'bg-gray-900 text-white' : ''}`}>{size.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start w-[100%] gap-[12px] mt-[20px] pt-[15px]">
                            <p className="text-[20px] text-black font-bold">Dress Styles</p>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Casual</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Formal</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Party</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-between items-center w-[100%] hover:text-red-600 transition-all duration-[0.3s] cursor-pointer">
                                <p>Gym</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                        <div className="w-[100%] flex flex-row justify-center items-center">
                        <button className="w-[100%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600 mt-[40px]">
                        Apply Filter
                        </button>
                        </div>

                    </div>

            <div>
                <div className="hidden"></div>
                <div className="flex flex-col justify-center items-center gap-[18px]">
                    <div className="flex flex-row justify-between items-center w-[100%]">
                        <p className="text-[24px] text-black font-bold">Casual</p>
                        <p>Showing 1-9 of 57 Products</p>
                    </div>
                    <div className="grid grid-cols-2 sm2:grid-cols-3 sm2:gap-[24px] gap-[18px]">
                        {
                            randomProducts.slice(0, 9).map((product) => {
                                const imgSrc = images[`../../public/assets/images/${product.image}`];
                                return (
                                    <Product key={product.id} product={product} imgSrc={product.image} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            </div>

        </div>
        </div>
    )

}
export default Shop