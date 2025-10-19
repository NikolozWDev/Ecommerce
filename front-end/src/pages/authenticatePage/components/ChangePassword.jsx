import React from "react";
import { Link } from "react-router-dom";
import products from "../../../products.json"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import api from "../../../api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";

const ChangePassword = () => {
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

    // Change password
    const navigate = useNavigate();
    const { setIsAuthorized } = useAuth();
    const [incorrect, setIncorrect] = React.useState(false)
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [validatePass, setValidatePass] = React.useState(false)
    const [validateRepeat, setValidateRepeat] = React.useState(false)
    const email = localStorage.getItem("verifiedEmail")
    const code = localStorage.getItem("verifiedCode")
    async function handleSubmit1(e) {
        e.preventDefault();
        // validate password
        if(newPassword > 16 || newPassword < 8) {
          setValidatePass(true)
        } else {
          setValidatePass(false)
        }
        if(newPassword !== confirmPassword) {
          setValidateRepeat(true)
        } else {
          setValidateRepeat(false)
        }
        try {
        const res = await api.post("api/user/change-password/", {
            email: email,
            code: code,
            new_password: newPassword,
            confirm_password: confirmPassword
        });
        localStorage.removeItem("verifiedEmail");
        localStorage.removeItem("verifiedCode");
        localStorage.removeItem("resetSession");
        navigate("/login");
        } catch (error) {
        console.log(`invalid \n(${error})`);
        setIncorrect(true)
        }
    }
    const location = useLocation()
    React.useEffect(() => {
    return () => {
      if (location.pathname === "/change-password") {
        localStorage.removeItem("resetSession");
        }
      };
    }, [location]);
    React.useEffect(() => {
        if(newPassword.length > 16 || newPassword.length < 8 && newPassword.length !== 0) {
          setValidatePass(true)
        } else {
          setValidatePass(false)
        }
    }, [newPassword])
    React.useEffect(() => {
        if(newPassword !== confirmPassword) {
          setValidateRepeat(true)
        } else {
          setValidateRepeat(false)
        }
    }, [confirmPassword])

    return(
    <div className="pt-[100px] px-[20px] pb-[100px] flex flex-row justify-center items-center">
      <div className="w-full flex flex-row justify-center md:justify-between items-center end:w-[1500px] gap-[20px]">
        <div className="w-full max-w-[778px] lg:w-[600px] flex flex-col p-6 justify-center items-stretch border border-gray-300 shadow-md rounded-[16px]">
          <p className="text-black text-[24px] font-bold mb-5">Change Password</p>
          <form onSubmit={handleSubmit1} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Password</label>
              <input
                type="password"
                placeholder="••••••••••"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <p className={`text-[14px] text-red-600 ${validatePass ? "block" : "hidden"}`}>password must be greater then 8 and less then 16</p>
              <p>Repeat Password</p>
              <input
                type="password"
                placeholder="••••••••••"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <p className={`text-[14px] text-red-600 ${validateRepeat ? "block" : "hidden"}`}>passwords are not same</p>
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition lg:w-[235px]"
            >
              Submit
            </button>
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
    )
}
export default ChangePassword