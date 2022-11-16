import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { ImFacebook2, ImTwitter, ImGoogle} from 'react-icons/im'
import Image from 'next/image';
import logo from '../public/logo.png'


export default function Footer() {
    return (
        <div className="bg-purple-1000 text-white font-inter">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div>
                        <Navbar.Brand href="/">
                            <span className='w-36 flex items-center'><Image src={logo} alt='bcloud' /></span>
                        </Navbar.Brand>
                        <p className="max-w-xs mt-0 text-sm text-white">
                            Be sure to take a look at our Terms of Use and Privacy Policy
                        </p>
                        <div className="flex mt-8 space-x-6 text-white">
                            <a className="hover:text-white" href="" target="_blank" rel="noreferrer">
                                <ImFacebook2 className='hover:text-white' />
                            </a>
                            <a className="hover:text-white" href="" target="_blank" rel="noreferrer">
                                <ImTwitter className='hover:text-white' />
                            </a>
                            <a className="hover:text-white" href="" target="_blank" rel="noreferrer">
                                <ImGoogle className='hover:text-white' />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10 lg:col-span-2 sm:grid-cols-4 lg:grid-cols-4">
                        <div>
                            <p className="font-bold text-lg leading-5">
                                Products
                            </p>
                            <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                                <Link href="../jobs" className="hover:text-white">Voices</Link>
                                {/* <Link href="../jobs" ><a className="hover:text-white"> Translators</a></Link>
                                <Link href="../signup" ><a className="hover:text-white"> Join AVO as a Voice Over talent </a></Link>
                                <Link href="../signup" ><a className="hover:text-white"> Join AVO as a Translators </a></Link>
                                <Link href="../signup" ><a className="hover:text-white"> Post a VO Project </a></Link>
                                <Link href="../upgrade" ><a className="hover:text-white"> Membership Options </a></Link> */}
                            </nav>
                        </div>

                        <div>
                            <p className="font-bold text-lg leading-5">
                                Resources
                            </p>
                            <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                                {/* <Link href="#" ><a className="hover:text-white"> Help Center </a></Link>
                                <Link href="#" ><a className="hover:text-white"> FAQ </a></Link>
                                <Link href="#" ><a className="hover:text-white"> Rates </a></Link> */}
                            </nav>
                        </div>

                        <div>
                            <p className="font-bold text-lg leading-5">
                                Helpful Links
                            </p>
                            <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                                {/* <Link href="#" ><a className="hover:text-white"> Careers </a></Link>
                                <Link href="#" ><a className="hover:text-white"> About Us </a></Link>
                                <Link href="#" ><a className="hover:text-white"> Contact Us </a></Link> */}
                            </nav>
                        </div>

                        <div>
                            <p className="font-bold text-lg leading-5">
                                Legal
                            </p>
                            <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                                {/* <Link href="#"><a className="hover:text-white"> Privacy Policy </a></Link>
                                <Link href="#" ><a className="hover:text-white"> Terms &#38; Conditions </a></Link>
                                <Link href="#" ><a className="hover:text-white"> Accessibility </a></Link> */}
                            </nav>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-sm text-white">
                    &copy; 2022 Africanvo
                </p>
            </div>
        </div>
    )
}