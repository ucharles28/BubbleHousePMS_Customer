import { Calendar, Heart, Location, People } from "iconsax-react";

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
import { CircularProgress } from "@mui/material";
import Footer from "../../components/Footer";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import PopoverDisplay from "../../components/PopoverDisplay";
import { DateRange } from "@mui/icons-material";


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
    const [isSaved, setIsSaved] = useState();
    const [numberOfAdults, setNumberOfAdults] = useState(0);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [openDate, setOpenDate] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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

    // const updateNumberOfRooms = async (isAdd, index) => {
    //     const obj = { ...selectRooms }
    //     if (obj[index]) {
    //         if (!isAdd && obj[index] < 1) {
    //             return;
    //         }
    //         obj[index] = isAdd ? obj[index] + 1 : obj[index] - 1;
    //     } else {
    //         obj[index] = 1;
    //     }
    //     setSelectedRooms(obj)
    // }

    const datePickerHandler = () => {
        console.log(openDate)
        setOpenDate(!openDate);
      };

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
            setNumberOfChildren(Number(query.children))
            setNumberOfAdults(Number(query.adults))
        }
    }, [query])

    useEffect(() => {
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


    const bookNow = () => {
        const roomTypesInfo = []
        Object.keys(selectRooms).map((key) => {
            if (!selectRooms[key] || selectRooms[key] < 1) {
                return;
            }
            roomTypesInfo.push({
                bookedRoooms: Number(selectRooms[key]),
                roomPrice: Number(hotel.roomTypes[key].price),
                roomTypeId: hotel.roomTypes[key].id
            });
        })
        console.log(roomTypesInfo)
        router.push({
            pathname: '/booking',
            query: {
              hotelId: hotel.id,
              startDate: String(dateRange[0].startDate),
              endDate: String(dateRange[0].endDate),
              adults: numberOfAdults,
              children: numberOfChildren,
              rooms: numberOfRooms,
              nights: numberOfDays,
              total: totalAmount,
              roomTypesInfo: JSON.stringify(roomTypesInfo)
            }
          })
    }

    return (
        <section className="font-poppins">
            {hotel && <div className="max-w-[1200px] mx-auto px-10">
                <div className="header mt-5 flex justify-between items-center mx-3">
                    <div className="hotelInfo">
                        <h3 className="text-2xl font-bold">{hotel.name}</h3>

                        <div className="text-[12px] flex items-center">
                            <span className="mr-1">
                                <Location size={17} />
                            </span>
                            <p className="text-sm">
                                {hotel.address.line}
                            </p>
                        </div>
                    </div>
                    <div className="book flex items-center ">
                        <div className="p-2 flex items-center justify-center hover:bg-[#ffcc006b] mr-2 cursor-pointer">
                            {/* <Heart size={20} className="" /> */}
                            <ClipLoader size={20} color="#FFCC00" />
                        </div>
                        <button
                            type="button"
                            className="text-end  py-[7px] px-5 rounded-[5px] bg-[#FFCC00]"
                        >
                            BOOK NOW
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
                        <p className="my-6 text-base text-black font-medium">Select a room</p>
                        {/* <div className="flex gap-[39px] mb-9">
                            <div onClick={datePickerHandler} className="flex cursor-pointer gap-2 items-center py-[10px] pl-4 pr-[158px] border-[#1A1A1A14] border rounded-md">
                                <Calendar
                                    size={20}
                                    className="" />
                                <div className="flex flex-col">
                                    <p className="text-xs text-[#1A1A1A61]">Dates</p>
                                    <p className="text-xs text-[#1A1A1AAD]">27 Aug - 28 Aug</p>
                                </div>
                            </div>
                            {openDate && (
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDateRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRange}
                                    className="absolute top-[90px] lg:top-[60px] lg:left-[30%]"
                                />
                            )}

                            <div onClick={handleClick} className="flex cursor-pointer gap-2 items-center py-[10px] pl-4 pr-[158px] border-[#1A1A1A14] border rounded-md">
                                <People
                                    size={20}
                                    className="" />
                                <div className="flex flex-col">
                                    <p className="text-xs text-[#1A1A1A61]">Guest</p>
                                    <p className="text-xs text-[#1A1A1AAD]">1 room 1 adult, 1 children</p>
                                </div>
                            </div>
                            <PopoverDisplay
                                handleClick={handleClick}
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                numberOfAdults={numberOfAdults}
                                setNumberOfAdults={setNumberOfAdults}
                                numberOfChildren={numberOfChildren}
                                setNumberOfChildren={setNumberOfChildren}
                                setNumberOfRooms={setNumberOfRooms}
                                numberOfRooms={numberOfRooms}
                            />
                        </div> */}
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
                            className="disabled:bg-[#FFDD55] rounded-md w-[70%] py-[7px] bg-[#FFCC00]"
                            onClick={bookNow}
                            disabled={totalAmount < 1}
                        >
                            Book Now
                        </button>
                    </div>
                    <div className="my-5">
                        <HotelList title={`Nearby Hotels to ${hotel.name}`} />
                    </div>
                </div>
            </div>}
            <Footer />
        </section>
    );
};