import Image from "next/image";
import { Add, Minus } from "iconsax-react";
import { useState } from "react";
const RoomType = () => {
  const [reserve, setReserve] = useState(false);
  const [hideBtn, setHideBn] = useState(true);

  const handleReserveBtn = () => {
    setReserve(!reserve);
    setHideBn(!hideBtn);
  };
  return (
    <div className="border border-[#FFCC0080]/50 p-3 rounded-md flex justify-between items-baseline">
      <div className="flex gap-3">
        <Image width={180} height={175} src="/hotelimage.png" />
        <div>
          <h5 className="font-bold">Deluxe Grande Room</h5>
          <div className="space-x-3 text-[#1A1A1AAD]/60 font-semibold">
            <small>1 bed (1 queen)</small>
            <small>Sleeps 2</small>
          </div>
          <div className="space-x-3 text-md text-[#1A1A1AAD]/60">
            <small>Free WIFI</small>
            <small>Free Parking</small>
          </div>
          <span className="font-semibold text-xs">Free Cancellation</span>
          <div className="flex flex-col mt-3">
            <small className="text-[#1A1A1AAD]/60">
              Includes taxes and fees
            </small>
            <span className="font-semibold">NGN 30,000</span>
            <small>avg/nights</small>
          </div>
        </div>
      </div>

      <div>
        {hideBtn && (
          <button
            type="button"
            className="py-[5px] px-14 border  border-[#FFCC0080]/50 text-[#FFCC0080] uppercase font-bold  rounded-sm text-[13.5px]"
            onClick={handleReserveBtn}
          >
            Reserve
          </button>
        )}

        {reserve && (
          <div className="space-x-3 flex items-center">
            <span
              className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 align-middle cursor-pointer"
              style={{ borderRadius: "50%" }}
            >
              <Minus />
            </span>
            <span className="border rounded-md py-1 px-3 text-xs  border-[#FFCC00]/50">
              2
            </span>
            <span
              className="border border-[#FFCC00]/50 bg-[#FFCC00]/10 text-3xl align-middle cursor-pointer"
              style={{ borderRadius: "50%" }}
            >
              <Add />
            </span>
          </div>
        )}
      </div>
      {/* <div className="space-x-3 flex items-center">
        <div className="border p-3 rounded-md flex justify-between items-baseline">
          <RoomType />

          <button
            type="button"
            className="py-[5px] px-14 border  border-[#FFCC0080]/50 text-[#FFCC0080] uppercase font-bold  rounded-sm text-[13.5px]"
          >
            Reserve
          </button>
        </div>
       
      </div> */}
    </div>
  );
};

export default RoomType;
