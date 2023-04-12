import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from 'next/script';
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import HotelSearch from "../components/HotelSearch";
import { Calendar, People } from 'iconsax-react';
import { useRouter } from "next/router";
import PopoverDisplay from "../components/PopoverDisplay";
import { get } from "../helpers/ApiRequest";
import Link from "next/link";
import lagos from "../public/images/img/lagos.png";
import ibadan from "../public/images/img/ibadan.jpg";
import benin from "../public/images/img/benin.jpg";
import ogun from "../public/images/img/ogun.jpg";
import abuja from "../public/images/img/abuja.png";
import ilorin from "../public/images/img/ilorin.jpg";

export default function Home() {
    const router = useRouter()
    const [openDate, setOpenDate] = useState(false);
    const inputRef = useRef(null);
    const autoCompleteRef = useRef(null);
    const [query, setQuery] = useState("");
    const [numberOfAdults, setNumberOfAdults] = useState(2);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    // const [dateRange, setDateRange] = useState([]);
    const [featuredHotels, setFeaturedHotels] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchIsLoading, setSearchIsLoading] = useState(false);

    // State for displaying date library
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            key: "selection",
        },
    ]);

    //Popover
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const datePickerHandler = () => {
        setOpenDate(!openDate);
    };

    const onChange = (
        value,
        dateString
    ) => {
        setDateRange(value)
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function handleScriptLoad(updateQuery, inputRef) {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types: ["(cities)"], componentRestrictions: { country: "ng" } }
        );
        autoCompleteRef.current.setFields(["address_components", "formatted_address", "geometry"]);
        autoCompleteRef.current.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoCompleteRef.current.getPlace();
        console.log(addressObject)
        console.log(addressObject.geometry.location.lat())
        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log(addressObject);
    }

    //   useEffect(() => {
    //     getFeaturedHotels()
    //   }, [])

    const getFeaturedHotels = async () => {
        setIsLoading(true)
        const response = await get('Hotel/Featured')

        if (response.successful) {
            console.log(response.data)
            setFeaturedHotels(response.data)
        }

        setIsLoading(false)
    }

    const options = {
        componentRestrictions: { country: "ng" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["(cities)"]
    };

    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                location: query,
                startDate: String(dateRange[0]),
                endDate: String(dateRange[1]),
                adults: numberOfAdults,
                children: numberOfChildren,
                rooms: numberOfRooms,
            }
        })
    }

    useEffect(() => {
        getFeaturedHotels()
        // loadScript(
        //     `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places`,
        //     () => handleScriptLoad(setQuery, inputRef)
        // );
    }, []);


    return (
        <div className='h-screen font-poppins'>
            <Navbar />
            <div className="w-full bg-[url('https://res.cloudinary.com/drpsnmeoc/image/upload/v1680477527/hero_3x_aylkxh.png')] bg-cover bg-no-repeat bg-[bottom] py-24">
                <div className="flex flex-col items-center gap-12 pt-40 pb-20 md:px-0 px-4">

                    <div className="flex flex-col text-white items-center text-center space-y-2">
                        <p className="md:text-4xl mb-[0] text-2xl font-medium">Find deals from you favorite hotels in Nigeria</p>
                        <p className="md:text-xl mb-[0] text-base font-normal">Try searching for a city, A specific hotel or even a landmark!</p>
                    </div>

                    {/* <div className="flex md:flex-row flex-col items-center justify-between bg-white md:w-3/4 w-full gap-2 p-4 rounded-md">

                        <input
                            ref={inputRef}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Enter a City"
                            className="outline-0 w-full p-3 pl-4 leading-5 text-xs font-normal bg-gray-100 active:bg-gray-200/50 rounded-md"
                            type="text"
                        />

                        <div
                            className="relative w-full flex bg-gray-100 rounded-md py-1 px-3 items-center gap-2 text-xs leading-5 cursor-pointer"
                            onClick={datePickerHandler}
                        >

                            <Calendar size={20} />

                            <div className="flex flex-col w-full">
                                <p className="text-[0.63rem] mb-[0] text-sec-main/60">Check in/out</p>
                                <p className="text-xs mb-[0] text-sec-main">
                                    {`${format(dateRange[0].startDate, "dd-MM-yyy")} - ${format(
                                        dateRange[0].endDate,
                                        "dd-MM-yyy"
                                    )}`}
                                </p>
                            </div>

                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDateRange([item.selection])}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={1}
                                    ranges={dateRange}
                                    rangeColors={['#ffcc00']}
                                    className="absolute md:top-[50%] md:bg-white bottom-[50%] -left-[5%] md:-left-[15%] z-20"
                                />
                            )}

                        </div>

                        <div
                            className="w-full flex bg-gray-100 rounded-md py-1 px-3 items-center gap-2 text-xs leading-5"
                            onClick={handleClick}
                        >

                            <People size={20} />

                            <div className="flex flex-col w-full">
                                <p className="text-[0.63rem] mb-[0] text-sec-main/60">Room</p>
                                <p className="text-xs mb-[0] text-sec-main">Guest</p>
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

                        <button type='submit' className="md:w-1/2 w-full p-3 rounded-md bg-gray-600/90 hover:bg-gray-600 text-white flex items-center justify-center">Search</button>
                    </div> */}

                    <HotelSearch numberOfAdults={numberOfAdults} setNumberOfAdults={setNumberOfAdults} numberOfChildren={numberOfChildren} setNumberOfChildren={setNumberOfChildren} numberOfRooms={numberOfRooms} setNumberOfRooms={setNumberOfRooms} dateRange={dateRange} setDateRange={setDateRange} />

                </div>
            </div>

            {/* <div className="w-full md:pt-16 pt-10 pb-20">
                <div className="flex flex-col justify-center gap-y-28 w-full md:px-10 px-4">

                    <div className="flex flex-col space-y-6 w-full">

                        <div className="flex w-full">
                            <p className="text-lg font-medium text-sec-main">Today&#39;s Top Hotel Deals</p>
                        </div>

                        <div className="grid md:grid-cols-5 grid-cols-2 gap-x-4 gap-y-8 overflow-hidden w-full">
                            {featuredHotels.map((hotel) => (<div className="flex flex-col gap-2">

                                <img src={hotel.imageUrl} className="object-cover w-[140px] h-[140px] md:w-48 md:h-48 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: '/hotel/details',
                                        query: {
                                            hotelId: hotel.id,
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        }
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 lg:w-48 md:w-36">{hotel.name}</p>
                                    </Link>
                                    <p className="text-xs md:text-sm text-sec-main/70 mb-[0] truncate block w-32 md:w-36">{hotel.address.line}</p>
                                    <p className="text-xs md:text-sm text-sec-main/70 mb-[0]">Starting from  <span className="text-sec-main font-medium">NGN {hotel.averagePrice}</span>
                                    </p>
                                </div>

                            </div>))}
                        </div>

                    </div>

                    <div className="flex flex-col space-y-8 w-full">

                        <div className="flex flex-col w-full gap-1">
                            <p className="text-lg font-medium text-sec-main mb-[0]">Top cities</p>
                            <p className="text-sm font-medium text-sec-main/70">See the top destinations people are traveling to</p>
                        </div>
                        <div className="grid md:grid-cols-5 grid-cols-2 gap-x-4 gap-y-8 overflow-hidden w-full">
                            <div className="flex flex-col gap-2">

                                <Link href={{
                                    pathname: "/search",
                                    query: {
                                        hotel: "",
                                        location: "Lagos",
                                        startDate: String(dateRange[0].startDate),
                                        endDate: String(dateRange[0].endDate),
                                        adults: numberOfAdults,
                                        children: numberOfChildren,
                                        rooms: numberOfRooms,
                                    },
                                }}>
                                    <Image
                                        className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                        src={lagos}
                                        width={140}
                                        height={140}
                                        alt="blcoud"
                                    />
                                    <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48 hover:text-sec-main">Hotels in Lagos</p>
                                </Link>

                            </div>

                            <div className="flex flex-col gap-2">
                                <Image
                                    className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                    src={ibadan}
                                    width={140}
                                    height={140}
                                    alt="blcoud"
                                />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Ibadan",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotels in Ibadan</p>
                                    </Link>

                                </div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <Image
                                    className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                    src={benin}
                                    width={140}
                                    height={140}
                                    alt="blcoud"
                                />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Benin",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotels in benin</p>
                                    </Link>

                                </div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <Image
                                    className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                    src={ogun}
                                    width={140}
                                    height={140}
                                    alt="blcoud"
                                />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Ogun",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotels in Ogun</p>
                                    </Link>

                                </div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <Image
                                    className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                    src={abuja}
                                    width={140}
                                    height={140}
                                    alt="blcoud"
                                />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Abuja",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotels in Abuja</p>
                                    </Link>

                                </div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <Image
                                    className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                    src={ilorin}
                                    width={140}
                                    height={140}
                                    alt="blcoud"
                                />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Ilorin",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotel in Ilorin</p>
                                    </Link>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Footer /> */}
        </div >
    );
}
