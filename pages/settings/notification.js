import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Link from 'next/link';
import { Switch } from 'antd';
import { useState } from "react";
import {
  Profile,
  Notification,
  Lock,
  ArrowRight2,
  Security,
} from "iconsax-react";

const notification = () => {
  const [checkedObj, setCheckedObj] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="h-screen font-poppins">
      <Navbar />
      <div className="bg-[#F8F8F8] w-full lg:px-24 px-4 py-10 pb-20">
        <div className="flex flex-col gap-10 justify-center w-full pt-12 pb-8">

          <div className="flex flex-col gap-2">
            <span className="lg:text-xl text-lg text-sec-main font-medium">
              Notifications
            </span>
            <p>
              Decide what you want to be notified about, and unsubscribe from what you don't.
            </p>
          </div>

          <div className="lg:flex grid lg:gap-4 gap-8 grid-cols-1 w-full h-auto">

            <div className="lg:w-1/4 w-full h-auto cursor-pointer py-7 rounded-md border-[0.5px] border-sec-main/20 text-sec-main flex flex-col gap-2 bg-white md:mb-0 ">

              <Link href="/settings/profile">
                <div className="flex gap-8 items-center justify-between border-b-[1.5px] hover:border-l-[5px] hover:border-l-pri-main py-3 px-2 w-full hover:text-pri-cont text-sec-main/70">
                  <div className="flex items-center space-x-3">
                    <Profile size={22} className="" />
                    <p className="text-sm font-normal">Manage profile details</p>
                  </div>
                </div>
              </Link>

              <Link href="/settings/security">
                <div className="flex gap-8 items-center justify-between border-b-[1.5px] hover:border-l-[5px] hover:border-l-pri-main py-3 px-2 w-full hover:text-pri-cont text-sec-main/70">
                  <div className="flex items-center space-x-3">
                    <Lock size={22} className="" />
                    <p className="text-sm font-normal">Security details</p>
                  </div>
                </div>
              </Link>

              <div className="flex gap-8 border-b-[1.5px] items-center justify-between hover:text-pri-cont">
                <div className="border-l-[5px] flex gap-8 items-center justify-between border-l-pri-main py-3 px-2 w-full">
                  <div className="flex items-center gap-3">
                    <Notification size={22} className="" />
                    <p className="text-sm font-normal">
                      Notifications
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <ArrowRight2 size="16" className="text-sec-main" />
                  </div>
                </div>
              </div>

            </div>

            <div className="flex flex-col lg:w-3/4 w-full gap-6 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white p-3">
              <div className="flex flex-col gap-5 w-full p-3">
                <span className="lg:text-base text-sm text-sec-main font-medium">
                  Email notifications
                </span>
                <div className="space-y-5">
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when it&#39;s almost time for me to
                      check-in
                    </label>
                    {/* <div size={20}> */}
                    <Switch
                      className='bg-[#E5E7EB]'
                      checked={checkedObj[0]}
                      onChange={() => setCheckedObj({ ...checkedObj, 0: !checkedObj[0] })}
                      id="switch1"
                    />
                    {/* </div> */}
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when you check-in
                    </label>
                    {/* <div size={20}> */}
                    <Switch
                      className='bg-[#E5E7EB]'
                      checked={checkedObj[1]}
                      onChange={() => setCheckedObj({ ...checkedObj, 1: !checkedObj[1] })}
                      id="switch2"
                    />
                    {/* </div> */}
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when you check-out
                    </label>
                    {/* <div size={20}> */}
                    <Switch
                      className='bg-[#E5E7EB]'
                      checked={checkedObj[2]}
                      onChange={() => setCheckedObj({ ...checkedObj, 2: !checkedObj[2] })}
                      id="switch3"
                    />
                    {/* </div> */}
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when your booking is successful
                    </label>
                    {/* <div size={20}> */}
                    <Switch
                      className='bg-[#E5E7EB]'
                      checked={checkedObj[3]}
                      onChange={() => setCheckedObj({ ...checkedObj, 3: !checkedObj[3] })}
                      id="switch4"
                    />
                    {/* </div> */}
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when your booking gets cancelled
                    </label>
                    {/* <div size={20}> */}
                    <Switch
                      className='bg-[#E5E7EB]'
                      checked={checkedObj[4]}
                      onChange={() => setCheckedObj({ ...checkedObj, 4: !checkedObj[4] })}
                      id="switch5"
                    />
                    {/* </div> */}
                  </span>
                </div>
                <div className="w-full flex justify-end space-x-3">
                  <button
                    type="button"
                    className="p-3 px-4 bg-[#FFCC00AA] text-sm rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer className="bg-[#ffffff]" />
    </div>
  );
};

export default notification;
