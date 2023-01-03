import { Profile, Notification, Lock } from "iconsax-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div className="h-screen font-poppins">
            <Navbar />

            <div className="bg-[#F8F8F8] w-full h-auto pt-20 pb-24 lg:px-24 px-4">
                <div className="flex flex-col gap-6 justify-center w-full pt-12 pb-8">
                    <p className="lg:text-2xl text-xl text-sec-main font-medium">Manage Account Settings</p>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="flex gap-8 items-center cursor-pointer hover:text-pri-cont px-5 lg:px-10 py-8 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white">
                            <Profile
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-medium">Manage profile details</p>
                                <p className="text-sm text-sec-main/80 font-normal">Update your information and find out how it&#39;s used</p>
                            </div>
                        </div>
                        <div className="flex gap-8 items-center cursor-pointer hover:text-pri-cont px-5 lg:px-10 py-8 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white">
                            <Notification
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-medium">Notifications</p>
                                <p className="text-sm text-sec-main/80 font-normal">Update your information and find out how it’s used</p>
                            </div>
                        </div>
                        <div className="flex gap-8 items-center cursor-pointer hover:text-pri-cont px-5 lg:px-10 py-8 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white">
                            <Lock
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col">
                                <p className="text-xl font-medium">Security details</p>
                                <p className="text-sm text-sec-main/80 font-normal">Update your information and find out how it’s used</p>
                            </div>
                        </div>
                        <div className="flex gap-8 items-center cursor-pointer hover:text-pri-cont px-5 lg:px-10 py-8 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white">
                            <Lock
                                size={42}
                                className=''
                            />
                            <div className="flex flex-col">
                                <p className="text-xl font-medium">Profile details</p>
                                <p className="text-sm text-sec-main/80 font-normal">Update your information and find out how it’s used</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}