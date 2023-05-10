import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import Coin from '../../public/images/img/Coin.png'
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Crown1 } from 'iconsax-react'

function Rewards() {
    return (
        <div className='min-h-screen font-poppins'>
            <Navbar />
            <div className="bg-[#F8F8F8] w-full h-auto lg:px-24 px-4 py-10 pb-32">
                <div className="flex flex-col gap-6 justify-center w-full pt-12 pb-8">
                    <p className="lg:text-2xl text-xl text-sec-main font-medium">
                        Rewards and Earnings
                    </p>

                    <div className='flex flex-col w-full space-y-10'>

                        <div className='flex flex-col w-full space-y-3'>
                            <p className='font-normal text-sm leading-5 text-gray-600'>Total BCP</p>
                            <div className='flex gap-2 items-center'>
                                <Image src={Coin} alt='coin' width={26} height={26} className='' />
                                <p className='font-semibold text-3xl tracking-wide leading-7 text-sec-main'>3,010</p>
                            </div>
                        </div>

                        <div className='flex flex-col w-full space-y-2 bg-white rounded-xl p-4 border border-gray-200'>
                            <p className='font-normal text-sm leading-5 capitalize text-gray-600'>Recent transactions</p>

                            <div className='flex flex-col space-y-5 py-3 w-full'>

                                <div className='flex flex-col w-full justify-center gap-4 border-b pb-4 border-gray-300'>
                                    <div className='flex items-center w-full justify-between'>
                                        <div className='flex items-center gap-3 w-full'>
                                            <Crown1 size={18} />
                                            <span className='font-medium text-sm leading-5 text-sec-main'>Booking reward</span>
                                        </div>
                                        <p className='w-full text-right text-sm font-semibold leading-5 text-sec-main'>+10BCP</p>
                                    </div>
                                    <div className='flex items-center w-full justify-between'>
                                        <div className='flex items-center gap-3 w-full'>
                                            {/* <Crown1 size={18} /> */}
                                            <span className='font-normal text-sm leading-5 text-sec-main'>Hotel</span>
                                        </div>
                                        <p className='w-full text-right text-sm font-semibold leading-5 text-sec-main'>Almighty Hotel & Suites</p>
                                    </div>
                                    <div className='flex items-center w-full justify-between'>
                                        <div className='flex items-center gap-3 w-full'>
                                            {/* <Crown1 size={18} /> */}
                                            <span className='font-normal text-sm leading-5 text-sec-main'>Status</span>
                                        </div>
                                        <p className='w-full text-right text-sm font-semibold leading-5 text-sec-main'>Received</p>
                                    </div>
                                    <div className='flex items-center w-full justify-between'>
                                        <div className='flex items-center gap-3 w-full'>
                                            {/* <Crown1 size={18} /> */}
                                            <span className='font-normal text-sm leading-5 text-sec-main'>Date</span>
                                        </div>
                                        <p className='w-full text-right text-sm font-semibold tracking-wide leading-5 text-sec-main'>09-05-2023 23:12:03</p>
                                    </div>
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

export default Rewards