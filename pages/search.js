import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { BsCalendar } from "react-icons/bs";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { DatePicker, Space } from "antd";
import { People } from "iconsax-react";
import { useRouter } from "next/router";
import { post } from "../helpers/ApiRequest";
import Link from "next/link";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import PopoverDisplay from "../components/PopoverDisplay";



import RoomSearchResult from "../components/RoomSearchResult";
import { BounceLoader } from "react-spinners";

export default function Home() {
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [hotelResults, setHotelResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [dateRange, setDateRange] = useState();
  const [hotel, setHotel] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hotelsCount, setHotelsCount] = useState(0);

  const router = useRouter();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { query } = useRouter();
  console.log(query)


  
  

  const viewMenuHandler = () => {
    setOpenView(!openView);
  };

  function gotoDetails(id) {
    router.push({
      pathname: '/hotel/details',
      query: {
        hotelId: id,
        startDate: String(dateRange[0].startDate),
        endDate: String(dateRange[0].endDate),
        adults: numberOfAdults,
        children: numberOfChildren,
        rooms: numberOfRooms,
      }
    })
  }

  const datePickerHandler = () => {
    console.log(openDate)
    setOpenDate(!openDate);
  };

  useEffect(() => {
    if (query) {
      const a = [
        {
          startDate: new Date(query.startDate),
          endDate: new Date(query.endDate),
          key: "selection",
        },
      ]

      console.log(a)
      setDateRange(a)

      setLocation(query.location);
      setHotel(query.hotel);
      setNumberOfAdults(query.adults);
      setNumberOfChildren(query.children);
      setNumberOfRooms(query.rooms);

      handleSearchHotel(query);
    }
  }, [query]);

  const handleSearchHotel = async (query) => {
    setIsLoading(true)
    const request = {
      location: query.location,
      hotelName: query.hotel,
      checkInDate: new Date(query.startDate),
      checkOutDate: new Date(query.endDate),
      numberOfAdults: query.adults,
      numberOfChildren: query.children,
      numberOfRooms: query.rooms,
    };

    const response = await post("Hotel/Search", request);
    if (response.successful) {
      console.log(response.data);
      setHotelResults(response.data);
      setHotelsCount(response.data.length);
    } else {
    }
    setIsLoading(false)

  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <section className="font-poppins">
      <div className="relative">
        <Navbar />
      </div>
      <div className="absolute top-20 w-full">
        <div className="max-w-[95%] md:max-w-[85%] mx-auto flex gap-5">
          <div className="flex-1 max-w-[250px] hidden md:block">
            <form className=" bg-[#FFCC00] p-3 space-y-3 rounded-lg sticky top-20">
              <h1 className="font-bold ">Search</h1>
              <div className="w-full bg-white rounded-md mb-2 cursor-pointer">
                <div className="flex items-center">
                  <LocationOnIcon style={{ fontSize: "20px" }} />
                  <input
                    type="text"
                    placeholder="Lagos"
                    className="m-2 outline-none text-base"
                  />
                </div>
              </div>
              <div onClick={datePickerHandler} className="w-full bg-white rounded-md mb-2 cursor-pointer">
                <div className="flex items-center space-x-2 p-[2.5px]">
                  <BsCalendar className="text-[16px] ml-1" />
                  <span>
                    <small className="text-[10px] opacity-30 font-bold">
                      Check-In Date
                    </small>
                    <p className="text-[11px] font-extrabold">{dateRange && `${format(dateRange[0].startDate, "dd-MM-yyy")}`}</p>
                  </span>
                </div>
              </div>
              <div onClick={datePickerHandler} className="w-full bg-white rounded-md mb-2 cursor-pointer">
                <div className="flex items-center space-x-2 p-[2.5px]">
                  <BsCalendar className="text-[16px] ml-1" />
                  <span>
                    <small className="text-[10px] opacity-30 font-bold">
                      Check-Out Date
                    </small>
                    <p className="text-[11px] font-extrabold">{dateRange && `${format(dateRange[0].endDate, "dd-MM-yyy")}`}</p>
                  </span>
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
              <div className="w-full bg-white rounded-md mb-2 cursor-pointer" onClick={handleClick}>
                <div className="flex items-center space-x-2 p-[2.5px]">
                  <People className=" ml-1" size={20} />
                  <span>
                    <small className="text-[10px] opacity-30 font-bold">
                      Rooms
                    </small>
                    <p className="text-[12px] font-extrabold">Guests</p>
                  </span>
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
              <div className="w-full bg-[#404040] rounded-md cursor-pointer">
                <button className="text-center w-full p-2 text-white">
                  Search
                </button>
              </div>
            </form>
          </div>
          {!isLoading ? <div className=" flex-auto w-64">
            <div className="flex justify-between items-center">
              {location ? 
              <h1 className="text-xl font-bold">{hotelsCount} Hotels in {location.split(',')[0]}</h1>
              : <h1 className="text-xl font-bold">{hotelsCount} Hotel found searching for {hotel}</h1>}
              <div className="bg-white p-2 border-2 rounded-lg  flex justify-between space-x-3 items-center cursor-pointer relative z-10">
                <span onClick={viewMenuHandler}>
                  <small className="opacity-50 text-[11px]">Sort by </small>:
                  <strong className="text-[12px]">Top Viewed</strong>
                </span>
                <KeyboardArrowDownIcon className="text-[14px]" />
                {openView && (
                  <div className="bg-white absolute top-10 border-2 rounded-md px-5 py-2 cursor-pointer">
                    <p className="border-b w-full">Top Viewed</p>
                    <p>Top Viewed</p>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <RoomSearchResult hotels={hotelResults} gotoDetails={gotoDetails} />
            </div>
          </div> :
          <div className="w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="lg:w-2/5 md:w-1/2 pt-10 pl-4 pr-4 justify-center lg:my-16 sm:my-5">
              <div className="m-12 pt-14 flex flex-col items-center justify-center">
                <BounceLoader
                  heigth={200}
                  width={200}
                  color="#FFCC00"
                  ariaLabel="loading-indicator"
                />
              </div>
            </div>
          </div>
          </div>}

        </div>
      </div>
    </section>
  );

  {
    /* <div className="flex w-full gap-6 mt-8 justify-between items-top">
          Search area
          <div className="bg-[#FFCC00] p-4 mt-20 flex flex-col gap-y-3 justify-start">
            <p className="text-black text-2xl leading-8 font-medium">Search</p>
            <input
              type="text"
              className="w-full rounded-md focus:outline-none p-3 text-base"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <DatePicker
              value={startDate}
              onChange={onChange}
              className="rounded-md"
              size="large"
            />
            <DatePicker
              value={endDate}
              onChange={onChange}
              className="rounded-md"
              size="large"
            />
            <div className="flex gap-2 bg-white p-2 rounded-md items-center">
              <People size={24} />
              <div className="flex flex-col gap-0">
                <p className="text-xs">{numberOfRooms} room</p>
                <p className="text-xs">
                  {numberOfAdults} adults, {numberOfChildren} childern
                </p>
              </div>
            </div>
          </div>

          Search result
          <div className="justify-end">
            <div className="flex justify-between">
              <p className="text-2xl font-medium mt-3 align-center">
                {hotelResults.length}{" "}
                {hotelResults.length === 1 ? "Hotel" : "Hotels"} in{" "}
                {location.split(",")[0]}
              </p>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Sort By
                </InputLabel>
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
                </Select>
              </FormControl>
            </div>

            {hotelResults.map((hotel) => (
              <div className="flex mt-5 rounded-md gap-5 border w-full border-gray-300 p-4">
                <div
                  className={`border rounded-md bg-cover w-[197px] h-[211px] `}
                ></div>
                <div>
                  <div className="flex gap-28">
                    <div>
                      <div>
                        <p className="text-xl leading-8">Raddison Blue</p>
                        <p className="text-xs leading-3 text-[#1A1A1A]">
                          {hotel.address.line}{" "}
                          <span className="text-gray-400">
                            15.7 km from center
                          </span>
                        </p>
                      </div>

                      <div className="mt-8 mb-10">
                        <p className="uppercase leading-6 text-xs font-medium">
                          {hotel.roomTypes[0].name}
                        </p>
                        <p className="text-gray-400 leading-6 text-xs">
                          1 bed (1 queen)
                        </p>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {hotel.roomTypes[0].roomAmenities.map((roomAmenity) => (
                          <p className="leading-3 text-xs font-medium">
                            {roomAmenity.amenity.title}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="justify-end">
                      <p className="leading-3 text-xs font-medium text-gray-400 justify-end">
                        Includes taxes and fees
                      </p>
                      <p className="leading-8 text-xl font-medium justify-end mt-2">
                        NGN {Number(hotel.roomTypes[0].price).toLocaleString()}
                      </p>
                      <p className="leading-5 text-xs text-gray-500">
                        2 nights, {numberOfAdults} adults
                      </p>
                      <button
                        type="button"
                        className="mt-24 w-full text-center justify-center font-medium flex items-center py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]"
                      >
                        <Link href={"/hotel/details"}>Book Now</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */
  }
}
