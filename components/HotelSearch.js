import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { BsCalendar } from "react-icons/bs";
import Script from "next/script";
import { useRouter } from "next/router";
import { get } from "../helpers/ApiRequest";
import data from "../pages/api/HotelSerMockData/MOCK_DATA.json";
import styles from "../styles/HotelSearch.module.css";
var axios = require('axios');

// import { DatePicker, Space } from "antd";
import { People } from "iconsax-react";
import PopoverDisplay from "./PopoverDisplay";
import { style } from "@mui/system";

const dommyData = data;

const HotelSearch = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const [query, setQuery] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState(2);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  // State to search
  const [value, setValue] = useState("");

  const onChange = async (event) => {
    const query = event.target.value;
    setValue(query);

    var config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&language=fr&key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places',
      headers: {}
    };
    const responses = await Promise.all([
      axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        }),
      get(`Hotel/Query/${query}`)
    ]
    );

    if (responses[0]) {
      console.log(responses[0].data)
    }

    if (responses[1].successful) {
      console.log(responses[1].data)
    }
  };

  const onSearch = async (searchTerm) => {
    setValue(searchTerm);


  };

  // State for displaying date library
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);

  const datePickerHandler = () => {
    setOpenDate(!openDate);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // useEffect(() => {

  // })

  return (
    <>
      <section className="relative">
        <form className="lg:bg-white bg-transparent text-black rounded-lg  items-center py-[2px] lg:py-0 lg:px-5 lg:mx-auto grid lg:flex mx-2 relative">
          <div className="text-start lg:grow relative ">
            <input
              ref={inputRef}
              // onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter a City"
              className="border-1 text-md p-2 bg-[#E0E0E0] rounded-md outline-0 w-full text-[13.5px] font-bold"
              type="text"
              value={value}
              onChange={onChange}
            />
            {/* <div className={styles.dropdown}>
              {dommyData
                .filter((item) => {
                  const searchTerm = value?.toLowerCase();
                  const fullName = item.full_name?.toLowerCase();

                  return (
                    searchTerm &&
                    fullName?.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  );
                })
                .slice(0, 9)
                .map((item) => (
                  <div className={styles.dropdownRow}>
                    <ul
                      onClick={() => onSearch(item.full_name)}
                      key={item.full_name}
                    >
                      <li>{item.full_name}</li>
                    </ul>
                  </div>
                ))}
            </div> */}
          </div>
          <div className="lg:grow lg:ml-3 cursor-pointer">
            <div className="grid lg:flex  items-start lg:items-center space-y-3 lg:space-y-0 my-3 lg:my-0">
              <div
                className="w-full flex items-center justify-start bg-[#E0E0E0]  py-[.5px] gap-2 px-5 rounded-md"
                onClick={datePickerHandler}
              >
                <BsCalendar size={19} />

                <div className="relative">
                  <small className="text-[11px] font-bold text-[gray]">
                    Check In / Check out
                  </small>
                  <h6 className="text-[13px] font-extrabold">
                    {`${format(dateRange[0].startDate, "dd-MM-yyy")} - ${format(
                      dateRange[0].endDate,
                      "dd-MM-yyy"
                    )}`}
                  </h6>
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
            </div>
          </div>

          <div
            className="flex gap-2 cursor-pointer lg:p-2 rounded-md items-center lg:grow"
            onClick={handleClick}
          >
            <div className="w-full flex gap-0 bg-[#E0E0E0] items-center space-x-3 py-[4.5px] lg:justify-center justify-start rounded-md pl-5 lg:pl-0 lg:grow">
              <People size={20} className="lg:mr-1" />
              <div className="flex-col text-[gray]">
                <p className="text-[10px] font-extrabold">Rooms</p>
                <p className="text-[12px] font-extrabold text-black">Guests</p>
              </div>
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
          />
          <button
            type="button"
            // onClick={handleSearch}
            className="w-full lg:w-fit py-3 lg:py-2 px-7 bg-[#404040;] text-white rounded-md mt-2 text-base lg:grow lg:mb-2"
          >
            Search
          </button>
        </form>
        <div className={styles.dropdown}>
          {dommyData
            .filter((item) => {
              const searchTerm = value?.toLowerCase();
              const fullName = item.full_name?.toLowerCase();

              return (
                searchTerm &&
                fullName?.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 9)
            .map((item) => (
              <div className={styles.dropdownRow}>
                <ul
                  onClick={() => onSearch(item.full_name)}
                  key={item.full_name}
                >
                  <li>{item.full_name}</li>
                </ul>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default HotelSearch;
