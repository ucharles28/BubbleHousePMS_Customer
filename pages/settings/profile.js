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
import Navbar from "../../components/Navbar";

const ProfileDetails = () => {
  const [image, setImage] = useState("");
  return (
    <>
      <Navbar className="relative" />
      <div className="bg-[#F8F8F8] w-full h-full lg:px-24 px-4 absolute top-10">
        <div className="flex flex-col gap-6 justify-center w-full pt-12 pb-8">
          <span className="lg:text-2xl text-xl text-sec-main font-medium">
            Manage profile details
          </span>
          <p>
            Update your information here, this information would also be used
            for your bookings in the future
          </p>
          <div className="md:flex  grid-cols-1 gap-4">
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

            <div className="flex-wrap flex-grow gap-8 items-start cursor-pointer  rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white py-3 px-6 md:flex-1 md:w-32">
              <div className="flex space-x-3 items-center">
                <div className="border p-5 rounded-full">
                  <Image src={image ? image : ""} />
                </div>
                <label
                  htmlFor="file"
                  className="border py-2 px-3 text-[12px] bg-[#F9F9F9] rounded-lg cursor-pointer"
                >
                  Add Photos
                </label>

                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mt-4 w-full">
                <form>
                  <div className="w-full flex space-x-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border p-1 outline-none w-full rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border p-1 outline-none w-full rounded-md"
                    />
                  </div>

                  <div className="mt-3 space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-1 outline-none w-full rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="border p-1 outline-none w-full rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Gender"
                      className="border p-1 outline-none w-full rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="border p-1 outline-none w-full rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="border p-1 outline-none w-full rounded-md"
                    />
                  </div>
                  <div className="w-full text-end space-x-3 my-3">
                    <button
                      type="button"
                      className="py-[5px] px-3 bg-[#FFDD55] rounded-md font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
