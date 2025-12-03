import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { BsCalendar } from "react-icons/bs";
import Script from "next/script";
import { useRouter } from "next/router";
import { get } from "../helpers/ApiRequest";
import data from "../pages/api/HotelSerMockData/MOCK_DATA.json";
import styles from "../styles/HotelSearch.module.css";
import { People, Calendar } from "iconsax-react";
import PopoverDisplay from "./PopoverDisplay";
import { style } from "@mui/system";
import { Puff } from "react-loader-spinner";
import { BounceLoader } from "react-spinners";
import { SentimentVeryDissatisfiedOutlined } from "@mui/icons-material";

const dommyData = data;

const HotelSearch = ({ numberOfAdults, setNumberOfAdults, numberOfChildren, setNumberOfChildren, numberOfRooms, setNumberOfRooms, dateRange, setDateRange }) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState();
  const [selectedHotel, setSelectedHotel] = useState();

  // State to search
  const [value, setValue] = useState("");

  const onChange = async (event) => {
    const query = event.target.value;
    setValue(query);

    // Only search if query has at least 2 characters
    if (query.length < 2) {
      setPlaces([]);
      setHotels([]);
      setSearchIsLoading(false);
      return;
    }

    setSearchIsLoading(true);

    try {
      const responses = await Promise.all([
        getPlacesPredition(query),
        get(`Hotel/Query/${query}`),
      ]);

      if (responses[1] && responses[1].successful) {
        setHotels(responses[1].data);
        console.log(responses[1].data);
      }
    } catch (error) {
      console.error('Search error:', error);
    }

    setSearchIsLoading(false);
  };

  const onSelectHotel = async (hotel) => {
    setValue(hotel.name);
    setHotels([]);
    setPlaces([]);
    setSelectedHotel(hotel);
    setSelectedPlace(null);
  };

  const onSelectPlace = async (place) => {
    setValue(place.description);
    setSelectedPlace(place);
    setSelectedHotel(null);
    setHotels([]);
    setPlaces([]);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBw8ucsDTRTHVwWrhqoc14KFqQNsaQJ6RM&libraries=places`,
      () => handleScriptLoad()
    );
  }, []);

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

  function getPlacesPredition(query) {
    let result = [];

    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
      console.error('Google Maps API not loaded yet');
      return result;
    }

    try {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: query,
          types: ["(cities)"],
          componentRestrictions: {
            country: "ng",
          },
        },
        (suggestions, status) => {
          console.log('Predictions:', suggestions, 'Status:', status);
          if (status === google.maps.places.PlacesServiceStatus.OK && suggestions) {
            setPlaces(suggestions);
          } else {
            console.error('Places API error:', status);
            setPlaces([]);
          }
        }
      );
    } catch (error) {
      console.error('Error getting place predictions:', error);
    }

    return result;
  }

  function handleScriptLoad() {
    console.log("loaded");
  }

  function handleSearch() {
    if (!value) {
      return;
    }

    router.push({
      pathname: "/search",
      query: {
        hotel: selectedHotel ? selectedHotel.name : "",
        location: selectedPlace ? selectedPlace.description : "",
        startDate: String(dateRange[0].startDate),
        endDate: String(dateRange[0].endDate),
        adults: numberOfAdults,
        children: numberOfChildren,
        rooms: numberOfRooms,
      },
    });
  }



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
    <div className="relative md:w-3/4 w-full">

      <div className="flex md:flex-row flex-col items-center justify-between md:bg-white gap-2 p-3 md:p-4 rounded-md">

        <input
          ref={inputRef}
          // onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a City"
          className="outline-0 w-full p-4 pl-4 leading-5 md:text-xs text-sm font-normal bg-white md:bg-gray-100 active:bg-gray-200/50 rounded-md"
          type="text"
          value={value}
          onChange={onChange}
        />

        <div className='relative w-full'>
          <div
            className="flex bg-white md:bg-gray-100 rounded-md py-2 px-4 items-center gap-2 text-xs leading-5 cursor-pointer"
            onClick={datePickerHandler}
          >

            <Calendar size={22} />

            <div className="flex flex-col w-full">
              <p className="text-xs md:text-[0.63rem] mb-[0] text-sec-main/60">Check in/out</p>
              <p className="text-sm md:text-xs mb-[0] text-sec-main">
                {`${format(dateRange[0].startDate, "dd-MM-yyy")} - ${format(
                  dateRange[0].endDate,
                  "dd-MM-yyy"
                )}`}
                {/* {dateRange &&
                  `${format(dateRange[0].startDate, "dd-MM-yyy")}`} */}
              </p>
            </div>
          </div>
          {openDate && (
            <div className='absolute md:top-[100%] top-[100%] left-0 md:left-0 bg-white rounded-lg shadow-lg' style={{ zIndex: 999999 }}>
              <DateRange
                onChange={(item) => setDateRange([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={dateRange}
                // direction="horizontal"
                rangeColors={['#ffcc00']}
              />
              <div className="flex justify-end p-3 border-t">
                <button
                  onClick={datePickerHandler}
                  className="px-6 py-2 bg-[#ffcc00] hover:bg-[#f5c400] text-sec-main font-medium rounded-md text-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* <div
          className="w-full flex bg-white md:bg-gray-100 rounded-md py-2 px-4 items-center gap-2 text-xs leading-5 cursor-pointer"
          onClick={datePickerHandler}
        >

          <Calendar size={22} />

          <div className="flex flex-col w-full">
            <p className="text-xs md:text-[0.63rem] mb-[0] text-sec-main/60">Check out</p>
            <p className="text-sm md:text-xs mb-[0] text-sec-main">
              {dateRange &&
                `${format(dateRange[0].endDate, "dd-MM-yyy")}`}
            </p>
          </div>

        </div> */}

        <div
          className="w-full flex bg-white md:bg-gray-100 rounded-md py-2 px-4 items-center gap-2 text-xs leading-5 cursor-pointer"
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
          // type='submit'
          className="md:w-1/2 w-full p-4 text-sm md:text-xs rounded-md hover:bg-sec-altDark bg-sec-conBg text-white flex items-center justify-center"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      {(searchIsLoading || (places && places.length > 0) || (hotels && hotels.length > 0)) && (
          <div className={styles.dropdown}>
            {searchIsLoading && (
              <div className="flex flex-col items-end m-0 p-0 justify-start">
                <BounceLoader
                  heigth={20}
                  width={20}
                  color="#FFCC00"
                  ariaLabel="loading-indicator"
                />
              </div>
            )}
            {!searchIsLoading && places && places.length > 0 && (
              <div className={styles.dropdownRowTitle}>
                <ul key={"location"}>
                  <li>Locations</li>
                </ul>
              </div>
            )}
            {!searchIsLoading && places &&
              places.map((item, index) => (
                <div className={styles.dropdownRow} key={index}>
                  <ul onClick={() => onSelectPlace(item)}>
                    <li>{item.description}</li>
                  </ul>
                </div>
              ))}
            {!searchIsLoading && hotels && hotels.length > 0 && (
              <div className={styles.dropdownRowTitle}>
                <ul key={"hotels"}>
                  <li>Hotels</li>
                </ul>
              </div>
            )}
            {!searchIsLoading && hotels &&
              hotels.map((item, index) => (
                <div className={styles.dropdownRow} key={index}>
                  <ul onClick={() => onSelectHotel(item)}>
                    <li>{item.name}</li>
                  </ul>
                </div>
              ))}
          </div>
        )}

    </div>
  );
};

export default HotelSearch;
