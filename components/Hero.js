import HotelSearch from "../components/HotelSearch";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-screen w-full relative font-poppins">
      <Image
        src="../public/images/img/hero@3x.png"
        width={1024}
        height={100}
        className="object-cover w-full h-full"
      ></Image>
      <div className="flex flex-col text-white justify-center items-center absolute left-0 top-0 w-full h-full">
        <h3 className="text-3xl font-extrabold text-white mx-3 md:mx-0">
          Find deals from you favourite hotels in Nigeria
        </h3>
        <p className="text-lg item-start my-1 mx-3 md:mx-0 font-semibold">
          Try searching for a city, A specific hotel or even a landmark!
        </p>
        <div className=" max-w-[920px] mx-auto my-5 w-full md:px-3">
          <HotelSearch />
        </div>
      </div>
    </div>
  );
};

export default Hero;
