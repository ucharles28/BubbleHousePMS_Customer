import { Heart, Location } from "iconsax-react";

import React from "react";
import Amenities from "../../components/Amenities";
import Carousel from "../../components/Carousel";
import RoomType from "../../components/RoomType";
import HotelList from "../../components/HotelList";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get } from "../../helpers/ApiRequest";
import HotelSearch from "../../components/HotelSearch";



export default function HotelDetails() {
    const router = useRouter();
    const { query } = router;

    const [hotel, setHotel] = useState();
    const [roomTypeImages, setRoomTypeImages] = useState();
    const [selectRooms, setSelectedRooms] = useState({});
    const [roomImages, setRoomImages] = useState([]);
    // const [amenties, setRoomImages] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [dateRange, setDateRange] = useState();


    const updateNumberOfRooms = async (isAdd, index) => {
        const obj = { ...selectRooms }
        if (obj[index]) {
            if (!isAdd && obj[index] < 1) {
                return;
            }
            obj[index] = isAdd ? obj[index] + 1 : obj[index] - 1;
        } else {
            obj[index] = 1;
        }
        setSelectedRooms(obj)
    }

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            //desktop
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            //tablet
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            //mobile
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    useEffect(() => {
        if (query) {
            getHotelById(query.hotelId)
            setDateRange([
                {
                  startDate: new Date(query.startDate),
                  endDate: new Date(query.endDate),
                  key: "selection",
                },
              ])
        }
    }, [query])

    useEffect(() => {
        console.log('aa')
        let totalAmount = 0
        let numberOfRooms = 0
        Object.keys(selectRooms).map((key) => {
            if (!selectRooms[key] || selectRooms[key] < 1) {
                return;
            }

            numberOfRooms += Number(selectRooms[key])
            totalAmount += Number(hotel.roomTypes[key].price) * Number(selectRooms[key])
        })
        setNumberOfRooms(numberOfRooms)
        setTotalAmount(totalAmount)
        if (dateRange) {
            setNumberOfDays(dateDiffInDays(dateRange[0].startDate, dateRange[0].endDate))
        }

    }, [selectRooms])

    const getHotelById = async (id) => {
        const response = await get(`Hotel/${id}`)

        if (response.successful) {
            console.log(response.data)
            setHotel(response.data)
            const images = []
            response.data.roomTypes.map((roomType) => {
                roomType.images.map((image) => {
                    images.push(image.imageUrl)
                })
            })

            setRoomImages(images)
        }
    }

    return (
        <section className="font-poppins">
            {hotel && <div className="max-w-[1200px] mx-auto px-10">
                <div className="header mt-5 flex justify-between items-center mx-3">
                    <div className="hotelInfo">
                        <h3 className="text-[1rem] font-bold">{hotel.name}</h3>

                        <div className="text-[12px] flex items-center">
                            <span className="mr-1">
                                <Location size={17} />
                            </span>
                            <p className="text-[11.7px]">
                                {hotel.address.line}
                            </p>
                        </div>
                    </div>
                    <div className="book flex items-center ">
                        <Heart size={17} className="mr-2 cursor-pointer" />
                        <button
                            type="button"
                            className="text-end  py-1 px-5 rounded-lg bg-[#FFCC00]"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
                <Carousel show={4} responsive={responsive}>
                    {roomImages.map((image) => (<div className="md:mt-3">
                        <div className="rounded-lg mr-3">
                            <img
                                className="object-cover w-[500px] h-[300px] rounded-lg"
                                alt="name"
                                src={image}
                            />
                        </div>
                    </div>))}
                </Carousel>
                <div>
                    <p className="my-3">
                        {hotel.description}
                    </p>
                </div>
                {/* popular destinations */}
                <div className="my-3">
                    <h3 className="font-semibold">Most popular facilities</h3>
                    <div className="mt-5 w-[65%]">
                        <hr />
                        <Amenities />
                        <hr />
                    </div>
                    <div className="max-w-[75%]">
                        <h3 className="my-6">Room Types from {hotel.name}</h3>
                        <div className="space-y-3">
                            <div className="">
                                <RoomType roomTypes={hotel.roomTypes} updateNumberOfRooms={updateNumberOfRooms} selectRooms={selectRooms} />
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-7 space-y-3 font-semibold">
                        <p>
                            <span>{numberOfRooms} Rooms </span> ,<span>{numberOfDays} Night</span>
                        </p>
                        <p>
                            Total Price:<span> ₦{totalAmount.toLocaleString()}</span>
                        </p>
                        <button
                            type="button"
                            className="rounded-md w-[70%] py-[7px] bg-[#FFCC00]"
                        >
                            Book Now
                        </button>
                    </div>
                    <div className="my-5">
                        <HotelList title={`Nearby Hotels to ${hotel.name}`} />
                    </div>
                </div>
            </div>}
        </section>
    );
};