import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import Popover from "@mui/material/Popover";
import { DatePicker, Space } from "antd";
import { People } from "iconsax-react";

const HotelSearch = () => {
  const router = useRouter();
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
  const id = open ? "simple-popover" : undefined;

  const onChange = (value, dateString) => {
    setDateRange(value);
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
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

  const { RangePicker } = DatePicker;

  return (
    <>
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places" />
      <div className="bg-white text-black rounded-lg flex justify-between items-center py-[2px] px-5">
        <input
          ref={inputRef}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a City"
          className="border-1 text-md p-2 bg-[#E0E0E0] rounded-md outline-0 w-1/3"
          value={query}
        />

        <Space
          direction="horizontal"
          className="max-w-[1/2] mx-auto "
          size={12}
        >
          <RangePicker onChange={onChange} />
        </Space>

        <div
          className="flex gap-2 cursor-pointer p-2 rounded-md items-center"
          onClick={handleClick}
        >
          <div className="flex gap-0 bg-[#E0E0E0] items-center space-x-3 py-[3.5px] px-5 justify-between rounded-md mr-2">
            <People size={20} className="mr-3" />
            <div className="flex-col text-[gray]">
              <p className="text-xs font-semibold">Rooms</p>
              <p className="text-xs font-semibold text-black">Guests</p>
            </div>
          </div>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            width: 320,
          }}
        >
          <div className="flex justify-between items-center gap-11 py-[15px] px-[16px]">
            <p className="text-base text-black ">Adult</p>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setNumberOfAdults(numberOfAdults - 1)}
                disabled={numberOfAdults < 2}
                className="text-center flex justify-center items-center border border-black rounded-full px-3"
              >
                <span className="font-medium text-xl mb-1">-</span>
              </button>

              <p className="text-lg mx-2">{numberOfAdults}</p>
              <button
                onClick={() => setNumberOfAdults(numberOfAdults + 1)}
                className="text-center flex justify-center items-center border border-black rounded-full px-2"
              >
                <span className="font-medium text-xl mb-1">+</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
            <p className="text-base ">Children</p>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setNumberOfChildren(numberOfChildren - 1)}
                disabled={numberOfChildren < 1}
                className="text-center flex justify-center items-center border border-black rounded-full px-3"
              >
                <span className="font-medium text-xl mb-1">-</span>
              </button>

              <p className="text-lg mx-2">{numberOfChildren}</p>
              <button
                onClick={() => setNumberOfChildren(numberOfChildren + 1)}
                className="text-center flex justify-center items-center border border-black rounded-full px-2"
              >
                <span className="font-medium text-xl mb-1">+</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
            <p className="text-base ">Rooms</p>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setNumberOfRooms(numberOfRooms - 1)}
                disabled={numberOfRooms < 2}
                className="text-center flex justify-center items-center border border-black rounded-full px-3"
              >
                <span className="font-medium text-xl mb-1">-</span>
              </button>

              <p className="text-lg mx-2">{numberOfRooms}</p>
              <button
                onClick={() => setNumberOfRooms(numberOfRooms + 1)}
                className="text-center flex justify-center items-center border border-black rounded-full px-2"
              >
                <span className="font-medium text-xl mb-1">+</span>
              </button>
            </div>
          </div>
        </Popover>
        <button
          type="button"
          onClick={handleSearch}
          className="border py-2 px-7 bg-[#404040;] text-white rounded-md"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default HotelSearch;
