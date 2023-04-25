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
import { Calendar, People } from "iconsax-react";
import { useRouter } from "next/router";
import { post } from "../helpers/ApiRequest";
import Link from "next/link";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import PopoverDisplay from "../components/PopoverDisplay";

import RoomSearchResult from "../components/RoomSearchResult";
import { BounceLoader } from "react-spinners";
import Footer from "../components/Footer";

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
  const [hotel, setHotel] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hotelsCount, setHotelsCount] = useState(0);

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { query } = useRouter();
  console.log(query);

  const viewMenuHandler = () => {
    setOpenView(!openView);
  };

  function gotoDetails(id) {
    router.push({
      pathname: "/hotel/details",
      query: {
        hotelId: id,
        startDate: String(dateRange[0].startDate),
        endDate: String(dateRange[0].endDate),
        adults: numberOfAdults,
        children: numberOfChildren,
        rooms: numberOfRooms,
      },
    });
  }

  const datePickerHandler = () => {
    console.log(openDate);
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
      ];

      console.log(a);
      setDateRange(a);

      setLocation(query.location);
      setHotel(query.hotel);
      setNumberOfAdults(query.adults);
      setNumberOfChildren(query.children);
      setNumberOfRooms(query.rooms);

      handleSearchHotel(query);
    }
  }, [query]);

  const handleSearchHotel = async (query) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <div className="min-h-screen font-poppins bg-gray-100/50">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-5 grid-cols-1 mx-auto py-24 items-start justify-start gap-7 px-4">
          <div className="md:col-span-1 hidden">
            <form className="bg-pri-main py-4 px-3 space-y-3 rounded-md">
              <p className="text-lg font-semibold leading-5 text-sec-main">Search</p>
              <input
                placeholder="Enter a City"
                className="outline-0 p-4 pl-4 leading-5 text-base font-normal bg-white rounded-md"
                type="text"
              />

              <div
                onClick={datePickerHandler}
                className="flex bg-white md:bg-gray-100 rounded-md py-2 px-3 items-center gap-2 text-xs leading-5 cursor-pointer"
              >
                <Calendar size={22} />
                <div className="flex flex-col w-full">
                  <p className="text-xs md:text-[0.63rem] mb-[0] text-sec-main/60">Check in</p>
                  <p className="text-sm md:text-xs mb-[0] text-sec-main">
                    {dateRange &&
                      `${format(dateRange[0].startDate, "dd-MM-yyy")}`}
                  </p>
                </div>
              </div>

              <div
                onClick={datePickerHandler}
                className="flex bg-white md:bg-gray-100 rounded-md py-2 px-3 items-center gap-2 text-xs leading-5 cursor-pointer"
              >
                <Calendar size={22} />
                <div className="flex flex-col w-full">
                  <p className="text-xs md:text-[0.63rem] mb-[0] text-sec-main/60">Check out</p>
                  <p className="text-sm md:text-xs mb-[0] text-sec-main">
                    {dateRange &&
                      `${format(dateRange[0].endDate, "dd-MM-yyy")}`}
                  </p>
                </div>
              </div>
              {openDate && (
                <DateRange
                  // editableDateInputs={true}
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={['#ffcc00']}
                  className="absolute top-[90px] lg:top-[60px] lg:left-[30%]"
                />
              )}

              <div
                className="w-full flex bg-white md:bg-gray-100 rounded-md py-2 px-3 items-center gap-2 text-xs leading-5 cursor-pointer"
                onClick={handleClick}
              >

                <People size={22} />

                <div className="flex flex-col w-full">
                  <p className="text-xs md:text-[0.63rem] mb-[0] text-sec-main/60">Room</p>
                  <p className="text-sm md:text-xs mb-[0] text-sec-main">Guest</p>
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

              <button
                className="w-full p-3.5 text-sm md:text-sm rounded-md hover:bg-sec-altDark bg-sec-conBg text-white flex items-center justify-center"
              >
                Search
              </button>
              
            </form>
          </div>
          {!isLoading ? (
            <div className="col-span-4 flex-auto w-full space-y-5">
              <div className="flex items-center w-full">
                {location ? (
                  <h1 className="text-xl font-bold">
                    {hotelsCount} Hotels in {location.split(",")[0]}
                  </h1>
                ) : (
                  <h1 className="text-xl font-bold">
                    {hotelsCount} Hotel found searching for {hotel}
                  </h1>
                )}

                {/* Filter search */}
                {/* <div className="bg-white p-2 border-2 rounded-lg  justify-between space-x-3 items-center cursor-pointer relative z-10">
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
                </div> */}
              </div>
              <RoomSearchResult
                hotels={hotelResults}
                gotoDetails={gotoDetails}
                children={numberOfChildren}
                adults={numberOfAdults}
                rooms={numberOfRooms}
                dateRange={dateRange}
              />
            </div>
          ) : (
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
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}