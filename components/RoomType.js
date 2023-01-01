import Image from "next/image";
import { Add, Minus } from "iconsax-react";
const RoomType = ({ roomTypes, updateNumberOfRooms, selectRooms }) => {
  return (
    roomTypes.map((roomType, index) => (<div className="border border-[#FFCC0080]/50 p-3 rounded-md flex justify-between items-baseline">
      <div className="flex gap-3">
        {/* <Image width={180} height={175} src="/hotelimage.png" /> */}
        <img src={roomType.images[0].imageUrl} className="w-[180px] h-[175px] rounded-md" />
        <div>
          <h5 className="font-bold">Deluxe Grande Room</h5>
          {/* <div className="space-x-3 text-[#1A1A1AAD]/60 font-semibold">
            <small>1 bed (1 queen)</small>
            <small>Sleeps 2</small>
          </div> */}
          <div className="space-x-3 text-md text-[#1A1A1AAD]/60">
            {roomType.roomAmenities.map((amenity) => (<small>{amenity.amenity.title}</small>))}
          </div>
          <span className="font-semibold text-xs">Free Cancellation</span>
          <div className="flex flex-col mt-3">
            <small className="text-[#1A1A1AAD]/60">
              Includes taxes and fees
            </small>
            <span className="font-semibold">NGN {Number(roomType.price).toLocaleString()}</span>
            <small>avg/nights</small>
          </div>
        </div>
      </div>
      <div className="space-x-3 flex items-center">
        {(!selectRooms[index] || selectRooms[index] < 1) && <div className="border border-[#D4AA00]/50 py-[5px] px-14 rounded-md flex justify-between items-baseline">
          <button
            type="button"
            onClick={() => updateNumberOfRooms(true, index)}
            className="py-0 px-0 border  border-white text-[#D4AA00] uppercase font-bold  rounded-sm text-[13.5px]"
          >
            Reserve
          </button>
        </div>}
        {(selectRooms[index] || selectRooms[index] > 0) && <>
          <span
            className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 align-middle cursor-pointer"
            style={{ borderRadius: "50%" }}
          >
            <Minus onClick={() => updateNumberOfRooms(false, index)}/>
          </span>
          <span className="border rounded-md py-1 px-3 text-xs  border-[#FFCC00]/50">
            {selectRooms[index]}
          </span>
          <span
            className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 text-3xl align-middle cursor-pointer"
            style={{ borderRadius: "50%" }}
          >
            <Add onClick={() => updateNumberOfRooms(true, index)}/>
          </span>
        </>}
      </div>
    </div>))
  );
};

export default RoomType;
