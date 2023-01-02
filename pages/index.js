// import Image from "next/image";
// import React, { useRef, useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Script from 'next/script'
// import { DatePicker, Space } from 'antd';
// import Popover from '@mui/material/Popover';
// import { useRouter } from "next/router";
// import { People } from "iconsax-react";
// import Carousel from "../components/Carousel";
// import Hero from "../components/Hero";
// import HotelList from "../components/HotelList";
// import { DateRange } from "react-date-range";
// import { format } from "date-fns";
// import { BsCalendar } from "react-icons/bs";
// import { get } from "../helpers/ApiRequest";
// import data from "../pages/api/HotelSerMockData/MOCK_DATA.json";
// import styles from "../styles/HotelSearch.module.css";
// import { style } from "@mui/system";
// import { Puff } from "react-loader-spinner";
// import { SentimentVeryDissatisfiedOutlined } from "@mui/icons-material";

// const { RangePicker } = DatePicker;

// export default function Home() {
//     const router = useRouter();
//     const inputRef = useRef(null);
//     const autoCompleteRef = useRef(null);
//     const [query, setQuery] = useState("");
//     const [numberOfAdults, setNumberOfAdults] = useState(2);
//     const [numberOfChildren, setNumberOfChildren] = useState(0);
//     const [numberOfRooms, setNumberOfRooms] = useState(1);
//     const [searchIsLoading, setSearchIsLoading] = useState(false);
//     const [hotels, setHotels] = useState([]);
//     const [places, setPlaces] = useState([]);
//     const [selectedPlace, setSelectedPlace] = useState();
//     const [selectedHotel, setSelectedHotel] = useState();

//     const [value, setValue] = useState("");

//     const onChange = async (event) => {
//         setSearchIsLoading(true);
//         const query = event.target.value;
//         setValue(query);

//         const responses = await Promise.all([
//             getPlacesPredition(query),
//             get(`Hotel/Query/${query}`),
//         ]);

//         if (responses[1].successful) {
//             setHotels(responses[1].data);
//             console.log(responses[1].data);
//         }

//         setSearchIsLoading(false);
//     };

//     const onSelectHotel = async (hotel) => {
//         setValue(hotel.name);
//         setHotels([]);
//         setPlaces([]);
//         setSelectedHotel(hotel);
//         setSelectedPlace(null);
//     };

//     const onSelectPlace = async (place) => {
//         setValue(place.description);
//         setSelectedPlace(place);
//         setSelectedHotel(null);
//         setHotels([]);
//         setPlaces([]);
//     };

//     useEffect(() => {
//         loadScript(
//             `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places`,
//             () => handleScriptLoad()
//         );
//     }, []);

//     const loadScript = (url, callback) => {
//         let script = document.createElement("script");
//         script.type = "text/javascript";

//         if (script.readyState) {
//             script.onreadystatechange = function () {
//                 if (
//                     script.readyState === "loaded" ||
//                     script.readyState === "complete"
//                 ) {
//                     script.onreadystatechange = null;
//                     callback();
//                 }
//             };
//         } else {
//             script.onload = () => callback();
//         }

//         script.src = url;
//         document.getElementsByTagName("head")[0].appendChild(script);
//     };

//     function getPlacesPredition(query) {
//         let result = [];
//         const service = new google.maps.places.AutocompleteService();
//         service.getPlacePredictions(
//             {
//                 input: query,
//                 types: ["(cities)"],
//                 componentRestrictions: {
//                     country: "ng",
//                 },
//             },
//             (suggestions) => {
//                 console.log(suggestions);
//                 setPlaces(suggestions);
//             }
//         );
//         return result;
//     }

//     function handleScriptLoad() {
//         console.log("loaded");
//     }

//     function handleSearch() {
//         if (!value) {
//             return;
//         }

//         router.push({
//             pathname: "/search",
//             query: {
//                 hotel: selectedHotel ? selectedHotel.name : "",
//                 location: selectedPlace ? selectedPlace.description : "",
//                 startDate: String(dateRange[0].startDate),
//                 endDate: String(dateRange[0].endDate),
//                 adults: numberOfAdults,
//                 children: numberOfChildren,
//                 rooms: numberOfRooms,
//             },
//         });
//     }

//     const [dateRange, setDateRange] = useState([
//         {
//             startDate: new Date(),
//             endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
//             key: "selection",
//         },
//     ]);

//     const [openDate, setOpenDate] = useState(false);

//     const datePickerHandler = () => {
//         setOpenDate(!openDate);
//     };

//     const [anchorEl, setAnchorEl] = useState(null);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };


//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 4,
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 4,
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 2,
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1,
//         },
//     };

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
import Carousel from "../components/Carousel";
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

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
            items: 1
        }
    };

    const router = useRouter()
    const inputRef = useRef(null);
    const autoCompleteRef = useRef(null);
    const [query, setQuery] = useState("");
    const [numberOfAdults, setNumberOfAdults] = useState(2);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [dateRange, setDateRange] = useState([]);

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
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places`,
            () => handleScriptLoad(setQuery, inputRef)
        );
    }, []);


    return (
        <div className='h-screen font-poppins'>
            <Navbar />
            {/* <div className="w-full bg-[url('/hero@3x.png')] bg-cover bg-no-repeat bg-[top] py-20">
                <div className="">
                    <div className="mt-[164px] mb-16 mx-6 flex flex-col text-white justify-center items-center">
                        <p className="text-5xl leading-[56px]">Find deals from you favourite hotels in Nigeria</p>
                        <p className="text-2xl leading-[56px] item-start">Try searching for a city, A specific hotel or even a landmark!</p>
                    </div>

                    <div className="bg-white rounded-lg w-[1168px] py-4 px-6 flex gap-2 items-center text-sec-main">
                        <input ref={inputRef}
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Enter a City"
                            className="border-2 border-gray-200 bg-white text-sm placeholder:text-sm p-2 rounded-md outline-none w-2/6"
                            value={query}
                        />
                        <RangePicker onChange={onChange} />
                        <div className="flex items-center gap-2 cursor-pointer py-1.5 rounded-md px-4 w-1/4" onClick={handleClick}>
                            <People size={24} />
                            <div className="flex flex-col">
                                <p className="text-xs text-sec-main/50 mb-[0]">{numberOfRooms} room</p>
                                <p className="text-xs mb-[0]">{numberOfAdults} adults, {numberOfChildren} children</p>
                            </div>
                        </div>

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{
                                width: 320
                            }}
                        >
                            <div className="flex justify-between items-center gap-11 py-[15px] px-[16px]">
                                <p className="text-base ">Adult</p>

                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => setNumberOfAdults(numberOfAdults - 1)} disabled={numberOfAdults < 2} className="text-center flex justify-center items-center border border-black rounded-full px-3">
                                        <span className="font-medium text-xl mb-1">-</span>
                                    </button>

                                    <p className="text-lg mx-2">{numberOfAdults}</p>
                                    <button onClick={() => setNumberOfAdults(numberOfAdults + 1)} className="text-center flex justify-center items-center border border-black rounded-full px-2">
                                        <span className="font-medium text-xl mb-1">+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
                                <p className="text-base ">Children</p>

                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => setNumberOfChildren(numberOfChildren - 1)} disabled={numberOfChildren < 1} className="text-center flex justify-center items-center border border-black rounded-full px-3">
                                        <span className="font-medium text-xl mb-1">-</span>
                                    </button>

                                    <p className="text-lg mx-2">{numberOfChildren}</p>
                                    <button onClick={() => setNumberOfChildren(numberOfChildren + 1)} className="text-center flex justify-center items-center border border-black rounded-full px-2">
                                        <span className="font-medium text-xl mb-1">+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
                                <p className="text-base ">Rooms</p>

                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => setNumberOfRooms(numberOfRooms - 1)} disabled={numberOfRooms < 2} className="text-center flex justify-center items-center border border-black rounded-full px-3">
                                        <span className="font-medium text-xl mb-1">-</span>
                                    </button>

                                    <p className="text-lg mx-2">{numberOfRooms}</p>
                                    <button onClick={() => setNumberOfRooms(numberOfRooms + 1)} className="text-center flex justify-center items-center border border-black rounded-full px-2">
                                        <span className="font-medium text-xl mb-1">+</span>
                                    </button>
                                </div>
                            </div>
                        </Popover>

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="flex w-1/6 text-sm leading-6 justify-center font-medium px-4 py-2.5 rounded-[5px] bg-pri-cont hover:bg-pri-main text-sec-main"
                        >
                            Search
                        </button>

                    </div>

                </div>
            </div> */}
            <div className="w-full bg-[url('/hero@3x.png')] bg-cover bg-no-repeat bg-[top] py-24">
                <div className="flex flex-col items-center gap-12 pt-40 pb-16">

                    <div className="flex flex-col text-white items-center">
                        <p className="text-5xl font-medium">Find deals from you favorite hotels in Nigeria</p>
                        <p className="text-2xl font-normal">Try searching for a city, A specific hotel or even a landmark!</p>
                    </div>

                    <div className="bg-white rounded-lg w-[1168px] py-4 px-6 flex gap-2 items-center text-sec-main">
                        <input ref={inputRef}
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Enter a City"
                            className="border-2 border-gray-200 bg-white text-sm placeholder:text-sm p-2 rounded-md outline-none w-2/6"
                            value={query}
                        />
                        {/* <Space direction="horizontal" className="w-1/4" size={12}> */}
                        <RangePicker onChange={onChange} />
                        {/* </Space> */}
                        {/* <div className="w-1/4 p-2 flex flex-row items-center cursor-pointer justify-between" onClick={handleClick}>
                                <p className="mx-1 text-md font-medium">{numberOfAdults} adults</p>
                                <p className="mx-1 text-md font-medium">{numberOfChildren} children</p>
                                <p className="mx-1 text-md font-medium">.</p>
                                <p className="mx-1 text-md font-medium">{numberOfRooms} rooms</p>
                            </div> */}
                        <div className="flex items-center gap-2 cursor-pointer py-1.5 rounded-md px-4 w-1/4" onClick={handleClick}>
                            <People size={24} />
                            <div className="flex flex-col">
                                <p className="text-xs text-sec-main/50 mb-[0]">{numberOfRooms} room</p>
                                <p className="text-xs mb-[0]">{numberOfAdults} adults, {numberOfChildren} children</p>
                            </div>
                        </div>

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{
                                width: 320
                            }}
                        >
                            <div className="flex justify-between items-center gap-11 py-[15px] px-[16px]">
                                <p className="text-base ">Adult</p>

                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => setNumberOfAdults(numberOfAdults - 1)} disabled={numberOfAdults < 2} className="text-center flex justify-center items-center border border-black rounded-full px-3">
                                        <span className="font-medium text-xl mb-1">-</span>
                                    </button>

                                    <p className="text-lg mx-2">{numberOfAdults}</p>
                                    <button onClick={() => setNumberOfAdults(numberOfAdults + 1)} className="text-center flex justify-center items-center border border-black rounded-full px-2">
                                        <span className="font-medium text-xl mb-1">+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
                                <p className="text-base ">Children</p>

                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => setNumberOfChildren(numberOfChildren - 1)} disabled={numberOfChildren < 1} className="text-center flex justify-center items-center border border-black rounded-full px-3">
                                        <span className="font-medium text-xl mb-1">-</span>
                                    </button>

                                    <p className="text-lg mx-2">{numberOfChildren}</p>
                                    <button onClick={() => setNumberOfChildren(numberOfChildren + 1)} className="text-center flex justify-center items-center border border-black rounded-full px-2">
                                        <span className="font-medium text-xl mb-1">+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
                                <p className="text-base ">Rooms</p>

                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => setNumberOfRooms(numberOfRooms - 1)} disabled={numberOfRooms < 2} className="text-center flex justify-center items-center border border-black rounded-full px-3">
                                        <span className="font-medium text-xl mb-1">-</span>
                                    </button>

                                    <p className="text-lg mx-2">{numberOfRooms}</p>
                                    <button onClick={() => setNumberOfRooms(numberOfRooms + 1)} className="text-center flex justify-center items-center border border-black rounded-full px-2">
                                        <span className="font-medium text-xl mb-1">+</span>
                                    </button>
                                </div>
                            </div>
                        </Popover>

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="flex w-1/6 text-sm leading-6 justify-center font-medium px-4 py-2.5 rounded-[5px] bg-pri-cont hover:bg-pri-main text-sec-main"
                        >
                            Search
                        </button>

                    </div>

                </div>
            </div>

            <div className="flex flex-col items-center py-12 gap-20 w-full">

                {/* Top hotel deals */}
                <div className="flex flex-col">

                    <div className="flex justify-between items-center w-full">
                        <p className="text-xl font-medium text-sec-main">Today&#39;s Top Hotel Deals</p>
                        {/* <p className="text-sm font-medium text-sec-main/50">See more</p> */}
                    </div>

                    <div className="flex flex-row gap-6 justify-between">

                        <div className="flex flex-col gap-2">

                            <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                            <div className="flex flex-col text-sec-main gap-1.5">
                                <p className="font-normal text-base mb-[0]">Wintess Hotel and Suites</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Starting from  <span className="text-sec-main font-medium">NGN 5,000</span>
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                            <div className="flex flex-col text-sec-main gap-1.5">
                                <p className="font-normal text-base mb-[0]">Wintess Hotel and Suites</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Starting from  <span className="text-sec-main font-medium">NGN 5,000</span>
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                            <div className="flex flex-col text-sec-main gap-1.5">
                                <p className="font-normal text-base mb-[0]">Wintess Hotel and Suites</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Starting from  <span className="text-sec-main font-medium">NGN 5,000</span>
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                            <div className="flex flex-col text-sec-main gap-1.5">
                                <p className="font-normal text-base mb-[0]">Wintess Hotel and Suites</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-sec-main/50 mb-[0]">Starting from  <span className="text-sec-main font-medium">NGN 5,000</span>
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Top cities */}
                <div className="flex flex-col px-36">

                    <div className="flex flex-col w-full gap-2">
                        <p className="text-xl font-medium text-sec-main mb-[0]">Top cities</p>
                        <p className="text-sm font-medium text-sec-main/70">See the top destinations people are traveling to</p>
                        {/* <p className="text-sm font-medium text-sec-main/50">See more</p> */}
                    </div>

                    {/* <Carousel>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                    </Carousel>

                    <Carousel responsive={responsive}>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                    </Carousel> */}

                    <div
                        className="flex max-w-6xl w-full"
                    // style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
                    >
                        <Carousel
                            show={4}
                            responsive={responsive}
                        >
                            <div className="flex flex-col gap-2">

                                <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <p className="font-normal text-base mb-[0]">Hotel in Lagos</p>
                                    <p className="text-sm text-sec-main/50 mb-[0]">10,003 Hotels <span className="text-sec-main font-medium">Avg. NGN 5,000</span></p>
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <p className="font-normal text-base mb-[0]">Hotel in Lagos</p>
                                    <p className="text-sm text-sec-main/50 mb-[0]">10,003 Hotels <span className="text-sec-main font-medium">Avg. NGN 5,000</span></p>
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <p className="font-normal text-base mb-[0]">Hotel in Lagos</p>
                                    <p className="text-sm text-sec-main/50 mb-[0]">10,003 Hotels <span className="text-sec-main font-medium">Avg. NGN 5,000</span></p>
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <p className="font-normal text-base mb-[0]">Hotel in Lagos</p>
                                    <p className="text-sm text-sec-main/50 mb-[0]">10,003 Hotels <span className="text-sec-main font-medium">Avg. NGN 5,000</span></p>
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <p className="font-normal text-base mb-[0]">Hotel in Lagos</p>
                                    <p className="text-sm text-sec-main/50 mb-[0]">10,003 Hotels <span className="text-sec-main font-medium">Avg. NGN 5,000</span></p>
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <p className="font-normal text-base mb-[0]">Hotel in Lagos</p>
                                    <p className="text-sm text-sec-main/50 mb-[0]">10,003 Hotels <span className="text-sec-main font-medium">Avg. NGN 5,000</span></p>
                                </div>

                            </div>

                            <div className="flex flex-col gap-2">

                                <img src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" className="object-cover w-64 h-64 rounded-md" alt="bcloud" />

                                <div className="flex flex-col text-sec-main gap-1.5">
                                    <p className="font-normal text-base mb-[0]">Hotel in Lagos</p>
                                    <p className="text-sm text-sec-main/50 mb-[0]">10,003 Hotels <span className="text-sec-main font-medium">Avg. NGN 5,000</span></p>
                                </div>

                            </div>

                        </Carousel>
                    </div>

                    {/* <div className="flex flex-row">
                        <div className="my-10 mr-10">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px] rounded-lg" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px]" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px]" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Hotel in Lagos</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">10,003 Hotels  <span className="text-black font-medium">Avg. NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                    </div> */}

                </div>

            </div>
            <Footer />
        </div>
    );
}
