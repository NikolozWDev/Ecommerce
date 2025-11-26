import React from "react"

const Loading = () => {

    return (
        <div className="flex flex-row justify-start items-center gap-[6px] cursor-not-allowed">
            <div className="w-[20px] h-[20px] border-t-[2px] border-r-[2px] border-red-600 rounded-full animate-spin"></div>
            <p className="text-black font-bold text-[16px]">Processing...</p>
        </div>
    )
}
export default Loading