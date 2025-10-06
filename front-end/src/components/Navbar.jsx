import React from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useAuth } from "../AuthProvider";
import logoUser from "../public/assets/icons/userLogo.png";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Navbar = () => {
  const { isAuthorized } = useAuth();
  const { cart } = React.useContext(CartContext);
  const [allNum, setAllNum] = React.useState(0);
  React.useEffect(() => {
    function allProductsNum() {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].productNum;
      }
      setAllNum(total);
    }
    allProductsNum();
  }, [cart]);

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

    //   Authorization menu
    React.useEffect(() => {
        userSelf()
    }, [])

    const [ctrlUserbar, setCtrlUserbar] = React.useState(false)
    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [birth, setBirth] = React.useState(0)
    const [newUsername, setNewUsername] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    async function userSelf() {
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
    }
    // User settings
    const [settingsBar, setSettingsBar] = React.useState(false)
    function ctrlSettings() {
        if(settingsBar) {
            setSettingsBar(false)
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
        navigate("/login")
    }

  return (
    <>
    <div
      className={`bg-white z-40 shadow-md p-[14px] px-[20px] fixed flex flex-row justify-center items-center w-[100%]`}
    >
      <div className="flex flex-row justify-between items-center w-[100%] end:w-[1500px]">
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
              className={`fixed z-30 left-[0] top-[55px] bg-white w-[40%] h-[100vh] shadow-md ${
                menubar ? "animate-menubar-in" : "animate-menubar-out"
              }`}
            >
              <div
                className={`flex flex-col justify-around items-start h-[30%] pl-[10px]`}
              >
                <Link to="/shop">
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
                <p className="menu-border selectori">On Sale</p>
                <p className="menu-border selectori">New Arrivals</p>
                <p className="menu-border selectori">Brands</p>
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
            <p className="selectori">On Sale</p>
            <p className="selectori">New Arrivals</p>
            <p className="selectori">Brands</p>
          </div>
          <Link to="/">
            <p className={`title-name`}>E-commerce</p>
          </Link>
        </div>

        <div
          className={`flex flex-row justify-center items-center gap-[14px] md:gap-[16px]`}
        >
          {searchbar ? (
            <div className="fixed left-[50%] right-[50%] top-[55px] shadow-2xl flex flex-row justify-center items-center animate-searchbar">
              <div className="flex flex-row justify-center items-center bg-gray-200 h-[33px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
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
                type="text"
                placeholder="Search For Products..."
                className="bg-gray-200 py-[6px] rounded-tr-[22px]
                        rounded-br-[22px] text-[14px] pl-[10px]"
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
            <div className="hidden md:flex flex-row justify-center items-center bg-gray-200 h-[33px] lg:h-[44px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
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
              type="text"
              placeholder="Search For Products..."
              className="bg-gray-200 py-[6px] pl-[10px] rounded-tr-[22px]
                    rounded-br-[22px] text-[14px] lg:text-[16px] lg:w-[300px] lg:py-[10px] lg2:w-[500px] xl:w-[550px]"
            />
          </div>
          <Link to="/basket" className="selectori relative">
            <div
              className="absolute z-[20] top-[-10px] right-[-10px] flex flex-row justify-center items-center w-[20px] h-[20px] bg-red-600 rounded-[50%]
                    text-white"
            >
              {allNum}
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
                <img className="w-[30px] h-[30px] cursor-pointer transition-all duration-[0.2s] hover:blur-sm" src={logoUser} />
                <div className={`absolute flex flex-col justify-start items-start gap-[2px] px-[20px] py-[10px] w-[60%] md:w-[40%] lg2:w-[30%] end:w-[300px] z-[100] max-h-[300px] overflow-y-auto top-[60px] md:top-[70px] right-0 rounded-[8px] transition-all duration-[0.3s] ${ctrlUserbar ? "bg-gray-100 shadow-md border-[1px] border-gray-300 opacity-[1] pointer-events-auto translate-x-[-20px] end:translate-x-[0px] " : "opacity-[0] pointer-events-none translate-x-[100px]"}`}>
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
                <img className="w-[30px] h-[30px] cursor-pointer transition-all duration-[0.2s] hover:blur-sm" src={logoUser} />
                <div className={`absolute flex flex-col justify-start items-start gap-[2px] px-[20px] py-[10px] w-[60%] md:w-[40%] lg2:w-[30%] end:w-[300px] z-[100] max-h-[300px] overflow-y-auto top-[60px] md:top-[70px] right-0 rounded-[8px] transition-all duration-[0.3s] ${ctrlUserbar ? "bg-gray-100 shadow-md border-[1px] border-gray-300 opacity-[1] pointer-events-auto translate-x-[-20px] end:translate-x-[0px] " : "opacity-[0] pointer-events-none translate-x-[100px]"}`}>
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
    </div>
                {/* user settings */}
        <div className={`fixed z-[30] flex flex-col justify-start items-center w-[100%] lg:w-[30%] h-[100%] bg-white pt-[80px] px-[20px] overflow-y-auto transition-all duration-[1s] lg:items-start
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
                        <img src={logoUser} />
                        <div className="absolute flex flex-row justify-center items-center w-[35px] h-[35px] bg-gray-300 rounded-[50%] bottom-[0px] left-[34%] cursor-pointer hover:opacity-[0.8] transition-all duration-[0.2s]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="mt-[10px] w-[100%] flex flex-col justify-center items-start py-[5px] border-t-[1px] border-gray-400 gap-[4px]">
                    <p>Change username:</p>
                    <input type="text" onChange={(e) => setNewUsername(e.target.value)} value={username} className="border-[1px] border-gray-400 rounded-[8px] px-[10px] py-[4px] w-[100%]" />
                </div>
                <div className="mt-[10px] w-[100%] flex flex-col justify-center items-start py-[5px] border-t-[1px] border-gray-400 gap-[4px]">
                    <p>Change password:</p>
                    <input type="password" onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="border-[1px] border-gray-400 rounded-[8px] px-[10px] py-[4px] w-[100%]" />
                </div>
                {/* account settings */}
                <div className="w-[100%] flex flex-row justify-between items-center mt-[30px]">
                    <p onClick={handleLogout} className="text-red-600 text-[16px] flex flex-row justify-center items-center gap-[4px] hover:bg-red-600 hover:text-white transition-all duration-[0.2s] cursor-pointer border-[1px] border-red-600 rounded-[8px] px-[10px] py-[6px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        Logout
                    </p>
                    <p className="text-red-600 text-[16px] flex flex-row justify-center items-center gap-[4px] border-[1px] border-red-600 rounded-[8px] px-[10px] py-[6px] hover:bg-red-600 hover:text-white transition-all duration-[0.2s] cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                        Delete Account
                    </p>
                </div>
            </div>
        </div>
    </>
  );
};
export default Navbar;