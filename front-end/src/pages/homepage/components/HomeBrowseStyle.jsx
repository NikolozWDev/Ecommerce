import React from "react";
import { Link } from 'react-router-dom'

const HomeBrowserStyle = (props) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center bg-white">
        <div className="w-[100%] bg-gray-100 px-[20px] end:w-[1500px] rounded-[24px]">
          <div className="max-w-[1400px] mx-auto flex flex-col p-[30px] justify-center items-center gap-6">
            <p className="font-oswald text-[40px] uppercase font-bold lg:text-[45px]">
              browse by dress style
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <Link to="/shop"><div className="w-[100%] relative bg-white p-[20px] pr-[0px] rounded-[18px] shadow-md flex flex-row justify-end items-center lg:h-[390px] cursor-pointer group">
                <p className="text-[24px] text-black font-bold absolute z-[25] top-[20px] left-[20px] group-hover:text-red-600 transition-all duration-[0.3s]">
                  Casual
                </p>
                <img
                  src={props.pg1}
                  className="w-[70%] group-hover:w-[50%] transition-all duration-[0.3s] object-cover lg:h-[390px] lg:w-[220px] rounded-tr-[24px] rounded-br-[24px]"
                />
              </div></Link>
              <Link to="/shop"><div className="w-[100%] relative bg-white p-[20px] pr-[0px] rounded-[18px] shadow-md flex flex-row justify-end items-center lg:h-[390px] cursor-pointer group">
                <p className="text-[24px] text-black font-bold absolute z-[25] top-[20px] left-[20px] group-hover:text-red-600 transition-all duration-[0.3s]">
                  Formal
                </p>
                <img
                  src={props.pg2}
                  className="w-[70%] group-hover:w-[50%] transition-all duration-[0.3s] object-cover lg:h-[390px] lg:w-[220px] rounded-tr-[24px] rounded-br-[24px]"
                />
              </div></Link>
              <Link to="/shop"><div className="w-[100%] relative bg-white p-[20px] pr-[0px] rounded-[18px] shadow-md flex flex-row justify-end items-center lg:h-[390px] cursor-pointer group">
                <p className="text-[24px] text-black font-bold absolute z-[25] top-[20px] left-[20px] group-hover:text-red-600 transition-all duration-[0.3s]">
                  Party
                </p>
                <img
                  src={props.pg3}
                  className="w-[70%] group-hover:w-[50%] transition-all duration-[0.3s] object-cover lg:h-[390px] lg:w-[220px] rounded-tr-[24px] rounded-br-[24px]"
                />
              </div></Link>
              <Link to="/shop"><div className="w-[100%] relative bg-white p-[20px] pr-[0px] rounded-[18px] shadow-md flex flex-row justify-end items-center lg:h-[390px] cursor-pointer group">
                <p className="text-[24px] text-black font-bold absolute z-[25] top-[20px] left-[20px] group-hover:text-red-600 transition-all duration-[0.3s]">
                  Gym
                </p>
                <img
                  src={props.pg4}
                  className="w-[70%] group-hover:w-[50%] transition-all duration-[0.3s] object-cover lg:h-[390px] lg:w-[220px] rounded-tr-[24px] rounded-br-[24px]"
                />
              </div></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeBrowserStyle;