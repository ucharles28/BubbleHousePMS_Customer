import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from 'next/script';
import { DatePicker, Space } from 'antd';
import Popover from '@mui/material/Popover';
import { useRouter } from "next/router";
import { People } from "iconsax-react";
// import Carousel from "../components/Carousel";
import HotelSearch from "../components/HotelSearch";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { get } from "../helpers/ApiRequest";
import Link from "next/link";
import lagos from "../public/images/img/lagos.png";
import awka from "../public/images/img/awka.png";
import ph_city from "../public/images/img/ph-city.png";
import owerri from "../public/images/img/owerri.png";
import abuja from "../public/images/img/abuja.png";
import kano from "../public/images/img/kano.png";

const { RangePicker } = DatePicker;

export default function Home() {
    const responsive = {
        superLargeDesktop: {//
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {//desktop
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {//tablet
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {//mobile
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    const router = useRouter()
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
                <div className="flex flex-col items-center gap-12 pt-40 pb-16 md:px-0 px-4">

                    <div className="flex flex-col text-white items-center space-y-2">
                        <p className="md:text-5xl text-2xl font-medium">Find deals from you favorite hotels in Nigeria</p>
                        <p className="md:text-xl text-base font-normal">Try searching for a city, A specific hotel or even a landmark!</p>
                    </div>

                    <HotelSearch numberOfAdults={numberOfAdults} setNumberOfAdults={setNumberOfAdults} numberOfChildren={numberOfChildren} setNumberOfChildren={setNumberOfChildren} numberOfRooms={numberOfRooms} setNumberOfRooms={setNumberOfRooms} dateRange={dateRange} setDateRange={setDateRange} />

                </div>
            </div>

            <div className="w-full md:pt-16 pt-10 pb-20">
                <div className="flex flex-col justify-center gap-y-28 w-full md:px-10 px-4">

                    <div className="flex flex-col space-y-6 w-full">

                        <div className="flex w-full">
                            <p className="text-lg font-medium text-sec-main">Today&#39;s Top Hotel Deals</p>
                        </div>

                        {/* <Carousel containerClass="container" responsive={responsive}> */}
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

                        {/* </Carousel> */}

                    </div>

                    <div className="flex flex-col space-y-8 w-full">

                        <div className="flex flex-col w-full gap-1">
                            <p className="text-lg font-medium text-sec-main mb-[0]">Top cities</p>
                            <p className="text-sm font-medium text-sec-main/70">See the top destinations people are traveling to</p>
                        </div>
                        <div className="grid md:grid-cols-5 grid-cols-2 gap-x-4 gap-y-8 overflow-hidden w-full">
                            {/* <Carousel containerClass="container" responsive={responsive}> */}
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
                                    {/* <img src="/images/img/lagos.png" className="object-cover w-[140px] h-[140px] md:w-48 md:h-48 rounded-md mb-2" alt="bcloud" /> */}
                                    <Image
                                        className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                        src={lagos}
                                        width={140}
                                        height={140}
                                        alt="blcoud"
                                    />
                                    {/* <div className="flex flex-col text-sec-main gap-1.5"> */}
                                    <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48 hover:text-sec-main">Hotels in Lagos</p>

                                    {/* </div> */}
                                </Link>

                            </div>

                            <div className="flex flex-col gap-2">

                                {/* <img src="/images/img/awka.png" className="object-cover w-[140px] h-[140px] md:w-48 md:h-48 rounded-md" alt="bcloud" /> */}
                                <Image
                                        className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                        src={awka}
                                        width={140}
                                        height={140}
                                        alt="blcoud"
                                    />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Awka",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotels in Awka</p>
                                    </Link>

                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                {/* <img src={kano} className="object-cover w-[140px] h-[140px] md:w-48 md:h-48 rounded-md" alt="bcloud" /> */}
                                <Image
                                        className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                        src={ph_city}
                                        width={140}
                                        height={140}
                                        alt="blcoud"
                                    />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Port Harcourt",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotels in Port Harcourt</p>
                                    </Link>

                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                {/* <img src="/images/img/owerri.png" className="object-cover w-[140px] h-[140px] md:w-48 md:h-48 rounded-md" alt="bcloud" /> */}
                                <Image
                                        className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                        src={owerri}
                                        width={140}
                                        height={140}
                                        alt="blcoud"
                                    />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Owerri",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotels in Owerri</p>
                                    </Link>

                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                {/* <img src="/images/img/abuja.png" className="object-cover w-[140px] h-[140px] md:w-48 md:h-48 rounded-md" alt="bcloud" /> */}
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

                                {/* <img src="/images/img/kano.png" className="object-cover w-[140px] h-[140px] md:w-48 md:h-48 rounded-md" alt="bcloud" /> */}
                                <Image
                                        className="object-cover md:w-48 md:h-48 rounded-md mb-2"
                                        src={kano}
                                        width={140}
                                        height={140}
                                        alt="blcoud"
                                    />
                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <Link href={{
                                        pathname: "/search",
                                        query: {
                                            hotel: "",
                                            location: "Kano",
                                            startDate: String(dateRange[0].startDate),
                                            endDate: String(dateRange[0].endDate),
                                            adults: numberOfAdults,
                                            children: numberOfChildren,
                                            rooms: numberOfRooms,
                                        },
                                    }}>
                                        <p className="font-normal text-sm md:text-base mb-[0] truncate block w-32 md:w-48">Hotel in Kano</p>
                                    </Link>

                                </div>

                            </div>

                            {/* </Carousel> */}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
