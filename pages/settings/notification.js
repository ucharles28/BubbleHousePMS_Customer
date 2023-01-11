import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Switch from "react-switch";
import { useState } from "react";
import {
  Profile,
  Notification,
  Lock,
  ArrowRight2,
  Security,
} from "iconsax-react";

const notification = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(!checked);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F8F8F8] w-full lg:px-24 px-4 py-10 pb-20">
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

            <div className="flex flex-col lg:w-3/4 w-full gap-6 rounded-md border-[0.5px] border-sec-main/20 text-sec-main bg-white p-3">
              <div className="flex flex-col gap-5 w-full p-3">
                <h3>Email notifications</h3>
                <div className="space-y-5">
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when it’s almost time for me to
                      check-in
                    </label>
                    <div size={20}>
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        onColor="#FFCC0080"
                        onHandleColor="#F5C400"
                        handleDiameter={18}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={35}
                        className="react-switch"
                        id="switch1"
                      />
                    </div>
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when you check-in
                    </label>
                    <div size={20}>
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        onColor="#FFCC0080"
                        onHandleColor="#F5C400"
                        handleDiameter={18}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={35}
                        className="react-switch"
                        id="switch1"
                      />
                    </div>
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when you check-out
                    </label>
                    <div size={20}>
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        onColor="#FFCC0080"
                        onHandleColor="#F5C400"
                        handleDiameter={18}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={35}
                        className="react-switch"
                        id="switch1"
                      />
                    </div>
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when your booking is successful
                    </label>
                    <div size={20}>
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        onColor="#FFCC0080"
                        onHandleColor="#F5C400"
                        handleDiameter={18}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={35}
                        className="react-switch"
                        id="switch1"
                      />
                    </div>
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <label htmlFor="switch1">
                      Get a notification when your booking gets cancelled
                    </label>
                    <div size={20}>
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        onColor="#FFCC0080"
                        onHandleColor="#F5C400"
                        handleDiameter={18}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={35}
                        className="react-switch"
                        id="switch1"
                      />
                    </div>
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
    </>
  );
};

export default notification;
