import Image from "next/image";
import Link from "next/link";
import { roomDetails } from "./RoomDetailsData";

const RoomSearchResult = ({ hotels, gotoDetails, children, adults, rooms, dateRange }) => {
  const roomInfo = roomDetails;
  console.log(roomInfo);

  return (
    <>
      {hotels.map((hotel) => {
        return (
          <div
            className="border-2 my-3 py-3 px-4 flex justify-between"
            key={hotel.id}
          >
            <div className="left flex space-x-3">
              <img
                src={hotel.imageUrl}
                className="object-cover rounded-lg w-40 h-40"
              />
              <div className="space-y-4">
                <div>
                  <Link href={{
                    pathname: '/hotel/details',
                    query: {
                      hotelId: hotel.id,
                      startDate: String(dateRange[0].startDate),
                      endDate: String(dateRange[0].endDate),
                      adults: adults,
                      children: children,
                      rooms: rooms,
                    }
                  }}>
                    <h4 className="font-extrabold">{hotel.name}</h4>
                  </Link>
                  <span className="my-2 space-x-2">
                    <small className="text-[10.7px] font-semibold">
                      {hotel.address.area}
                    </small>
                    <small className="text-[11.3px] opacity-50 ">
                      {hotel.address.line}
                    </small>
                  </span>
                </div>

                <div>
                  <h5 className="font-bold text-base">{hotel.roomType.name}</h5>
                  <small className="opacity-50">{hotel.bedSpace}</small>
                  <p className="text-xs font-semibold">{hotel.cancellation}</p>
                </div>

                <div className="font-bold flex flex-wrap w-[70%]">
                  {hotel.roomType.roomAmenities && hotel.roomType.roomAmenities.map((amenties) => (<span className="mr-3 font-semibold text-xs">{amenties.amenity.title}</span>))}
                  {/* <span className="mr-3 font-semibold text-xs">
                    Air conditioning
                  </span>
                  <span className="mr-3 font-semibold text-xs">Pool</span>
                  <span className="mr-3 font-semibold text-xs">Restaurant</span> */}
                </div>
              </div>
            </div>
            <div className="right flex flex-col justify-between">
              <div className="">
                <small className="opacity-50">Includes taxes and fees</small>
                <p className="font-bold text-end">NGN {hotel.averagePrice}</p>
                <p className="text-end text-xs">avg/night</p>
              </div>
              {/* <Link href="/singleRoom" className="text-end"> */}
              <button
                type="button"
                className="text-center py-1 px-5 rounded-lg bg-[#FFCC00]"
                onClick={(e) => gotoDetails(hotel.id)}
              >
                Book Now
              </button>
              {/* </Link> */}
            </div>
          </div>
        );
      })}
      {/* {roomDetails.map((room) => {
        return (
          <div
            className="border-2 my-3 py-3 px-4 flex justify-between"
            key={room.id}
          >
            <div className="left flex space-x-3">
              <Image
                src={room.imgSrc}
                width={150}
                height={150}
                className="object-cover rounded-lg"
              />
              <div className="space-y-4">
                <div>
                  <h4 className="font-extrabold">{room.name}</h4>
                  <span className="my-2 space-x-2">
                    <small className="text-[10.7px] font-semibold">
                      {room.address.area}
                    </small>
                    <small className="text-[11.3px] opacity-50 ">
                      {room.address.street}
                    </small>
                  </span>
                </div>

                <div>
                  <h5 className="font-bold text-base">{room.roomType}</h5>
                  <small className="opacity-50">{room.bedSpace}</small>
                  <p className="text-xs font-semibold">{room.cancellation}</p>
                </div>

                <div className="font-bold flex flex-wrap w-[70%]">
                  <span className="mr-3 font-semibold text-xs">Free Wifi</span>
                  <span className="mr-3 font-semibold text-xs">
                    Air conditioning
                  </span>
                  <span className="mr-3 font-semibold text-xs">Pool</span>
                  <span className="mr-3 font-semibold text-xs">Restaurant</span>
                </div>
              </div>
            </div>
            <div className="right flex flex-col justify-between">
              <div className="">
                <small className="opacity-50">{room.taxes}</small>
                <p className="font-bold text-end">{room.price}</p>
                <p className="text-end text-xs">{room.time}</p>
              </div>
              <Link href="/singleRoom" className="text-end">
                <button
                  type="button"
                  className="text-end  py-1 px-5 rounded-lg bg-[#FFCC00]"
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        );
      })} */}
    </>
  );
};

export default RoomSearchResult;
