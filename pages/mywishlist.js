import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/user';
import { get } from '../helpers/ApiRequest';


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
        <div className='font-poppins w-full h-screen bg-[#F8F8F8]'>
            <Navbar />
            
        </div>
    );
}