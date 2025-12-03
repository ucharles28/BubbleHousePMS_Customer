import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from 'next/script';
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import HotelSearch from "../components/HotelSearch";
import { Calendar, People, ArrowRight } from 'iconsax-react';
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
import Aos from 'aos';

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
        Aos.init();
        getFeaturedHotels()
        // loadScript(
        //     `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places`,
        //     () => handleScriptLoad(setQuery, inputRef)
        // );
    }, []);

    const [visibleSlides, setVisibleSlides] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let slides = 1;
            if (width <= 768) {
                slides = 1;
            } else if (width <= 1024) {
                slides = 3.5;
            } else if (width <= 1280) {
                slides = 5;
            } else {
                slides = 6;
            }
            setVisibleSlides(slides);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className='h-screen font-poppins'>
            <Navbar />
            <div className="w-full bg-[url('https://res.cloudinary.com/drpsnmeoc/image/upload/v1680477527/hero_3x_aylkxh.png')] bg-cover bg-no-repeat bg-[bottom] py-24 relative z-50">
                <div className="flex flex-col items-center gap-12 md:pt-40 pt-24 pb-20 md:px-0 px-4" data-aos="zoom-in-up" data-aos-delay='100' >

                    <div className="flex flex-col text-white items-center text-center space-y-2">
                        <p className="md:text-4xl mb-[0] text-2xl font-medium">Find deals from you favorite hotels in Nigeria</p>
                        <p className="md:text-xl mb-[0] text-sm font-normal md:w-full w-5/6">Try searching for a city, A specific hotel or even a landmark!</p>
                    </div>

                    <HotelSearch numberOfAdults={numberOfAdults} setNumberOfAdults={setNumberOfAdults} numberOfChildren={numberOfChildren} setNumberOfChildren={setNumberOfChildren} numberOfRooms={numberOfRooms} setNumberOfRooms={setNumberOfRooms} dateRange={dateRange} setDateRange={setDateRange} />

                </div>
            </div>

            <section className="bg-gray-100 bg-opacity-75 w-full py-20 relative z-10" data-aos='zoom-in'>
                <div className="container flex flex-col justify-center items-center w-full gap-6 mx-auto md:px-6 px-4">
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-2xl md:text-3xl font-semibold text-sec-main capitalize'>
                            Why choose us
                        </h1>
                        <span className='text-sm font-normal text-center text-sec-conBg md:w-11/12'>Unlock seamless hospitality with mybcloud: Your ultimate gateway to unforgettable stays.</span>
                    </div>
                    <div className="flex items-center">
                        <div className="grid grid-cols-1 md:grid-cols-6 w-full mt-16 gap-24 items-start justify-between text-sec-conBg">

                            <div className="md:col-span-2 col-span-1 aos-init aos-animate" data-aos="fade" data-aos-delay='200'>
                                <div className="flex flex-col items-center justify-center gap-7">
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                            <g clip-path="url(#clip0_78_357)">
                                                {/* <path d="M30.8499 43.0534C30.4669 43.0541 30.1022 42.886 29.8537 42.5943L22.9349 34.4922C22.4649 33.9419 22.53 33.1152 23.0803 32.6452C23.6307 32.176 24.4574 32.241 24.9273 32.7907L31.0151 39.92L46.1354 27.6188C46.6967 27.1619 47.5219 27.2467 47.978 27.8081C48.4348 28.3694 48.35 29.1946 47.7887 29.6507L31.6751 42.7595C31.4427 42.9496 31.151 43.0534 30.8499 43.0534Z" fill="#F5C400" /> */}
                                                <path d="M30.4179 68.3437L33.9687 69.891C34.3005 70.0357 34.6784 70.0364 35.011 69.8924L39.012 68.1646C53.06 62.2647 62.1993 48.5148 62.2008 33.2783V15.3294C62.2008 14.8455 61.934 14.4004 61.5071 14.1731L35.1981 0.154245C34.8078 -0.0540638 34.34 -0.0511404 33.9526 0.161554L8.37155 14.1804C7.95201 14.4106 7.6918 14.8506 7.6918 15.3294V33.6416C7.70715 48.6946 16.6257 62.3129 30.4179 68.3437ZM10.3114 16.1049L34.5907 2.79794L59.5812 16.1144V33.2783C59.5783 47.4645 51.0668 60.2649 37.9865 65.7548L37.977 65.7592L34.4935 67.2634L31.4661 65.9426C18.6277 60.3292 10.3253 47.6538 10.3106 33.6416L10.3114 16.1049Z" fill="#f5c400" />
                                                <path d="M43.5999 58.2696L43.5911 58.2733L40.1069 59.7782L37.0794 58.4582C24.241 52.8448 15.9386 40.1694 15.924 26.1571V13.0286L10.3106 16.105V33.6417C10.3253 47.6539 18.6276 60.3293 31.4661 65.9427L34.4928 67.2627L37.977 65.7578L37.9858 65.7541C45.2364 62.7011 51.2613 57.3172 55.1066 50.4547C51.8248 53.7935 47.9137 56.4497 43.5999 58.2696Z" fill="#FFCC001A" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_78_357">
                                                    <rect width="70" height="70" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-lg font-medium text-sec-altDark">Best Price Guarantee</h4>
                                        <p className="text-sm mt-2">Discover peace of mind with our unbeatable rates for your perfect getaway.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 col-span-1 aos-init aos-animate" data-aos="fade" data-aos-delay='300'>
                                <div className="flex flex-col items-center justify-center gap-7">
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                            <path d="M38.8036 47.7687H13.2216C10.0163 47.7658 7.41815 45.1774 7.41533 41.9835V8.41117C7.41533 8.142 7.43465 7.87282 7.47237 7.60693C4.60788 8.01093 2.47742 10.4518 2.47412 13.3343V46.9076C2.47742 50.1011 5.07508 52.6885 8.27948 52.6923H40.3117L38.8036 47.7687Z" fill="#FFCC001A" />
                                            <path d="M55.563 13.3762V33.6362C54.8652 33.516 54.1595 33.4479 53.4514 33.4319V20.6406H4.28402V46.2302C4.28732 48.9675 6.51395 51.1853 9.26105 51.1895H38.7192C38.8729 51.9054 39.0818 52.6087 39.3439 53.2931H9.26105C5.34807 53.288 2.17761 50.1288 2.17242 46.2302V13.3762C2.17714 9.47662 5.34807 6.31744 9.26105 6.31274H48.4743C52.3873 6.31697 55.5587 9.47662 55.563 13.3762ZM53.4514 18.5365V13.3762C53.4485 10.6388 51.2219 8.41965 48.4743 8.41683H9.26105C6.51395 8.42012 4.28732 10.6388 4.28402 13.3762V18.5365H53.4514Z" fill="#f5c400" />
                                            <path d="M55.5629 33.636C54.8651 33.5158 54.1594 33.4477 53.4513 33.4317C53.3325 33.4279 53.2113 33.427 53.0906 33.427C52.5074 33.427 52.035 33.8977 52.035 34.4788C52.035 35.0599 52.5074 35.5311 53.0906 35.5311C53.5248 35.5311 53.9533 35.5532 54.3772 35.5954C60.6318 36.2376 65.4533 41.3783 65.6734 47.6398C65.8941 53.9013 61.4465 59.3661 55.2526 60.4442C49.0588 61.5218 43.0158 57.8835 41.0928 51.9179C40.9637 51.5163 40.8552 51.109 40.7689 50.6961H42.6792C43.0649 50.6956 43.4194 50.4866 43.6052 50.1497C43.79 49.8134 43.7763 49.4028 43.5698 49.0787L40.5186 44.3063C40.3244 44.0024 39.9887 43.8187 39.6276 43.8187C39.2669 43.8187 38.9313 44.0024 38.7375 44.3063L35.6863 49.0787C35.4789 49.4028 35.4661 49.8139 35.6514 50.1507C35.8372 50.487 36.1917 50.6961 36.5778 50.6961H38.6215C38.6512 50.861 38.6828 51.0268 38.7191 51.1893C38.8728 51.9053 39.0816 52.6085 39.3438 53.2929C41.8754 59.9251 48.8118 63.7965 55.8104 62.4844C62.808 61.1719 67.8576 55.0527 67.7968 47.9569C67.736 40.8615 62.5822 34.8288 55.5629 33.636ZM38.5018 48.592L39.629 46.8294L40.7553 48.592H38.5018Z" fill="#F5C400" />
                                            <path d="M52.3745 40.6033C51.7908 40.6033 51.3184 41.074 51.3184 41.6551V49.153C51.3184 49.7337 51.7908 50.2048 52.3745 50.2048H58.1072C58.6899 50.2048 59.1628 49.7337 59.1628 49.153C59.1628 48.5719 58.6899 48.1007 58.1072 48.1007H53.43V41.6551C53.4295 41.0744 52.9572 40.6037 52.3745 40.6033Z" fill="#f5c400" />
                                            <path d="M25.8327 10.6128H25.8242C24.1944 10.6095 22.8711 11.9239 22.8687 13.5479C22.8659 15.1724 24.185 16.4905 25.8152 16.4929H25.8242C27.4493 16.4915 28.7679 15.1817 28.7754 13.5625C28.7797 11.939 27.4629 10.6184 25.8327 10.6128ZM25.8242 14.3893H25.8223C25.3594 14.3878 24.9841 14.012 24.9855 13.5502C24.9874 13.0899 25.3622 12.7174 25.8242 12.7164H25.827C26.2905 12.7174 26.6657 13.0922 26.6648 13.5545C26.6643 14.0163 26.2876 14.3897 25.8242 14.3893Z" fill="#D4AA00" />
                                            <path d="M17.3208 10.5872H17.3114C15.6821 10.5848 14.3587 11.8992 14.3564 13.5227C14.354 15.1467 15.6731 16.4649 17.3029 16.4672H17.3114C18.9369 16.4649 20.256 15.1552 20.2631 13.5359V13.5265C20.2612 11.9067 18.9464 10.5933 17.3208 10.5872ZM17.3114 14.3636H17.3086C16.8451 14.3627 16.4703 13.9878 16.4708 13.5255C16.4713 13.0638 16.848 12.6903 17.3114 12.6908H17.3147C17.7781 12.6922 18.1529 13.068 18.1515 13.5293C18.1492 13.9901 17.7739 14.3627 17.3114 14.3636Z" fill="#D4AA00" />
                                            <path d="M8.80844 10.5598H8.79948C7.1697 10.5575 5.84683 11.8719 5.844 13.4959C5.84164 15.1194 7.16074 16.438 8.79005 16.4403H8.79948C10.4245 16.4385 11.7422 15.1288 11.7493 13.5099V13.4991C11.7484 11.8803 10.434 10.5664 8.80844 10.5598ZM8.79948 14.3363H8.79665C8.33322 14.3358 7.95795 13.9605 7.95842 13.4987C7.95937 13.0364 8.33605 12.6625 8.79948 12.6639H8.80278C9.26621 12.6644 9.64101 13.0397 9.64054 13.5015C9.63912 13.9637 9.26291 14.3377 8.79948 14.3363Z" fill="#D4AA00" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-lg font-medium text-sec-altDark">Easy & Quick Booking</h4>
                                        <p className="text-sm mt-2">Experience easy and quick booking at your fingertips.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 col-span-1 aos-init aos-animate" data-aos="fade" data-aos-delay='400'>
                                <div className="flex flex-col items-center justify-center gap-7">
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                            <g clip-path="url(#clip0_78_357)">
                                                {/* <path d="M30.8499 43.0534C30.4669 43.0541 30.1022 42.886 29.8537 42.5943L22.9349 34.4922C22.4649 33.9419 22.53 33.1152 23.0803 32.6452C23.6307 32.176 24.4574 32.241 24.9273 32.7907L31.0151 39.92L46.1354 27.6188C46.6967 27.1619 47.5219 27.2467 47.978 27.8081C48.4348 28.3694 48.35 29.1946 47.7887 29.6507L31.6751 42.7595C31.4427 42.9496 31.151 43.0534 30.8499 43.0534Z" fill="#F5C400" /> */}
                                                <path d="M30.4179 68.3437L33.9687 69.891C34.3005 70.0357 34.6784 70.0364 35.011 69.8924L39.012 68.1646C53.06 62.2647 62.1993 48.5148 62.2008 33.2783V15.3294C62.2008 14.8455 61.934 14.4004 61.5071 14.1731L35.1981 0.154245C34.8078 -0.0540638 34.34 -0.0511404 33.9526 0.161554L8.37155 14.1804C7.95201 14.4106 7.6918 14.8506 7.6918 15.3294V33.6416C7.70715 48.6946 16.6257 62.3129 30.4179 68.3437ZM10.3114 16.1049L34.5907 2.79794L59.5812 16.1144V33.2783C59.5783 47.4645 51.0668 60.2649 37.9865 65.7548L37.977 65.7592L34.4935 67.2634L31.4661 65.9426C18.6277 60.3292 10.3253 47.6538 10.3106 33.6416L10.3114 16.1049Z" fill="#f5c400" />
                                                <path d="M43.5999 58.2696L43.5911 58.2733L40.1069 59.7782L37.0794 58.4582C24.241 52.8448 15.9386 40.1694 15.924 26.1571V13.0286L10.3106 16.105V33.6417C10.3253 47.6539 18.6276 60.3293 31.4661 65.9427L34.4928 67.2627L37.977 65.7578L37.9858 65.7541C45.2364 62.7011 51.2613 57.3172 55.1066 50.4547C51.8248 53.7935 47.9137 56.4497 43.5999 58.2696Z" fill="#FFCC001A" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_78_357">
                                                    <rect width="70" height="70" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-lg font-medium text-sec-altDark">Customer Care 24/7</h4>
                                        <p className="text-sm mt-2">Relax and book with confidence, knowing our Customer Care team is here for you 24/7, ensuring your every need is met.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-20" data-aos="zoom-in-up">
                <div className="container flex flex-col justify-center items-center w-full gap-6 mx-auto md:px-8 px-4">

                    <div className="flex w-full">
                        <h1 className='text-xl md:text-2xl font-semibold text-sec-main capitalize'>
                            Today&#39;s top hotel deals
                        </h1>
                    </div>

                    <div className="flex w-full">
                        <CarouselProvider
                            naturalSlideWidth={100}
                            isIntrinsicHeight={true}
                            totalSlides={featuredHotels.length}
                            isPlaying={true}
                            visibleSlides={visibleSlides}
                            interval={6000}
                            infinite={true}
                            className="w-full flex sm:hidden md:hidden lg:hidden"
                        >
                            <Slider className='w-full'>

                                {featuredHotels.map((hotel, index) => (
                                    <Slide index={0} key={index}>
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
                                            <div className="flex flex-col gap-3 mx-1 group">
                                                <div className='flex overflow-hidden rounded-md'>
                                                    <img src={hotel.imageUrl} className="object-cover w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md group-hover:scale-110 group-hover:transition-all overflow-hidden" alt="mybcloud" />
                                                </div>

                                                <div className="flex flex-col text-sec-main gap-1">
                                                    <span className="text-sec-main font-medium text-base block truncate w-auto">{hotel.name}</span>
                                                    <span className="text-sm font-normal text-sec-conBg block truncate w-auto">{hotel.address.line}</span>
                                                    <span className="text-xs font-light text-sec-conBg block truncate w-auto">Starting from  <span className="text-sec-main font-normal">NGN {hotel.averagePrice}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Slide>
                                ))}
                            </Slider>
                        </CarouselProvider>

                        <CarouselProvider
                            naturalSlideWidth={100}
                            isIntrinsicHeight={true}
                            totalSlides={featuredHotels.length}
                            isPlaying={true}
                            visibleSlides={visibleSlides}
                            interval={6000}
                            infinite={true}
                            className="w-full hidden sm:flex md:hidden lg:hidden"
                        >
                            <Slider className='w-full'>

                                {featuredHotels.map((hotel, index) => (
                                    <Slide index={0} key={index}>
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
                                            <div className="flex flex-col gap-3 mx-1.5 group">
                                                <div className='flex overflow-hidden rounded-md'>
                                                    <img src={hotel.imageUrl} className="object-cover w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md group-hover:scale-110 group-hover:transition-all overflow-hidden" alt="mybcloud" />
                                                </div>

                                                <div className="flex flex-col text-sec-main gap-1">
                                                    <span className="text-sec-main font-medium text-base block truncate w-auto">{hotel.name}</span>
                                                    <span className="text-sm font-normal text-sec-conBg block truncate w-auto">{hotel.address.line}</span>
                                                    <span className="text-xs font-light text-sec-conBg block truncate w-auto">Starting from  <span className="text-sec-main font-normal">NGN {hotel.averagePrice}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Slide>
                                ))}
                            </Slider>
                        </CarouselProvider>

                        <CarouselProvider
                            naturalSlideWidth={100}
                            isIntrinsicHeight={true}
                            totalSlides={featuredHotels.length}
                            isPlaying={true}
                            visibleSlides={visibleSlides}
                            interval={6000}
                            infinite={true}
                            className="w-full hidden sm:hidden md:flex lg:flex"
                        >
                            <Slider className='w-full'>

                                {featuredHotels.map((hotel, index) => (
                                    <Slide index={0} key={index}>
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
                                            <div className="flex flex-col gap-3 md:mx-1.5 group">
                                                <div className='flex overflow-hidden rounded-md'>
                                                    <img src={hotel.imageUrl} className="object-cover w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md group-hover:scale-110 group-hover:transition-all overflow-hidden" alt="mybcloud" />
                                                </div>

                                                <div className="flex flex-col text-sec-main gap-1">
                                                    <span className="text-sec-main font-medium text-base block truncate w-auto">{hotel.name}</span>
                                                    <span className="text-sm font-normal text-sec-conBg block truncate w-auto">{hotel.address.line}</span>
                                                    <span className="text-xs font-light text-sec-conBg block truncate w-auto">Starting from  <span className="text-sec-main font-normal">NGN {hotel.averagePrice}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Slide>
                                ))}
                            </Slider>
                        </CarouselProvider>
                    </div>

                </div>
            </section>

            <section className="w-full py-20" data-aos="zoom-in-up">
                <div className="container flex flex-col justify-center items-center w-full gap-6 mx-auto md:px-8 px-4">

                    <div className="flex flex-col -space-y-2 w-full">
                        <h1 className='text-xl md:text-2xl font-semibold text-sec-main capitalize'>
                            top cities
                        </h1>
                        <span className="text-sm font-normal text-sec-conBg w-11/12">See the top destinations people are traveling to</span>
                    </div>

                    <div className="flex w-full">
                        <CarouselProvider
                            naturalSlideWidth={100}
                            isIntrinsicHeight={true}
                            totalSlides={6}
                            isPlaying={true}
                            visibleSlides={visibleSlides}
                            interval={6000}
                            infinite={true}
                            className="w-full flex sm:hidden md:hidden lg:hidden"
                        >
                            <Slider className='w-full'>
                                <Slide index={0}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={lagos}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">Lagos</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={1}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ibadan}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">ibadan</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={2}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={benin}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">benin</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={3}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ogun}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">ogun</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={4}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={abuja}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">abuja</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={5}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ilorin}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">ilorin</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>
                            </Slider>
                        </CarouselProvider>

                        <CarouselProvider
                            naturalSlideWidth={100}
                            isIntrinsicHeight={true}
                            totalSlides={6}
                            isPlaying={true}
                            visibleSlides={visibleSlides}
                            interval={6000}
                            infinite={true}
                            className="w-full hidden sm:flex md:hidden lg:hidden"
                        >
                            <Slider className='w-full'>
                                <Slide index={0}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={lagos}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">Lagos</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={1}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ibadan}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">ibadan</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={2}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={benin}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">benin</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={3}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ogun}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">ogun</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={4}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ogun}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">ogun</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={5}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={abuja}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">abuja</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>
                            </Slider>
                        </CarouselProvider>

                        <CarouselProvider
                            naturalSlideWidth={100}
                            isIntrinsicHeight={true}
                            totalSlides={6}
                            isPlaying={true}
                            visibleSlides={visibleSlides}
                            interval={6000}
                            infinite={true}
                            className="w-full hidden sm:hidden md:flex lg:flex"
                        >
                            <Slider className='w-full'>
                                <Slide index={0}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={lagos}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">Lagos</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={1}>
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
                                        {/* <div className="flex flex-col gap-3 w-full">
                                            <Image
                                                className="object-cover w-[140px] h-[140px] md:w-64 md:h-64 rounded-md"
                                                src={ibadan}
                                                alt="myblcoud"
                                            />
                                            <p className="text-sec-main font-medium text-sm md:text-base block truncate w-32 lg:w-56 md:w-56">Hotels in Ibadan</p>
                                        </div> */}

                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ibadan}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">Ibadan</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={2}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={benin}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">benin</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={3}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ogun}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">Ogun</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={4}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={abuja}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">Abuja</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>

                                <Slide index={5}>
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
                                        <div className="flex mx-1 group">
                                            <div className="relative rounded-md transition-all overflow-hidden">
                                                <Image
                                                    className="group-hover:scale-110 group-hover:transition-all object-cover overflow-hidden w-[353px] h-[353px] md:w-[235.6px] md:h-[235.6px] rounded-md"
                                                    src={ilorin}
                                                    alt="myblcoud"
                                                />
                                                <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000be] to-[#C4C4C400] rounded-md px-8 py-10'>
                                                    <div className="flex flex-col text-white">
                                                        <h4 className="text-xl font-medium capitalize text-white">ilorin</h4>
                                                        <span className="text-sm">1714 properties</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Slide>
                            </Slider>
                        </CarouselProvider>
                    </div>

                </div>
            </section>

            <section className='bg-[#ebfcea] w-full py-20' data-aos='zoom-in-down'>
                <div className="container flex flex-col justify-center items-center w-full gap-6 mx-auto md:px-6 px-4">
                    <div className="flex flex-col md:flex-row items-center w-full gap-20 justify-between">
                        <div className="flex flex-col gap-1">
                            <h2 className='text-xl md:text-2xl font-semibold text-sec-main capitalize'>
                                Not a Member Yet?
                            </h2>
                            <span className="text-sm font-normal text-sec-altDark">Join us today and earn points on all your bookings with us!.</span>
                        </div>
                        <div className="flex md:justify-end items-center gap-4 md:gap-6">
                            <div className="">
                                <Link 
                                href="/auth/login"
                                className="px-10 md:px-12 flex items-center py-5 border border-pri-main text-pri-adark hover:text-sec-main rounded-md font-normal leading-6 hover:bg-pri-main " 
                                    >
                                        Sign In
                                    <ArrowRight className='ml-2 w-5 h-5 -rotate-45' />
                                </Link>
                            </div>
                            <div className="">
                                <Link 
                                href="/auth/register"
                                className="px-10 md:px-12 flex items-center py-5 border border-pri-main hover:text-sec-main text-sec-main rounded-md font-normal leading-6 bg-pri-main bg-opacity-80" 
                                    >
                                        Register
                                    <ArrowRight className='ml-2 w-5 h-5 -rotate-45' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
}
