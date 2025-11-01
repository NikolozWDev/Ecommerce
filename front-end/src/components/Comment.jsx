import React from 'react'
import api from '../api';

const Comment = ({comment}) => {

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
        e.preventDefault()
        try {
            const res = await api.put(`api/comments/${commentId}/`)
        } catch (error) {
            alert("you do not have permission to control this comment")
            console.log(`comment error: ${error}`)
        }
    }
    async function handleDelete(e, commentId) {
        e.preventDefault()
        try {
            const res = await api.delete(`api/comments/${commentId}/`)
        } catch (error) {
            alert("you do not have permission to control this comment")
            console.log(`comment error: ${error}`)
        }
    }

    return (
        <div key={comment.id} className="flex flex-col justify-start items-start gap-[12px] p-[25px] border-[1px] border-gray-200 rounded-[24px]
        h-[240px] max-h-[500px] overflow-y-auto">
            {comment.is_owner ? (
                <div className="flex flex-row justify-center items-center gap-[6px]">
                    <div className="flex flex-row justify-center items-center gap-[4px] p-[8px] rounded-[12px] border-[1px] border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-[0.3s] cursor-pointer">Update
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
            <div className="w-[100%] flex justify-between">
                <p>{"⭐".repeat(comment.rating)} <small>{comment.rating} / 5</small></p>
                <p>{timeAgo(comment.created_at)}</p>
            </div>
            <div className="flex justify-center items-center gap-[8px]">
                <img src={comment.user.profile_picture} className="w-[40px] h-[40px]" />
                <p className="text-[18px] font-bold text-black">{comment.user.username} ✅</p>
            </div>
            <p className="text-[16px] text-gray-500">{comment.text}</p>
        </div>
    )

}
export default Comment