import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useUser } from '../context/user';
import { get } from '../helpers/ApiRequest';
import Image from 'next/image';
import empty from '../public/empty.png';
import Link from 'next/link';
import RoomSearchResult from "../components/RoomSearchResult";


export default function MyWishList() {
    const { user } = useUser();

    const [savedHotels, setSavedHotels] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getSavedHotelsByCustomerId = async () => {
        setIsLoading(true)
        const response = await get(`SavedHotel/Customer/${user.id}`)

        if (response.successful) {
            setSavedHotels(response.data)
        }
        setIsLoading(false)

    }

    useEffect(() => {

    }, [])

    return (
        <div className='h-screen font-poppins'>
            <Navbar />
            <div className='bg-[#F8F8F8] w-full h-full lg:px-24 px-4 py-10 pb-24'>
                <div className="flex flex-col gap-10 justify-center w-full h-full pt-12 pb-8">

                    <div className="flex flex-col gap-1">
                        <span className="lg:text-2xl text-xl text-sec-main font-medium">
                            Saved
                        </span>
                        <p>
                            0 hotel
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-full h-full py-16">
                        <div className='flex flex-col items-center gap-3 w-full'>
                            <Image src={empty} width={400} height={400} />
                            <p className='text-base font-normal text-sec-main/80'>Click the heart icon next to a stay&#39;s name and it will be saved here.</p>
                            <p className='text-sm font-normal text-sec-main/70'>Ready to browse and save hotels?</p>
                            <Link href='/'>
                                <button
                                    type="button"
                                    className="p-2.5 px-4 hover:text-sec-main bg-[#FFCC00AA] text-sm rounded-md"
                                >
                                    Explore hotels
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='flex '>
                        {/* <RoomSearchResult /> */}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}