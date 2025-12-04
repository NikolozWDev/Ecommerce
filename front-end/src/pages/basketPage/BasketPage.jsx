import React from "react";
// import products from "../../products.json";
import Product from "../../components/Product";
import { CartContext } from "../../components/CartContext";
import { Link } from "react-router-dom";
import api from "../../api";
import Loading from "../../components/Loading";

const BasketPage = ({getItems}) => {

  const [allProducts, setAllProducts] = React.useState([])
  const [totalSummary, setTotalSummary] = React.useState("")
  const [deliveryFee, setDeliveryFee] = React.useState("")
  const [promoPrice, setPromoPrice] = React.useState("")
  const [totalPrice, setTotalPrice] = React.useState("")
  const [promo, setPromo] = React.useState("")
  const [promoCorrect, setPromoCorrect] = React.useState(null)
  const [totalItems, setTotalItems] = React.useState("")
  const [totalProducts, setTotalProducts] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  async function basketProducts() {
    setLoading(true)
    try {
      const res = await api.get("api/basket/")
      setAllProducts(res.data)
      getItems()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(`when getting products, occured error: ${error}`)
    }
  }
  React.useEffect(() => {
    basketProducts()
    getBasketSummary()
    getItems()
  }, [])
  async function getBasketSummary() {
    setLoading(true)
    try {
      const res = await api.get(`api/basket/summary/`)

      setTotalSummary(res.data.subtotal)
      setDeliveryFee(res.data.deliveryfee)
      setTotalPrice(res.data.totalprice)
      setTotalItems(res.data.totalitems)
      setPromoPrice(res.data.promoprice)
      setPromoCorrect(res.data.promoactivate)
      setTotalProducts(res.data.totalproducts)
      getItems()
      setLoading(false)

    } catch (error) {
      setLoading(false)
      alert("something went wrong when promocoding")
      console.log("promocode error:", error)
    }
  }
  async function getPromoApply() {
    setLoading(true)
    try {
      const res = await api.post("api/basket/promo-apply/", {promo: promo})
      if(res.data.valid) {
        await getBasketSummary()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setPromoCorrect(false)
      console.log(`error promocode: ${error}`)
    }
  }
  async function removeProduct(e, id) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.delete(`api/basket/${id}/remove/`)
      setAllProducts((prev) => prev.filter((item) => item.id !== id))
      await getBasketSummary()
      getItems()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(`during removing product, occured error: ${error}`)
    }
  }
  async function increaseProductNum(pId) {
    setLoading(true)
    try {
      const res = await api.post(`api/basket/${pId}/increase/`)
      basketProducts()
      getBasketSummary()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(`occured error while increase product num: ${error}`)
    }
  }
  async function decreaseProductNum(pId) {
    setLoading(true)
    try {
      const res = await api.post(`api/basket/${pId}/decrease/`)
      basketProducts()
      getBasketSummary()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(`occured error while decrease product num: ${error}`)
    }
  }
  // go to checkout
  const [checkout, setCheckout] = React.useState(false)
  function checkoutFunc() {
    if(checkout) {
      setCheckout(false)
    } else {
      setCheckout(true)
    }
  }
  // form data
  const currentStatus = ["Student", "Employed Graduate", "Unemployed Graduate"]
  const [address, setAddress] = React.useState("")
  const [city, setCity] = React.useState("")
  const [district, setDistrict] = React.useState("")
  const [state, setState] = React.useState("")
  const [zipCode, setZipCode] = React.useState("")
  const [qualification, setQualification] = React.useState("")
  const [status, setStatus] = React.useState("")
  // forms validations
  const [errorAddress, setErrorAddress] = React.useState(false)
  const [errorCity, setErrorCity] = React.useState(false)
  const [errorDistrict, setErrorDistrict] = React.useState(false)
  const [errorState, setErrorState] = React.useState(false)
  const [errorZipCode, setErrorZipCode] = React.useState(false)
  const [errorQualification, setErrorQualification] = React.useState(false)
  const [errorStatus, setErrorStatus] = React.useState(false)
  React.useEffect(() => {
    if((address.length > 62 || address.length < 4) && address !== "") {
      setErrorAddress(true)
    } else {
      setErrorAddress(false)
    }
    if((city.length > 52 || city.length < 4) && city !== "") {
      setErrorCity(true)
    } else {
      setErrorCity(false)
    }
    if((district.length > 52 || district.length < 4) && district !== "") {
      setErrorDistrict(true)
    } else {
      setErrorDistrict(false)
    }
    if((state.length > 52 || state.length < 4) && state !== "") {
      setErrorState(true)
    } else {
      setErrorState(false)
    }
    if((zipCode.length > 48 || zipCode.length < 2) && zipCode !== "") {
      setErrorZipCode(true)
    } else {
      setErrorZipCode(false)
    }
    if((qualification.length > 248 || qualification.length < 20) && qualification !== "") {
      setErrorQualification(true)
    } else {
      setErrorQualification(false)
    }
    if(!currentStatus.includes(status)) {
      setErrorStatus(true)
    } else {
      setErrorStatus(false)
    }

  }, [address, city, district, state, zipCode, qualification, status])
  async function formData() {
    setLoading(true)
    if(
      errorAddress ||
      errorCity ||
      errorDistrict ||
      errorState ||
      errorZipCode ||
      errorQualification ||
      errorStatus
    ) {
      console.log("Form has errors");
      setLoading(false)
      return;
    }
    if(!address || !city || !district || !state || !zipCode || !qualification || !status) {
      console.log("All fields required");
      setLoading(false)
      return;
    }
    await api.post("api/shipping-address/", {address: address, city: city, district: district, state: state, postal_code: zipCode, qualification: qualification, current_status: status})
    setAddress("")
    setCity("")
    setDistrict("")
    setState("")
    setZipCode("")
    setQualification("")
    setStatus("")
    window.location.reload()
    setCheckout(true)
    setLoading(false)
  }
  const [isFormed, setIsFormed] = React.useState(false)
  React.useEffect(() => {
    async function fetchAddress() {
      setLoading(true)
      try {
      const res = await api.get("api/shipping-address/")
      setIsFormed(true)
      console.log(res)
      setLoading(false)
      } catch (error) {
        if (error.response?.status === 404) {
          setIsFormed(false)
          setLoading(false)
        } else {
          console.log("Error loading address:", error);
          setLoading(false)
        }
          console.log(`getting address error: ${error}`)
          setLoading(false)
        }
    }
    fetchAddress()
  }, [])

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
      }, [loading])


  return (
    <div className="flex flex-row justify-center items-center w-[100%]">
      <div className="pt-[100px] pb-[100px] px-[20px] end:w-[1500px] end:px-[0px] relative">
        {allProducts.length === 0 ? (
          <div className="text-center pt-[120px] pb-[120px]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Basket is Empty 🛒
            </h2>
            <p className="text-gray-500 text-lg">There is not any product.</p>
            <Link
              to="/shop"
              className="inline-block mt-6 bg-gray-900 border-[2px] hover:border-red-600 text-white py-2 px-5 rounded-[24px] shadow-lg transition-all duration-300"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div ref={sectionRef} className={`flex flex-col md:flex-row gap-[20px] w-[100%] justify-between items-center md:items-start transition-all duration-[0.5s]`}>
            {checkout ? (
              <div ref={sectionRef} className={`w-[100%] flex flex-col justify-start items-start gap-[20px] ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}>
              <p className="title-name text-[30px] uppercase hidden md:block cursor-auto">Registration Form</p>
              <div className="w-[100%] shadow-md flex flex-row justify-center items-center">
                <form className="w-[100%] px-[5px] py-[15px] md:px-[50px] md:py-[30px] flex flex-col justify-center items-center gap-[16px]">
                  <div className="flex flex-col justify-start items-start gap-[4px] w-[100%]">
                    <p className="title-name text-[30px] uppercase md:hidden block cursor-auto">Registration Form</p>
                    {!isFormed ? (
                      <>
                        <p className="text-[14px] text-gray-600">Address</p>
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                        />
                        <p className={`text-sm text-red-600 ${errorAddress ? "block" : "hidden"}`}>
                          Error address
                        </p>

                        <p className="text-[14px] text-gray-600">City</p>
                        <input
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                        />
                        <p className={`text-sm text-red-600 ${errorCity ? "block" : "hidden"}`}>
                          Error city
                        </p>

                        <div className="flex flex-row gap-[30px] w-full">
                          <div className="flex flex-col w-full">
                            <p className="text-sm text-gray-600">District</p>
                            <input
                              onChange={(e) => setDistrict(e.target.value)}
                              className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                            />
                            <p className={`text-sm text-red-600 ${errorDistrict ? "block" : "hidden"}`}>
                              Error district
                            </p>
                          </div>

                          <div className="flex flex-col w-full">
                            <p className="text-sm text-gray-600">State</p>
                            <input
                              onChange={(e) => setState(e.target.value)}
                              className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                            />
                            <p className={`text-sm text-red-600 ${errorState ? "block" : "hidden"}`}>
                              Error state
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <p className="text-sm text-gray-600">Postal / Zip Code</p>
                          <input
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                          />
                          <p className={`text-sm text-red-600 ${errorZipCode ? "block" : "hidden"}`}>
                            Error zipCode
                          </p>
                        </div>

                        <div className="flex flex-col w-full">
                          <p className="text-[16px]">Qualification</p>
                          <textarea
                            onChange={(e) => setQualification(e.target.value)}
                            className="w-full border border-gray-400 rounded px-2 py-2 text-sm h-[150px] resize-none focus:outline-red-600 hover:bg-gray-100"
                          />
                          <p className={`text-sm text-red-600 ${errorQualification ? "block" : "hidden"}`}>
                            Error qualification
                          </p>
                        </div>

                        <div className="flex flex-col w-full">
                          <p className="text-[16px]">Current Status</p>
                          <div className="flex flex-row justify-between items-center w-full">
                            {currentStatus.map((statusItem) => (
                              <label key={statusItem} className="flex items-center gap-[8px]">
                                <input type="radio" value={statusItem} name="current_status"
                                  onChange={(e) => setStatus(e.target.value)}
                                  className="w-[16px] h-[16px]"
                                />
                                <span className="text-sm text-gray-600">{statusItem}</span>
                              </label>
                            ))}
                          </div>
                          {/* <p className={`text-sm text-red-600 ${errorStatus ? "block" : "hidden"}`}>
                            Please submit one of them
                          </p> */}
                        </div>
                      </>
                    ) : null}
                    {!isFormed ? null : (
                      <div ref={sectionRef} className={`px-[20px] py-[10px] bg-green-300 ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}><span className="text-[20px]">✅</span> Your registration form has been successfully completed. If you would like to change/update anything, please see your account settings.</div>
                    )}
                      <div className="w-[100%] h-[1px] bg-gray-300 rounded-[8px] mt-[15px] mb-[15px]"></div>
                      <div onClick={formData} className="flex flex-row justify-center items-center gap-[14px] w-[100%] bg-black text-white py-[8px] px-[16px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600 cursor-pointer">Submit</div>
                    </div>
                </form>
              </div>
              </div>
            ) : (
            <div className={`md:w-[60%]`}>
              <p className="title-name text-[30px] uppercase cursor-auto">
                your cart
              </p>
              <div className="w-[100%] mt-[20px] flex flex-col justify-center items-center gap-[12px] border-[1px] border-gray-300 rounded-[16px] p-[14px]">
                {allProducts.map((item) => {
                  return (
                    <>
                      <div
                        key={item.id}
                        className="w-[100%] flex flex-row justify-center gap-[12px] items-start"
                      >
                        <img
                          src={item.product_image || "no-image.png"}
                          alt={item.product_title}
                          className={`w-[40%] lg:w-[30%] border-[1px] border-gray-300 rounded-[24px] ${
                            item.color === "color-first"
                              ? "border-[2px] border-gray-200 rounded-[18px]"
                              : item.color === "color-second"
                              ? "hue-rotate-180 border-[2px] border-gray-200 rounded-[18px]"
                              : item.color === "color-third"
                              ? "grayscale border-[2px] border-gray-200 rounded-[18px]"
                              : ""
                          }`}
                        />
                        <div className="w-[100%] flex flex-col justify-center items-start gap-[0px]">
                          <div className="w-[100%] flex flex-row justify-between items-center">
                            <p className="text-black text-[16px] font-bold sm2:text-[24px]">
                              {item.product_title}
                            </p>
                            <div
                              onClick={(e) => removeProduct(e, item.id)}
                              className="text-red-600 cursor-pointer selectori"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="text-black text-[14px] sm2:text-[18px]">
                            Size:{" "}
                            <span
                              className="text-gray-500 text-[12px]
                                            sm2:text-[16px]"
                            >
                              {item.size}
                            </span>
                          </p>
                          <p className="text-black text-[14px] sm2:text-[18px]">
                            Color:{" "}
                            <span
                              className="text-gray-500 text-[12px]
                                            sm2:text-[16px]"
                            >
                              {item.color}
                            </span>
                          </p>
                          <div className="w-[100%] mt-[5px] flex flex-row justify-between items-center">
                            <div className="text-black text-[20px] font-bold sm2:text-[24px]">
                              {item.product_down_price !== "0.00" ? (
                                <div className="flex flex-col justify-center items-center">
                                  <span>${item.product_down_price}</span>
                                  <del className="text-gray-500 ml-2">${item.product_price}</del>
                                </div>
                              ) : (
                                <>
                                  <span>${item.product_price}</span>
                                </>
                              )}
                            </div>
                            <div className="flex flex-row justify-center lg:w-[30%] lg:justify-between items-center px-[12px] py-[8px] bg-gray-200 gap-[10px] rounded-[24px]">
                              <div
                                onClick={() => {decreaseProductNum(item.id)}}
                                className="cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5 12h14"
                                  />
                                </svg>
                              </div>
                              <p className="text-[18px] text-black">
                                {item.number}
                              </p>
                              <div
                                onClick={() => {increaseProductNum(item.id)}}
                                className="cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[100%] h-[1px] bg-gray-200"></div>
                    </>
                  );
                })}
              </div>
            </div>
            )}

            <div className="md:flex md:flex-col md:gap-[20px] w-[100%] lg:w-[40%]">
              <p className="title-name text-[30px] uppercase hidden md:block cursor-auto">
                Order Summary
              </p>
              <div className="w-[100%] flex flex-col justify-center items-start gap-[12px] border-[1px] border-gray-300 rounded-[16px] p-[14px] lg:p-[30px]">
                <p className="title-name text-[30px] cursor-auto md:hidden">
                  Order Summary
                </p>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p className="text-gray-500 text-[16px]">Total items</p>
                  <p className="text-black text-[16px] flex flex-row justify-center items-center gap-[4px]">
                    {totalItems}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                  </svg>
                  </p>
                </div>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p className="text-gray-500 text-[16px]">Total products</p>
                  <p className="text-black text-[16px] flex flex-row justify-center items-center gap-[4px]">
                    {totalProducts}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                    </svg>
                  </p>
                </div>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p className="text-gray-500 text-[16px]">Subtotal</p>
                  <p className="text-black font-bold text-[20px]">
                    ${totalSummary}
                  </p>
                </div>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p className="text-gray-500 text-[16px]">Delivery Fee</p>
                  <p className="text-black font-bold text-[20px]">
                    ${deliveryFee}
                  </p>
                </div>
                {promoCorrect && promoPrice !== "0.00" ? (
                  <div className="w-[100%] flex flex-row justify-between items-center">
                    <p className="text-gray-700 text-[16px]">Promo code: <span className="text-red-500">-25%</span></p>
                    <p className="text-red-500 font-bold text-[20px]">
                      -${promoPrice}
                    </p>
                  </div>
                ) : null}
                <div className="w-[100%] h-[1px] bg-gray-200"></div>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p>Total</p>
                  <p className="text-black font-bold text-[20px]">
                    ${totalPrice}
                  </p>
                </div>
                <div className="w-[100%] flex flex-col justify-center items-center gap-[0px]">
                  {promoCorrect ? null : (
                  <div className="w-[100%] flex flex-row justify-center items-center gap-[8px]">
                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      onKeyDown={(e) => {if(e.key == "Enter") {getPromoApply()}}}
                      type="text"
                      placeholder="Add promo code"
                      className="w-[100%] px-[20px] lg:w-[250px] bg-gray-200 py-[12px] rounded-[22px] text-[14px]"
                    />
                    <button
                      onClick={() => getPromoApply()}
                      className="flex flex-row justify-center items-center px-[20px] py-[10px] bg-black text-white rounded-[22px]"
                    >
                      Apply
                    </button>
                  </div>
                  )}
                  <div>
                      {!promoCorrect && promo !== "" ? (
                        <p className="text-[14px] text-red-600">promo code is incorrect.</p>
                      ) : null}
                  </div>
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center">
                  {/* {errorMessage ? (
                    !promoCorrect ? (
                      <p className="text-red-600 text-[16px]">
                        promo code is incorrect!
                      </p>
                    ) : null
                  ) : null} */}
                  {checkout ? (
                  <button onClick={checkoutFunc}
                    className="flex flex-row justify-center items-center gap-[14px] w-[100%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px]
                            border-[2px] transition-all duration-[0.3s] hover:border-red-600"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                    Go to Basket{" "}
                  </button>
                  ) : (
                  <button onClick={checkoutFunc}
                    className="flex flex-row justify-center items-center gap-[14px] w-[100%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px]
                            border-[2px] transition-all duration-[0.3s] hover:border-red-600"
                  >
                    Go to Checkout{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {
          loading ? (
            <div className="fixed bottom-[20px] right-[20px] z-[60] flex flex-row justify-center items-center px-[15px] py-[10px] rounded-[12px] bg-gray-200 shadow-md border-[1px] border-gray-300">
              <Loading />
            </div>
          ) : null
        }
      </div>
    </div>
  );
};
export default BasketPage;