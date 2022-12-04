import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { ImFacebook2, ImTwitter, ImGoogle } from 'react-icons/im'
import Image from 'next/image';
import logo from '../public/logo.png'
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


const Footer = () => {
    return (
        <div className="relative bg-white border-t-[1px_solid_rgba(26,_26,_26,_0.26)] border-r-[0px_solid_rgba(26,_26,_26,_0.26)] border-b-[0px_solid_rgba(26,_26,_26,_0.26)] border-l-[0px_solid_rgba(26,_26,_26,_0.26)] box-border w-full flex flex-col items-start justify-start text-left text-base font-poppins">
            <hr className='w-full my-20' />
            <div className='flex w-full py-0'>
                <div className='mr-48 ml-20'>
                    <img
                        className="w-[130px] h-[30.88px]"
                        alt=""
                        src="logo.png"
                    />
                </div>
                <div className='flex text-sm leading-5 gap-16'>
                    <div className='w-1/4'>
                        <p className='text-[#1A1A1AAD] mb-10'>Company</p>
                        <nav className="flex flex-col mt-4 space-y-6 ">
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> About Us</a></Link>
                            <Link href="../jobs" legacyBehavior><a className="hover:text-[#F5C400]"> Privacy Policy</a></Link>
                            <Link href="../signup" legacyBehavior><a className="hover:text-[#F5C400]"> Terms of Service </a></Link>
                            <Link href="../signup" legacyBehavior><a className="hover:text-[#F5C400]"> How it Works </a></Link>
                        </nav>
                    </div>

                    <div className='w-1/4'>
                        <p className='text-[#1A1A1AAD] mb-10'>Top Cities</p>
                        <nav className="flex flex-col mt-4 space-y-6">
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Hotels in Lagos</a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Hotels in Awka</a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Hotels in Calabar </a></Link>
                            <Link href="" legacyBehavior><a className="hover:text-[#F5C400]"> Hotels in Abuja </a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Hotels in Jos </a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Hotels in Owerri </a></Link>
                        </nav>
                    </div>

                    <div className='w-1/4'>
                        <p className='text-[#1A1A1AAD] mb-10'>Top Destinations</p>
                        <nav className="flex flex-col mt-4 space-y-6">
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Lagos</a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Awka</a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Calabar </a></Link>
                            <Link href="" legacyBehavior><a className="hover:text-[#F5C400]"> Abuja </a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Jos </a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Owerri </a></Link>
                        </nav>
                    </div>

                    <div className='w-1/4'>
                        <p className='text-[#1A1A1AAD] mb-10'>Top Destinations</p>
                        <nav className="flex flex-col mt-4 space-y-6">
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Raddison Hotel</a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Grand Range Gold</a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Beni Hotel </a></Link>
                            <Link href="" legacyBehavior><a className="hover:text-[#F5C400]"> Bcloud Hotel </a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Pee Hotel </a></Link>
                            <Link href="#" legacyBehavior><a className="hover:text-[#F5C400]"> Golden Tulip Hotel </a></Link>
                        </nav>
                    </div>

                </div>
            </div>

            
            <hr className='border-2' />

            <div className='flex justify-between w-full px-20 py-16 mt-6'>
                <p>Copyright © 2022 Bcloud All Rights Reserved</p>
                <div className='flex gap-4'>
                    <FaFacebookF className='cursor-pointer' color='#4267B2' size={24} />
                    <FaTwitter className='cursor-pointer' color='#1DA1F2' size={24} />
                    <FcGoogle className='cursor-pointer' size={24} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
