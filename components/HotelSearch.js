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
import { People } from "iconsax-react";
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
    setSearchIsLoading(true);
    const query = event.target.value;
    setValue(query);

    const responses = await Promise.all([
      getPlacesPredition(query),
      get(`Hotel/Query/${query}`),
    ]);

    if (responses[1].successful) {
      setHotels(responses[1].data);
      console.log(responses[1].data);
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
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places`,
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
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: query,
        types: ["(cities)"],
        componentRestrictions: {
          country: "ng",
        },
      },
      (suggestions) => {
        console.log(suggestions);
        setPlaces(suggestions);
      }
    );
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
    <>
      <section className="relative">
        <form className="lg:bg-white bg-transparent text-black rounded-lg  items-center py-[2px] lg:py-0 lg:px-5 lg:mx-auto grid lg:flex mx-2 relative">
          <div className="text-start lg:grow">
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
            numberOfRooms={numberOfRooms}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="w-full lg:w-fit py-3 lg:py-2 px-7 bg-[#404040;] text-white rounded-md mt-2 text-base lg:grow lg:mb-2"
          >
            Search
          </button>
        </form>
        {searchIsLoading ||
          (places.length > 0 && (
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
              {!searchIsLoading && places.length > 0 && (
                <div className={styles.dropdownRowTitle}>
                  <ul key={"location"}>
                    <li>Locations</li>
                  </ul>
                </div>
              )}
              {!searchIsLoading &&
                places.map((item, index) => (
                  <div className={styles.dropdownRow}>
                    <ul onClick={() => onSelectPlace(item)} key={index}>
                      <li>{item.description}</li>
                    </ul>
                  </div>
                ))}
              {!searchIsLoading && hotels.length > 0 && (
                <div className={styles.dropdownRowTitle}>
                  <ul key={"hotels"}>
                    <li>Hotels</li>
                  </ul>
                </div>
              )}
              {!searchIsLoading &&
                hotels.map((item, index) => (
                  <div className={styles.dropdownRow}>
                    <ul onClick={() => onSelectHotel(item)} key={index}>
                      <li>{item.name}</li>
                    </ul>
                  </div>
                ))}
            </div>
          ))}
      </section>
    </>
  );
};

export default HotelSearch;
