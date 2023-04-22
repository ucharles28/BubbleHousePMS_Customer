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
          <div
            className="border-[1.5px] border-gray-200 hover:bg-pri-main/10 hover:border-pri-main/20 cursor-pointer p-3 rounded-md flex-wrap md:flex md:justify-between w-auto h-auto grid grid-cols-1"
            key={hotel.id}
          >

            <div className="flex md:flex-row flex-col space-y-3 md:space-x-3">

              <img
                src={hotel.imageUrl}
                className="object-cover rounded-md w-40 md:w-48 h-40 md:h-48"
              />

              <div className="space-y-5">
                <div className='flex flex-col'>
                  {/* <Link
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
                  > */}
                  <span className="text-lg font-semibold block truncate w-3/4 md:w-96">
                    {hotel.name}
                  </span>
                  {/* </Link> */}
                  <span className="space-x-2 block truncate w-3/4 md:w-96">
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
                    {/* {hotel.roomType.name} */}
                    Deluxe Room
                  </span>
                  <span className="">
                    {/* {hotel.bedSpace} */}
                    1 queen size bed
                  </span>
                  <span className="font-medium italic">
                    {/* {hotel.cancellation} */}
                    Free cancellation
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

            <div className="flex flex-col justify-between">
              <div className="md:text-end">
                <small className="opacity-50 text-center">
                  Includes taxes and fees
                </small>
                <div className="text-end">
                  <p className="font-bold">NGN {hotel.averagePrice}</p>
                  <p className=" text-xs">avg/night</p>
                </div>
              </div>
              {/* <Link href="/singleRoom" className="text-end"> */}
              <button
                type="button"
                className="w-auto text-center py-1 px-5 mt-2 lg:mt-0 rounded-lg bg-[#FFCC00]"
                onClick={(e) => gotoDetails(hotel.id)}
              >
                Book Now
              </button>
              {/* </Link> */}
            </div>

          </div>
        );
      })}
    </>
  );
};

export default RoomSearchResult;
