import React from "react"

const Disclaimer = () => {

    const [messageOpen, setMessageOpen] = React.useState(false)
    function messageControl() {
        if(messageOpen) {
            setMessageOpen(false)
        } else {
            setMessageOpen(true)
        }
    }

    return (
<div
  className={`
    fixed z-[100] bottom-[20px] right-[20px] lg:bottom-[40px] lg:right-[60px]
    flex flex-row items-start
    transition-all duration-300 ease-in-out
    ${
      messageOpen
        ? "bg-gray-800 border border-red-600 rounded-[12px] w-[200px] h-[300px] md:w-[250px] md:h-[350px] opacity-100 scale-100"
        : "w-[40px] h-[40px] opacity-90 scale-95"
    }
  `}
>
<div
  onClick={messageControl}
  className={`
    flex justify-center items-center
    w-[40px] h-[40px]
    bg-gray-200 border border-red-600
    transition-all duration-300 ease-in-out cursor-pointer 
    lg:p-[10px] lg:w-[50px] lg:h-[50px]
    ${messageOpen ? "lg:p-[10px]" : ""}
    ${messageOpen ? "rounded-tl-[12px] border-l-0" : "rounded-full"}
  `}
>
  {messageOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 md:w-[30px] md:h-[30px] lg:w-[10px] lg:h-[10px]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 md:w-[30px] md:h-[30px]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  )}
</div>
  {messageOpen && (
        <p className="pt-[20px] pl-[5px] pr-[20px] mt-[30px] md:text-[16px] text-sm text-gray-400 italic">
        ⚠️ <span className="font-semibold text-gray-300">Disclaimer:</span> This project is built for 
        <span className="font-semibold text-white"> practice purposes only</span>.  
        It runs on a <span className="font-semibold text-white">free hosting server</span>, so you may 
        experience bugs, delays, or unexpected behavior.  
        🚧 The project is <span className="font-semibold text-white">actively evolving</span> and will be improved over time.
        </p>
  )}
</div>
    )
}
export default Disclaimer