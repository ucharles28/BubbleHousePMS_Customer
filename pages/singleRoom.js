import { Heart, Location } from "iconsax-react";

import React from "react";
import Amenities from "../components/Amenities";
import Carousel from "../components/Carousel";
import RoomType from "../components/RoomType";
import HotelList from "../components/HotelList";
import Navbar from "../components/Navbar";

const singleRoom = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      //desktop
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      //tablet
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      //mobile
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <section className="font-poppins">
      <div className="relative">
        <Navbar />
      </div>
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="header mt-5 flex justify-between items-center mx-3">
          <div className="hotelInfo">
            <h3 className="text-[1rem] font-bold">Raddison Blue</h3>

            <div className="text-[12px] flex items-center">
              <span className="mr-1">
                <Location size={17} />
              </span>
              <p className="text-[11.7px]">
                No.1, Bisi Oladipo Street, Aviation Estate, Off Murtala Mohammed
                International <br /> Airport Road, Lagos., 100261 Lagos,
                Nigeria.
              </p>
            </div>
          </div>
          <div className="book flex items-center ">
            <Heart size={17} className="mr-2 cursor-pointer" />
            <button
              type="button"
              className="text-end  py-1 px-5 rounded-lg bg-[#FFCC00]"
            >
              Book Now
            </button>
          </div>
        </div>
        <Carousel show={4} responsive={responsive}>
          <div className="md:mt-3">
            <div className="rounded-lg mr-3">
              <img
                className="object-cover w-[500px] h-[300px] rounded-lg"
                alt="name"
                src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
              />
            </div>
          </div>
          <div className="md:mt-3">
            <div className="rounded-lg mr-3">
              <img
                className="object-cover w-[500px] h-[300px] rounded-lg"
                alt="name"
                src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
              />
            </div>
          </div>
          <div className="md:mt-3">
            <div className="rounded-lg mr-3">
              <img
                className="object-cover w-[500px] h-[300px] rounded-lg"
                alt="name"
                src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
              />
            </div>
          </div>
          <div className="md:mt-3">
            <div className="rounded-lg mr-3">
              <img
                className="object-cover w-[500px] h-[300px] rounded-lg"
                alt="name"
                src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
              />
            </div>
          </div>
          <div className="md:mt-3">
            <div className="rounded-lg mr-3">
              <img
                className="object-cover w-[500px] h-[300px] rounded-lg"
                alt="name"
                src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
              />
            </div>
          </div>
          <div className="md:mt-3">
            <div className="rounded-lg mr-3">
              <img
                className="object-cover w-[500px] h-[300px] rounded-lg"
                alt="name"
                src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
              />
            </div>
          </div>
        </Carousel>
        <div>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur. Aliquet malesuada malesuada
            maecenas sit turpis non quis. Sodales ornare egestas auctor eget.
            Sit adipiscing sodales in quis consequat morbi sollicitudin duis
            scelerisque. Amet dolor fringilla sociis augue ipsum.
          </p>
          <p className="mt-5">
            Et orci at eget aliquam sed pretium sit laoreet. Odio pellentesque
            ultricies hac id montes amet amet. Facilisis curabitur quis et
            volutpat mattis magnis tristique.
          </p>
          <p>
            Nam sed rhoncus risus netus vulputate vestibulum aenean orci. Massa
            nunc fringilla purus mollis est nisl sed aliquet. Est arcu
            condimentum habitasse leo gravida arcu bibendum suscipit sed. Eu
            commodo est ornare faucibus erat sagittis. Dignissim adipiscing
            vestibulum condimentum egestas. Est turpis a amet nibh sed dignissim
            massa.
          </p>
          <p className="mt-5">
            Parturient volutpat in sed pretium enim ut dui. Scelerisque
            elementum semper sagittis adipiscing eget vivamus facilisi nibh
            enim. Elit purus eu eget ac magna. Aliquam pharetra sed sem sed eget
            at nec. Sit tempus sed quam placerat accumsan. Malesuada rhoncus
            vitae a enim nulla nisl feugiat. Gravida mauris integer volutpat eu
            auctor in proin cursus et. Enim tellus risus dictum diam.
          </p>
          <p className="mt-5">
            Blandit pellentesque dolor ornare euismod adipiscing placerat neque
            sem massa. A euismod at maecenas sed quam lacus lorem. Viverra
            ullamcorper mi enim hendrerit sagittis erat pharetra. Pulvinar sed
            vitae cursus consectetur risus donec eget. Augue nunc morbi ornare
            aliquam orci lorem.
          </p>
        </div>
        {/* popular destinations */}
        <div className="my-3">
          <h3 className="font-semibold">Most popular facilities</h3>
          <div className="mt-5 w-[65%]">
            <hr />
            <Amenities />
            <hr />
          </div>
          <div className="max-w-[75%]">
            <h3 className="my-6">Room Types from Raddison Blue</h3>
            <div className="space-y-3">
              <div className="">
                <RoomType />
              </div>
            </div>
          </div>
          <div className="my-5">
            <HotelList title="Nearby Hotels to {Current Hotel Name}" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default singleRoom;
