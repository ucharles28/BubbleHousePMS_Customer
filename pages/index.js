// import { TextField } from "@mui/material";

// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";

import Carousel from "../components/Carousel";
import Hero from "../components/Hero";

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

export default function Home() {
  const responsive = {
    superLargeDesktop: {
      //
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      //desktop
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      //tablet
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      //mobile
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className="h-full w-full font-poppins overflow-hidden">
        <Navbar />
        <Hero />
        {/* Top Hotels */}
        <div className="px-20 py-10 mt-10">
          <div className="flex justify-between">
            <p className="text-3xl font-medium">Today’s Top Hotel Deals</p>
            <p className="text-base font-medium items-end">See more</p>
          </div>

          <div className="flex flex-row">
            <div className="my-10 mr-10">
              <div className="rounded-lg">
                <img
                  className="object-cover w-[255.36px] h-[256px]"
                  alt="name"
                  src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                />
              </div>
              <div className="flex flex-col gap-y-[4px] mt-1">
                <p className="font-medium text-base leading-6">
                  Wintess Hotel and Suites
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Ifite-Awka, Anambra State.
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Starting from{" "}
                  <span className="text-black font-medium">NGN 5,000</span>
                </p>
              </div>
            </div>
            <div className="my-10 mr-10">
              <div className="">
                <img
                  className="object-cover w-[255.36px] h-[256px]"
                  alt="name"
                  src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                />
              </div>
              <div className="flex flex-col gap-y-[4px] mt-1">
                <p className="font-medium text-base leading-6">
                  Wintess Hotel and Suites
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Ifite-Awka, Anambra State.
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Starting from{" "}
                  <span className="text-black font-medium">NGN 5,000</span>
                </p>
              </div>
            </div>
            <div className="my-10 mr-10">
              <div className="">
                <img
                  className="object-cover w-[255.36px] h-[256px]"
                  alt="name"
                  src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                />
              </div>
              <div className="flex flex-col gap-y-[4px] mt-1">
                <p className="font-medium text-base leading-6">
                  Wintess Hotel and Suites
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Ifite-Awka, Anambra State.
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Starting from{" "}
                  <span className="text-black font-medium">NGN 5,000</span>
                </p>
              </div>
            </div>
            <div className="my-10 mr-10">
              <div className="">
                <img
                  className="object-cover w-[255.36px] h-[256px]"
                  alt="name"
                  src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-base leading-6">
                  Wintess Hotel and Suites
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Ifite-Awka, Anambra State.
                </p>
                <p className="text-sm text-[#1A1A1AAD] leading-6">
                  Starting from{" "}
                  <span className="text-black font-medium">NGN 5,000</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top cities */}
        <div className="px-20 py-10">
          <p className="text-3xl font-medium mb-1">Top cities</p>
          <div className="flex justify-between">
            <p className="text-xl font-medium">
              See the top destinations people are traveling to
            </p>
            <p className="text-base font-medium items-end">See more</p>
          </div>

          <div
            style={{
              maxWidth: 1200,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 64,
            }}
          >
            <Carousel show={4} responsive={responsive}>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="rounded-lg">
                  <img
                    className="object-cover w-[255.36px] h-[256px] rounded-lg"
                    alt="name"
                    src="https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg"
                  />
                </div>
                <div className="flex flex-col gap-y-[4px] mt-1">
                  <p className="font-medium text-base leading-6">
                    Hotel in Lagos
                  </p>
                  <p className="text-sm text-[#1A1A1AAD] leading-6">
                    10,003 Hotels{" "}
                    <span className="text-black font-medium">
                      Avg. NGN 5,000
                    </span>
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
