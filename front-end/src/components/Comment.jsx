import React from 'react'

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
    return (
        <div key={comment.id} className="flex flex-col justify-start items-start gap-[12px] p-[25px] border-[1px] border-gray-200 rounded-[24px]
        h-[240px] max-h-[500px] overflow-y-auto">
            {comment.is_owner ? (
                <p>It's your's</p>
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