import { Popover } from "@mui/material";
import {
  ArrowDown2,
  Profile,
  Notepad2,
  Money2,
  Heart,
  LogoutCurve,
  HambergerMenu,
} from "iconsax-react";
import { BsList } from "react-icons/bs";
import Image from "next/image";
import logo from "../public/images/img/logo.png";
import bcloud1 from "../public/images/img/bcloud1.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
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
    router.push("/auth/login");
  };

  const gotoSignUp = () => {
    router.push("/auth/signup");
  };

  const logOut = () => {
    setUser(null);
    localStorage.setItem("user", null);
    router.push("/");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("user"));
    setUser(result);
  }, []);

  return (
    <div className="bg-white fixed w-full z-[100] shadow-sm font-poppins">
      <div className="flex py-3 lg:px-16 px-4 w-full justify-between items-center">
        <Link href="/">
          <Image
            className="block"
            src={bcloud1}
            width={90}
            height={2}
            alt="myblcoud"
          />
        </Link>
        <div className="flex justify-end items-center">
          {!user ? (
            <div className="flex gap-3">
              {/* <button
                type="button"
                onClick={gotoLogin}
                className="text-center justify-end font-medium flex items-center px-4 py-2 rounded-md text-sm leading-6 bg-pri-cont hover:bg-pri-main text-sec-main"
              >
                Log In
              </button> */}
              <button
                type="button"
                onClick={gotoSignUp}
                className="text-center justify-end font-normal px-4 py-3 rounded-md text-sm leading-6 border border-pri-cont hover:bg-pri-main text-pri-adark hover:text-sec-main tracking-wide"
              >
                Sign in / Register
              </button>
            </div>
          ) : (
            <div className="relative flex items-center justify-end">
              <div
                className="flex relative items-center cursor-pointer gap-3"
                // onClick={handleClick}
              >
                <div className="rounded-full h-8 w-8 ring-2 ring-pri-cont/70 flex items-center">
                  <img
                    src={user.profileImageUrl}
                    // alt="avatar"
                    border="0"
                    className="object-cover rounded-full h-8 w-8"
                    onClick={handleClick}
                  />
                </div>

                <span className="font-medium text-sm text-center lg:flex hidden items-center gap-1" onClick={handleClick} >
                  {user.fullName}{" "}
                  <ArrowDown2 size="14" className="mt-1" color="#1a1a1a" />
                </span>

                <HambergerMenu className="flex lg:hidden"/>

              </div>
            </div>
          )}
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="bg-white flex-col w-[220px] py-2">
          <Link href="/settings">
            <div className="py-2 px-3 flex items-center gap-3 text-sec-main/70 hover:text-sec-main hover:bg-gray-100 w-full">
              <Profile size={20} />
              <p className="text-sm font-normal mb-[0]">Manage Account</p>
            </div>
          </Link>
          <Link href="/booking/history">
            <div className="py-2 px-3 flex items-center gap-3 text-sec-main/70 hover:text-sec-main hover:bg-gray-100 w-full">
              <Notepad2 size={20} />
              <p className="text-sm font-normal mb-[0]">Booking History</p>
            </div>
          </Link>
          <Link href="/rewards">
            <div className="py-2 px-3 flex items-center gap-3 text-sec-main/70 hover:text-sec-main hover:bg-gray-100 w-full">
              <Money2 size={20} />
              <p className="text-sm font-normal mb-[0]">Rewards</p>
            </div>
          </Link>
          <Link href="/mywishlist">
            <div className="py-2 px-3 flex items-center gap-3 text-sec-main/70 hover:text-sec-main hover:bg-gray-100 w-full">
              <Heart size={20} />
              <p className="text-sm font-normal mb-[0]">Saved</p>
            </div>
          </Link>
          <Link href="#" onClick={logOut}>
            <div className="py-2 px-3 flex items-center gap-3 text-sec-main/70 hover:text-sec-main hover:bg-gray-100 w-full">
              <LogoutCurve size={20} />
              <p className="text-sm font-normal mb-[0]">Logout</p>
            </div>
          </Link>
        </div>
      </Popover>
    </div>
  );
}
