import React from 'react'
import api from '../api';

const Comment = ({comment, onDelete, update, writeComment}) => {

    function timeAgo(dateString) {

        const now = new Date();
        const created = new Date(dateString);
        const diffMs = now - created;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours   = Math.floor(minutes / 60);
        const days    = Math.floor(hours / 24);
        const weeks   = Math.floor(days / 7);
        const months  = Math.floor(days / 30);
        const years   = Math.floor(days / 365);

        if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
        if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
        if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
        if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

    }

    async function handleUpdate(e, commentId) {
        e.preventDefault();
        const invalidText = text.trim().length < 20 || text.trim().length > 128;
        const invalidRating = !["1", "2", "3", "4", "5"].includes(rating);

        setValidateText(invalidText);
        setValidateRating(invalidRating);
        if (invalidText || invalidRating) return;

        try {
            const res = await api.put(`api/comments/${commentId}/`, {
            text: text.trim(),
            rating: parseInt(rating),
            });
            update(res.data);
            setUpdateClicked(false)
        } catch (error) {
            alert("you do not have permission to control this comment");
            console.log(`comment error: ${error}`);
        }
    }
    async function handleDelete(e, commentId) {
        e.preventDefault()
        try {
            const res = await api.delete(`api/comments/${commentId}/`)
            onDelete(commentId)
        } catch (error) {
            alert("you do not have permission to control this comment")
            console.log(`comment error: ${error}`)
        }
    }

    // after clicked update button
    const [rating, setRating] = React.useState("")
    const [text, setText] = React.useState("")
    const [validateText, setValidateText] = React.useState(false)
    const [validateRating, setValidateRating] = React.useState(false)
    const [updateClicked, setUpdateClicked] = React.useState(false)
    function updateForm() {
        if(updateClicked) {
            setUpdateClicked(false)
        } else {
            setUpdateClicked(true)
        }
    }
    React.useEffect(() => {
        if((text.length < 20 && text !== "") || text.length > 128) {
            setValidateText(true)
        } else {
            setValidateText(false)
        }
    }, [text])
    React.useEffect(() => {
        if(!["1", "2", "3", "4", "5"].includes(rating) && rating !== "") {
            setValidateRating(true)
        } else {
            setValidateRating(false)
        }
    }, [rating])

    // add comment
    const backend = import.meta.env.VITE_BACKEND_URL

    return (
        <div key={comment.id} className="flex flex-col justify-start items-start gap-[12px] p-[25px] border-[1px] border-gray-200 rounded-[24px]
        h-[240px] max-h-[500px] overflow-y-auto">
            {comment.is_owner ? (
                <div className="flex flex-row justify-center items-center gap-[6px]">
                    <div onClick={updateForm} className="flex flex-row justify-center items-center gap-[4px] p-[8px] rounded-[12px] border-[1px] border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-[0.3s] cursor-pointer">{updateClicked ? <span>Cancel</span> : <span>Update</span>}
                        <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                    <div onClick={(e) => handleDelete(e, comment.id)} className="flex flex-row justify-center items-center gap-[4px] p-[8px] rounded-[12px] border-[1px] border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-[0.3s] cursor-pointer">Delete
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                        </svg>
                    </div>
                </div>
            ) : null}
            {
                updateClicked ? (
                    <>
                    <div className="w-[100%] flex justify-between">
                        <p className="flex flex-row justify-center items-center gap-[8px]">Enter value 1 / 5:
                            <div className="flex flex-col justify-start items-start gap-[4px]">
                                <input onChange={(e) => {setRating(e.target.value)}} value={rating} type="number" placeholder="1-5" className="w-[100%] px-[10px] py-[6px] border-[1px] border-gray-200 rounded-[24px]" />
                                <p className={`text-red-600 text-[14px] ${validateRating ? "block" : "hidden"}`}>rating must be 1-5</p>
                            </div>
                            </p>
                    </div>
                    <div className="flex justify-center items-center gap-[8px]">
                        <img src={`${backend}${comment.user.profile_picture}`} className="w-[40px] h-[40px]" />
                        <p className="text-[18px] font-bold text-black">{comment.user.username} ❌</p>
                    </div>
                    <textarea onChange={(e) => {setText(e.target.value)}} value={text} className="resize-none w-full min-h-[120px] px-4 py-2 border border-gray-200 rounded-2xl" placeholder="20-128 words">
                    </textarea>
                    <p className={`text-red-600 text-[14px] ${validateText ? "block" : "hidden"}`}>text must be greater then 20 and less then 128</p>
                    <button onClick={(e) => {handleUpdate(e, comment.id)}} className="flex flex-row justify-center items-center gap-[4px] p-[8px] rounded-[12px] border-[1px] border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-[0.3s] cursor-pointer">Done</button>
                    </>
            ) : (
                    <>
                    <div className="w-[100%] flex justify-between">
                        <p>{"⭐".repeat(comment.rating)} <small>{comment.rating} / 5</small></p>
                        <p>{timeAgo(comment.created_at)}</p>
                    </div>
                    <div className="flex justify-center items-center gap-[8px]">
                        <img src={`${backend}${comment.user.profile_picture}`} className="w-[40px] h-[40px]" />
                        <p className="text-[18px] font-bold text-black">{comment.user.username} ✅</p>
                    </div>
                    <p className="text-[16px] text-gray-500 break-words max-w-[250px]">{comment.text}</p>
                    </>
                )
            }
        </div>
    )

}
export default Comment