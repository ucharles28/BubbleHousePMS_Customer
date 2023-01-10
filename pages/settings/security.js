import Image from "next/image";
import { useState } from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import {
  Profile,
  Notification,
  Lock,
  ArrowRight2,
  Security,
} from "iconsax-react";

const ProfileDetails = () => {
  const [image, setImage] = useState("");
  return (
    <>
      <Navbar />
      <div className="bg-[#F8F8F8] w-full lg:px-24 px-4 py-10 pb-24">
        <div className="flex flex-col gap-10 justify-center w-full pt-12 pb-8">
          <div className="flex flex-col gap-2"></div>
          <div className="lg:flex grid lg:gap-4 gap-8 grid-cols-1 w-full h-auto">
            <div className="cursor-pointer px-5 lg:px-7 py-7 rounded-md border-[0.5px] border-sec-main/20 text-sec-main  bg-white mb-5 md:mb-0 ">
              <div className="flex gap-8 items-center justify-between hover:text-pri-cont">
                <div className="flex items-center space-x-3">
                  <Profile size={24} className="" />
                  <p className="text-[15px] font-medium">
                    Manage profile details
                  </p>
                </div>

                <div className="flex gap-1">
                  <ArrowRight2 size="18" className="text-sec-main" />
                </div>
              </div>
              <hr className="my-3" />
              <div className="flex gap-8 items-center justify-between hover:text-pri-cont">
                <div className="flex items-center space-x-3">
                  <Lock size={24} className="" />
                  <p className="text-[15px] font-medium">Security details</p>
                </div>
              </div>
              <hr className="my-3" />
              <div className="flex gap-8 items-center justify-between hover:text-pri-cont">
                <div className="flex items-center space-x-3">
                  <Notification size={24} className="" />
                  <p className="text-base font-medium">Notifications</p>
                </div>
              </div>
              <hr className="my-3" />
              <div className="flex gap-8 items-center justify-between hover:text-pri-cont">
                <div className="flex items-center space-x-3">
                  <Profile size={24} className="" />
                  <p className="text-base font-medium">
                    Manage profile details
                  </p>
                </div>
              </div>
            </div>
            ;
            <div className="flex flex-col lg:w-3/4 w-full gap-6 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white p-3">
              <form className="flex flex-col gap-5 w-full">
                <span className="lg:text-2xl text-xl text-sec-main font-medium">
                  Manage profile details
                </span>
                <p>
                  Update your information here, this information would also be
                  used for your bookings in the future
                </p>

                <input
                  type="password"
                  placeholder="Current Password"
                  className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2 outline-none w-full rounded-md"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2 outline-none w-full rounded-md"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2 outline-none w-full rounded-md"
                />

                <div className="w-full flex justify-end space-x-3">
                  <button
                    type="button"
                    className="p-3 px-4 bg-[#FFCC00AA] text-sm rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer className="bg-[#ffffff]" />
    </>
  );
};

export default ProfileDetails;
