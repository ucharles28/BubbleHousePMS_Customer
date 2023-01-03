import { useEffect, useState } from "react";
import Contact from "../../components/Contact";
import Confirmbooking from "../../components/Confirmbooking";
import OtherInfo from "./Other";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { BounceLoader } from "react-spinners";
import { get } from "../../helpers/ApiRequest";
import { useUser } from '../../context/user';



function Form() {
  const router = useRouter();
  const { query } = router;

  const { user } = useUser();

  const [page, setPage] = useState(0);
  const [roomTypesInfo, setRoomTypesInfo] = useState([]);
  const [bookingInfo, setBookingInfo] = useState();
  const [hotel, setHotel] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: user ? user.email : '',
    password: "",
    confirmPassword: "",
    firstName: user ? user.fullName.split(' ')[0] : '',
    lastName: user ? user.fullName.split(' ')[1] : '',
    guestFullName: "",
    guestEmail: "",
    phone: "",
    isMainGuest: true,
  });



  useEffect(() => {
    if (Object.keys(query).length > 0) {
      getHotelById(query.hotelId)
      const total = Number(query.total)
      setBookingInfo({
        vat: 0.075 * total,
        stateTax: 0.05 * total,
        totalAmount: total,
        checkIn: new Date(query.startDate),
        checkOut: new Date(query.endDate),
        adults: query.adults,
        children: query.children,
        rooms: query.rooms,
        roomTypesInfo: JSON.parse(query.roomTypesInfo)
      })

      if (user) {
        setFormData({ ...formData, firstName: user.fullName.split(' ')[0], lastName: user.fullName.split(' ')[1], email: user.email })
      }
    }
  }, [query])

  const getHotelById = async (id) => {
    setIsLoading(true)
    const response = await get(`Hotel/${id}`)

    if (response.successful) {
      setHotel(response.data)
    }

    setIsLoading(false)
  }

  const PageDisplay = () => {
    if (page === 0) {
      return <Contact formData={formData} setFormData={setFormData} bookingInfo={bookingInfo} hotel={hotel} setPage={setPage} />;
    } else if (page === 1) {
      return <Confirmbooking formData={formData} setFormData={setFormData} bookingInfo={bookingInfo} hotel={hotel} setPage={setPage} user={user}/>;
    }
    // else {
    //   return <OtherInfo formData={formData} setFormData={setFormData} />;
    // }
  };

  return (
    <div className="h-[screen] font-poppins">

      {!isLoading ? PageDisplay() : <div className="w-full">
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
  );
}

export default Form;