import Image from "next/image";
import { useState } from "react";
import {
  Profile,
  Notification,
  Lock,
  ArrowRight2,
  Security,
} from "iconsax-react";
import Footer from "../../components/Footer";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const ProfileDetails = () => {
  const [code, setCode] = useState(true);
  const handleCodeSend = () => {
    setCode(!code);
  };
  return (
    <>
      <Navbar />
      <div className="bg-[#F8F8F8] w-full lg:px-24 px-4 py-10 pb-24">
        <div className="flex flex-col gap-10 justify-center w-full pt-12 pb-8">
          <div className="flex flex-col gap-4">
            <div className="md:flex grid lg:gap-4 gap-8 grid-cols-1 w-full">
              <div className="cursor-pointer px-5 lg:px-7 py-7 rounded-md border-[0.5px] border-sec-main/20 text-sec-main  bg-white mb-5 md:mb-0 ">
                <Link href="/settings/profile">
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
                </Link>

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

              <div className="flex flex-col lg:w-3/4 w-full gap-6 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white p-3">
                <form className="flex flex-col gap-5 w-full p-2">
                  <span className="lg:text-xl text-xl text-sec-main font-medium">
                    Password
                  </span>
                  <p>
                    Reset your password regularly to keep your account secure
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
                      className="p-2 px-3 bg-[#FFCC00AA] text-[13px] font-semibold rounded-md"
                    >
                      Save
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Two-factor authentication
                    </p>
                    <p className="text-[11.5px] text-[gray-150]">
                      Add a email address to set up two-factor authentication
                    </p>
                  </div>
                  <div className="w-full border p-2 flex space-x-3 rounded-lg items-center">
                    {code && (
                      <>
                        {" "}
                        <div className=" p-1 rounded-md bg-[#FFFFFF] space-x-1 text-xs flex items-center ">
                          <span>
                            <Image src="/ngFlag.png" width={22} height={22} />
                          </span>

                          <span className="font-semibold text-[11px]">
                            +123
                          </span>
                        </div>
                        <div className="h-5 w-[1px] bg-gray-150"></div>
                      </>
                    )}

                    <input
                      type="text"
                      placeholder={code ? "Number" : "Authentication Code"}
                      className="w-full outline-none text-sm"
                    />
                  </div>
                  <div className="flex-none">
                    <p className="text-[11.5px]">
                      we’ll send a 6-digit code to this number. You’ll be asked
                      to enter it at the next step.
                    </p>
                  </div>
                  <div className="w-full flex justify-end space-x-3">
                    <button
                      type="button"
                      className="p-2 px-3 bg-[#FFCC00AA] text-[13px] rounded-md font-semibold"
                      onClick={handleCodeSend}
                    >
                      {code ? "Send Code" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="bg-[#ffffff]" />
    </>
  );
};

export default ProfileDetails;
