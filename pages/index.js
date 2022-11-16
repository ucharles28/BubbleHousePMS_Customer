import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Script from 'next/script'
// import { TextField } from "@mui/material";
import { DatePicker, Space } from 'antd';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Footer from "../components/Footer";
import { useRouter } from "next/router";

const { RangePicker } = DatePicker;

export default function Home() {
    const router = useRouter()
    const inputRef = useRef(null);
    const autoCompleteRef = useRef(null);
    const [query, setQuery] = useState("");
    const [numberOfAdults, setNumberOfAdults] = useState(2);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(1);

    //Popover
    const [anchorEl, setAnchorEl] = useState(null);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const gotoLogin = () => {
        router.push('/auth/login');
    };

    const gotoSignUp = () => {
        router.push('/auth/signup');
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    const onChange = (
        value,
        dateString
    ) => {
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
        console.log('got here')
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types: ["(cities)"], componentRestrictions: { country: "ng" } }
        );
        autoCompleteRef.current.setFields(["address_components", "formatted_address"]);
        autoCompleteRef.current.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log(addressObject);
    }


    const options = {
        componentRestrictions: { country: "ng" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["(cities)"]
    };

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places`,
            () => handleScriptLoad(setQuery, inputRef)
        );
    }, []);

    return (
        <>
            <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places" />
            <div className='h-screen font-poppins'>
                <div className="w-full h-2/3 bg-[#1A1A1A8A]" >
                    <div className="flex justify-between item-center p-3">
                        <Image className="" src="/logo.png" width={100} height={100} alt="logo" />
                        {/* <h1>Logo</h1> */}
                        <div className="flex justify-start items-center">
                            <button
                                type="button"
                                onClick={gotoLogin}
                                className="text-center mx-4 justify-end font-medium flex items-center px-3 py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">Log In</button>
                            <button
                                type="button"
                                onClick={gotoSignUp}
                                className="text-center font-medium px-3 py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">Register</button>
                        </div>
                    </div>
                    <div className="mt-20 mb-16 flex flex-col justify-center items-center">
                        <p className="text-5xl leading-[56px]">Find deals from you favourite hotels in Nigeria</p>
                        <p className="text-2xl leading-[56px] item-start">Try searching for a city, A specific hotel or even a landmark!</p>
                    </div>


                    <div className="bg-white rounded-lg m-auto w-[1168px] py-4 px-3 flex justify-between items-center">
                        <input ref={inputRef}
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Enter a City"
                            className="border-0 p-2 text-md w-1/4"
                            value={query} />
                        <Space direction="horizontal" className="w-1/4" size={12}>
                            <RangePicker onChange={onChange} />

                        </Space>
                        <div className="w-1/4 p-2 flex flex-row items-center cursor-pointer justify-between" onClick={handleClick}>
                            <p className="mx-1 text-md font-medium">{numberOfAdults} adults</p>
                            <p className="mx-1 text-md font-medium">{numberOfChildren} children</p>
                            <p className="mx-1 text-md font-medium">.</p>
                            <p className="mx-1 text-md font-medium">{numberOfRooms} rooms</p>
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
                            className="text-center justify-center font-medium flex items-center px-4 py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">Search</button>
                    </div>
                </div>

                {/* Top Hotels */}
                <div className="p-20">
                    <div className="flex justify-between">
                        <p className="text-3xl font-medium">Today’s Top Hotel Deals</p>
                        <p className="text-base font-medium items-end">See more</p>
                    </div>

                    <div className="flex flex-row">
                        <div className="my-10 mr-10">
                            <div className="rounded-lg">
                                <img className="object-cover w-[255.36px] h-[256px]" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Wintess Hotel and Suites</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Starting from  <span className="text-black font-medium">NGN 5,000</span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px]" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Wintess Hotel and Suites</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Starting from  <span className="text-black font-medium">NGN 5,000</span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px]" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col gap-y-[4px] mt-1">
                                <p className="font-medium text-base leading-6">Wintess Hotel and Suites</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Starting from  <span className="text-black font-medium">NGN 5,000</span>
                                </p>
                            </div>
                        </div>
                        <div className="my-10 mr-10">
                            <div className="">
                                <img className="object-cover w-[255.36px] h-[256px]" alt="name" src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-medium text-base leading-6">Wintess Hotel and Suites</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Ifite-Awka, Anambra State.</p>
                                <p className="text-sm text-[#1A1A1AAD] leading-6">Starting from  <span className="text-black font-medium">NGN 5,000
                                </span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Top cities */}
                <div className="p-20">
                    <p className="text-3xl font-medium mb-1">Top cities</p>
                    <div className="flex justify-between">
                        <p className="text-xl font-medium">See the top destinations people are traveling to</p>
                        <p className="text-base font-medium items-end">See more</p>
                    </div>

                    <div className="flex flex-row">
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
                    </div>

                </div>

            </div>
            {/* <Footer /> */}
        </>
    );
}