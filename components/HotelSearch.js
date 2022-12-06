import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { BsCalendar } from "react-icons/bs";
import Script from "next/script";
import { useRouter } from "next/router";

// import { DatePicker, Space } from "antd";
import { People } from "iconsax-react";
import PopoverDisplay from "./PopoverDisplay";

const HotelSearch = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const [query, setQuery] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState(2);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

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

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
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
    autoCompleteRef.current.setFields([
      "address_components",
      "formatted_address",
      "geometry",
    ]);
    autoCompleteRef.current.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoCompleteRef.current.getPlace();
    console.log(addressObject);
    console.log(addressObject.geometry.location.lat());
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
  }

  const options = {
    componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["(cities)"],
  };

  const handleSearch = () => {
    router.push({
      pathname: "/searchresult",
      query: {
        location: query,
        startDate: String(dateRange[0]),
        endDate: String(dateRange[1]),
        adults: numberOfAdults,
        children: numberOfChildren,
        rooms: numberOfRooms,
      },
    });
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

      <form className="lg:bg-white bg-transparent text-black rounded-lg  items-center py-[2px] lg:py-0 lg:px-5 lg:mx-auto grid lg:flex mx-2 relative">
        <div className="text-start lg:grow">
          <input
            ref={inputRef}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter a City"
            className="border-1 text-md p-2 bg-[#E0E0E0] rounded-md outline-0 w-full text-base font-bold"
            value={query}
          />
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
          onClick={handleSearch}
          className="w-full lg:w-fit py-3 lg:py-2 px-7 bg-[#404040;] text-white rounded-md mt-2 text-base lg:grow lg:mb-2"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default HotelSearch;
