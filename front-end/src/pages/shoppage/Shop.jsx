import React from 'react'
// import products from '../../products.json'
import Product from '../../components/Product'
import { Range } from "react-range";
import api from '../../api';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';

const Shop = () => {

    // getting products from back-end
    const [randomProducts, setRandomProducts] = React.useState([]);
    const [totalProducts, setTotalProducts] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
    setLoading(true);

    api.get("/api/products/")
        .then(res => {
        setProducts(res.data);
        setTotalProducts(res.data.length);
        setRandomProducts(shuffleArray(res.data));
        })
        .catch(err => {
        console.log(err);
        })
        .finally(() => {
        setLoading(false);
        });

    }, []);

    // getting products
      const [backendWaking, setBackendWaking] = React.useState(true)
    React.useEffect(() => {
        async function wakeBackend() {
        try {
            await api.get("api/products/")
        } catch (error) {
            console.log("Backend wake attempt:", error?.message)
        } finally {
            setBackendWaking(false)
        }
        }
        wakeBackend()
    }, [])

    // radnom products shuffle
    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 9
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const currentProducts = randomProducts.slice(start, end)
    const totalPages = Math.ceil(randomProducts.length / itemsPerPage)
    const [products, setProducts] = React.useState([])
    function renderPages() {
        let pages = []
        pages.push(1)
        if(currentPage > 3) {
            pages.push("...")
        }
        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)
        for(let i = start; i <= end; i++) {
            pages.push(i)
        }
        if(currentPage < totalPages - 2) {
            pages.push("...")
        }
        if(totalPages > 1) {
            pages.push(totalPages)
        }
        return pages
    }

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
    // brands generator
    const [brands] = React.useState([
        {name: 'T-shirts'}, {name: 'Shorts'}, {name: 'Shirts'}, {name: 'Hoodie'},
        {name: 'Jeans'}
    ])
    const [brand, setBrand] = React.useState(null)
    function brandPicker(brandName) {
        setBrand(prev => (prev === brandName ? null : brandName));
    }
    // styles generator
    const [styles] = React.useState([
        {name: 'Casual'}, {name: 'Formal'}, {name: 'Party'}, {name: 'Gym'},
    ])
    const [style, setStyle] = React.useState(null)
    function stylePicker(styleName) {
        setStyle(prev => (prev === styleName ? null : styleName));
    }

    // min-max generator
    const [values, setValues] = React.useState([50, 200])

    // filter products
    let location = useLocation()
    React.useEffect(() => {
        setLoading(true)
        let searched = location.state
        if(searched) {
            let randomNum = Math.floor(Math.random() * (30 - 10 + 1)) + 5
            setRandomProducts(prev => shuffleArray(prev).slice(0, randomNum))
        }
        setLoading(false)
    }, [products])
    function applyFilter() {
        setLoading(true)
        if(brand !== null && pickColor !== null && pickSize !== null && style !== null) {
            let randomNum = Math.floor(Math.random() * (30 - 10 + 1)) + 5
            console.log(randomNum)
            setRandomProducts(prev => shuffleArray(prev).slice(0, randomNum))
        }
        setFilter(false)
        setLoading(false)
    }
    // see all products
    async function getProductsClicked() {
        setLoading(true)
        await api.get("/api/products/")
            .then(res => {
                setProducts(res.data);
                setTotalProducts(res.data.length);
                setRandomProducts(shuffleArray(res.data));
            })
            .catch(err => console.log(err));
        setBrand(false)
        setPickColor(false)
        setPickSize(false)
        setStyle(false)
        setLoading(false)
    }
    // loading animation products
    const times = [...Array(6).keys()]

  const [isVisible, setIsVisible] = React.useState(false)
  const sectionRef = React.useRef(null)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if(entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      }, {threshold: 0.2}
    )
    if(sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

    // wait products
    const [productLoader, setProductLoader] = React.useState(true)
    React.useState(() => {
        const timer1 = setTimeout(() => {
            setProductLoader(false)
        }, 5000)
        return () => {clearTimeout(timer1)}
    })

    return (
        <div className="flex flex-row justify-center items-center">
        <div className="pt-[90px] pb-[120px] px-[20px] end:px-[0px] relative end:w-[1500px]">

            {productLoader ? (
                <div className="fixed w-[100%] p-[15px] z-[50] bg-gray-200 text-black bottom-[0px] flex flex-row justify-center items-center gap-[8px] font-bold text-[18px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    wait products.
                </div>
            ) : null}
            
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
                    <div className={`w-[100%] h-[100%] fixed z-[30] left-[0] top-[60px] bg-white overflow-y-auto p-[20px] pt-[50px] pb-[80px] transition-all duration-[0.5s] ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}>
                        <div onClick={filterFunction} className="bg-gray-100 p-[10px] flex flex-row justify-center items-center left-[10px] top-[70px] fixed rounded-[50%]
                        shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[100%] gap-[12px] mt-[20px] border-t-[1px] border-b-[1px] border-gray-300 py-[16px]">
                            {brands.map((brando) => (
                                <div
                                    key={brando.name}
                                    onClick={() => brandPicker(brando.name)}
                                    className={`flex flex-row justify-between items-center w-[100%] hover:opacity-[0.7] transition-all duration-[0.3s] cursor-pointer ${brand === brando.name ? "text-red-600" : ""}`}
                                >
                                    <p>{brando.name}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            ))}
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
                            {styles.map((stylo) => (
                                <div key={stylo.name} onClick={() => {stylePicker(stylo.name)}} className={`flex flex-row justify-between items-center w-[100%] hover:opacity-[0.7] transition-all duration-[0.3s] cursor-pointer ${stylo.name === style ? "text-red-600" : ""}`}>
                                    <p>{stylo.name}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => {applyFilter()}} className="w-[100%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600 mt-[40px]">
                        Apply Filter
                        </button>

                    </div>
                ) : (
                    null
                )
            }
            <div className="flex flex-row justify-center lg:justify-between lg:gap-[20px] items-center lg:items-start w-[100%]">

                    <div ref={sectionRef} className={`hidden lg:block w-[400px] h-[100%] bg-white overflow-y-auto p-[20px] pt-[20px] pb-[20px] border-[2px] border-gray-200
                    rounded-[20px] transition-all duration-[0.5s] ${isVisible ? "opacity-[1] translate-x-[0px]" : "opacity-[0] translate-x-[-50px]"}`}>
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
                            {brands.map((brando) => (
                                <div
                                    key={brando.name}
                                    onClick={() => brandPicker(brando.name)}
                                    className={`flex flex-row justify-between items-center w-[100%] hover:opacity-[0.7] transition-all duration-[0.3s] cursor-pointer ${brand === brando.name ? "text-red-600" : ""}`}
                                >
                                    <p>{brando.name}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            ))}
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
                            {styles.map((stylo) => (
                                <div key={stylo.name} onClick={() => {stylePicker(stylo.name)}} className={`flex flex-row justify-between items-center w-[100%] hover:opacity-[0.7] transition-all duration-[0.3s] cursor-pointer ${stylo.name === style ? "text-red-600" : ""}`}>
                                    <p>{stylo.name}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                        <div className="w-[100%] flex flex-row justify-center items-center">
                        <button onClick={() => {applyFilter()}} className="w-[100%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600 mt-[40px]">
                        Apply Filter
                        </button>
                        </div>

                    </div>

            <div>
                <div className="hidden"></div>
                <div className="flex flex-col justify-center items-center gap-[18px]">
                    <div className="flex flex-row justify-between items-center w-[100%]">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-[12px]">
                            <p className="text-[24px] text-black font-bold">Casual</p>
                            <p onClick={getProductsClicked} className="text-[14px] text-black underline cursor-pointer transition-all duration-[0.3s] hover:opacity-[0.7]">See All Products</p>
                        </div>
                        <p>Showing 1-9 of {totalProducts} Products</p>
                    </div>
                    <div ref={sectionRef} className={`grid grid-cols-2 sm2:grid-cols-3 sm2:gap-[24px] gap-[18px] transition-all duration-[0.5s] ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}>
                        {
                            currentProducts.slice(0, 9).map((product, index) => {
                                const imgSrc = images[`../../public/assets/images/${product.image}`];
                                return (
                                    <Product key={product.id || index} product={product} imgSrc={product.image} />
                                )
                            })
                        }
                        {
                        loading ? (
                            times.map((i) => {
                            return(
                            <div
                                key={i}
                                className="flex flex-row justify-center items-center group cursor-pointer transition-all duration-[0.3s] hover:scale-90 shadow-sm"
                            >
                                <div className="flex flex-col justify-start items-start">
                                <div className="w-[100%] h-[100%] animate-pulse bg-gray-200"></div>
                                <p className="text-black text-[14px] font-bold lg2:text-[16px]">Loading</p>
                                <p className="flex items-center gap-1 animate-pulse">0/5</p>

                                <div className="flex flex-row justify-center gap-[12px]">
                                    <p className="text-[black] text-[22px] lg2:text-[26px] font-bold animate-pulse">$</p>
                                    <del className="text-gray-500 text-[22px] lg2:text-[26px] font-bold"></del>
                                </div>
                                </div>
                            </div>
                            )
                            })
                        ) : null
                        }
                    </div>
                    <div className="flex flex-row justify-center items-center gap-[18px]">
                        <button disabled={currentPage === 1} onClick={() => {setCurrentPage(p => p - 1)}} className="border-[1px] border-black rounded-[8px] p-[8px] text-[16px] cursor-pointer transition-all duration-[0.3s] hover:translate-x-[-5px]">{"<---"}</button>
                        <div className="flex flex-row justify-center items-center flex-wrap gap-[8px]">
                        {
                            renderPages().map((page, index) => (
                                <button key={index} disabled={page === "..."} onClick={() => {page !== "..." && setCurrentPage(page)}} className={`border-[1px] rounded-[8px] p-[8px] text-[16px] ${currentPage === index + 1 ? "bg-black text-white border-red" : "bg-white text-black border-black"}`}>{page}</button>
                            ))
                        }
                        </div>
                        <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(p => p + 1)}} className="border-[1px] border-black rounded-[8px] p-[8px] text-[16px] cursor-pointer transition-all duration-[0.3s] hover:translate-x-[5px]">{"--->"}</button>
                    </div>
                </div>
            </div>

            </div>


        {
          (loading || backendWaking) ? (
            <div className="fixed bottom-[20px] right-[20px] z-[60] flex flex-row justify-center items-center px-[15px] py-[10px] rounded-[12px] bg-gray-200 shadow-md border-[1px] border-gray-300">
              <Loading />
            </div>
          ) : null
        }


        </div>
        </div>
    )

}
export default Shop