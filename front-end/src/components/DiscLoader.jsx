import React from "react";

const DiscLoader = () => {

  return (
    <div className="
      fixed inset-0 z-[205]
      flex items-center justify-center
      bg-black/40
      backdrop-blur-md
    ">
      <div className="
        bg-white/90
        text-black
        rounded-xl
        p-6
        max-w-md
        w-[90%]
        text-center
        shadow-xl
      ">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 border-4 border-black border-t-red-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-lg font-semibold mb-2">
          Backend is starting...
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          This project is hosted on a free server.
          <br />
          Initial requests may take a few seconds.
          <br />
          Sorry for the inconvenience
        </p>
      </div>
    </div>
  );
};
export default DiscLoader;