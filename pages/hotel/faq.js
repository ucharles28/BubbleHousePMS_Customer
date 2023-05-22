import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function PropertyFaqs() {
    return (
        <div className='h-full font-poppins'>
            <Navbar />
            <div className="w-full h-full py-24 pb-20 lg:px-20 px-4">
                <div className="flex flex-col gap-10 justify-center w-full h-full">

                    <h3 className="lg:text-xl text-lg text-sec-main font-medium">
                    FAQs
                    </h3>

                    <div className='flex flex-col w-full space-y-4 text-sec-main'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Is there a pool available on site?</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>Yes we have a pool the size of the national stadium.</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Is there a pool available on site?</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>Yes we have a pool the size of the national stadium.</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>Is there a pool available on site?</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>Yes we have a pool the size of the national stadium.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PropertyFaqs;