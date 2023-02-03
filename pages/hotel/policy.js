import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function PropertyPolicy() {
    return (
        <div className='h-full font-poppins'>
            <Navbar />
            <div className="w-full h-full py-24 pb-20 lg:px-20 px-4">
                <div className="flex flex-col gap-10 justify-center w-full h-full">

                    <p className="lg:text-xl text-lg text-sec-main font-medium">
                        Property policy for hotel.name
                    </p>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PropertyPolicy;