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

const SecurityDetails = () => {
  const [code, setCode] = useState(true);
  const handleCodeSend = () => {
    setCode(!code);
  };
  return (
    <>
      <Navbar />
      <div className="bg-[#F8F8F8] w-full lg:px-24 px-4 py-10 pb-24">
        <div className="flex flex-col gap-10 justify-center w-full pt-12 pb-8">
          <div className="flex flex-col gap-2">
            <span className="lg:text-2xl text-xl text-sec-main font-medium">
              Manage profile details
            </span>
            <p>
              Update your information here, this information would also be used
              for your bookings in the future
            </p>
          </div>
          <div className="lg:flex grid lg:gap-4 gap-8 grid-cols-1 w-full h-auto">
            <div className="lg:w-1/4 w-full h-auto cursor-pointer py-7 rounded-md border-[0.5px] border-sec-main/20 text-sec-main flex flex-col gap-2 bg-white md:mb-0 ">
              <Link href="/settings/profile">
                <div className="flex gap-8 items-center justify-between border-b-[1.5px] hover:border-l-[5px] hover:border-l-pri-main py-3 px-2 w-full hover:text-pri-cont">
                  <div className="flex items-center space-x-3">
                    <Profile size={22} className="" />
                    <p className="text-sm font-normal">
                      Manage profile details
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/settings/security">
                <div className="flex gap-8 border-b-[1.5px] items-center justify-between hover:text-pri-cont">
                  <div className="border-l-[5px] flex gap-8 items-center justify-between border-l-pri-main py-3 px-2 w-full">
                    <div className="flex items-center gap-3">
                      <Lock size={22} className="" />
                      <p className="text-sm font-normal">Security details</p>
                    </div>
                    <div className="flex gap-1">
                      <ArrowRight2 size="16" className="text-sec-main" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/settings/notification">
                <div className="flex gap-8 items-center justify-between hover:border-l-[5px] hover:border-l-pri-main border-b-[1.5px] py-3 px-2 w-full hover:text-pri-cont">
                  <div className="flex items-center space-x-3">
                    <Notification size={22} className="" />
                    <p className="text-sm font-normal">Notifications</p>
                  </div>
                </div>
              </Link>

              <div className="flex gap-8 items-center justify-between hover:border-l-[5px] hover:border-l-pri-main py-3 px-2 w-full hover:text-pri-cont">
                <div className="flex items-center gap-4">
                  <Profile size={22} className="" />
                  <p className="text-sm font-normal">Manage profile details</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:w-3/4 w-full gap-6 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white p-3">
              <form className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-1">
                  <span className="lg:text-base text-sm text-sec-main font-medium">
                    Password
                  </span>
                  <p className="lg:text-sm text-xs text-sec-main/70">
                    Reset your password regularly to keep your account secure.
                  </p>
                </div>

                <input
                  type="password"
                  placeholder="Current Password"
                  className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md"
                />

                <div className="w-full flex justify-end space-x-3">
                  <button
                    type="button"
                    className="p-3 px-4 bg-[#FFCC00AA] text-sm rounded-md"
                  >
                    Save
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="lg:text-base text-sm text-sec-main font-medium">
                    Two-factor authentication
                  </span>
                  <p className="lg:text-sm text-xs text-sec-main/70">
                    Add a email address to set up two-factor authentication
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md flex items-center">
                    {code && (
                      <>
                        {" "}
                        <div className="flex items-center gap-1.5 pr-2 mr-2 border-r-[1.5px] ">
                          {/* <span> */}
                          <Image src="/ngFlag.png" width={22} height={22} />
                          {/* </span> */}

                          <span className="text-sec-main/70 font-normal text-sm">
                            +234
                          </span>
                        </div>
                        {/* <div className="h-5 w-[1px] bg-gray-150"></div> */}
                      </>
                    )}

                    <input
                      type="phone"
                      placeholder={code ? "Phone Number" : "Authentication Code"}
                      className="w-full outline-none text-sm"
                    />
                  </div>

                  {code ? (
                    <p className="text-xs">
                      We&#39;ll send a 6-digit code to this number. You&#39;ll
                      be asked to enter it at the next step.
                    </p>
                  ) : (
                    <p className="text-xs">
                      We&#39;ve sent a 6-digit code to your phone. Type the code
                      into the box above.
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-end space-x-3">
                  <button
                    type="button"
                    className="p-3 px-4 bg-[#FFCC00AA] text-sm rounded-md"
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
      <Footer className="bg-[#ffffff]" />
    </>
  );
};

export default SecurityDetails;
