import Image from "next/image";

const RoomSearchResult = () => {
  const roomDetails = [
    {
      imgSrc: "/Hotel-img.png",
      name: "Raddison Blue Hotel and Suites",
      address: {
        area: "Surelere, Lagos",
        street: "Plot 37 Ahmed Onibudo Street",
      },
      roomType: "Deluxe Room",
      bedSpace: "1 bed (1 queen)",
      cancellation: "Free Cancellation",
      amenities: ["Free Wifi", "Air conditioning", "Pool", "Restaurant"],
      taxes: "Includes taxes and fees",
      price: "NGN 30,000",
      time: "avg/night",
      id: 1,
    },
    {
      imgSrc: "/Hotel-img.png",
      name: "Raddison Blue Hotel and Suites",
      address: {
        area: "Surelere, Lagos",
        street: "Plot 37 Ahmed Onibudo Street",
      },
      roomType: "Deluxe Room",
      bedSpace: "1 bed (1 queen)",
      cancellation: "Free Cancellation",
      amenities: ["Free Wifi", "Air conditioning", "Pool", "Restaurant"],
      taxes: "Includes taxes and fees",
      price: "NGN 30,000",
      time: "avg/night",
      id: 2,
    },
    {
      imgSrc: "/Hotel-img.png",
      name: "Wintess",
      address: {
        area: "Awka, Anambra",
        street: "Plot 37 Ahmed Onibudo Street",
      },
      roomType: "Deluxe Room",
      bedSpace: "1 bed (1 queen)",
      cancellation: "Free Cancellation",
      amenities: ["Free Wifi", "Air conditioning", "Pool", "Restaurant"],
      taxes: "Includes taxes and fees",
      price: "NGN 30,000",
      time: "avg/night",
      id: 2,
    },
  ];

  console.log(roomDetails);

  return (
    <>
      {roomDetails.map((room) => {
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
              <button className="text-end  py-1 px-5 rounded-lg bg-[#FFCC00]">
                Book Now
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RoomSearchResult;
