import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function PropertyPolicy() {
    return (
        <div className='h-full font-poppins'>
            <Navbar />
            <div className="w-full h-full py-24 pb-20 lg:px-20 px-4">
                <div className="flex flex-col gap-10 justify-center w-full h-full">

                    <h3 className="lg:text-xl text-lg text-sec-main font-medium">
                        Property policy for hotel.name
                    </h3>

                    <div className='flex flex-col w-full space-y-4 text-sec-main'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Check-in/out times</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>Check-in: from 14:00 until anything</span>
                                <span className='text-sm font-normal text-sec-main'>Check-out: before noon</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Pets</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>Pets not allowed</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Accepted payment method</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>Card (Mastercard, Visa)</span>
                                <span className='text-sm font-normal text-sec-main'>Cash at premises</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PropertyPolicy;