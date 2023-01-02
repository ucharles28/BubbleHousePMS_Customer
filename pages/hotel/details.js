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
    const [totalAmount, setTotalAmount] = useState(0);


    const updateNumberOfRooms = async (isAdd, index) => {
        debugger
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
        }
    }, [query])

    useEffect(() => {
        let totalAmount = 0
        Object.keys(selectRooms).map((key) => {
            if (selectRooms[key] || selectRooms[key] < 1) {
                return;
            }

            totalAmount += Number(hotel.roomTypes[key].price) * Number(selectRooms[key])
        })
        setTotalAmount(totalAmount)
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
                            <span>2 Rooms </span> ,<span>1 Night</span>
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