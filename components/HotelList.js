import { useEffect, useState } from "react";
import { get } from "../helpers/ApiRequest";
import Skeleton from "@mui/material/Skeleton";
import Carousel from "react-multi-carousel";

const HotelList = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFeaturedHotels();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const getFeaturedHotels = async () => {
    setIsLoading(true);
    const response = await get("Hotel/Featured");

    if (response.successful) {
      setFeaturedHotels(response.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="lg:flex lg:flex-row grid grid-cols-1">
      {!isLoading ? ( <Carousel
          containerClass="container"
          responsive={responsive}
          draggable={true}
          infinite={true}
          className='max-w-full'
        >
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="flex flex-col w-full gap-2">
              <img
                src={hotel.imageUrl}
                className="object-cover lg:w-64 w-full h-60 rounded-md"
              />
              <div className="gap-2 lg:gap-4">
                <p className="font-normal lg:text-sm text-base truncate block w-full lg:w-60 md:w-56">{hotel.name}</p>
                <p className="lg:text-xs text-sm text-sec-main/70 truncate block w-full lg:w-60">{hotel.address.line}</p>
                <p className="lg:text-xs text-sm text-sec-main/70">Starting from  <span className="text-sec-main font-medium">NGN {hotel.averagePrice}</span>
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
      <div className="lg:flex lg:flex-row grid grid-cols-1 gap-4">
        <div className="w-full text-center">
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
        <div className="w-full text-center">
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
        <div className="w-full text-center">
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
        <div className="w-full text-center">
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
    </div>
  );
};

export default HotelList;
