import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Amenities from "../../../components/Amenities";
import Carousel from "react-multi-carousel";
import { Rate, Slider, Checkbox } from 'antd';
import { Calendar, Heart, Location, People } from "iconsax-react";
import { useRouter } from "next/router";
import { get, postData } from "../../../helpers/ApiRequest";
import { BounceLoader, ClipLoader } from "react-spinners";
import { useUser } from '../../../context/user'
import 'react-multi-carousel/lib/styles.css';

const Reviews = () => {
    const router = useRouter();
    const { query } = router;
    const id = query.id
    const { user } = useUser();

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [disabled, setDisabled] = useState(false);
    const [cleanliness, setCleanliness] = useState(5);
    const [comfort, setComfort] = useState(5);
    const [serviceQuality, setServiceQuality] = useState(5);
    const [security, setSecurity] = useState(5);
    const [location, setLocation] = useState(5);
    const [rating, setRating] = useState(0);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [image, setImage] = useState();
    const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);
    const [roomImages, setRoomImages] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hotel, setHotel] = useState();
    const [saveHotelIsLoading, setSaveHotelIsLoading] = useState(false);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);


    useEffect(() => {
        if (id) {
            getHotelDetails(id)
        }
    }, [id])

    const getRoomImages = (roomTypes) => {
        const images = []
        roomTypes.map((roomType) => {
            roomType.images.map((image) => {
                images.push(image.imageUrl)
            })
        })

        setRoomImages(images)
    }

    const submitReview = async () => {
        setButtonIsLoading(true)
        const formData = new FormData()
        formData.append('HotelId', id)
        formData.append('CustomerName', fullName)
        formData.append('CustomerEmail', email)
        formData.append('Title', title)
        formData.append('Review', review)
        formData.append('Cleanliness', cleanliness)
        formData.append('Rating', rating)
        formData.append('Comfort', comfort)
        formData.append('ServiceQuality', serviceQuality)
        formData.append('Security', security)
        formData.append('Location', location)
        formData.append('FeedbackImage', image)

        const response = await postData('Feedback', formData)

        if (response.successful) {
            alert('Your review has been submitted successfully')
            // router.back()papi
            router.push({
                pathname: '/hotel/reviews',
                query: {
                    id: id
                }
            });
        } else {
            alert(response.data)
        }
        setButtonIsLoading(false)

    }

    const getHotelDetails = async (id) => {
        setIsLoading(true)
        if (user) {
            const responses = await Promise.all([
                get(`Hotel/${id}`),
                get(`SavedHotel?customerId=${user.id}&hotelId=${id}`)
            ])

            if (responses[0].successful) {
                setHotel(responses[0].data)
                getRoomImages(responses[0].data.roomTypes)
            }

            if (responses[1].successful) {
                setIsSaved(responses[1].data)
            }

        } else {
            const response = await get(`Hotel/${id}`)

            if (response.successful) {
                setHotel(response.data)
                getRoomImages(response.data.roomTypes)
            }
        }
        setIsLoading(false)
    }

    const saveHotel = async () => {
        setSaveHotelIsLoading(true);
        if (!isSaved) {
            if (user) {
                const request = {
                    hotelId: hotel.id,
                    userId: user.id,
                };
                const response = await post("SavedHotel", request);
                if (response.successful) {
                    setIsSaved(true);
                }
            } else {
                setTimeout(() => {
                    setIsSaved(true);
                }, 2000);
            }
        } else {
            const response = await deleteData(
                `SavedHotel?customerId=${user.id}&hotelId=${hotel.id}`
            );
            if (response.successful) {
                setIsSaved(false);
            } else {
                setTimeout(() => {
                    setIsSaved(false);
                }, 2000);
            }
        }

    };

    const handleFileChange = e => {
        setImage(e.target.files[0])
    };


    return (
        <div className="h-screen font-poppins">
            <Navbar />
            {!isLoading ? hotel && <div className="w-full py-24">

                <div className="lg:flex hidden flex-col gap-2 w-full">
                    <div className="flex justify-between items-center gap-2 w-full lg:px-24 px-4">
                        <div className="hotelInfo">
                            <p className="lg:text-2xl text-lg font-semibold">
                                {hotel.name}
                            </p>

                            <div className="text-xs flex items-center gap-1">
                                <span>
                                    <Location size={17} />
                                </span>
                                <p>{hotel.address.line}</p>
                            </div>
                        </div>
                        <div className="flex items-center lg:gap-3 gap-2">
                            {/* <div
                                onClick={saveHotel}
                                className="flex items-center justify-center cursor-pointer"
                            >
                                {!saveHotelIsLoading ? (
                                    <Heart
                                        size={20}
                                        color={isSaved ? "#FE4164" : "#1A1A1ADE"}
                                        variant={isSaved ? "Bold" : "Outline"}
                                    />
                                ) : (
                                    <ClipLoader size={20} color="#FFCC00" />
                                )}
                            </div> */}
                            <div className="flex gap-2 items-center">
                                <div className="p-1.5 rounded-t-md bg-[#108EE9]">
                                    <p className="text-sm font-medium text-white">8.2</p>
                                </div>
                                <div className="lg:flex hidden flex-col">
                                    <p className="text-sm text-sec-main">Pleasant</p>
                                    <span className="text-xs text-sec-main/70">225 reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>



                    <Carousel
                        // swipeable={true}
                        containerClass="container" responsive={responsive}
                        draggable={true}
                        infinite={true}
                    >
                        {roomImages.map((image) => (<div className="md:mt-3">
                            <div className="rounded-lg mr-3">
                                <img
                                    className="object-cover w-[500px] h-[300px] rounded-lg"
                                    alt="name"
                                    src={image}
                                />
                            </div>
                        </div>))}
                    </Carousel>
                </div>

                <div className="flex flex-col gap-8 text-sec-main lg:px-24 px-4">

                    <div className="flex lg:hidden flex-col gap-2 w-full">
                        <div className="flex justify-between items-center gap-2">
                            <div className="hotelInfo">
                                <h3 className="lg:text-2xl text-lg font-semibold">
                                    Hotel name
                                </h3>

                                <div className="text-xs flex items-center gap-1">
                                    <span>
                                        <Location size={17} />
                                    </span>
                                    <p>address</p>
                                </div>
                            </div>
                            <div className="flex items-center lg:gap-3 gap-2">
                                <div
                                    // onClick={saveHotel}
                                    className="flex items-center justify-center cursor-pointer"
                                >
                                    {/* {!saveHotelIsLoading ? ( */}
                                    <Heart
                                        size={20}
                                    // color={isSaved ? "#FE4164" : "#1A1A1ADE"}
                                    // variant={isSaved ? "Bold" : "Outline"}
                                    />
                                    {/* ) : (
                                        <ClipLoader size={20} color="#FFCC00" />
                                    )} */}
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="p-1.5 rounded-t-md bg-[#108EE9]">
                                        <p className="text-sm font-medium text-white">8.2</p>
                                    </div>
                                    <div className="lg:flex hidden flex-col">
                                        <p className="text-sm text-sec-main">Pleasant</p>
                                        <span className="text-xs text-sec-main/70">225 reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Carousel
                            containerClass="container"
                            responsive={responsive}
                            draggable={true}
                            infinite={true}
                            className='border-x-[1.5px] border-gray-200'
                        >
                            {roomImages.map((image) => (
                                <div className="md:mt-3">
                                    <div className="mr-3">
                                        <img
                                            className="object-cover w-[500px] h-[300px] rounded-lg"
                                            alt="bcloud"
                                            src={image}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    <div className="lg:mt-6 mt-0">
                        <p className="text-sm font-normal text-sec-main">
                            {hotel.description}
                        </p>
                    </div>

                    <div className="flex flex-col w-full gap-4 pb-10">
                        <p className="text-base font-medium pb-2 border-b-[1.5px]">Most popular facilities</p>

                        <Amenities />
                    </div>

                    <div className="flex flex-col w-full gap-4">
                        <p className="text-base font-medium pb-2 border-b-[1.5px]">Drop a review for hotel name</p>

                        <div className="flex flex-col gap-10 w-full">

                            <div className="flex flex-col lg:w-2/3 w-full gap-3">
                                <div className="flex lg:flex-row flex-col gap-3 items-center">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md"
                                    />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email address"
                                        className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md"
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Review title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md"
                                />

                                <textarea
                                    placeholder="Review.."
                                    cols="30"
                                    rows="5"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="border-[0.5px] placeholder:text-sm border-sec-main/20 p-2.5 outline-none w-full rounded-md"
                                >

                                </textarea>

                            </div>


                            <div className="flex flex-col lg:w-2/3 w-full gap-3">
                                <p className="text-base font-medium">Hotel rating</p>


                                <div className="flex flex-row lg:space-x-4 space-x-3 items-center justify-between w-full">
                                    <p className="lg:w-1/3">
                                        Cleanliness
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Slider defaultValue={5} min={1} max={10} onAfterChange={(value) => setCleanliness(value)} tooltip={{ open: false }} />
                                    </div>


                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5 rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{cleanliness}</span>/10
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-row lg:space-x-4 space-x-3 items-center justify-between w-full">
                                    <p className="lg:w-1/3">
                                        Comfort
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Slider defaultValue={5} min={1} max={10} onAfterChange={(value) => setComfort(value)} tooltip={{ open: false }} />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5 rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{comfort}</span>/10
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:space-x-4 space-x-3 items-center justify-between w-full">
                                    <p className="lg:w-1/3">
                                        Service quality
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Slider defaultValue={5} min={1} max={10} onAfterChange={(value) => setServiceQuality(value)} tooltip={{ open: false }} />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5 rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{serviceQuality}</span>/10
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:space-x-4 space-x-3 items-center justify-between w-full">
                                    <p className="lg:w-1/3">
                                        Security
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Slider defaultValue={5} min={1} max={10} onAfterChange={(value) => setSecurity(value)} tooltip={{ open: false }} />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5 rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{security}</span>/10
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:space-x-4 space-x-3 items-center justify-between w-full">
                                    <p className="lg:w-1/3">
                                        Location
                                    </p>

                                    <div className='lg:w-1/3 w-full'>
                                        <Slider defaultValue={5} min={1} max={10} onAfterChange={(value) => setLocation(value)} tooltip={{ open: false }} />
                                    </div>

                                    <div className='lg:w-1/3 flex justify-end'>
                                        <p className="p-1 px-2.5 rounded-md bg-pri-main/50 text-xs text-center">
                                            <span>{location}</span>/10
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="flex gap-3 items-center w-full">

                                <p className="font-medium text-sm text-sec-main">
                                    Star rating:
                                </p>

                                <p>
                                    <Rate
                                        allowHalf={true}
                                        onChange={setRating}
                                        value={rating}
                                    />
                                </p>

                            </div>

                            <div className="flex flex-col gap-3 w-full">

                                <p className="text-sm font-medium">Share photos (optional)</p>


                                <input
                                    type='file'
                                    onChange={handleFileChange}
                                />

                            </div>

                            <div className="flex flex-row gap-3 lg:w-2/3 w-full">
                                <Checkbox checked={hasAcceptedPolicy} onChange={() => setHasAcceptedPolicy(!hasAcceptedPolicy)} />
                                <p className="text-xs text-justify">I certify that this review is based on my own experience and is my genuine opinion of this hotel, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review. I understand that bcloud has a zero-tolerance policy on fake reviews.</p>
                            </div>

                            <div className="flex items-start ">
                                {!buttonIsLoading ? <button
                                    type="button"
                                    onClick={submitReview}
                                    // disabled={(!fullName || !email || !title || !review || !hasAcceptedPolicy || rating > 0)}
                                    className="text-sec-main cursor-pointer text-center rounded px-4 py-2.5 bg-[#ffcc00] disabled:bg-pri-main/50"
                                >
                                    Submit you review
                                </button> :
                                <ClipLoader size={30} color="#ffcc00" />}
                            </div>
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
            <Footer className="bg-[#ffffff]" />
        </div>
    );
};

export default Reviews;
