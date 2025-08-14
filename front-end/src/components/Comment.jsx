import React from 'react'

const Comment = (props) => {


    return (
        <div key={props.comment.id} className="flex flex-col justify-start items-start gap-[12px] p-[25px] border-[1px] border-gray-200 rounded-[24px]
        h-[240px] max-h-[500px] overflow-y-auto">
            <p>{"⭐".repeat(props.comment.rate)}</p>
            <p className="text-[18px] font-bold text-black">{props.comment.name} ✅</p>
            <p className="text-[16px] text-gray-500">{props.comment.text}</p>
        </div>
    )

}
export default Comment