import { Wifi, Star1 } from "iconsax-react";

const Amenities = ({ amenities }) => {
  return (
    <>
      <div className="grid justify-between md:grid-cols-8 grid-cols-3 gap-4 font-poppins">
        {amenities && amenities.map((amenity) => (
          <div className="relative flex flex-col items-center space-y-2">

            <div className="flex items-center justify-center relative">
              <span className="absolute rounded-full p-5 bg-pri-main/30">
              </span>
              <i className={`fa fa-${amenity.icon} text-base text-[#f5c400]`}></i>
            </div>

            <p className="inset-1 text-xs text-center md:font-medium font-normal"> {amenity.title}</p>
          </div>
        ))}

      </div>
    </>
  );
};

export default Amenities;
