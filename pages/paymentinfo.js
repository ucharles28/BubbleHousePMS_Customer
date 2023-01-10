import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import lagos from '../public/lagos.png';
import { useRouter } from "next/router";
import { get } from '../helpers/ApiRequest';
import { BounceLoader } from "react-spinners";
import { format } from "date-fns";

function paymentinfo() {
    const router = useRouter();
    const { query } = router;
    const [booking, setBooking] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getBookingDetails = async () => {
        if (query) {
            setIsLoading(true)
            const response = await get(`Booking/${query.id}`)

            if (response.successful) {
                setBooking(response.data)
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

    useEffect(() => {
        getBookingDetails();
    }, [query])

    return (
        <div className='h-screen font-poppins'>
            <Navbar />
            {!isLoading ? booking && <div className="bg-[#F8F8F8] w-full lg:px-24 px-4 py-10 pb-24 text-sec-main">
                <div className="flex flex-col gap-10 justify-center w-full pt-12 pb-8">

                    <div className="flex flex-col gap-2">
                        <span className="lg:text-xl text-lg text-sec-main font-medium">
                            Booking details
                        </span>
                        {/* <p>
                            Update your information here, this information would also be used
                            for your bookings in the future
                        </p> */}
                    </div>

                    <div className='flex flex-col gap-4 w-full'>

                        <div className="bg-white border-[1.5px] p-4 gap-4 flex flex-col w-full rounded-md">

                            <div className="flex gap-3 w-full">
                                <img src={booking.hotel.imageUrl} className="object-cover rounded-md w-44 h-44" alt='bcloud' />

                                <div className="flex flex-col gap-3">
                                    <div className='flex flex-col gap-1'>
                                        <p className="lg:text-xl text-lg font-semibold">{booking.hotel.name}</p>
                                        <div className="text-xs flex items-center gap-1">
                                            <p className='text-sec-main'>
                                                {booking.hotel.address.line}
                                            </p>
                                        </div>
                                    </div>

                                    {/* <div className='text-sec-main/70 text-xs font-medium flex flex-col gap-1'>
                                        <p className='uppercase'>Deluxe room</p>
                                        <span>1 bed (queen size)</span>
                                        <p className='text-[#4CB200]'>Free cancellation</p>
                                    </div>

                                    <div className="flex gap-2 font-medium">
                                        
                                        
                                        <span className="text-xs">
                                            Swimming pool
                                        </span>
                                        <span className="text-xs">
                                            Wifi
                                        </span>
                                        <span className="text-xs">
                                            Air conditioning
                                        </span>
                                        <span className="text-xs">
                                            Restaurant
                                        </span>
                                        <span className="text-xs">
                                            Bar
                                        </span>
                                    </div> */}

                                    {/* <div className="flex flex-col text-sec-main">
                                        <p className="text-base font-semibold">NGN {booking.totalAmount.toLocaleString()}</p>
                                        <p className="text-sec-main/70 text-xs font-medium">avg/night</p>
                                    </div> */}
                                </div>

                            </div>

                            <div className='flex lg:flex-row flex-col items-center w-full gap-2'>
                                <button type='button' className='p-3 bg-[#ffcc00]/70 hover:bg-[#f5c400] w-full text-sm rounded-md'>Cancel booking</button>

                                <button type='button' className='p-3 border-[1.5px] border-[#ffcc00]/70 hover:bg-[#ffcc00]/70 hover:border-0 w-full text-sm rounded-md'>Make changes to booking</button>

                            </div>

                        </div>

                        <div className='bg-white p-3 gap-4 border-[1.5px] grid lg:grid-cols-2 grid-cols-1 justify-center items-center w-full rounded-md'>
                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Check-in
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    {format(new Date(booking.checkInDate), "dd MMM, yyy")}
                                </span>
                            </div>

                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Check-out
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    {format(new Date(booking.checkOutDate), "dd MMM, yyy")}
                                </span>
                            </div>

                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Guest
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    {booking.totalAdults} adults{booking.totalChildren > 0 ? `, ${booking.totalChildren} child` : null}
                                </span>
                            </div>

                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Room
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    {getTotalRooms(booking.roomTypes)} room
                                </span>
                            </div>
                        </div>

                        <div className='bg-white flex w-full rounded-md p-3 border-[1.5px]'>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='text-sm font-medium text-sec-main border-b-[1.5px] pb-1.5 w-full'>Booking/Confirmation Number</p>

                                <p className='text-sm font-medium text-sec-main/70 flex items-center gap-1'>Booking Number: <span className='text-sm font-semibold text-sec-main tracking-wider'>{booking.code}</span></p>
                            </div>
                        </div>

                        <div className='bg-white flex w-full rounded-md p-3 border-[1.5px]'>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='text-sm font-medium text-sec-main border-b-[1.5px] pb-1.5 w-full'>Contact Details</p>

                                <div className='w-full flex flex-col lg:gap-2 lg:grid lg:grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-xs font-normal text-sec-main/70'>Full Name</p>
                                        <p className='text-sm font-medium text-sec-main '>{booking.fullName}</p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-xs font-normal text-sec-main/70'>Email address</p>
                                        <p className='text-sm font-medium text-sec-main '>{booking.email}</p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-xs font-normal text-sec-main/70'>Phone Number</p>
                                        <p className='text-sm font-medium text-sec-main '>{booking.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white flex w-full rounded-md p-3 border-[1.5px]'>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='text-sm font-medium text-sec-main border-b-[1.5px] pb-1.5 w-full'>Payment Information</p>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <p className="text-sec-main/70">Room price</p>
                                    <p className="font-medium">NGN {booking.totalRoomPrice.toLocaleString()}</p>
                                    <p className="text-sec-main/70">7.5% VAT</p>
                                    <p className="font-medium">NGN {booking.vatAmount.toLocaleString()}</p>
                                    <p className="text-sec-main/70">5.0% State Tax</p>
                                    <p className="font-medium">NGN {booking.stateTaxAmount.toLocaleString()}</p>
                                    <p className="text-sm font-semibold ext-sec-main">Total paid</p>
                                    <p className="font-semibold">NGN {booking.totalAmount.toLocaleString()}</p>
                                </div>

                            </div>
                        </div>

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
            <Footer />
        </div>
    )
}

export default paymentinfo;