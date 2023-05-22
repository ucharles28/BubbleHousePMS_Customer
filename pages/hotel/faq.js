import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { get } from '../../helpers/ApiRequest';
import { useRouter } from "next/router";    
import { BounceLoader } from 'react-spinners';

function PropertyFaqs() {
    const [faqs, setFaqs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const { hotelId } = router.query

    const getFaqs = async (hotelId) => {
        setIsLoading(true)
        const response = await get(`Faq/${hotelId}`)
        if (response.successful) {
            setFaqs(response.data)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (hotelId) {
            getFaqs(hotelId)
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
                        FAQs
                    </h3>

                    <div className='flex flex-col w-full space-y-4 text-sec-main'>
                        {faqs.map((faq) => (<div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-sec-main/90'>{faq.question}</p>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-normal text-sec-main'>{faq.answer}</span>
                            </div>
                        </div>))}
                    </div>

                </div>}
            </div>
            <Footer />
        </div>
    )
}

export default PropertyFaqs;