import Image from "next/image";

const HotelList = ({ title }) => {
  const HotelData = [
    {
      name: "Wintess Hotel and Suites",
      address: "Ifite-Awka, Anambra State.",
      img: "/HotelListImg.png",
      price: " NGN 5,000",
    },
    {
      name: "Wintess Hotel and Suites",
      address: "Ifite-Awka, Anambra State.",
      img: "/HotelListImg.png",
      price: " NGN 5,000",
      id: 1,
    },
    {
      name: "Wintess Hotel and Suites",
      address: "Ifite-Awka, Anambra State.",
      img: "/HotelListImg.png",
      price: "NGN 5,000",
      id: 1,
    },
    {
      name: "Wintess Hotel and Suites",
      address: "Ifite-Awka, Anambra State.",
      img: "/HotelListImg.png",
      price: "NGN 5,000",
      id: 1,
    },
    {
      name: "Wintess Hotel and Suites",
      address: "Ifite-Awka, Anambra State.",
      img: "/HotelListImg.png",
      price: "NGN 5,000",
      id: 1,
    },
  ];
  console.log(HotelData);
  return (
    <article className="mt-24">
      <h4 className="text-2xl font-bold mb-8 lg:mb-5">{title}</h4>
      <div className="grid md:grid-cols-3 lg:flex lg:grow md:gap-3 lg:gap-4 w-full mx-auto">
        {HotelData.map((hotel) => {
          return (
            <div key={hotel.id} className="w-full text-center">
              <Image
                height={200}
                width={200}
                src={hotel.img}
                className="w-[85%] md:w-[95%] mx-auto"
              />
              <div className="my-3">
                <p className="font-bold">{hotel.name}</p>
                <small>{hotel.address}</small>
                <p>
                  Starting from <strong>{hotel.price}</strong>
                </p>
              </div>
            </div>
          );
        })}
        <div></div>
      </div>
    </article>
  );
};

export default HotelList;
