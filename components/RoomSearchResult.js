import Image from "next/image";
import Link from "next/link";
import { roomDetails } from "./RoomDetailsData";

const RoomSearchResult = ({
  hotels,
  gotoDetails,
  children,
  adults,
  rooms,
  dateRange,
}) => {
  const roomInfo = roomDetails;
  console.log(roomInfo);

  return (
    <>
      {hotels.map((hotel) => {
        return (
          <Link
            className="flex"
            href={{
              pathname: "/hotel/details",
              query: {
                hotelId: hotel.id,
                startDate: String(dateRange[0].startDate),
                endDate: String(dateRange[0].endDate),
                adults: adults,
                children: children,
                rooms: rooms,
              },
            }}
          >
            <div
              className="border-[1.5px] border-gray-200 hover:bg-pri-main/10 hover:border-pri-main/20 cursor-pointer p-3 rounded-md flex-wrap md:flex md:justify-between w-full h-auto grid grid-cols-1 group text-sec-main"
              key={hotel.id}
            >

              <div className="flex md:flex-row flex-col gap-4">

                <img
                  src={hotel.imageUrl}
                  className="object-cover rounded-md w-full md:w-48 h-40 md:h-48"
                />

                <div className="space-y-5">
                  <div className='flex flex-col'>
                    <p className="group-hover:text-pri-adark text-lg font-semibold block truncate w-full md:w-96">
                      {hotel.name}
                    </p>
                    {/* </Link> */}
                    <span className="space-x-2 block truncate w-full md:w-96">
                      <span className="text-xs text-sec-conBg font-medium">
                        {hotel.address.area}
                      </span>
                      <span className="text-xs text-sec-conBg">
                        {hotel.address.line}
                      </span>
                    </span>
                  </div>

                  <div className='flex flex-col gap-1 text-xs font-normal text-sec-conBg'>
                    <span className="font-semibold uppercase text-sec-altDark">
                      {hotel.roomType.name}
                    </span>
                    <span className="">
                      {hotel.bedSpace}
                    </span>
                    <span className="font-medium italic">
                      {hotel.cancellation}
                    </span>
                  </div>

                  <div className="font-semibold flex flex-wrap w-[80%]">
                    {hotel.roomType.roomAmenities &&
                      hotel.roomType.roomAmenities.map((amenties) => (
                        <span className="mr-2 font-medium text-xs">
                          {amenties.amenity.title}
                        </span>
                      ))}
                  </div>
                </div>

              </div>

              <div className="flex flex-col justify-between w-auto gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-normal italic text-sec-conBg"> Includes taxes and fees </span>
                  <span className="text-xl font-semibold text-sec-main">NGN {hotel.averagePrice}</span>
                  <span className="text-xs font-normal text-sec-altDark">avg/night</span>
                </div>
                <button
                  type="button"
                  className="w-full bg-pri-cont hover:bg-pri-main text-sm font-medium leading-5 rounded-md p-2.5"
                  onClick={(e) => gotoDetails(hotel.id)}
                >
                  Book Now
                </button>
              </div>

            </div>
          </Link>
        );
      })}
    </>
  );
};

export default RoomSearchResult;
