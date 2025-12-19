import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import products from "../../products.json";
import api from "../../api";
import { useAuth } from "../../AuthProvider";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import Loading from "../../components/Loading";

const Login = () => {
  const images = import.meta.glob("../../public/assets/images/*", {
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

  // Login
  const navigate = useNavigate();
  const { setIsAuthorized } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [incorrect, setIncorrect] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  async function handleSubmit1(e) {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await api.post("api/token/", { email, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      setIncorrect(false)
      setIsAuthorized(true);
      setLoading(false)
      navigate("/");
    } catch (error) {
      console.log(`invalid email or password \n(${error})`);
      setIncorrect(true)
      setLoading(false)
    }
  }
  
  // password eye
  const [passVisible, setPassVisible] = React.useState(false)
  function passwordControl() {
    if(passVisible) {
      setPassVisible(false)
    } else {
      setPassVisible(true)
    }
  }

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

  return (
    <div className="pt-[100px] px-[20px] pb-[100px] flex flex-row justify-center items-center">
      <div className="w-full flex flex-row justify-center md:justify-between items-center end:w-[1500px] gap-[20px]">
        <div ref={sectionRef} className={`w-full max-w-[778px] lg:w-[600px] flex flex-col p-6 justify-center items-stretch border border-gray-300 shadow-md rounded-[16px] transition-all duration-[0.5s] ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}>
          <p className="text-black text-[24px] font-bold mb-5">Login</p>
          <form onSubmit={handleSubmit1} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Password</label>
              <div className="relative">
                <input
                  type={`${passVisible ? "text" : "password"}`}
                  placeholder="••••••••••"
                  className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div onClick={passwordControl} className="absolute top-[25%] right-[10px] cursor-pointer">
                  {passVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-[14px] text-red-600">{incorrect ? "Email or Password is incorrect" : null}</p>
              <Link to="/forgot-password" className="text-sm text-blue-600 cursor-pointer">
                Forgot Password?
              </Link>
            </div>
            {
              loading ? (
                <Loading />
              ) : (
                <button
                type="submit"
                className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition lg:w-[235px]"
              >
                Submit
              </button>
              )
            }
          </form>
          <p className="mt-4 text-md">
            You don't have an account? -{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>

        <div className="hidden md:flex flex-row justify-center items-center overflow-hidden">
          <div className="w-64 h-[700px] overflow-hidden rounded-xl shadow-lg hidden md:block">
            <div
              className="animate-slider-up flex flex-col"
              style={{ animationDuration: "45s" }}
            >
              {[...randomProducts, ...randomProducts].map((rpro, i) => {
                const image =
                  images[`../../public/assets/images/${rpro.image}`];
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
                  images[`../../public/assets/images/${rpro.image}`];
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
                  images[`../../public/assets/images/${rpro.image}`];
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
export default Login;
