import React from "react";
import Image from "next/image";

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="h-full font-poppins">
      <div className="flex flex-col items-center w-full h-full pt-20 lg:px-24 px-4">

        <div className="w-11/12 lg:w-2/6 mx-auto mt-4 lg:mb-8 mb-4">
          <div className="flex justify-between items-center pb-2 flex-col">
            <p className="text-sm font-bold text-sec-main">Confirm your details to complete your booking</p>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 bg-pri-main h-2 rounded-tl rounded-bl mr-1"></div>
            <div className="w-1/3 bg-pri-main h-2 mr-1"></div>
            <div className="w-1/3 bg-gray-200 h-1 rounded-tr rounded-br"></div>
          </div>
        </div>

        <div className="lg:flex grid grid-cols-1 w-full h-full gap-4">

          <div className="lg:flex lg:flex-col grid grid-cols-1 h-auto lg:w-2/5 w-full text-sec-main gap-4">

            <div className="border-[1.5px] bg-white rounded-md p-4 w-full flex flex-col gap-6">

              <p className="font-medium text-base">Booking details</p>

              <div className="grid grid-cols-2 gap-6 w-full">

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Check-in</p>
                  <span className="text-sm font-normal text-sec-main">Fri, 27 Aug, 2022</span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Check-out</p>
                  <span className="text-sm font-normal text-sec-main">Sat, 28 Aug, 2022</span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Guest</p>
                  <span className="text-sm font-normal text-sec-main">2 adults</span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Rooms</p>
                  <span className="text-sm font-normal text-sec-main">1 room</span>
                </div>

              </div>

            </div>

            <div className="border-[1.5px] bg-white rounded-md p-4 w-full flex flex-col gap-6">

              <p className="font-medium text-base">Price summary</p>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">Room price</p>
                  <p className="text-xs font-medium text-sec-main">NGN 60,000</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">7.5 % VAT</p>
                  <p className="text-xs font-medium text-sec-main">NGN 4,500</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">5 % State Tax</p>
                  <p className="text-xs font-medium text-sec-main">NGN 3,000</p>
                </div>
              </div>

              <hr />

              <div className="flex justify-between w-full text-base font-medium text-sec-main">
                <p>Total</p>
                <p>NGN 67,500</p>
              </div>

              <div className="flex flex-col w-full gap-1 text-xs font-normal text-sec-main">
                <p>Free cancellation until 11:59 PM on 26 Aug</p>
                <p className="text-[#4CB200] italic">Payment to be made on premises</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col h-full w-full gap-4 text-sec-main">

            <div className="border-[1.5px] p-3 flex gap-3 rounded-md w-full">
              <Image width={200} height={200} src="/img.png" className="object-cover rounded-md" />
              <div className="flex flex-col gap-2 w-full">
                <p className="lg:text-xl text-base font-medium">Raddison Blue Hotel and Suites</p>

                <div className="lg:flex lg:items-center grid grid-cols-1 lg:gap-3 gap-1 text-xs">
                  <p className="font-medium">Surulere, Lagos</p>
                  <p className="text-sec-main/70">Plot 37 Ahmed Onibudo Street</p>
                </div>

                <div className="text-xs flex flex-col gap-1">
                  <p className="font-medium uppercase">Deluxe room</p>
                  <p className="font-normal text-sec-main/70">1 bed (1 queen)</p>
                  <p className="font-normal">Free Cancellation</p>
                </div>

                <div className="text-xs flex lg:flex-row flex-col gap-1 lg:gap-2 font-medium">
                  <p>Free parking</p>
                  <p>Free wifi</p>
                  <p>Air conditioning</p>
                  <p>Swimming pool</p>
                </div>

              </div>
            </div>

            <div className="border-[1.5px] p-3 space-y-3 w-full rounded-md pb-20">
              <p className="text-base font-medium">Enter your details</p>
              <div className="lg:flex lg:flex-row grid grid-cols-1 lg:gap-0 gap-4 justify-between items-center w-full">

                <div className="grid lg:grid-row-2 grid-cols-1 justify-between gap-4">
                  <div>
                    <label htmlFor="" className="text-sm">
                      Country
                    </label>
                    <input
                      className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                      type="text"
                      // placeholder="First name"
                      value={formData.country}
                      onChange={(event) =>
                        setFormData({ ...formData, country: event.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="text-sm">
                      Phone Number
                    </label>
                    <input
                      className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                      type="text"
                      // placeholder="Last name"
                      value={formData.phoneNumber}
                      onChange={(event) =>
                        setFormData({ ...formData, phoneNumber: event.target.value })
                      }
                    />
                  </div>

                  {/* <div>
                  <label htmlFor="" className="text-sm">
                    Country
                  </label>
                  <input
                    className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                  />
                </div> */}

                </div>

                <div className="bg-pri-main lg:w-1/3 w-full border-[1.5px] p-4 rounded-md flex justify-end">

                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="" className="text-sm">
                        Full Name
                      </label>
                      <input
                        className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                        disabled
                        type="text"
                        // placeholder="First name"
                        // value={{...formData, firstName}}
                        value={formData.firstName}
                        onChange={(event) =>
                          setFormData({ ...formData, firstName: event.target.value })
                        }
                      />
                    </div>
 
                    <div>
                      <label htmlFor="" className="text-sm">
                        Email Address
                      </label>
                      <input
                        className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                        disabled
                        type="text"
                        // placeholder="First name"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({ ...formData, email: event.target.value })
                        }
                      />
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        {/* <input
          type="text"
          placeholder="First Name..."
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Last Name..."
          value={formData.lastName}
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        /> */}
      </div>
    </div>
  );
}

export default PersonalInfo;
