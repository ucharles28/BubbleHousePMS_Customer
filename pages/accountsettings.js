import { Profile, Notification, Lock } from "iconsax-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div className="w-full h-screen bg-[#F8F8F8]">
            {/* <Navbar /> */}
            <div className="mb-6">
                <div className="pt-11 ml-28">
                    <p className="font-poppins text-2xl mb-11 text-black">Manage Account Settings</p>
                </div>
                <div className="flex w-full justify-center gap-[109px]">
                    <div className="flex flex-col gap-[24px]">
                        <div className="flex cursor-pointer hover:text-[#D4AA00] gap-[39px] px-[42px] py-[30px] rounded-md border-[0.5px] border-[#1A1A1A42] bg-white justify-center items-center">
                            <Profile
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col gap-1">
                                <p className="font-poppins text-xl">Manage profile details</p>
                                <p className="text-sm">Update your information and find out how it’s used</p>
                            </div>
                        </div>
                        <div className="flex gap-[39px] px-[42px] cursor-pointer hover:text-[#D4AA00] py-[30px] rounded-md border-[0.5px] border-[#1A1A1A42] bg-white justify-center items-center">
                            <Notification
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col gap-1">
                                <p className="font-poppins text-xl">Notifications</p>
                                <p className="text-sm">Update your information and find out how it’s used</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[24px]">
                        <div className="flex gap-[39px] px-[42px] cursor-pointer hover:text-[#D4AA00] py-[30px] rounded-md border-[0.5px] border-[#1A1A1A42] bg-white justify-center items-center">
                            <Lock
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col">
                                <p className="font-poppins text-xl">Security details</p>
                                <p className="text-sm">Update your information and find out how it’s used</p>
                            </div>
                        </div>
                        <div className="flex gap-[39px] px-[42px] cursor-pointer hover:text-[#D4AA00] py-[30px] rounded-md border-[0.5px] border-[#1A1A1A42] bg-white justify-center items-center">
                            <Lock
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col">
                                <p className="font-poppins text-xl">Profile details</p>
                                <p className="text-sm">Update your information and find out how it’s used</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}