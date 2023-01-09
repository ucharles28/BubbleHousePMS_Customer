import { Profile, Notification, ShieldSecurity } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useUser } from '../../context/user';
import { get } from "../../helpers/ApiRequest";
import { format } from "date-fns";


export default function BookingHistory() {
    const { user } = useUser();

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [bookingsCount, setBookingsCount] = useState(0)

    const getBookings = async () => {
        if (user) {
            setIsLoading(true)
            const response = await get(`Booking/Customer/${user.id}`)

            if (response.successful) {
                setBookings(response.data)
                setBookingsCount(response.data.length)
            }
            setIsLoading(false)
        }
    }

    const getStatusBg = (status) => {
        let bgText = ''
        switch (status) {
            case 0:
                bgText = '#1A1A1A61'
                break;
            case 1:
                bgText = '#56CA00'
                break;
            case 3:
                bgText = '#1A1A1A61'
                break;
        }
        return bgText;
    }



    useEffect(() => {
        getBookings()
    }, [user])

    return (
        <div className="h-screen font-poppins">
            <Navbar />

            {!isLoading ? <div className="bg-[#F8F8F8] w-full h-auto lg:px-24 px-4 py-10 pb-32">
                <div className="flex flex-col gap-6 justify-center w-full pt-12 pb-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-xl text-sec-main font-medium">
                            Booking History
                        </p>
                        <p className="text-sm text-[#1A1A1AAD] font-medium">
                            {bookingsCount} booking history
                        </p>
                    </div>
                    {bookings.map((booking) => (
                        <Link
                            href={{
                                pathname: "/booking/details",
                                query: {
                                    id: booking.id
                                }
                            }}
                        >
                            <div
                                className="border-[1.5px] hover:bg-pri-main/5 cursor-pointer rounded-md py-3 bg-white px-4 flex-wrap md:flex gap-4"
                                key={booking.id}
                            >
                                <img
                                    src={booking.hotel.imageUrl}
                                    className="object-cover rounded-lg w-[207px] h-[211px]"
                                />
                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col">
                                        <p className="text-xl font-medium">{booking.hotel.name}</p>
                                        <p className="text-xs font-medium text-[#1A1A1AAD]">{booking.hotel.address.line}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-medium text-[#1A1A1AAD]">{format(new Date(booking.checkInDate), "dd MMM, yyy")} - {format(new Date(booking.checkOutDate), "dd MMM, yyy")}</p>
                                        <p className="text-xl font-medium">NGN {booking.totalAmount.toLocaleString()}</p>
                                    </div>
                                    <p className={`text-base text-[${getStatusBg(booking.status)}]`}>{booking.statusText}</p>
                                </div>

                                {/* <div className="left flex space-x-3">
                                <img
                                    src={booking.hotel.imageUrl}
                                    className="object-cover rounded-lg w-40 h-40"
                                />
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-extrabold">{booking.hotel.name}</h4>
                                        <span className="my-2 space-x-2">
                                            
                                            <small className="text-[11.3px] opacity-50 ">
                                                {booking.hotel.address.line}
                                            </small>
                                        </span>
                                    </div>


                                </div>
                            </div> */}

                            </div>
                        </Link>
                    ))}
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

            <Footer className="bg-[#ffffff]" />
        </div>
    );
}
