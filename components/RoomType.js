import Image from "next/image";

const RoomType = () => {
  return (
    <div>
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
    </div>
  );
};

export default RoomType;
