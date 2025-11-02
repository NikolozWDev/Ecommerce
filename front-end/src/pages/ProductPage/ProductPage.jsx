import React from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/Product";
// import products from "../../products.json";
import comments from "../../comments.json";
import Comment from "../../components/Comment";
import { CartContext } from "../../components/CartContext";
// swiper js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ProductPage = () => {
  // product selector id
  const { id } = useParams();
  const [product, setProduct] = React.useState(null)
  const [comments, setComments] = React.useState([])

  // get images
  React.useEffect(() => {
    api.get(`api/products/${id}/`)
      .then((res) => {setProduct(res.data); setComments(res.data.comments);})
      .catch((err) => console.error(err));
  }, [id])
  const [randomProducts, setRandomProducts] = React.useState([])
  React.useEffect(() => {
    api.get("api/products/")
      .then((res) => {
        const products = res.data;
        const random = products.sort(() => 0.5 - Math.random());
        setRandomProducts(random);
      })
      .catch((err) => console.error(err));
  }, []);
  // update/delete comment
  function handleCommentDelete(deletedId) {
    setComments((prevComments) => prevComments.filter((c) => c.id !== deletedId));
  }
  function handleCommentUpdate(updatedComment) {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === updatedComment.id ? updatedComment : c
      )
    );
  }
  // add comment
    const [writeComment, setWriteComment] = React.useState(false)
    function writeReview() {
        if(writeComment) {
            setWriteComment(false)
        } else {
            setWriteComment(true)
        }
    }
    const [rating, setRating] = React.useState("")
    const [text, setText] = React.useState("")
    const [validateText, setValidateText] = React.useState(false)
    const [validateRating, setValidateRating] = React.useState(false)
    const [updateClicked, setUpdateClicked] = React.useState(false)
    const [showUsername, setShowUsername] = React.useState("")
    const [showUserPicture, setShowUserPicture] = React.useState("")
    React.useEffect(() => {
        if((text.length < 20 && text !== "") || text.length > 128) {
            setValidateText(true)
        } else {
            setValidateText(false)
        }
    }, [text])
    React.useEffect(() => {
        if(!["1", "2", "3", "4", "5"].includes(rating) && rating !== "") {
            setValidateRating(true)
        } else {
            setValidateRating(false)
        }
    }, [rating])
    const navigate = useNavigate()
    React.useEffect(() => {
      async function fetchUser() {
        try {
          const res = await api.get("api/user/profile/")
          setShowUsername(res.data.username)
          setShowUserPicture(res.data.profile_picture)
        } catch (error) {
          console.log("not authorized probably:", error)
          navigate("/login")
        }
      }

      if (writeComment) {
        fetchUser()
      }
    }, [writeComment])

  // make images, interactive
  const [allImages] = React.useState([
    { id: "img1", class: "border-[2px] border-gray-200 rounded-[18px]" },
    {
      id: "img2",
      class: "hue-rotate-180 border-[2px] border-gray-200 rounded-[18px]",
    },
    {
      id: "img3",
      class: "grayscale border-[2px] border-gray-200 rounded-[18px]",
    },
  ]);
  const [pickImage, setPickImage] = React.useState(null);
  function allImagesFunc(imageId) {
    if (pickImage === imageId) {
      setPickImage(null);
    } else {
      setPickImage(imageId);
    }
  }

  // colors selector
  const [seColors] = React.useState([
    { name: "color-first", class: "bg-yellow-900" },
    { name: "color-second", class: "bg-emerald-900" },
    { name: "color-third", class: "bg-indigo-900" },
  ]);
  const [pickColor, setPickColor] = React.useState(null);
  function pickerColor(colorName) {
    if (pickColor === colorName) {
      setPickColor(null);
    } else {
      setPickColor(colorName);
    }
  }

  // size selector
  const [sizeSel] = React.useState([
    { name: "Small" },
    { name: "Medium" },
    { name: "Large" },
    { name: "X-Large" },
  ]);
  const [pickSize, setPickSize] = React.useState(null);
  function pickerSize(sizeName) {
    if (pickSize === sizeName) {
      setPickSize(null);
    } else {
      setPickSize(sizeName);
    }
  }

  // product counter
  const [productNum, setProductNum] = React.useState(1);
  function increaseNum() {
    setProductNum(productNum + 1);
  }
  function dicreaseNum() {
    if (productNum > 1) {
      setProductNum(productNum - 1);
    } else {
      return;
    }
  }

  // filter product comments
  // const filteredComments = product ? comments.filter((p) => p.selector === product.id) : [];

  // validation
  const [clicked, setClicked] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  // save product in cart
  const { cart, setCart } = React.useContext(CartContext);
  function saveCart() {
    if (!pickColor || !pickSize) {
      setClicked(true);
      return;
    }
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.pickColor === pickColor &&
        item.pickSize === pickSize
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].productNum += productNum;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        { id: crypto.randomUUID(), product, pickColor, pickSize, productNum },
      ]);
    }

    setClicked(false);
    setAdded(true);
  }
  React.useEffect(() => {
    if (added) {
      const timer = setTimeout(() => {
        setAdded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [added]);


  if (!product) {
    return (
      <div className="pt-[100px] pb-[100px] flex justify-center items-center">
        <p className="text-[20px] text-gray-600">Loading product...</p>
      </div>
    );
  }
  return (
    <div className="pt-[100px] pb-[100px] px-[20px] relative">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-[12px] lg:gap-[24px] lg:flex-row lg:items-start end:w-[1500px]">
          <div className="flex flex-col justify-center end:justify-between items-center lg:items-start gap-[8px] end:gap-[0px] sm2:flex-row-reverse">
            <img
              src={product.image}
              className={`${pickImage} w-[80%] sm:w-[500px] rounded-[18px] border-[2px] border-red-600`}
            />
            <div className="flex flex-row justify-center lg2:items-start items-center gap-[4px] sm2:flex-col">
              {allImages.map((oneImage) => {
                return (
                  <img
                    key={oneImage.id}
                    onClick={() => allImagesFunc(oneImage.class)}
                    src={product.image}
                    className={`${
                      oneImage.class
                    } cursor-pointer w-[33%] sm2:w-[71%]
                                    ${
                                      pickImage === oneImage.class
                                        ? "border-red-600"
                                        : ""
                                    } hover:border-red-600 transition-all duration-[0.3s]`}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start lg:items-start gap-[4px] md:justify-center md:items-center lg2:w-[800px]">
            <p className="text-[24px] text-black font-bold lg:text-[40px]">
              {product.title}
            </p>
            <p>
              {"⭐".repeat(product.rate)} {product.rate}/5
            </p>
            <p className="text-[24px] text-black font-bold">
              ${product.down_price}{" "}
              {product.downPrice !== 0 ? (
                <del className="text-gray-500">${product.price}</del>
              ) : null}
            </p>
            <p className="text-[16px] text-gray-500">
              {product.title.repeat(5)} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aspernatur, exercitationem?
            </p>
            <div className="w-[100%] flex flex-col justify-start items-start gap-[8px] py-[18px] mt-[18px] border-t-[1px] border-b-[1px] border-gray-300">
              <p className="text-[16px] text-gray-500">Select Colors</p>
              <div className="flex flex-row justify-start items-start gap-[8px]">
                {seColors.map((color) => {
                  return (
                    <div
                      onClick={() => pickerColor(color.name)}
                      key={color.name}
                      className={`w-[60px] h-[60px] rounded-[50%] flex flex-row justify-center items-center cursor-pointer hover:opacity-[0.9] transition-all duration-[0.3s] ${color.class}`}
                    >
                      {pickColor === color.name ? (
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
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-[100%] flex flex-col justify-start items-start gap-[8px] pb-[18px] mt-[18px] border-b-[1px] border-gray-300">
              <p className="text-[16px] text-gray-500">Choose Size</p>
              <div className="flex flex-row justify-start items-start gap-[8px]">
                {sizeSel.map((size) => {
                  return (
                    <div
                      onClick={() => pickerSize(size.name)}
                      key={size.name}
                      className={`py-[8px] px-[14px] rounded-[24px] shadow-sm bg-gray-200 text-gray-500  flex flex-row cursor-pointer
                                        justify-center items-center text-[14px] border-[1px] hover:border-red-600 transition-all duration-[0.3s]
                                        ${
                                          pickSize === size.name
                                            ? "bg-gray-900 text-white"
                                            : ""
                                        }`}
                    >
                      {size.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-[100%] flex flex-row justify-center items-center gap-[8px] mt-[18px]">
              <div className="flex flex-row justify-center lg:w-[30%] lg:justify-between items-center px-[12px] py-[8px] bg-gray-200 gap-[10px] rounded-[24px]">
                <div onClick={() => dicreaseNum()} className="cursor-pointer">
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
                <p className="text-[18px] text-black">{productNum}</p>
                <div onClick={() => increaseNum()} className="cursor-pointer">
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
              <button
                onClick={saveCart}
                className="w-[80%] lg:w-[70%] bg-black text-white py-[12px] px-[20px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600"
              >
                Add To Cart
              </button>
            </div>
            <div className="flex flex-row justify-center items-center w-[100%] mt-[10px]">
              {clicked && (
                <p className="text-red-600 text-[18px]">
                  Please Select Color and Size Options!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20px] w-[100%] bg-gray-300 h-[2px]"></div>

      <div className="flex flex-row justify-center items-center">
        <div className="mt-[20px] end:w-[1500px]">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[24px] text-black font-bold">All Reviews</p>
            <div className="flex flex-row justify-end items-center gap-[4px]">
              <div
                className="py-[8px] px-[14px] rounded-[24px] shadow-sm bg-gray-200 text-gray-500  flex flex-row
                        justify-center items-center text-[14px] border-[1px] hover:border-red-600 transition-all duration-[0.3s] cursor-pointer"
              >
                Latest
              </div>
              <button onClick={writeReview} className="w-[150px] bg-black text-white py-[12px] px-[10px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600">
                {writeComment ? <span>Cancel</span> : <span>Write a Review</span>}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-[12px] mt-[20px]">
            {comments.map((comment) => {
              return (
                  <Comment key={comment.id || crypto.randomUUID()} comment={comment} onDelete={handleCommentDelete} update={handleCommentUpdate} writeComment={writeComment}/>
              );
            })}
            {
              writeComment ? (
                    <>
                    <div key={crypto.randomUUID} className="flex flex-col justify-start items-start gap-[12px] p-[25px] border-[1px] border-gray-200 rounded-[24px]
        h-[240px] max-h-[500px] overflow-y-auto">
                    <div className="w-[100%] flex justify-between">
                        <p className="flex flex-row justify-center items-center gap-[8px]">Enter value 1 / 5:
                            <div className="flex flex-col justify-start items-start gap-[4px]">
                                <input onChange={(e) => {setRating(e.target.value)}} value={rating} type="number" placeholder="1-5" className="w-[100%] px-[10px] py-[6px] border-[1px] border-gray-200 rounded-[24px]" />
                                <p className={`text-red-600 text-[14px] ${validateRating ? "block" : "hidden"}`}>rating must be 1-5</p>
                            </div>
                            </p>
                    </div>
                    <div className="flex justify-center items-center gap-[8px]">
                        <img src={showUserPicture} className="w-[40px] h-[40px]" />
                        <p className="text-[18px] font-bold text-black">{showUsername} ➕</p>
                    </div>
                    <textarea onChange={(e) => {setText(e.target.value)}} value={text} className="resize-none w-full min-h-[120px] px-4 py-2 border border-gray-200 rounded-2xl" placeholder="20-128 words">
                    </textarea>
                    <p className={`text-red-600 text-[14px] ${validateText ? "block" : "hidden"}`}>text must be greater then 20 and less then 128</p>
                    <button className="flex flex-row justify-center items-center gap-[4px] p-[8px] rounded-[12px] border-[1px] border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-[0.3s] cursor-pointer">Done</button>
                    </div>
                    </>
              ) : (null)
            }
          </div>
          <div className="w-[100%] flex flex-row justify-center items-center mt-[10px]">
            <button
              className="flex fle-row justify-center items-center w-[250px] px-[20px] py-[8px] border-[1px] border-gray-300 rounded-[24px]
                    hover:border-red-600 transition-all duration-[0.3s]"
            >
              Lead More Reviews
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-[16px] mt-[30px]">
        <p className="title-name">you might also like</p>
        <div className="flex flex-row justify-center items-center w-[100%] end:w-[1500px]">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              600: { slidesPerView: 3 },
              800: { slidesPerView: 4 },
            }}
          >
            {randomProducts.slice(0, 4).map((rdProduct) => {
              return (
                <SwiperSlide key={rdProduct.id}>
                  <Product
                    key={rdProduct.id}
                    product={rdProduct}
                    imgSrc={rdProduct.image}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {added ? (
        <div className="fixed bottom-[0] left-[0] z-[35] w-[100%]">
          <div className="animate-added-product h-[5px] bg-green-700 w-[0%]"></div>
          <div className="flex flex-row justify-center items-center gap-[10px] p-[18px] text-white text-[18px] bg-green-500">
            <p>✔️</p> Product Added!
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductPage;