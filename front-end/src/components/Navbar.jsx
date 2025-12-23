import React from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useAuth } from "../AuthProvider";
import logoUser from "../public/assets/icons/userLogo.png";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import ecommerceImage from "../public/assets/icons/E-commerceimage.png"
import Loading from "./Loading";

const Navbar = ({allNum, getItems, scrollToSection}) => {
  const { isAuthorized, setIsAuthorized } = useAuth();

  const [menubar, setMenubar] = React.useState(false);
  const [searchbar, setSearchbar] = React.useState(false);

  function clickMenu() {
    if (menubar) {
      setMenubar(false);
    } else {
      setMenubar(true);
      setSearchbar(false);
    }
  }

  function clickSearch() {
    if (searchbar) {
      setSearchbar(false);
    } else {
      setSearchbar(true);
      setMenubar(false);
    }
  }

  // get items

    // Authorization menu
    React.useEffect(() => {
        userSelf()
        getItems()
        fetchAddress()
    }, [isAuthorized])

    const [ctrlUserbar, setCtrlUserbar] = React.useState(false)
    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [birth, setBirth] = React.useState(0)
    const [newPassword, setNewPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const [validatePass, setValidatePass] = React.useState(false)
    const [ValidateRepeat, setValidateRepeat] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    // Change password system in account settings
    async function changePassword(e) {
        e.preventDefault()
        setLoading(true)
        if(newPassword.length > 16 || newPassword.length < 8 && newPassword.length !== 0) {
          setValidatePass(true)
        } else {
          setValidatePass(false)
        }
        if(newPassword !== repeatPassword) {
          setValidateRepeat(true)
        } else {
          setValidateRepeat(false)
        }
        try {
          const res = await api.post("api/user/change-password-account/", {new_password: newPassword, confirm_password: repeatPassword})
          setNewPassword("")
          setRepeatPassword("")
          setSettingsBar(false)
          setAreYouSure(false)
          setMenubar(false);
          setSearchbar(false);
          setLoading(false)
          navigate("/")
          alert("Password changed successfully!")
        } catch (error) {
          setLoading(false)
          console.log(`change password error: ${error}`)
          alert("Invalid password")
        }
    }
    React.useEffect(() => {
        if(newPassword.length > 16 || newPassword.length < 8 && newPassword.length !== 0) {
          setValidatePass(true)
        } else {
          setValidatePass(false)
        }
    }, [newPassword])
    React.useEffect(() => {
        if(newPassword !== repeatPassword) {
          setValidateRepeat(true)
        } else {
          setValidateRepeat(false)
        }
    }, [repeatPassword])
    // Change Username in account settings
    const [newUsername, setNewUsername] = React.useState("")
    const [usernameError, setUsernameError] = React.useState(false)
    const [specificChar, setSpecificChar] = React.useState(false)
    async function ChangeUsername(e) {
      e.preventDefault()
      setLoading(true)
      const forbidden = ["!", "@", "#", "$", "%", "^", "&", "*",
                    "(", ")", "_", "-", "+", "=", "[", "]",
                    "{", "}", ";", ":", "'", "/", '"', ",", ".",
                    "<", ">", "?", "|", "`", "~", " ", 
                    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      if(newUsername.length > 24 || newUsername.length < 8) {
        setUsernameError(true)
      } else {
        setUsernameError(false)
      }
      if(newUsername.trim() !== newUsername || forbidden.some(ch => newUsername.includes(ch))) {
        setSpecificChar(true)
      } else {
        setSpecificChar(false)
      }
      if(usernameError || specificChar) {
        alert("Invalid username")
        setLoading(false)
        return
      }
      try {
        const res = await api.post("api/user/change-username", {new_username: newUsername})
        setSettingsBar(false)
        setAreYouSure(false)
        setMenubar(false);
        setSearchbar(false);
        setLoading(false)
        navigate("/")
        alert("username changed successfully")
      } catch (error) {
        setLoading(false)
        alert("something want wrong")
        console.log(`username error: ${error}`)
      }
    }
    React.useEffect(() => {
    const forbidden = ["!", "@", "#", "$", "%", "^", "&", "*",
                    "(", ")", "_", "-", "+", "=", "[", "]",
                    "{", "}", ";", ":", "'", "/", '"', ",", ".",
                    "<", ">", "?", "|", "`", "~", " ", 
                    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      if(newUsername.length > 24 || newUsername.length < 8) {
        setUsernameError(true)
      } else {
        setUsernameError(false)
      }
      if(newUsername.trim() !== newUsername || forbidden.some(ch => newUsername.includes(ch))) {
        setSpecificChar(true)
      } else {
        setSpecificChar(false)
      }
    }, [newUsername])

    // Upload photo into profile
    const backend = import.meta.env.VITE_BACKEND_URL
    const [selectedFile, setSelectedFile] = React.useState(null)
    function handleFileChange(e) {
      const file = e.target.files[0]
      if(file) {
        setSelectedFile(file)
        uploadImage(file)
      }
    }
async function uploadImage(argFile) {
  setLoading(true);
  if (!argFile) {
    alert("Choose file (image)");
    setLoading(false);
    return;
  }

  // Frontend size validation
  const maxSize = 5 * 1024 * 1024;
  if (argFile.size > maxSize) {
    alert("File is too large! Max size is 5MB.");
    setLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append("profile_picture", argFile);

  try {
    const res = await api.put("api/user/upload-picture/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Image uploaded successfully");
    setLoading(false);
    window.location.reload();
  } catch (error) {
    setLoading(false);
    alert("Something went wrong");
    console.log(`upload image error: ${error}`);
  }
}
    // get user profile
    const [userData, setUserData] = React.useState(null)
    React.useEffect(() => {
      if(isAuthorized) {
        fetchProfile()
      }
    }, [isAuthorized])
    async function fetchProfile() {
      setLoading(true)
      try {
        const res = await api.get("api/user/profile/")
        setUserData(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        alert("getting user profile error")
        console.log(`getting user profile error: ${error}`)
      }
    }

    async function userSelf() {
      setLoading(true)
      try {
        const res = await api.get("api/user/me/")
        setUsername(res.data.username)
        setEmail(res.data.email)
        // calculate user's age
        const birthDate = new Date(res.data.birth_date)
        const today = new Date()

        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()

        if(monthDiff < 0 || (monthDiff === 0 && today.getDate < birthDate.getDate())) {
            age -= 1
        }

        setBirth(age)
        setLoading(false)
      } catch(error) {
        setLoading(false)
        console.log(`user is not authorized ${error}`)
      }
    }
    // User settings
    const [settingsBar, setSettingsBar] = React.useState(false)
    function ctrlSettings() {
        if(settingsBar) {
            setSettingsBar(false)
            setAreYouSure(false)
        } else {
            setSettingsBar(true)
        }
    }
    const navigate = useNavigate()
    function handleLogout() {
        setSettingsBar(false)
        setMenubar(false);
        setSearchbar(false);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN)
        setIsAuthorized(false)
        navigate("/login")
        getItems()
    }
    const [areYouSure, setAreYouSure] = React.useState(false)
    async function deleteAccount() {
      setLoading(true)
      try {
        await api.delete("api/user/delete/")
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        setIsAuthorized(false)
        navigate("/login")
        setSettingsBar(false);
        setMenubar(false);
        setSearchbar(false);
        getItems()
        setLoading(false)
      } catch(error) {
        setLoading(false)
        console.log(`Account deletion failed ${error}`)
      }
    }
    // search products
    const [searchValue, setSearchValue] = React.useState("")
    function searchProducts() {
      if (searchValue.length < 3) return
      navigate(`/shop?search=${encodeURIComponent(searchValue)}`)
    }

    // registration form settings
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
      const [isFormed, setIsFormed] = React.useState(false)
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
        await api.put("api/shipping-address/", {address: address, city: city, district: district, state: state, postal_code: zipCode, qualification: qualification, current_status: status})
        setAddress("")
        setCity("")
        setDistrict("")
        setState("")
        setZipCode("")
        setQualification("")
        setStatus("")
        window.location.reload()
        setLoading(false)
      }
        async function fetchAddress() {
          setLoading(true)
          try {
          const res = await api.get("api/shipping-address/")
          console.log(res.data)
          setIsFormed(true)
          setAddress(res.data.address)
          setCity(res.data.city)
          setDistrict(res.data.district)
          setState(res.data.state)
          setZipCode(res.data.postal_code)
          setQualification(res.data.qualification)
          setStatus(res.data.current_status)
          setLoading(false)
          } catch (error) {
            if (error.response?.status === 404) {
              setLoading(false)
              setIsFormed(false)
            } else {
              console.log("Error loading address:", error);
              setLoading(false)
              setIsFormed(false)
            }
              console.log(`getting address error: ${error}`)
              setLoading(false)
              setIsFormed(false)
            }
        }

    // safe area
    const safeTop = (() => {
      if (typeof window !== "undefined") {
        const ua = navigator.userAgent;
        if (/iPhone|iPad|iPod/.test(ua)) return 60;
        if (/Android/.test(ua)) return 40;
      }
      return 10;
    })();

  return (
  <div
    className="
      fixed
      top-0
      left-0
      right-0
      bg-white
      z-40
      shadow-md
      px-[20px]
      flex justify-center items-center
    "
    style={{ paddingTop: `${safeTop}px`, paddingBottom: `${safeTop / 2}px` }}
  >
  <div className="flex justify-between items-center w-full end:w-[1500px]">
        <div
          className={`flex flex-row sm2:flex-row-reverse gap-[14px] sm2:gap-[22px] md:gap-[30px] lg:gap-[36px] justify-center items-center`}
        >
          {menubar ? (
            <div onClick={clickMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : (
            <div onClick={clickMenu} className="flex sm2:hidden">
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          )}
          {menubar ? (
            <div
              className={`fixed z-30 left-[0] top-[calc(64px+env(safe-area-inset-top))] bg-white w-[40%] min-h-[100vh] shadow-md ${
                menubar ? "animate-menubar-in" : "animate-menubar-out"
              }`}
            >
              <div
                className={`flex flex-col gap-[16px] justify-around items-start min-h-[30%] pl-[10px]`}
              >
                <Link to="/shop" onClick={clickMenu}>
                  <p className="selectori flex flex-row justify-center menu-border items-center gap-[4px]">
                    Shop{" "}
                    <svg
                      className="w-[4px]"
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
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </p>
                </Link>
                <Link to="/"><p onClick={() => {scrollToSection("arrival"); setMenubar(false)}} className="menu-border selectori">New Arrivals</p></Link>
                <Link to="/"><p onClick={() => {scrollToSection("selling"); setMenubar(false)}} className="menu-border selectori">On Sale</p></Link>
                <Link to="/"><p onClick={() => {scrollToSection("browseStyle"); setMenubar(false)}} className="menu-border selectori">Brands</p></Link>
                <Link to="/"><p onClick={() => {scrollToSection("downloads")}} className="menu-border selectori">Download</p></Link>
              </div>
            </div>
          ) : null}
          {/* shops */}
          <div
            className={`hidden sm2:flex flex-row justify-center items-center gap-[14px] md:gap-[18px] lg:gap-[22px]`}
          >
            <Link to="/shop">
              <p className="selectori flex flex-row justify-center items-center gap-[4px]">
                Shop{" "}
                <svg
                  className="w-[4px]"
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
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </p>
            </Link>
            <Link to="/"><p onClick={() => {scrollToSection("arrival")}} className="selectori">New Arrivals</p></Link>
            <Link to="/"><p onClick={() => {scrollToSection("selling")}} className="selectori">On Sale</p></Link>
            <Link to="/"><p onClick={() => {scrollToSection("browseStyle")}} className="selectori">Brands</p></Link>
            <Link to="/"><p onClick={() => {scrollToSection("downloads")}} className="selectori">Download</p></Link>
          </div>
          <Link to="/">
            <p onClick={() => {scrollToSection("ecommerce")}} className={`title-name`}>E-commerce</p>
          </Link>
        </div>

        <div
          className={`flex flex-row justify-center items-center gap-[14px] md:gap-[16px]`}
        >
          {searchbar ? (
            <div className="fixed left-[50%] right-[50%] top-[calc(64px+env(safe-area-inset-top))] shadow-2xl flex flex-row justify-center items-center animate-searchbar">
              <div onClick={searchProducts} className="flex flex-row justify-center items-center bg-gray-200 h-[33px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {setSearchValue(e.target.value)}}
                onKeyDown={(e) => {if(e.key === "Enter") {searchProducts()}}}
                type="text"
                placeholder="Search For Products..."
                className="bg-gray-200 py-[6px] rounded-tr-[22px]
                        rounded-br-[22px] text-[14px] pl-[10px] focus:outline-none"
              />
            </div>
          ) : (
            <div onClick={clickSearch} className="flex md:hidden">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          )}
          {searchbar ? (
            <div onClick={clickSearch} className="selectori">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : null}
          <div className="hidden md:flex flex-row justify-center items-center cursor-pointer">
            <div className="flex flex-row justify-start items-start">
            <div onClick={searchProducts} className="hidden md:flex flex-row justify-center items-center bg-gray-200 h-[33px] lg:h-[44px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
              <div>
              <input
                onChange={(e) => {setSearchValue(e.target.value)}}
                onKeyDown={(e) => {if(e.key === "Enter") {searchProducts()}}}
                type="text"
                placeholder="Search For Products..."
                className="bg-gray-200 py-[6px] pl-[10px] rounded-tr-[22px]
                      rounded-br-[22px] text-[14px] lg:text-[16px] lg:w-[300px] lg:py-[10px] lg2:w-[500px] xl:w-[550px] focus:outline-none"
              />
              {searchValue.length < 4 && searchValue !== "" ? (
                <p className="text-[14px] text-red-600">That item is not in the data</p>
              ) : null}
              </div>
            </div>
          </div>
          <Link to="/basket" className="selectori relative">
            <div
              className="absolute z-[20] top-[-10px] right-[-10px] flex flex-row justify-center items-center w-[20px] h-[20px] bg-red-600 rounded-[50%]
                    text-white"
            >
              {isAuthorized ? <span>{allNum}</span> : <span>0</span>}
            </div>
            <svg
              className="z-[20]"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
          {isAuthorized ? (
            <>
            {window.innerWidth >= 976 ? (
            <div onMouseEnter={() => setCtrlUserbar(true)} onMouseLeave={() => setCtrlUserbar(false)} onClick={ctrlSettings} className="flex flex-col justify-center items-center w-[100%]">
                <img className="w-[30px] h-[30px] cursor-pointer transition-all duration-[0.2s] hover:blur-sm rounded-[50%] object-cover" src={userData?.profile_picture || logoUser} />
                <div className={`absolute flex flex-col justify-start items-start gap-[2px] px-[20px] py-[10px] w-[60%] md:w-[40%] lg2:w-[30%] end:w-[300px] z-[100] max-h-[300px] overflow-y-auto top-[calc(64px+env(safe-area-inset-top))] md:top-[calc(64px+env(safe-area-inset-top))] right-0 rounded-[8px] transition-all duration-[0.3s] ${ctrlUserbar ? "bg-gray-100 shadow-md border-[1px] border-gray-300 opacity-[1] pointer-events-auto translate-x-[-20px] end:translate-x-[0px] " : "opacity-[0] pointer-events-none translate-x-[100px]"}`}>
                    <p className="text-[14px]">Name: <span className="break-all underline font-bold text-[16px]">{username}</span></p>
                    <div className="w-[60%] md:w-[50%] h-[2px] bg-gray-300"></div>
                    <p className="text-[14px]">Email: <span className="break-all underline font-bold text-[16px]">{email}</span></p>
                    <div className="w-[50%] h-[2px] bg-gray-300"></div>
                    <p className="text-[14px]">Age: <span className="break-all underline font-bold text-[16px]">{birth}</span></p>
                    <div className="w-[50%] h-[2px] bg-gray-300"></div>
                    <button onClick={() => {setSettingsBar(true), setCtrlUserbar(false)}} className="px-[15px] py-[2px] mt-[5px] text-white bg-black rounded-[14px] lg:hidden">Settings</button>
                </div>
            </div>
            ) : ( 
            <div onMouseEnter={() => setCtrlUserbar(true)} onMouseLeave={() => setCtrlUserbar(false)} className="flex flex-col justify-center items-center w-[100%]">
                <img className="w-[30px] h-[30px] cursor-pointer transition-all duration-[0.2s] hover:blur-sm rounded-[50%] object-cover" src={userData?.profile_picture || logoUser} />
                <div className={`absolute flex flex-col justify-start items-start gap-[2px] px-[20px] py-[10px] w-[60%] md:w-[40%] lg2:w-[30%] end:w-[300px] z-[100] max-h-[300px] overflow-y-auto top-[calc(64px+env(safe-area-inset-top))] md:top-[calc(64px+env(safe-area-inset-top))] right-0 rounded-[8px] transition-all duration-[0.3s] ${ctrlUserbar ? "bg-gray-100 shadow-md border-[1px] border-gray-300 opacity-[1] pointer-events-auto translate-x-[-20px] end:translate-x-[0px] " : "opacity-[0] pointer-events-none translate-x-[100px]"}`}>
                    <p className="text-[14px]">Name: <span className="break-all underline font-bold text-[16px]">{username}</span></p>
                    <div className="w-[60%] md:w-[50%] h-[2px] bg-gray-300"></div>
                    <p className="text-[14px]">Email: <span className="break-all underline font-bold text-[16px]">{email}</span></p>
                    <div className="w-[50%] h-[2px] bg-gray-300"></div>
                    <p className="text-[14px]">Age: <span className="break-all underline font-bold text-[16px]">{birth}</span></p>
                    <div className="w-[50%] h-[2px] bg-gray-300"></div>
                    <button onClick={() => {setSettingsBar(true), setCtrlUserbar(false)}} className="px-[15px] py-[2px] mt-[5px] text-white bg-black rounded-[14px] lg:hidden">Settings</button>
                </div>
            </div> 
            )}
            </>
          ) : (
            <Link to="/login" className="selectori">
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          )}
        </div>
    </div>
                {/* user settings */}
        <div className={`fixed z-[30] flex flex-col justify-start items-center w-[100%] lg:w-[30%] min-h-[100%] bg-white pt-[80px] px-[20px] overflow-y-auto transition-all duration-[1s] lg:items-start
            ${settingsBar ? "translate-y-[0px] opacity-[1] pointer-events-auto" : "translate-y-[-500px] opacity-[0] pointer-events-none"}`}>
            <div className="w-[100%] flex flex-row justify-between items-center">
                <p className="text-[22px] font-bold">Settings</p>
                <div onClick={ctrlSettings} className="w-[20px] h-[20px] font-bold cursor-pointer hover:text-red-600 transition-all duration-[0.2s]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <div className="w-[100%] flex flex-col justify-center items-start gap-[8px]">
                <div className="w-[100%] flex flex-row justify-center items-center mt-[10px] lg:justify-start">
                    <div className="relative w-[110px] h-[110px]">
                        <img className="rounded-[50%] w-[100px] h-[100px] object-cover" src={userData?.profile_picture || logoUser} />
                      {
                        loading ? (
                          <Loading />
                        ) : (
                        <div className="absolute flex flex-row justify-center items-center w-[35px] h-[35px] bg-gray-300 rounded-[50%] bottom-[0px] left-[34%] cursor-pointer hover:opacity-[0.8] transition-all duration-[0.2s]">
                        <input type="file" className="opacity-[0] w-[50px] h-[50px] cursor-pointer" accept="image/*" onChange={handleFileChange} />
                            <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        )
                      }
                    </div>
                </div>
                <div className="mt-[10px] w-[100%] flex flex-col justify-center items-start py-[5px] border-t-[1px] border-gray-400 gap-[4px]">
                    <p>Change username:</p>
                    <input type="text" onChange={(e) => setNewUsername(e.target.value)} value={newUsername} placeholder={username} className="border-[1px] border-gray-400 rounded-[8px] px-[10px] py-[4px] w-[100%]" />
                    <p className={`text-[14px] text-red-600 ${(usernameError || specificChar) && newUsername !== "" ? "block" : "hidden"}`}>{usernameError ? (<span>username must greater then 8 and less then 24</span>) : null} {specificChar ? (<span>username contains specific characters</span>) : null}</p>
                      {
                        loading ? (
                          <Loading />
                        ) : (
                      <button onClick={ChangeUsername} className="px-[10px] py-[6px] text-white rounded-[18px] bg-gray-900 border-[2px] hover:border-red-600 transition-all duration-[0.2s]">Submit <small>new username</small></button>
                        )
                      }
                </div>
                <div className="mt-[10px] w-[100%] flex flex-col justify-center items-start py-[5px] border-t-[1px] border-gray-400 gap-[4px]">
                    <p>Change password:</p>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="border-[1px] border-gray-400 rounded-[8px] px-[10px] py-[4px] w-[100%]" />
                    <p className={`text-[14px] text-red-600 ${validatePass ? "block" : "hidden"}`}>password must be greater then 8 and less then 16</p>
                    <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat password" className="border-[1px] border-gray-400 rounded-[8px] px-[10px] py-[4px] w-[100%] mt-[5px]" />
                    <p className={`text-[14px] text-red-600 ${ValidateRepeat ? "block" : "hidden"}`}>passwords are not same</p>
                      {
                        loading ? (
                          <Loading />
                        ) : (
                      <button onClick={changePassword} className="px-[10px] py-[6px] text-white rounded-[18px] bg-gray-900 border-[2px] hover:border-red-600 transition-all duration-[0.2s]">Submit <small>new password</small></button>
                        )
                      }
                </div>
                {isFormed ? (
              <div className="w-[100%] flex flex-col justify-start items-start gap-[20px]">
              <p className="title-name text-[30px] uppercase hidden md:block cursor-auto">Registration Form Settings</p>
              <div className="w-[100%] shadow-md flex flex-row justify-center items-center">
                <form className="w-[100%] px-[5px] py-[15px] md:px-[50px] md:py-[30px] flex flex-col justify-center items-center gap-[16px]">
                  <div className="flex flex-col justify-start items-start gap-[4px] w-[100%]">
                    <p className="title-name text-[30px] uppercase md:hidden block cursor-auto">Registration Form</p>
                        <p className="text-[14px] text-gray-600">Address</p>
                        <input
                          onChange={(e) => setAddress(e.target.value)} value={address}
                          className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                        />
                        <p className={`text-sm text-red-600 ${errorAddress ? "block" : "hidden"}`}>
                          Error address
                        </p>

                        <p className="text-[14px] text-gray-600">City</p>
                        <input
                          onChange={(e) => setCity(e.target.value)} value={city}
                          className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                        />
                        <p className={`text-sm text-red-600 ${errorCity ? "block" : "hidden"}`}>
                          Error city
                        </p>

                        <div className="flex flex-row gap-[30px] w-full">
                          <div className="flex flex-col w-full">
                            <p className="text-sm text-gray-600">District</p>
                            <input
                              onChange={(e) => setDistrict(e.target.value)} value={district}
                              className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                            />
                            <p className={`text-sm text-red-600 ${errorDistrict ? "block" : "hidden"}`}>
                              Error district
                            </p>
                          </div>

                          <div className="flex flex-col w-full">
                            <p className="text-sm text-gray-600">State</p>
                            <input
                              onChange={(e) => setState(e.target.value)} value={state}
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
                            onChange={(e) => setZipCode(e.target.value)} value={zipCode}
                            className="w-full border border-gray-400 rounded px-2 py-1 text-sm focus:outline-red-600 hover:bg-gray-100"
                          />
                          <p className={`text-sm text-red-600 ${errorZipCode ? "block" : "hidden"}`}>
                            Error zipCode
                          </p>
                        </div>

                        <div className="flex flex-col w-full">
                          <p className="text-[16px]">Qualification</p>
                          <textarea
                            onChange={(e) => setQualification(e.target.value)} value={qualification}
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
                      <div className="w-[100%] h-[1px] bg-gray-300 rounded-[8px] mt-[15px] mb-[15px]"></div>
                      <div onClick={formData} className="flex flex-row justify-center items-center gap-[14px] w-[100%] bg-black text-white py-[8px] px-[16px] rounded-[24px] md:w-[230px] border-[2px] transition-all duration-[0.3s] hover:border-red-600 cursor-pointer">Submit</div>
                    </div>
                </form>
              </div>
              </div>                  
                ) : (
                  <div className="w-[100%] bg-yellow-300 px-[20px] py-[10px]">
                    <span text="20px">🔄</span> You can fill registration form in checkout page. Then if you want to update form, you can see here.
                  </div>
                )}

                {/* account settings */}
                <div className="w-[100%] flex flex-row justify-between items-start mt-[30px] pb-[30px]">
                    <p onClick={handleLogout} className="text-red-600 text-[16px] flex flex-row justify-center items-center gap-[4px] hover:bg-red-600 hover:text-white transition-all duration-[0.2s] cursor-pointer border-[1px] border-red-600 rounded-[8px] px-[10px] py-[6px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        Logout
                    </p>
                    <div className="flex flex-col justify-start items-start gap-[4px]">
                      {
                        loading ? (
                          <Loading />
                        ) : (
                                <p onClick={() => setAreYouSure(true)} className="text-red-600 text-[16px] flex flex-row justify-center items-center gap-[4px] border-[1px] border-red-600 rounded-[8px] px-[10px] py-[6px] hover:bg-red-600 hover:text-white transition-all duration-[0.2s] cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                    Delete Account
                                </p>
                        )
                      }
                      <p className={`text-red-600 text-[14px] ${areYouSure ? "block" : "hidden"}`}>Are you sure?</p>
                      <div className={`w-[100%] flex-row justify-between items-center ${areYouSure ? "flex" : "hidden"}`}>
                        <button onClick={deleteAccount} className="text-red-600 text-[16px] flex flex-row justify-center items-center gap-[4px] border-[1px] border-red-600 rounded-[8px] px-[10px] py-[6px] hover:bg-red-600 hover:text-white transition-all duration-[0.2s] cursor-pointer basis-2/5">Yes</button>
                        <button onClick={() => setAreYouSure(false)} className="text-black text-[16px] flex flex-row justify-center items-center gap-[4px] border-[1px] border-black rounded-[8px] px-[10px] py-[6px] hover:bg-black hover:text-white transition-all duration-[0.2s] cursor-pointer basis-2/5">No</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default Navbar;