import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="pt-[100px] px-[20px] pb-[100px]">
      <div className="w-full flex flex-row justify-center">
        <div className="w-full max-w-[600px] flex flex-col p-6 justify-center items-stretch border border-black">
          <p className="text-black text-[24px] font-bold mb-4">Login</p>
          <form className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-black text-[16px]">Password</label>
              <input
                type="password"
                placeholder="Example123"
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
              />
              <p className="text-sm text-blue-600 cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <button className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
              Submit
            </button>
          </form>
          <p className="mt-4 text-sm">
            You don't have an account? -{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>

        <div className="hidden">

        </div>

      </div>
    </div>
  );
};
export default Login;

//  <p className="text-black text-[24px] font-bold">Login</p>
//  <form className="flex flex-col justify-center items-start">
//  <div className='flex flex-col justify-center items-start gap-[4px]'>
//      <label className="text-black text-[16px]">Email</label>
//      <input type="email" placeholder="example@gmail.com" className="border-[1px] border-gray-300 px-[14px] py-[10px] w-[100%] rounded-[8px]" />
//  </div>
//  <div className='flex flex-col justify-center items-start gap-[4px]'>
//      <label className="text-black text-[16px]">Password</label>
//      <div>
//      <input type="password" placeholder="Example123" className="border-[1px] border-gray-300 px-[14px] py-[10px] w-[100%] rounded-[8px]" />
//      </div>
//      <p>Forgot Password?</p>
//  </div>
//  <button>Submit</button>
//  </form>
//  <p>You don't have an account? - <Link to="/register">Register</Link></p>