import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from 'next/script'
// import { TextField } from "@mui/material";
import { DatePicker, Space } from 'antd';
import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import { People } from "iconsax-react";
// import Carousel from "../components/Carousel";
import HotelSearch from "../components/HotelSearch";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { get } from "../helpers/ApiRequest";
import Link from "next/link";

const { RangePicker } = DatePicker;

export default function Home() {
    const responsive = {
        superLargeDesktop: {//
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {//desktop
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {//tablet
            breakpoint: { max: 1024, min: 464 },
            items: 2
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
            <div className="w-full bg-[url('/hero@3x.png')] bg-cover bg-no-repeat bg-[top] py-24">
                <div className="flex flex-col items-center gap-12 pt-40 pb-16 lg:px-0 px-4">

                    <div className="flex flex-col text-white items-center">
                        <p className="lg:text-5xl text-2xl font-medium">Find deals from you favorite hotels in Nigeria</p>
                        <p className="lg:text-2xl text-base font-normal">Try searching for a city, A specific hotel or even a landmark!</p>
                    </div>

                    <HotelSearch numberOfAdults={numberOfAdults} setNumberOfAdults={setNumberOfAdults} numberOfChildren={numberOfChildren} setNumberOfChildren={setNumberOfChildren} numberOfRooms={numberOfRooms} setNumberOfRooms={setNumberOfRooms} dateRange={dateRange} setDateRange={setDateRange} />

                </div>
            </div>

            <div className="flex flex-col mx-5 lg:items-center justify-center py-12 gap-20 pb-20 w-full">

                {/* Top hotel deals */}
                <div className="flex flex-col">

                    <div className="flex justify-between items-center w-full">
                        <p className="text-xl font-medium text-sec-main">Today&#39;s Top Hotel Deals</p>
                        {/* <p className="text-sm font-medium text-sec-main/50">See more</p> */}
                    </div>

                    <Carousel containerClass="container" responsive={responsive}>

                        {featuredHotels.map((hotel) => (<div className="flex flex-col gap-2">

                            <img src={hotel.imageUrl} className="object-cover w-[180px] h-[180px] lg:w-64 lg:h-64 rounded-md" alt="bcloud" />

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
                                    <p className="font-normal text-sm lg:text-base mb-[0]">{hotel.name}</p>
                                </Link>
                                <p className="text-xs lg:text-sm text-sec-main/50 mb-[0] truncate block w-44">{hotel.address.line}</p>
                                <p className="text-xs lg:text-sm text-sec-main/50 mb-[0]">Starting from  <span className="text-sec-main font-medium">NGN {hotel.averagePrice}</span>
                                </p>
                            </div>

                        </div>))}

                    </Carousel>

                </div>

                {/* Top cities */}
                <div className="flex flex-col">

                    <div className="flex flex-col w-full gap-2">
                        <p className="text-xl font-medium text-sec-main mb-[0]">Top cities</p>
                        <p className="text-sm font-medium text-sec-main/70">See the top destinations people are traveling to</p>
                    </div>




                    <Carousel containerClass="container" responsive={responsive}>
                        <div className="flex flex-col gap-2">

                            <img src="lagos.png" className="object-cover w-[180px] h-[180px] lg:w-64 lg:h-64 rounded-md" alt="bcloud" />

                            <div className="flex flex-col text-sec-main gap-1.5">
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
                                    <p className="font-normal text-sm lg:text-base mb-[0]">Hotels in Lagos</p>
                                </Link>
                                
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="awka.png" className="object-cover w-[180px] h-[180px] lg:w-64 lg:h-64 rounded-md" alt="bcloud" />

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
                                    <p className="font-normal text-sm lg:text-base mb-[0]">Hotels in Awka</p>
                                </Link>
                                
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="ph-city.png" className="object-cover w-[180px] h-[180px] lg:w-64 lg:h-64 rounded-md" alt="bcloud" />

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
                                    <p className="font-normal text-sm lg:text-base mb-[0]">Hotels in Port Harcourt</p>
                                </Link>
                                
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="owerri.png" className="object-cover w-[180px] h-[180px] lg:w-64 lg:h-64 rounded-md" alt="bcloud" />

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
                                    <p className="font-normal text-sm lg:text-base mb-[0]">Hotels in Owerri</p>
                                </Link>
                                
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="abuja.png" className="object-cover w-[180px] h-[180px] lg:w-64 lg:h-64 rounded-md" alt="bcloud" />

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
                                    <p className="font-normal text-sm lg:text-base mb-[0]">Hotels in Abuja</p>
                                </Link>
                                
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="kano.png" className="object-cover w-[180px] h-[180px] lg:w-64 lg:h-64 rounded-md" alt="bcloud" />

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
                                    <p className="font-normal text-sm lg:text-base mb-[0]">Hotel in Kano</p>
                                </Link>
                                
                            </div>

                        </div>

                    </Carousel>




                </div>

            </div>
            <Footer />
        </div>
    );
}
