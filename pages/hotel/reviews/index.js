import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { Progress } from 'antd';

function AllReviews() {
    return (
        <div className="h-full font-poppins">
            <Navbar />

            <div className="w-full h-full py-24 pb-20 lg:px-20 px-4">
                <div className="flex flex-col gap-6 justify-center w-full">

                    <div className='flex lg:flex-row flex-col lg:items-center w-full gap-2 justify-between'>
                        <p className="lg:text-xl text-lg text-sec-main font-medium">
                            Reviews for Hotel name
                        </p>
                        <div className="flex gap-2 items-center">
                            {/* <div className="p-1.5 rounded-t-md bg-[#108EE9]"> */}
                                <p className="text-sm font-medium text-white p-1.5 rounded-t-md bg-[#108EE9]">8.2</p>
                            {/* </div> */}
                            <div className="flex flex-col">
                                <p className="text-sm text-sec-main mb-[0]">Pleasant</p>
                                <span className="text-xs text-sec-main/70">225 reviews</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-10 w-full h-full'>

                        <div className='flex lg:flex-row flex-col w-full lg:gap-10 gap-3'>
                            <div className="flex flex-col lg:w-1/2 w-full gap-3">
                                <p className="text-base font-medium">Hotel rating</p>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3'>
                                        Cleanliness
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={50}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5 rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>1</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3'>
                                        Comfort
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={50}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>1</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3 w-2/3'>
                                        Service quality
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={50}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>1</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3'>
                                        Security
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={50}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>1</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3'>
                                        Location
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={50}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>1</span>/10
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className='flex lg:items-center lg:justify-center lg:m-auto group'>
                                <Link href='/hotel/reviews/addreview'>
                                    <p className='text-base font-medium text-sec-main hover:underline hover:transition-all group-hover:text-pri-cont'> Write about your stay here </p>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-6">

                            <div className='flex flex-col gap-4 p-2 border-b-2 pb-4'>

                                <div className='flex lg:flex-row flex-col lg:items-center justify-between gap-3 w-full'>

                                    <div className="lg:hidden flex gap-2 items-center">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-sec-main font-medium">Pleasant</p>
                                        </div>

                                        <div className="p-1.5 rounded-t-md bg-[#108EE9]">
                                            <p className="text-xs font-medium text-white">8.2</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <p className='text-sm font-medium text-sec-main'>Amazing </p>
                                        <span className='text-xs text-sec-main/70'>by Chijioke on February  18, 2023</span>
                                    </div>

                                    <div className="lg:flex hidden gap-2 items-center">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-sec-main font-medium">Pleasant</p>
                                        </div>

                                        <div className="p-1.5 rounded-t-md bg-[#108EE9]">
                                            <p className="text-xs font-medium text-white">8.2</p>
                                        </div>
                                    </div>

                                </div>

                                <p className='pt-2 text-sm text-sec-main/80'>
                                    Tempor aliqua amet non pariatur reprehenderit voluptate pariatur laboris labore minim sint. Pariatur excepteur deserunt enim sit fugiat exercitation deserunt pariatur incididunt laboris tempor incididunt eu veniam. Lorem quis ut tempor aute. Aliquip culpa eu culpa est qui minim ad deserunt officia do sit enim. Tempor aliqua amet non pariatur reprehenderit voluptate pariatur laboris labore minim sint. Pariatur excepteur deserunt enim sit fugiat exercitation deserunt pariatur incididunt laboris tempor incididunt eu veniam. Lorem quis ut tempor aute. Aliquip culpa eu culpa est qui minim ad deserunt officia do sit enim.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AllReviews;