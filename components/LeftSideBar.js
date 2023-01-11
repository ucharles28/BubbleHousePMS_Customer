import {
  Profile,
  Notification,
  Lock,
  ArrowRight2,
  Security,
} from "iconsax-react";

const LeftSideBar = () => {
  <div className="cursor-pointer px-5 lg:px-7 py-7 rounded-md border-[0.5px] border-sec-main/20 text-sec-main  bg-white mb-5 md:mb-0 ">
    <div className="flex gap-8 items-center justify-between hover:text-pri-cont">
      <div className="flex items-center space-x-3">
        <Profile size={24} className="" />
        <p className="text-[15px] font-medium">Manage profile details</p>
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
        <p className="text-base font-medium">Manage profile details</p>
      </div>
    </div>
  </div>;
};

export default LeftSideBar;
