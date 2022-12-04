import { Popover } from "@mui/material";
import {
  ArrowDown2,
  Profile,
  Notepad2,
  Money2,
  Heart,
  LogoutCurve,
} from "iconsax-react";
import { BsList } from "react-icons/bs";
import Image from "next/image";
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
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("user"));
    console.log(result);
    setUser(result);
  }, []);

  return (
    <div className="bg-white fixed w-full z-10 shadow-md font-inter">
      <div className="flex w-full justify-between items-center py-3 px-5">
        <Link href="/">
          <Image src="/logo.png" width={100} height={2}></Image>
        </Link>

        <div className="flex items-center">
          {!user ? (
            <>
              <BsList className="block text-3xl md:hidden" />
              <div className="space-x-4 hidden md:block">
                <button
                  type="button"
                  onClick={gotoLogin}
                  className="border-2 rounded-lg py-[6px] px-5 text-sm"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={gotoSignUp}
                  className=" rounded-lg py-2 px-5 text-white bg-[#404040]"
                >
                  Register
                </button>
              </div>
            </>
          ) : (
            <div className="relative flex items-center justify-end">
              {/* <Link href="#"> */}
              <div
                className="flex relative items-center cursor-pointer"
                onClick={handleClick}
              >
                <div className="rounded-full h-8 w-8 border-black border flex items-center box">
                  <img
                    src={user.profileImageUrl}
                    alt="avatar"
                    border="0"
                    className="mx-auto object-cover rounded-full h-8 w-8"
                  />
                </div>
                <span className="font-medium text-md mx-1 text-center flex items-center gap-1">
                  {user.fullName}{" "}
                  <ArrowDown2 size="14" className="mt-1" color="#1a1a1a" />
                </span>
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
                      <p className="text-sm leading-5 font-normal">Rewards</p>
                    </div>
                  </Link>
                  <Link href="#">
                    <div className=" py-2 px-3 flex flex-row items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 w-full">
                      <Heart size={24} />
                      <p className="text-sm leading-5 font-normal">Like</p>
                    </div>
                  </Link>
                  <Link href="#" onClick={logOut}>
                    <div className=" py-2 px-3 flex flex-row items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 w-full">
                      <LogoutCurve size={24} />
                      <p className="text-sm leading-5 font-normal">Logout</p>
                    </div>
                  </Link>
                </div>
              </Popover>
              {/* </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
