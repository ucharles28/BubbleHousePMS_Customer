import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import lagos from '../public/lagos.png';

function paymentinfo() {
    return (
        <div className='h-screen font-poppins'>
            <Navbar />
            <div className="bg-[#F8F8F8] w-full lg:px-24 px-4 py-10 pb-24">
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

                        <div className="bg-white border-2 p-4 flex w-full rounded-md">

                            <div className="flex gap-3 w-full">
                                <Image src={lagos} className="object-cover rounded-md w-44 h-44" alt='bcloud' />

                                <div className="flex flex-col gap-3">
                                    <div className='flex flex-col gap-1'>
                                        {/* <Link
                                            href={{
                                                pathname: "/hotel/details",
                                                query: {
                                                    hotelId: hotel.id,
                                                    startDate: String(dateRange[0].startDate),
                                                    endDate: String(dateRange[0].endDate),
                                                    adults: adults,
                                                    children: children,
                                                    rooms: rooms,
                                                },
                                            }}
                                        > */}
                                        <p className="lg:text-xl text-lg font-semibold">Raddison Blu hotel and suites</p>
                                        {/* </Link> */}
                                        <div className="text-xs flex items-center gap-1">
                                            <p className='text-sec-main/70'>
                                                Lagos, Nigeria
                                            </p>
                                            <p className='text-sec-main'>
                                                Plot 37 Ahmed Onibudo Street
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-sec-main/70 text-xs font-medium flex flex-col gap-1'>
                                        <p className='uppercase'>Deluxe room</p>
                                        <span>1 bed (queen size)</span>
                                        <p className='text-[#4CB200]'>Free cancellation</p>
                                    </div>

                                    <div className="flex gap-2 font-medium">
                                        {/* {hotel.roomType.roomAmenities &&
                                            hotel.roomType.roomAmenities.map((amenties) => ( */}
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
                                        {/* ))} */}
                                        {/* <span className="mr-3 font-semibold text-xs">
                    Air conditioning
                  </span>
                  <span className="mr-3 font-semibold text-xs">Pool</span>
                  <span className="mr-3 font-semibold text-xs">Restaurant</span> */}
                                    </div>

                                    <div className="flex flex-col text-sec-main">
                                        <p className="text-base font-semibold">NGN 30,000</p>
                                        <p className="text-sec-main/70 text-xs font-medium">avg/night</p>
                                    </div>
                                </div>

                            </div>

                            {/* <div className="right flex flex-col justify-between">
                                <div className="text-end">
                                    <small className="opacity-50 text-center">
                                        Includes taxes and fees
                                    </small>
                                    <div className="text-end">
                                        <p className="font-bold">NGN 30,000</p>
                                        <p className=" text-xs">avg/night</p>
                                    </div>
                                </div>

                            </div> */}

                        </div>

                        <div className='bg-white p-3 gap-4 border-2 grid lg:grid-cols-2 grid-cols-1 justify-center items-center w-full rounded-md'>
                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Check-in
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    22 Dec 2023
                                </span>
                            </div>

                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Check-out
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    22 Dec 2023
                                </span>
                            </div>

                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Guest
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    2 adults, 1 child
                                </span>
                            </div>

                            <div className="box w-full gap-1">
                                <p className="text-xs font-normal text-sec-main/70">
                                    Room
                                </p>
                                <span className="text-sm font-normal text-sec-main">
                                    1 room
                                </span>
                            </div>
                        </div>

                        <div className='bg-white flex w-full rounded-md p-3 border-2'>
                            <div className='flex flex-col gap-2 w-full'>
                                <p className='text-sm font-medium text-sec-main border-b-[1.5px] pb-1 w-full'>Booking Number</p>
                                <p className='text-base font-semibold text-sec-main'>BKN01234567</p>
                            </div>
                        </div>

                        <div className='bg-white flex w-full rounded-md p-3 border-2'>
                            <div className='flex flex-col gap-3'>
                                <p className='text-sm font-medium text-sec-main'>Contact details</p>
                                <div className='text-base font-semibold text-sec-main/70'>
                                    BKN01234567
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default paymentinfo