import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "../helpers/ApiRequest";
import Skeleton from "@mui/material/Skeleton";

const HotelList = ({ title }) => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFeaturedHotels();
  }, []);

  const getFeaturedHotels = async () => {
    setIsLoading(true);
    const response = await get("Hotel/Featured");

    if (response.successful) {
      console.log(response.data);
      setFeaturedHotels(response.data);
    }

    setIsLoading(false);
  };

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
    <article className="mt-16">
      <h4 className="text-2xl font-bold mb-8 lg:mb-5">{title}</h4>
      <div className="grid md:grid-cols-3 lg:flex lg:grow md:gap-3 lg:gap-4 w-full mx-auto items-center">
        {!isLoading ? (
          featuredHotels.map((hotel) => {
            return (
              <div key={hotel.id} className="w-full text-center">
                {/* <Image
                height={200}
                width={200}
                src={hotel.img}
                className="w-[85%] md:w-[95%] mx-auto"
              /> */}
                <img
                  src={hotel.imageUrl}
                  className="w-full md:w-[200] md:[200] mx-auto rounded-md md:rounded-none"
                />
                <div className="my-3">
                  <p className="font-bold">{hotel.name}</p>
                  <small className="text-[10px]">{hotel.address.line}</small>
                  <p>
                    Starting from <strong>NGN {hotel.averagePrice}</strong>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex">
            <div className="w-full text-center mx-4">
              <Skeleton variant="rounded" width={250} height={250} />
              <div className="my-3">
                {/* <p className="font-bold">{hotel.name}</p> */}
                {/* <small>{hotel.address}</small> */}
                {/* <p>
                Starting from <strong>{hotel.price}</strong>
              </p> */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
            <div className="w-full text-center mx-4">
              <Skeleton variant="rounded" width={250} height={250} />
              <div className="my-3">
                {/* <p className="font-bold">{hotel.name}</p> */}
                {/* <small>{hotel.address}</small> */}
                {/* <p>
                Starting from <strong>{hotel.price}</strong>
              </p> */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
            <div className="w-full text-center mx-4">
              <Skeleton variant="rounded" width={250} height={250} />
              <div className="my-3">
                {/* <p className="font-bold">{hotel.name}</p> */}
                {/* <small>{hotel.address}</small> */}
                {/* <p>
                Starting from <strong>{hotel.price}</strong>
              </p> */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
            <div className="w-full text-center mx-4">
              <Skeleton variant="rounded" width={250} height={250} />
              <div className="my-3">
                {/* <p className="font-bold">{hotel.name}</p> */}
                {/* <small>{hotel.address}</small> */}
                {/* <p>
                Starting from <strong>{hotel.price}</strong>
              </p> */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
            <div className="w-full text-center mx-4">
              <Skeleton variant="rounded" width={250} height={250} />
              <div className="my-3">
                {/* <p className="font-bold">{hotel.name}</p> */}
                {/* <small>{hotel.address}</small> */}
                {/* <p>
                Starting from <strong>{hotel.price}</strong>
              </p> */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
          </div>
        )}
        <div></div>
      </div>
    </article>
  );
};

export default HotelList;
