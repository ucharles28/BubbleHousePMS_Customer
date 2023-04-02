import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { ImFacebook2, ImTwitter, ImGoogle } from 'react-icons/im'
import Image from 'next/image';
import bcloud1 from '../public/images/bcloud1.png'
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


const Footer = () => {
    return (
        <div className="font-poppins">
            <div className='w-full bg-gray-100/30 flex flex-col items-center justify-end border-t border-sec-main/10 pt-16 lg:px-16 px-4 z-10'>

                <div className='lg:flex lg:flex-row lg:gap-2 grid grid-cols-1 gap-6 w-full mb-10'>

                    <div className='item w-1/3'>
                        {/* <img
                            className="w-[130px] h-[30.88px]"
                            alt=""
                            src="logo.png"
                        /> */}
                        <Image className="block" src={bcloud1} width={100} height={2} alt="blcoud" />
                    </div>

                    <div className='item w-full lg:flex lg:flex-row grid grid-cols-2 lg:gap-0 gap-6 justify-between text-sm leading-5'>

                        <div className='flex flex-col gap-4'>
                            <p className='text-sec-main/50 font-medium'>Company</p>
                            <div className="flex flex-col space-y-4 text-sec-main">
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> About Us</a></Link>
                                {/* <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Privacy Policy</a></Link> */}
                                <Link href="/terms" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Terms of Service </a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> How it Works </a></Link>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <p className='text-sec-main/50 font-medium'>Top Cities</p>
                            <nav className="flex flex-col space-y-4 text-sec-main">
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Hotels in Lagos</a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Hotels in Awka</a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Hotels in Calabar </a></Link>
                                <Link href="" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Hotels in Abuja </a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Hotels in Jos </a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Hotels in Owerri </a></Link>
                            </nav>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <p className='text-sec-main/50 font-medium'>Top Destinations</p>
                            <nav className="flex flex-col space-y-4 text-sec-main">
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Lagos</a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Awka</a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Calabar </a></Link>
                                <Link href="" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Abuja </a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Jos </a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Owerri </a></Link>
                            </nav>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <p className='text-sec-main/50 font-medium'>Top Destinations</p>
                            <nav className="flex flex-col space-y-4 text-sec-main">
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Raddison Hotel</a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Grand Range Gold</a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Beni Hotel </a></Link>
                                <Link href="" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Bcloud Hotel </a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Pee Hotel </a></Link>
                                <Link href="#" legacyBehavior><a className="text-sec-main/70 hover:text-sec-main"> Golden Tulip Hotel </a></Link>
                            </nav>
                        </div>

                    </div>

                </div>

                <div className='lg:flex lg:items-center lg:justify-between lg:gap-0 grid grid-cols-1 gap-2 w-full border-t py-4'>
                    <p className='text-sm font-normal leading-6 text-sec-main/50'>Copyright © 2022 Bcloud. All Rights Reserved</p>
                    <div className='flex flex-row items-center gap-4'>
                        <FaFacebookF className='cursor-pointer opacity-75 hover:opacity-100' color='#4267B2' size={18} />
                        <FaTwitter className='cursor-pointer opacity-75 hover:opacity-100' color='#1DA1F2' size={19} />
                        <FcGoogle className='cursor-pointer opacity-75 hover:opacity-100' size={18} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
