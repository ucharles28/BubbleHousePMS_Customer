import Image from "next/image";
import { Add, Minus } from "iconsax-react";

const RoomType = ({ roomTypes, updateNumberOfRooms, selectRooms }) => {
  return (
    roomTypes.map((roomType, index) => (<div className="group border-[1.5px] bg-white border-pri-main/40 hover:bg-pri-main/5 cursor-pointer hover:shadow-sm p-3 mb-3 rounded-md flex justify-between text-sec-main">

      <div className="lg:flex hidden gap-3">
        <img src={roomType.images[0].imageUrl} className="w-56 h-56 object-cover rounded-md" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">Deluxe Grande Room</p>

            <div className="space-x-3 text-sec-main/70 text-xs font-medium flex items-center">
              <p>1 bed (1 queen)</p>
              <p>Sleeps 2</p>
            </div>

            <div className="space-x-3 text-sec-main/70 text-xs font-medium flex items-center">
              {roomType.roomAmenities.map((amenity) => (<small>{amenity.amenity.title}</small>))}
            </div>

            <span className="font-medium text-xs">Free Cancellation</span>
          </div>

          <div className="flex flex-col">
            <p className="text-sec-main/50 text-xs font-medium">
              Includes taxes and fees
            </p>
            <p className="text-lg font-semibold">NGN {Number(roomType.price).toLocaleString()}</p>
            <p className="text-sec-main/70 text-xs font-medium">avg/nights</p>
          </div>
        </div>

      </div>

      <div className="flex justify-between gap-3 lg:hidden">

        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">Deluxe Grande Room</p>

            <div className="space-x-3 text-sec-main/70 text-xs font-medium flex items-center">
              <p>1 bed (1 queen)</p>
              <p>Sleeps 2</p>
            </div>

            <div className="space-x-3 text-sec-main/70 text-xs font-medium flex items-center">
              {roomType.roomAmenities.map((amenity) => (<small>{amenity.amenity.title}</small>))}
            </div>

            <span className="font-medium text-xs">Free Cancellation</span>
          </div>

          <div className="flex flex-col">
            <p className="text-sec-main/50 text-xs font-medium">
              Includes taxes and fees
            </p>
            <p className="text-lg font-semibold">NGN {Number(roomType.price).toLocaleString()}</p>
            <p className="text-sec-main/70 text-xs font-medium">avg/nights</p>
          </div>
        </div>

        <img src={roomType.images[0].imageUrl} className="w-24 h-24 object-cover rounded-md" />

      </div>

      <div className="clear-left lg:flex hidden items-end">
        {(!selectRooms[index] || selectRooms[index] < 1) && <button
            type="button"
            onClick={() => updateNumberOfRooms(true, index)}
            className="border-[1.5px] group-hover:bg-white hover:bg-white border-[#D4AA00]/50 py-2 px-5 text-sm font-medium text-pri-adark rounded-md"
          >
            Reserve
          </button>}
        {(selectRooms[index] || selectRooms[index] > 0) && <>
          <span
            className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 align-middle cursor-pointer"
            style={{ borderRadius: "50%" }}
          >
            <Minus onClick={() => updateNumberOfRooms(false, index)} />
          </span>
          <span className="border rounded-md py-1 px-3 text-xs  border-[#FFCC00]/50">
            {selectRooms[index]}
          </span>
          <span
            className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 text-3xl align-middle cursor-pointer"
            style={{ borderRadius: "50%" }}
          >
            <Add onClick={() => updateNumberOfRooms(true, index)} />
          </span>
        </>}
      </div>

      <div className="clear-left flex lg:hidden items-end">
        {(!selectRooms[index] || selectRooms[index] < 1) && <button
            type="button"
            onClick={() => updateNumberOfRooms(true, index)}
            className="border-[1.5px] group-hover:bg-white hover:bg-white border-[#D4AA00]/50 py-2 px-5 text-sm font-medium text-pri-adark rounded-md"
          >
            Reserve
          </button>}
        {(selectRooms[index] || selectRooms[index] > 0) && <div className="flex items-center gap-2">
          <span
            className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 align-middle cursor-pointer"
            style={{ borderRadius: "50%" }}
          >
            <Minus onClick={() => updateNumberOfRooms(false, index)} />
          </span>
          <span className="border rounded-md py-1 px-3 text-xs  border-[#FFCC00]/50">
            {selectRooms[index]}
          </span>
          <span
            className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 text-3xl align-middle cursor-pointer"
            style={{ borderRadius: "50%" }}
          >
            <Add onClick={() => updateNumberOfRooms(true, index)} />
          </span>
        </div>}
      </div>

      
    </div>))
  );
};

export default RoomType;
