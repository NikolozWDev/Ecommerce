import React from "react";
import { Link } from "react-router-dom";
import products from "../../../products.json"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import api from "../../../api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VerifyEmailSecond = () => {
  const images = import.meta.glob("../../../public/assets/images/*", {
    eager: true,
    import: "default",
  });

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const [randomProducts, setRandomProducts] = React.useState([]);
  const [randomProducts2, setRandomProducts2] = React.useState([]);
  const [randomProducts3, setRandomProducts3] = React.useState([]);

  React.useEffect(() => {
    const rp1 = shuffleArray(products).slice(0, 5);
    const rp2 = shuffleArray(products)
      .filter((item) => !rp1.includes(item))
      .slice(5, 10);
    const rp3 = shuffleArray(products)
      .filter((item) => !rp1.includes(item) && !rp2.includes(item))
      .slice(10, 15);

    setRandomProducts(rp1);
    setRandomProducts2(rp2);
    setRandomProducts3(rp3);
  }, []);


  // verify code and email
  const navigate = useNavigate()
  const location = useLocation()
  const {submitEmail} = location.state || {}
  const [num, setNum] = React.useState(["", "", "", "", "", ""])
  const [wrongNum, setWrongNum] = React.useState(false)
  function handleChange(e, index) {
    const value = e.target.value
    if(/^[0-9]$/.test(value)) {
      const updated = [...num]
      updated[index] = value
      setNum(updated)
    }
  }
  async function handleSubmit3(e) {
    e.preventDefault()
    const code = num.join("")
    try {
      setWrongNum(false)
      await api.post("api/user/verify-code/", {email: submitEmail, code: code})
      localStorage.removeItem('finalTimer')
      localStorage.removeItem('timeLeft')
      localStorage.removeItem('emailVerification');
      navigate("/login")
    } catch(error) {
      setWrongNum(true)
      console.log(error)
    }
  }
  // code validation(expired)
  const [timeLeft, setTimeLeft] = React.useState(() => {
    const saved = localStorage.getItem('timeLeft');
    return saved ? parseInt(saved, 10) : 90;
  });
  const [expired, setExpired] = React.useState(false)
  const [timeChar, setTimeChar] = React.useState("")
  function textedTimer(num) {
    let seconds = num % 60
    let minutes = (num - seconds) / 60
    let formatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    setTimeChar(formatted)
    localStorage.setItem('finalTimer', formatted)
  }
  React.useEffect(() => {
    textedTimer(timeLeft)
    if(timeLeft <= 0) {
      setExpired(true)
      localStorage.removeItem('finalTimer')
      localStorage.removeItem('timeLeft')
      localStorage.removeItem('emailVerification');
      return navigate("/login")
    }
    const timer = setTimeout(() => {
      setTimeLeft(prev => {
        const updated = prev - 1;
        localStorage.setItem("timeLeft", updated);
        return updated;
      });
    }, 1000);
    return () => clearTimeout(timer)
  }, [timeLeft])

  return (
    <div className="pt-[100px] px-[20px] pb-[100px] flex flex-row justify-center items-center">
      <div className="w-full flex flex-row justify-center md:justify-between items-center end:w-[1500px] gap-[20px]">
        <div className="w-full max-w-[778px] lg:w-[600px] flex flex-col p-6 justify-center items-stretch border border-gray-300 shadow-md rounded-[16px]">
          <p className="text-black text-[24px] font-bold mb-5">Verify Email</p>
          <p className="text-[16px] underline pb-[10px]">Enter code. (We just sent your email a 6-digit code)</p>
          <p className="text-[14px] underline pb-[10px] font-bold">Time: <span className="text-[16px] text-red-600">{timeChar}</span></p>
          <form onSubmit={handleSubmit3} className="flex flex-col gap-4 w-full">
            <div className="w-[100%] flex flex-row justify-start items-center gap-[8px] flex-wrap">
              {
                num.map((value, i) => {
                  return (
                  <input key={i} value={value} maxLength="1" onChange={(e) => handleChange(e, i)} type="number" className="w-[40px] pl-[13px] h-[50px] border-[1px] border-gray-400 rounded-[12px] flex flex-row justify-center items-center text-[24px] [&::-webkit-outer-spin-button][-webkit-appearance:none] 
                  [&::-webkit-inner-spin-button]:m-0 
                  [&::-webkit-inner-spin-button]:[-webkit-appearance:none]" />
                  )
                })
              }
            </div>
            <p className={`text-[14px] text-red-600 ${wrongNum ? "block" : "hidden"}`}>You sumbitted wrong code</p>
            <button type="submit" className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition lg:w-[235px]">Submit</button>
          </form>
        </div>

        <div className="hidden md:flex flex-row justify-center items-center overflow-hidden">
          <div className="w-64 h-[700px] overflow-hidden rounded-xl shadow-lg hidden md:block">
            <div
              className="animate-slider-up flex flex-col"
              style={{ animationDuration: "45s" }}
            >
              {[...randomProducts, ...randomProducts].map((rpro, i) => {
                const image =
                  images[`../../../public/assets/images/${rpro.image}`];
                return (
                  <Link to={`/product/${rpro.id}`} key={`${rpro.id}-${i}`}>
                    <div className="border border-gray-300 rounded-[16px] relative group cursor-pointer">
                      <img
                        src={image}
                        className="w-[300px] h-[300px] cursor-pointer"
                      />
                      <div className="absolute flex flex-col justify-center items-center gap-[8px] p-[10px] opacity-0 group-hover:opacity-90 w-full h-full top-0 left-0 bg-gray-300 transition-all duration-300">
                        <p className="text-black text-[20px] font-bold">
                          E-commerce-by-Nikoloz
                        </p>
                        <p className="text-black text-[16px]">{rpro.title}</p>
                        <div className="flex flex-row justify-center items-center gap-[8px]">
                          See
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="w-64 h-[700px] overflow-hidden rounded-xl shadow-lg hidden lg:block">
            <div
              className="animate-slider-down flex flex-col"
              style={{ animationDuration: "45s" }}
            >
              {[...randomProducts2, ...randomProducts2].map((rpro, i) => {
                const image =
                  images[`../../../public/assets/images/${rpro.image}`];
                return (
                  <Link to={`/product/${rpro.id}`} key={`${rpro.id}-${i}`}>
                    <div className="border border-gray-300 rounded-[16px] relative group cursor-pointer translate-y-[-1500px]">
                      <img
                        src={image}
                        className="w-[300px] h-[300px] cursor-pointer"
                      />
                      <div className="absolute flex flex-col justify-center items-center gap-[8px] p-[10px] opacity-0 group-hover:opacity-90 w-full h-full top-0 left-0 bg-gray-300 transition-all duration-300">
                        <p className="text-black text-[20px] font-bold">
                          E-commerce-by-Nikoloz
                        </p>
                        <p className="text-black text-[16px]">{rpro.title}</p>
                        <div className="flex flex-row justify-center items-center gap-[8px]">
                          See
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="w-64 h-[700px] overflow-hidden rounded-xl shadow-lg hidden lg2:block">
            <div
              className="animate-slider-up flex flex-col"
              style={{ animationDuration: "45s" }}
            >
              {[...randomProducts3, ...randomProducts3].map((rpro, i) => {
                const image =
                  images[`../../../public/assets/images/${rpro.image}`];
                return (
                  <Link to={`/product/${rpro.id}`} key={`${rpro.id}-${i}`}>
                    <div className="border border-gray-300 rounded-[16px] relative group cursor-pointer">
                      <img
                        src={image}
                        className="w-[300px] h-[300px] cursor-pointer"
                      />
                      <div className="absolute flex flex-col justify-center items-center gap-[8px] p-[10px] opacity-0 group-hover:opacity-90 w-full h-full top-0 left-0 bg-gray-300 transition-all duration-300">
                        <p className="text-black text-[20px] font-bold">
                          E-commerce-by-Nikoloz
                        </p>
                        <p className="text-black text-[16px]">{rpro.title}</p>
                        <div className="flex flex-row justify-center items-center gap-[8px]">
                          See
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmailSecond;