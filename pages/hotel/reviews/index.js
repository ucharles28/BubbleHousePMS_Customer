import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { Progress } from 'antd';
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/router";
import { get } from '../../../helpers/ApiRequest';
import { format } from "date-fns";


function AllReviews() {
    const router = useRouter();
    const { query } = router;
    const id = query.id

    const [hotel, setHotel] = useState();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const getHotelDetails = async (id) => {
        setIsLoading(true)
        const responses = await Promise.all([
            get(`Hotel/${id}`),
            get(`Feedback/Hotel/${id}`)
        ])

        if (responses[0].successful) {
            setHotel(responses[0].data)
        }

        if (responses[1].successful) {
            setReviews(responses[1].data)
        }


        setIsLoading(false)
    }

    useEffect(() => {
        if (id) {
            getHotelDetails(id)
        }
    }, [id])

    return (
        <div className="h-full font-poppins">
            <Navbar />

            {!isLoading ? hotel && <div className="w-full h-full py-24 pb-20 lg:px-20 px-4">
                <div className="flex flex-col gap-6 justify-center w-full">

                    <div className='flex lg:flex-row flex-col lg:items-center w-full gap-2 justify-between'>
                        <p className="lg:text-xl text-lg text-sec-main font-medium">
                            Reviews for {hotel.name}
                        </p>

                        <div className="flex gap-2 items-center">
                            {/* <div className="p-1.5 rounded-t-md bg-[#108EE9]"> */}
                                <p className="text-sm font-medium text-white p-1.5 rounded-t-md bg-[#108EE9]">{hotel.rating}</p>
                            {/* </div> */}
                            <div className="flex flex-col">
                                <p className="text-sm text-sec-main mb-[0]">Pleasant</p>
                                <span className="text-xs text-sec-main/70">{reviews.length} reviews</span>
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
                                            percent={hotel.cleanliness * 10}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5 rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{hotel.cleanliness}</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3'>
                                        Comfort
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={hotel.comfort * 10}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{hotel.comfort}</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3 w-2/3'>
                                        Service quality
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={hotel.serviceQuality * 10}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{hotel.serviceQuality}</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3'>
                                        Security
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={hotel.security * 10}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{hotel.security}</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row space-x-4 items-center justify-between w-full">
                                    <p className='lg:w-1/3'>
                                        Location
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Progress
                                            percent={hotel.location * 10}
                                            showInfo={false}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                        />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5  rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{hotel.location}</span>/10
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className='flex lg:items-center lg:justify-center lg:m-auto group'>
                                <Link href={{
                                    pathname: '/hotel/reviews/add',
                                    query: {
                                        id: id
                                    }
                                }}>
                                    <p className='text-base font-medium text-sec-main hover:underline hover:transition-all group-hover:text-pri-cont'> Write about your stay here </p>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-6">

                            {reviews.map((review) => (<div className='flex flex-col gap-4 p-2 border-t-2 pt-4' key={review.id}>

                                <div className='flex lg:flex-row flex-col lg:items-center justify-between w-full'>

                                    <div className="lg:hidden flex gap-2 items-center">

                                        <p className="text-sm text-sec-main font-medium">
                                            Pleasant
                                        </p>

                                        <p className="text-sm font-medium text-white p-1.5 rounded-t-md bg-[#108EE9]">{review.rating}</p>

                                    </div>

                                    <div className='flex flex-col'>
                                        <p className='text-sm font-medium text-sec-main'>{review.title} </p>
                                        <span className='text-xs text-sec-main/70'>by {review.customerName} on {format(new Date(review.createdDate), "MMMM d, yyyy")}</span>
                                    </div>

                                    <div className="lg:flex hidden gap-2 items-center">

                                        <p className="text-sm text-sec-main font-medium">
                                            Pleasant
                                        </p>

                                        <p className="text-sm font-medium text-white p-1.5 rounded-t-md bg-[#108EE9]">{review.rating}</p>


                                    </div>

                                </div>

                                <p className='pt-2 text-sm text-sec-main/80'>
                                    {review.review}
                                </p>
                            </div>))}


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

export default AllReviews;