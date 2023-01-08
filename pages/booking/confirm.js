import Navbar from "../../components/Navbar";
import hotelimage from '../../public/hotelimage.png'
import { useRouter } from "next/router";
import { get } from "../../helpers/ApiRequest";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { format } from "date-fns";



export default function ConfirmBooking() {
    const router = useRouter();
    const { query } = router;
    const [booking, setBooking] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfDays, setNumberOfDays] = useState(0);


    useEffect(() => {
        confirmPayment();
    }, [query])

    const confirmPayment = async () => {
        if (query) {
            setIsLoading(true)
            const response = await get(`Payment/VerifyPayment?reference=${query.reference}`)
            if (response.successful) {
                console.log(response.data)
                setBooking(response.data)
                setNumberOfDays(dateDiffInDays(new Date(response.data.checkInDate), new Date(response.data.checkOutDate)))
            }
            setIsLoading(false)
        }
    }

    const getTotalRooms = (roomTypes) => {
        let count = 0
        roomTypes.forEach(x => {
            count += x.numberBookedRooms;
        });
        return count
    }

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    return (
        <div className="h-screen font-poppins">
            <Navbar />
            {!isLoading ? booking && <div className="bg-[#F8F8F8] flex flex-col gap-3 w-full h-auto lg:px-24 px-4 py-24 pb-32">
                <div className='bg-white flex w-full rounded-md p-3 border-2'>
                    <div className="flex items-center gap-2">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 150 150"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M75 12.5C40.5625 12.5 12.5 40.5625 12.5 75C12.5 109.438 40.5625 137.5 75 137.5C109.438 137.5 137.5 109.438 137.5 75C137.5 40.5625 109.438 12.5 75 12.5ZM104.875 60.625L69.4375 96.0625C68.5625 96.9375 67.375 97.4375 66.125 97.4375C64.875 97.4375 63.6875 96.9375 62.8125 96.0625L45.125 78.375C43.3125 76.5625 43.3125 73.5625 45.125 71.75C46.9375 69.9375 49.9375 69.9375 51.75 71.75L66.125 86.125L98.25 54C100.063 52.1875 103.063 52.1875 104.875 54C106.688 55.8125 106.688 58.75 104.875 60.625Z"
                                fill="#56CA00"
                            />
                        </svg>
                        <p className="text-base font-medium">Your booking has been confirmed</p>
                    </div>
                </div>

                <div className='bg-white flex flex-col w-full rounded-md p-3 border-2'>
                    <div className="flex flex-col">
                        <p className="text-lg font-medium">Hotel Name</p>
                        <p className="text-sm text-sec-main/70">Lagos Nigeria</p>
                    </div>
                    <div className="flex gap-4 items-center justify-between w-full">
                        <img src="../img.png" className="w-1/2 h-[176px] object-cover rounded-md" />
                        <img src="../img.png" className="w-1/2 h-[176px] object-cover rounded-md`" />
                    </div>
                </div>

                <div className='bg-white flex w-full flex-col rounded-md p-3 border-2'>
                    <p className='text-sm font-medium text-sec-main border-b-[1.5px] pb-1 w-full'>Booking Details</p>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <p className="text-base text-sec-main/70">Check In</p>
                        <p className="text-base font-medium">{format(new Date(booking.checkInDate), "dd MMM, yyy")}</p>
                        <p className="text-base text-sec-main/70">Check Out</p>
                        <p className="text-base font-medium">{format(new Date(booking.checkOutDate), "dd MMM, yyy")}</p>
                        <p className="text-base text-sec-main/70">Guest</p>
                        <p className="text-base font-medium">{booking.totalAdults} adults{booking.totalChildren > 0 ? `, ${booking.totalChildren} child` : null}</p>
                        <p className="text-base text-sec-main/70">Reservation</p>
                        <p className="text-base font-medium">{numberOfDays} nights, {getTotalRooms(booking.roomTypes)} rooms</p>
                    </div>
                </div>

                <div className='bg-white flex w-full flex-col rounded-md p-3 border-2'>
                    <p className='text-sm font-medium text-sec-main border-b-[1.5px] pb-1 w-full'>Pament Details</p>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <p className="text-base text-sec-main/70">Payment Date</p>
                        <p className="text-base font-medium">{format(new Date(booking.createdDate), "dd MMM, yyy")}</p>
                        <p className="text-base text-sec-main/70">Method</p>
                        <p className="text-base font-medium">Card</p>
                        <p className="text-base text-sec-main/70">Total</p>
                        <p className="text-base font-medium">NGN {booking.totalAmount.toLocaleString()}</p>
                        <p className="text-base text-sec-main/70">Status</p>
                        <p className="text-base font-medium text-[#56CA00]">Successful</p>
                    </div>
                </div>
            </div> : <div className="w-full">
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
        </div >
    )
}