import React from 'react'
import twitter from '../public/assets/icons/twitter.png'
import facebook from '../public/assets/icons/facebook.png'
import instagram from '../public/assets/icons/instagram.png'
import github from '../public/assets/icons/github.png'
import payment from '../public/assets/icons/payment.png'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const sectionRef = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false)
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

    // enter email
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = React.useState("")
    const [emailValidation, setEmailValidation] = React.useState(false)
    function enterInputEmail() {
        if (!emailValue.includes("@")) {
            setEmailValidation(true)
            return
        }
        setEmailValidation(false)
        console.log("Subscribed:", emailValue)
        navigate("/basket")
    }

    return (
        <div className="w-full px-[20px] bg-gray-100 flex justify-center pb-[env(safe-area-inset-bottom)]">
            <div className="w-[100%] end:w-[1500px] flex flex-col justify-center items-center gap-[26px]">

            <div ref={sectionRef} className={`w-[100%] bg-black p-[20px] lg:px-[40px] lg:py-[30px] xl:px-[50px] xl:py-[40px] flex flex-col md:flex-row justify-center md:justify-between items-center gap-[22px] rounded-[22px] mt-[-50px] transition-all duration-[1s] ${isVisible ? "opacity-[1] translate-y-[0px]" : "opacity-[0] translate-y-[-50px]"}`}>
                <p className="uppercase text-white font-bold text-[30px] xl:text-[40px] xl:leading-[45px] leading-[33px]">stay upto date about our latest offers</p>
                <div className="flex flex-col justify-center items-end gap-[10px] w-[100%]">
                    <div className="w-[100%] flex flex-row justify-end items-center">
                        <div className="flex flex-col justify-start items-start gap-[4px]">
                            <div className="flex flex-row justify-center items-center">
                                <div className="flex flex-row justify-center items-center bg-white h-[37px] px-[12px] rounded-tl-[22px] rounded-bl-[22px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <input onChange={(e) => {setEmailValue(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter") enterInputEmail()}} type='text' placeholder='Enter your email address' className="w-[100%] pl-[10px] lg:w-[250px] bg-white py-[8px] rounded-tr-[22px]
                                rounded-br-[22px] text-[14px]" />
                            </div>
                            <p className={`text-[14px] text-red-600 ${emailValidation ? "opacity-[1] pointer-events-auto" : "opacity-[0] pointer-events-none"}`}>Invalid email address</p>
                        </div>
                    </div>
                    <button onClick={enterInputEmail} className="w-[100%] lg:w-[300px] px-[12px] py-[8px] bg-white text-black rounded-[22px] font-bold text-[16px]
                    border-[2px] hover:border-red-600 transition-all duration-[0.3s]">Subscribe to Newsletter</button>
                </div>
            </div>


            <div className="w-[100%] flex flex-wrap justify-between items-start gap-[22px]">
                <div className="flex flex-col justify-center items-start gap-[12px]">
                    <p className="title-name">E-commerce</p>
                    <p className="text-[16px] text-gray-500 sm2:w-[300px]">We have clothes that suits your style and which you're proud to wear. From women to men</p>
                    <div className="flex flex-row justify-center items-center gap-[8px]">
                        <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank"><img className="w-[20px] cursor-pointer rounded-[50%] border-[1px] border-gray-300" src={twitter} /></a>
                        <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank"><img className="w-[20px] cursor-pointer rounded-[50%] border-[1px] border-gray-300" src={facebook} /></a>
                        <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank"><img className="w-[20px] cursor-pointer rounded-[50%] border-[1px] border-gray-300" src={instagram} /></a>
                        <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank"><img className="w-[20px] cursor-pointer rounded-[50%] border-[1px] border-gray-300" src={github} /></a>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-[8px]">
                    <p className="footer-title">company</p>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>About</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Features</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Works</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Career</a>
                </div>
                <div className="flex flex-col justify-center items-start gap-[8px]">
                    <p className="footer-title">help</p>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Customer Support</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Delivery Details</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Terms & Conditions</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Privacy Policy</a>
                </div>
                <div className="flex flex-col justify-center items-start gap-[8px]">
                    <p className="footer-title">faq</p>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Account</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Manage Deliveries</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Orders</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Payment</a>
                </div>
                <div className="flex flex-col justify-center items-start gap-[8px]">
                    <p className="footer-title">resources</p>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Free eBook</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Development Tutorial</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>How to - Blog</a>
                    <a href="https://www.linkedin.com/in/nikoloz-gigiashvili/" target="_blank" className='blur-text'>Youtube Playlist</a>
                </div>
            </div>


            <div className="w-[100%] md:justify-between flex flex-wrap justify-center items-center gap-[12px] pt-[12px] pb-[40px] border-t-[1px] border-gray-300">
                <p className='text-gray-500'>E-commerce C 2009-2030, All Rights Reserved</p>
                <img className="cursor-pointer" src={payment} />
            </div>

            </div>
        </div>
    )

}
export default Footer