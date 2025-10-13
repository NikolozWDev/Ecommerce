import React from "react";
import { Link } from "react-router-dom";
import products from "../../products.json";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const Register = () => {
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


    // register
    const navigate = useNavigate()
    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [repeatPass, setRepeatPass] = React.useState("")
    const [birthDate, setBirthDate] = React.useState("")
    // validations
    const [validateUsername, setValidateUsername] = React.useState(false)
    const [bigUsername, setBigUsername] = React.useState(false)
    const [bigEmail, setBigEmail] = React.useState(false)
    const [bigPassword, setBigPassword] = React.useState(false)
    const [validateRepeatPass, setValidateRepeatPass] = React.useState(false)
    const [validateBirthDate, setValidateBirthDate] = React.useState(false)

    const [codeSend, setCodeSent] = React.useState(false)
    const [verifyEmail, setVerifyEmail] = React.useState(false)

    React.useEffect(() => {
      if(username === "") {
        setValidateUsername(false)
        setBigUsername(false)
        return
      }
      const forbidden = ["!", "@", "#", "$", "%", "^", "&", "*",
      "(", ")", "_", "-", "+", "=", "[", "]",
      "{", "}", ";", ":", "'", "/", '"', ",", ".",
      "<", ">", "?", "|", "`", "~", " ", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",]
      if(forbidden.some(char => username.includes(char))) {
        setValidateUsername(true)
        return
      } else {
        setValidateUsername(false)
      }
      if(username.length > 24 || username.length < 8) {
        setBigUsername(true)
        return
      } else {
        setBigUsername(false)
      }
    }, [username])

    React.useEffect(() => {
      if(email === "") {
        setBigEmail(false)
        return
      }
      if(email.length > 40 || email.length < 10) {
        setBigEmail(true)
        return
      } else {
        setBigEmail(false)
      }
    }, [email])

    React.useEffect(() => {
      if(password === "" && repeatPass === "") {
        setBigPassword(false)
        setValidateRepeatPass(false)
        return
      }
      if(password.length > 16 || password.length < 8) {
        setBigPassword(true)
        return
      } else {
        setBigPassword(false)
      }
      if(password !== repeatPass) {
        setValidateRepeatPass(true)
        return
      } else {
        setValidateRepeatPass(false)
      }
    }, [password, repeatPass])

    React.useEffect(() => {
      if(!birthDate) {
        setValidateBirthDate(false)
        return
      }

      const today = new Date()
      const birth = new Date(birthDate)
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      const dayDiff = today.getDate() - birth.getDate()

      age = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age

      if(age < 18 || age > 100) {
        setValidateBirthDate(true)
      } else {
        setValidateBirthDate(false)
      }
    }, [birthDate])

    async function handleSubmit2(e) {
      e.preventDefault()

      // username validation
      const forbidden = ["!", "@", "#", "$", "%", "^", "&", "*",
      "(", ")", "_", "-", "+", "=", "[", "]",
      "{", "}", ";", ":", "'", "/", '"', ",", ".",
      "<", ">", "?", "|", "`", "~", " ", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",]
      if(forbidden.some(char => username.includes(char))) {
        setValidateUsername(true)
        return
      } else {
        setValidateUsername(false)
      }
      if(username.length > 24 || username.length < 8) {
        setBigUsername(true)
        return
      } else {
        setBigUsername(false)
      }
      // email validation
      if(email.length > 40 || email.length < 10) {
        setBigEmail(true)
        return
      } else {
        setBigEmail(false)
      }
      // password validations
      if(password.length > 16 || password.length < 8) {
        setBigPassword(true)
        return
      } else {
        setBigPassword(false)
      }
      if(password !== repeatPass) {
        setValidateRepeatPass(true)
        return
      } else {
        setValidateRepeatPass(false)
      }
      // birth date
      const today = new Date()
      const birth = new Date(birthDate)
      const age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      const dayDiff = today.getDate() - birth.getDate()

      const realAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age
      if(!birthDate || realAge < 18 || realAge > 100) {
        setValidateBirthDate(true)
      } else {
        setValidateBirthDate(false)
      }

      try {
        if(!validateUsername && !bigUsername && !bigEmail && !bigPassword && !validateRepeatPass && !validateBirthDate) {
          setCodeSent(true)
          await api.post("api/user/send-code/", {email})
          localStorage.setItem("emailVerification", email)
          localStorage.setItem("timeLeft", 90);
          navigate("/verify-email", {
            state: { username, email, password, repeatPass, birthDate }
          })
        }
      } catch(error) {
        if(error.response) {
          console.error(error.response.data);
          console.log("Error " + JSON.stringify(error.response.data))
        } else {
          console.error(error.message)
          alert("Something went wrong")
        }
      }
    }

  return (
    <div className="pt-[100px] px-[20px] pb-[100px] flex flex-row justify-center items-center">
      <div className="w-full flex flex-row justify-center md:justify-between items-center end:w-[1500px] gap-[20px]">
        <div className="w-full max-w-[778px] lg:w-[600px] flex flex-col p-6 justify-center items-stretch border border-gray-300 shadow-md rounded-[16px]">
          <p className="text-black text-[24px] font-bold mb-5">Register</p>
          <form onSubmit={handleSubmit2} className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full">
              <label className="text-black text-[16px]">Username</label>
              <input
                type="text"
                placeholder="Elizabeth"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="text-[14px] text-red-600">{validateUsername ? "Username contains specific characters." : null} {bigUsername ? "Username must be between 8 and 24 characters" : null}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-[14px] text-red-600">{bigEmail ? "Email must be between 10 and 40 characters" : null}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Password</label>
              <input
                type="password"
                placeholder="••••••••••"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-[14px] text-red-600">{bigPassword ? "Password must be between 8 and 16 characters" : null}</p>
            </div>
                        <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Repeat Password</label>
              <input
                type="password"
                placeholder="••••••••••"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={repeatPass}
                onChange={(e) => setRepeatPass(e.target.value)}
              />
              <p className="text-[14px] text-red-600">{validateRepeatPass ? "Passwords aren't same" : null}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Birth Date</label>
              <input 
                type="date" 
                value={birthDate} 
                onChange={e => setBirthDate(e.target.value)} 
                max={new Date().toISOString().split("T")[0]} className="border border-gray-300 px-4 py-2 w-full rounded-md"
              />
              <p className="text-[14px] text-red-600">{validateBirthDate ? "Please select your birth date. You must be 18+" : null}</p>
            </div>
            <button type="submit" className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition lg:w-[235px]">
              Submit
            </button>
          </form>
          <p className="mt-4 text-md">
            Already have an account ? -{" "}
            <Link to="/login" className="text-blue-600">
              Login
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
export default Register;