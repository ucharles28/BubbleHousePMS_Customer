import { Wifi, Star1 } from "iconsax-react";

const Amenities = ({ amenities }) => {
  return (
    <>
      <div className="grid justify-between lg:grid-cols-6 grid-cols-3 gap-4 font-poppins">
        {amenities.map((amenity) => (
          <div className="flex flex-col items-center space-y-1">
            <span className="p-3 bg-pri-main/20 rounded-full">
              <i className={`fa fa-${amenity.icon} text-lg text-[#f5c400]`}></i>
            </span>
            <p className="text-sm lg:font-medium font-normal"> {amenity.title}</p>
          </div>
        ))}
        
      </div>
    </>
  );
};

export default Amenities;
