import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { DatePicker, Space } from 'antd'
import { People } from "iconsax-react";
import { useRouter } from 'next/router';
import { post } from "../helpers/ApiRequest";


export default function Home() {
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [numberOfAdults, setNumberOfAdults] = useState(0);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [hotelResults, setHotelResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { query } = useRouter();

    useEffect(() => {
        if (query.location) {
            setLocation(query.location)
            setStartDate(Date(query.startDate))
            setEndDate(new Date(query.endDate))
            setNumberOfAdults(query.adults)
            setNumberOfChildren(query.children)
            setNumberOfRooms(query.rooms)

            handleSearchHotel(query)

        }
    }, [query])

    const handleSearchHotel = async (query) => {
        const request = {
            location: query.location,
            checkInDate: new Date(query.startDate),
            checkOutDate: new Date(query.endDate),
            numberOfAdults: query.adults,
            numberOfChildren: query.children,
            numberOfRooms: query.rooms,
        }

        const response = await post('Hotel/Search', request)
        if (response.successful) {
            console.log(response.data)
            setHotelResults(response.data)
        } else {

        }
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const onChange = (e) => {
        console.log(e);
    };

    return (
        <div className="w-full bg-white font-poppins">
            <Navbar />
            <div className="py-20 px-16 w-full">
                {/* <nav class="bg-grey-light mt-10 rounded-md w-full">
                    <ol class="list-reset flex">
                        <li><a href="#" class="text-blue-600 hover:text-blue-700">Home</a></li>
                        <li><span class="text-gray-500 mx-2"></span></li>
                        <li><a href="#" class="text-blue-600 hover:text-blue-700">Library</a></li>
                        <li><span class="text-gray-500 mx-2"></span></li>
                        <li class="text-gray-500">Data</li>
                    </ol>
                </nav> */}

                <div className="flex w-full gap-6 mt-8 justify-center items-top">
                    {/* Search area */}
                    <div className="bg-[#FFCC00] p-4 mt-20 flex flex-col gap-y-3">
                        <p className="text-black text-2xl leading-8 font-medium">Search</p>
                        <input type="text" className="w-full rounded-md focus:outline-none p-3 text-base"
                            value={location} onChange={(e) => setLocation(e.target.value)} />
                        <DatePicker 
                        // value={startDate} 
                        onChange={onChange} className="rounded-md" size='large' />
                        <DatePicker 
                        // value={endDate} 
                        onChange={onChange} className="rounded-md" size='large' />
                        <div className="flex gap-2 bg-white p-2 rounded-md items-center">
                            <People size={24} />
                            <div className="flex flex-col gap-0">
                                <p className="text-xs">{numberOfRooms} room</p>
                                <p className="text-xs">{numberOfAdults} adults, {numberOfChildren} childern</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <p className="text-2xl font-medium mt-3 align-center">{hotelResults.length} {hotelResults.length === 1 ? 'Hotel': 'Hotels'} in {location.split(',')[0]}</p>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Top Reviewed</MenuItem>
                                    {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </div>


                        {hotelResults.map((hotel) => (<div className="flex mt-5 rounded-md gap-5 border w-full border-gray-300 p-4">
                            <div className={`border rounded-md bg-cover w-[197px] h-[211px] bg-[url('${hotel.imaageUrl}')]`}>
                            </div>
                            <div>
                                <div className="flex gap-28">
                                    <div>
                                        <div>
                                            <p className="text-xl leading-8">Raddison Blue</p>
                                            <p className="text-xs leading-3 text-[#1A1A1A]">{hotel.address.line} <span className="text-gray-400">15.7 km from center</span></p>
                                        </div>

                                        <div className="mt-8 mb-10">
                                            <p className="uppercase leading-6 text-xs font-medium">{hotel.roomTypes[0].name}</p>
                                            <p className="text-gray-400 leading-6 text-xs">1 bed (1 queen)</p>
                                        </div>


                                        <div className="grid grid-cols-3 gap-2">
                                            
                                            {hotel.roomTypes[0].roomAmenities.map((roomAmenity) => (<p className="leading-3 text-xs font-medium">{roomAmenity.amenity.title}</p>))}
                                            {/* <p className="leading-3 text-xs font-medium">Free WiFi</p>
                                            <p className="leading-3 text-xs font-medium">Air conditioning</p>
                                            <p className="leading-3 text-xs font-medium">Pool</p>
                                            <p className="leading-3 text-xs font-medium">Restaurant</p>
                                            <p className="leading-3 text-xs font-medium">Internet</p> */}
                                        </div>
                                    </div>
                                    <div className="justify-end">
                                        <p className="leading-3 text-xs font-medium text-gray-400 justify-end">Includes taxes and fees</p>
                                        <p className="leading-8 text-xl font-medium justify-end mt-2">NGN {hotel.roomTypes[0].price}</p>
                                        <p className="leading-5 text-xs text-gray-500">2 nights, {numberOfAdults} adults</p>
                                        <button
                                            type="button"
                                            className="mt-24 w-full text-center justify-center font-medium flex items-center py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>

            </div>
        </div>
    )
}