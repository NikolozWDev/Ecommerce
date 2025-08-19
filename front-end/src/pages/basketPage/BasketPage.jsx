import React from "react";
import products from "../../products.json";
import Product from "../../components/Product";
import { CartContext } from "../../components/CartContext";
import { Link } from "react-router-dom";

const BasketPage = () => {
  const { cart, setCart } = React.useContext(CartContext);

  const images = import.meta.glob("../../public/assets/images/*", {
    eager: true,
    import: "default",
  });
  console.log(cart);

  // productNum increase, dicrease
  function increaseNum(itemId) {
    setCart(cart.map((item) => {
      return item.id === itemId ? {...item, productNum: item.productNum + 1} : item
    }))
  }
  function dicreaseNum(itemId) {
    setCart(cart.map((item) => {
      return item.id === itemId && item.productNum > 1 ? {...item, productNum: item.productNum - 1} : item
    }))
  }

  return (
    <div className="flex flex-row justify-center items-center w-[100%]">
      <div className="pt-[100px] pb-[100px] px-[20px] end:w-[1500px] end:px-[0px]">
        {cart.length === 0 ? (
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
          <div className="flex flex-col md:flex-row gap-[20px] justify-center items-center md:items-start">
            <div>
              <p className="title-name text-[30px] uppercase cursor-auto">
                your cart
              </p>
              <div className="w-[100%] mt-[20px] flex flex-col justify-center items-center gap-[12px] border-[1px] border-gray-300 rounded-[16px] p-[14px]">
                {cart.map((item) => {
                  console.log(item.id);
                  const image =
                    images[`../../public/assets/images/${item.product.image}`];
                  return (
                    <>
                      <div
                        key={item.id}
                        className="w-[100%] flex flex-row justify-between gap-[12px] items-start"
                      >
                        <img
                          src={image}
                          className={`w-[40%] lg:w-[30%] border-[1px] border-gray-300 rounded-[24px] ${
                            item.pickColor === "color-first"
                              ? "border-[2px] border-gray-200 rounded-[18px]"
                              : item.pickColor === "color-second"
                              ? "hue-rotate-180 border-[2px] border-gray-200 rounded-[18px]"
                              : item.pickColor === "color-third"
                              ? "grayscale border-[2px] border-gray-200 rounded-[18px]"
                              : null
                          }`}
                        />
                        <div className="w-[100%] flex flex-col justify-center items-start gap-[0px]">
                          <div className="w-[100%] flex flex-row justify-between items-center">
                            <p className="text-black text-[16px] font-bold sm2:text-[24px]">
                              {item.product.title}
                            </p>
                            <div className="text-red-600">
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
                              {item.pickSize}
                            </span>
                          </p>
                          <p className="text-black text-[14px] sm2:text-[18px]">
                            Color:{" "}
                            <span
                              className="text-gray-500 text-[12px]
                                            sm2:text-[16px]"
                            >
                              {item.pickColor}
                            </span>
                          </p>
                          <div className="w-[100%] mt-[5px] flex flex-row justify-between items-center">
                            <p className="text-black text-[20px] font-bold sm2:text-[24px]">
                              ${item.product.price}{" "}
                              {item.product.downPrice !== 0 ? (
                                <del className="text-gray-500">
                                  ${item.product.downPrice}
                                </del>
                              ) : null}
                            </p>
                            <div className="flex flex-row justify-center lg:w-[30%] lg:justify-between items-center px-[12px] py-[8px] bg-gray-200 gap-[10px] rounded-[24px]">
                              <div
                                onClick={() => dicreaseNum(item.id)}
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
                                {item.productNum}
                              </p>
                              <div
                                onClick={() => increaseNum(item.id)}
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

            <div className="md:flex md:flex-col md:gap-[20px] w-[100%] lg:w-[50%]">
              <p className="title-name text-[30px] uppercase hidden md:block cursor-auto">
                Order Summary
              </p>
              <div className="w-[100%] flex flex-col justify-center items-start gap-[12px] border-[1px] border-gray-300 rounded-[16px] p-[14px] lg:p-[30px]">
                <p className="title-name text-[30px] cursor-auto md:hidden">
                  Order Summary
                </p>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p className="text-gray-500 text-[16px]">Subtotal</p>
                  <p className="text-gray-500 text-[16px]">price</p>
                </div>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p className="text-gray-500 text-[16px]">Discount -20%</p>
                  <p className="text-gray-500 text-[16px]">price</p>
                </div>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p className="text-gray-500 text-[16px]">Delivery Fee</p>
                  <p className="text-gray-500 text-[16px]">price</p>
                </div>
                <div className="w-[100%] h-[1px] bg-gray-200"></div>
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <p>Total</p>
                  <p>totalprice</p>
                </div>
                <div className="w-[100%] flex flex-row justify-center items-center gap-[8px]">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="w-[100%] px-[20px] lg:w-[250px] bg-gray-200 py-[12px] rounded-[22px] text-[14px]"
                  />
                  <button className="flex flex-row justify-center items-center px-[20px] py-[10px] bg-black text-white rounded-[22px]">
                    Apply
                  </button>
                </div>
                <div className="flex flex-row w-[100%] justify-center items-center">
                  <button
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BasketPage;