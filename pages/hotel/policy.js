import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BounceLoader } from 'react-spinners';
import { get } from '../../helpers/ApiRequest';
import { useRouter } from "next/router";

function PropertyPolicy() {

    const [policy, setPolicy] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const { hotelId } = router.query

    const getPropertyPolicy = async (hotelId) => {
        setIsLoading(true)
        const response = await get(`PropertyPolicy/${hotelId}`)
        if (response.successful) {
            console.log(response.data)
            setPolicy(response.data)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (hotelId) {
            getPropertyPolicy(hotelId)
        }
    }, [hotelId])

    return (
        <div className='h-full font-poppins'>
            <Navbar />
            <div className="w-full h-full py-24 pb-20 lg:px-20 px-4">
                {isLoading ? <div className="w-full">
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
                </div> : <div className="flex flex-col gap-10 justify-center w-full h-full">

                    <h3 className="lg:text-xl text-lg text-sec-main font-medium">
                        Property policy for hotel.name
                    </h3>

                    {<div className='flex flex-col w-full space-y-4 text-sec-main'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Check-in/out times</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>Check-in: {policy.checkInTime}</span>
                                <span className='text-sm font-normal text-sec-main'>Check-out: {policy.checkOutTime}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Pets</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>{policy.pets}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Are children allow?</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>{policy.children}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Age restriction</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>{policy.ageRestriction}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Internet</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>{policy.internet}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Parking</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>{policy.parking}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Accepted payment method</p>
                            <div className='flex flex-col gap-1'>
                                {!policy.isAcceptCashOnly ?<span className='text-sm font-normal text-sec-main'>Card (Mastercard, Visa)</span> :
                                <span className='text-sm font-normal text-sec-main'>Cash at premises</span>}
                            </div>
                        </div>
                    </div>}

                </div>}
            </div>
            <Footer />
        </div>
    )
}

export default PropertyPolicy;