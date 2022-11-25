import { Popover } from "@mui/material"
import { ArrowDown2, Profile, Notepad2, Money2, Heart, LogoutCurve } from "iconsax-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter()
    //Popover
    const [anchorEl, setAnchorEl] = useState(null);

    const [user, setUser] = useState();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const gotoLogin = () => {
        router.push('/auth/login');
    };

    const gotoSignUp = () => {
        router.push('/auth/signup');
    };

    const logOut = () => {
        setUser(null)
        localStorage.setItem('user', null)
        router.push('/');

    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const result = JSON.parse(localStorage.getItem('user'))
        console.log(result)
        setUser(result)
    }, [])

    return (
        <div className="bg-white fixed w-full z-10 shadow-sm font-inter">
            <div className="flex py-6 px-10 w-full justify-between items-center">
                {/* <Image className="block" src="/logo.png" width={110} height={2} alt="logo" /> */}
                <img className="block w-[110px] h-[27.88px]" src="/logo.png" alt="logo" />
                <div className="flex justify-end items-center">
                    {!user ? <>
                        <button
                            type="button"
                            onClick={gotoLogin}
                            className="text-center mx-4 justify-end font-medium flex items-center px-3 py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">Log In</button>
                        <button
                            type="button"
                            onClick={gotoSignUp}
                            className="text-center font-medium px-3 py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">Register</button>
                    </> :
                        <div className="relative flex items-center justify-end">
                            {/* <Link href="#"> */}
                            <div className="flex relative items-center cursor-pointer" onClick={handleClick} >
                                <div className="rounded-full h-8 w-8 border-black border flex items-center box">
                                    <img src={user.profileImageUrl} alt="avatar" border="0" className="mx-auto object-cover rounded-full h-8 w-8" />
                                </div>
                                <span className="font-medium text-md mx-1 text-center flex items-center gap-1">{user.fullName} <ArrowDown2 size="14" className="mt-1" color="#1a1a1a" /></span>

                            </div>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            // sx={{
                            //     width: 320
                            // }}
                            >
                                <div className="bg-white flex-col shadow-sm w-[220px] py-2">
                                    <Link href="#">
                                        <div className=" py-2 px-3 flex flex-row items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 w-full">
                                            <Profile size={24} />
                                            <p className="text-sm leading-5 font-normal">
                                                Manage Account
                                            </p>
                                        </div>
                                    </Link>
                                    <Link href="#">
                                        <div className=" py-2 px-3 flex flex-row items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 w-full">
                                            <Notepad2 size={24} />
                                            <p className="text-sm leading-5 font-normal">
                                                Booking History
                                            </p>
                                        </div>
                                    </Link>
                                    <Link href="#">
                                        <div className=" py-2 px-3 flex flex-row items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 w-full">
                                            <Money2 size={24} />
                                            <p className="text-sm leading-5 font-normal">
                                                Rewards
                                            </p>
                                        </div>
                                    </Link>
                                    <Link href="#">
                                        <div className=" py-2 px-3 flex flex-row items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 w-full">
                                            <Heart size={24} />
                                            <p className="text-sm leading-5 font-normal">
                                                Like
                                            </p>
                                        </div>
                                    </Link>
                                    <Link href="#" onClick={logOut}>
                                        <div className=" py-2 px-3 flex flex-row items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 w-full">
                                            <LogoutCurve size={24} />
                                            <p className="text-sm leading-5 font-normal">
                                                Logout
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </Popover>
                            {/* </Link> */}
                        </div>}
                </div>
            </div>

        </div>
    )
}