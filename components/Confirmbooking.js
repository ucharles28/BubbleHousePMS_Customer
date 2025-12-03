import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import { format } from "date-fns";
import { post } from "../helpers/ApiRequest";
import { useRouter } from "next/dist/client/router";
import { BounceLoader } from "react-spinners";

function PersonalInfo({
  formData,
  setFormData,
  bookingInfo,
  hotel,
  setPage,
  user,
}) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const toggleModal = () => {
    if (isBooking && modal) {
      return;
    }
    setModal(!modal);
  };
  const bookRooms = async () => {
    setIsBooking(true);
    toggleModal();
    // BookRoomPayload payload = new BookRoomPayload()
    //           {
    //               CheckInDate = findHotelPayload.CheckInDate,
    //               CheckOutDate = findHotelPayload.CheckOutDate,
    //               Email = Email,
    //               FullName = FullName,
    //               Phone = Phone,
    //               HotelId = hotel.Id,
    //               IsMainGuest = IsMainGuest,
    //               GuestEmail = GuestEmail,
    //               GuestFullName = GuestFullName,
    //               IsReservation = true,
    //               VATAmount = Vat,
    //               StateTaxAmount = StateTax,
    //               TotalRoomPrice = TotalAmount,
    //               TotalAmount = Vat + StateTax + TotalAmount,
    //               TotalAdults = FindHotelPayload.NumberOfAdults,
    //               TotalChildren = FindHotelPayload.NumberOfChildren,
    //               CustomerId = Settings.IsUserLogin ? Settings.CurrentUser.Id : Guid.Empty
    //           };

    const request = {
      checkInDate: bookingInfo.checkIn,
      checkOutDate: bookingInfo.checkOut,
      email: formData.email,
      fullName: formData.firstName + " " + formData.lastName,
      phone: formData.phone,
      phone: formData.phone,
      hotelId: hotel.id,
      isMainGuest: formData.isMainGuest,
      guestEmail: formData.guestEmail,
      guestFullName: formData.guestFullName,
      isReservation: true,
      vATAmount: bookingInfo.vat,
      stateTaxAmount: bookingInfo.stateTax,
      totalRoomPrice: bookingInfo.totalAmount,
      totalAmount: bookingInfo.totalAmount + bookingInfo.vat + bookingInfo.stateTax,
      totalAdults: bookingInfo.adults,
      totalChildren: bookingInfo.children,
      roomTypes: bookingInfo.roomTypesInfo,
      isReservation: bookingInfo.isReservation,
      estimatedArrivalTime: formData.estimatedArrivalTime,
      identificationType: formData.identificationType
    };

    if (user) {
      request.customerId = user.id;
    }

    console.log(request);

    const response = await post("Booking/Reserve", request);
    debugger;
    if (response.successful) {
      if (bookingInfo.isReservation === "false") {
        window.location.href = response.data.item2
      }
    } else {
      setIsBooking(false);

    setTimeout(() => {
      router.push("/");
    }, 2000);
    }
    
  };

  return (
    <div className="h-full font-poppins">
      <Navbar />
      <div className="flex flex-col items-center w-full h-full pt-20 lg:px-24 px-4">
        <div className="w-11/12 lg:w-2/6 mx-auto mt-4 lg:mb-8 mb-4">
          <div className="flex justify-between items-center pb-2 flex-col">
            <p className="text-sm font-bold text-sec-main">
              Confirm your details to complete your booking
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 bg-pri-main h-2 rounded-tl rounded-bl mr-1"></div>
            <div className="w-1/3 bg-pri-main h-2 mr-1"></div>
            <div className="w-1/3 bg-pri-main h-2 rounded-tr rounded-br"></div>
          </div>
        </div>

        <div className="lg:flex grid grid-cols-1 w-full h-full gap-4">
          <div className="lg:flex lg:flex-col grid grid-cols-1 h-auto lg:w-2/5 w-full text-sec-main gap-4">
            <div className="border-[1.5px] bg-white rounded-md p-4 w-full flex flex-col gap-6">
              <p className="font-medium text-base">Booking details</p>

              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">
                    Check-in
                  </p>
                  <span className="text-sm font-normal text-sec-main">
                    {bookingInfo.checkIn &&
                      format(bookingInfo.checkIn, "d MMM, yyyy")}
                  </span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">
                    Check-out
                  </p>
                  <span className="text-sm font-normal text-sec-main">
                    {bookingInfo.checkIn &&
                      format(bookingInfo.checkOut, "d MMM, yyyy")}
                  </span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Guest</p>
                  <span className="text-sm font-normal text-sec-main">
                    {bookingInfo.adults} adults{" "}
                    {bookingInfo.children > 0
                      ? `${bookingInfo.children} children`
                      : null}
                  </span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Rooms</p>
                  <span className="text-sm font-normal text-sec-main">
                    {bookingInfo.rooms} room
                  </span>
                </div>
              </div>
            </div>

            <div className="border-[1.5px] bg-white rounded-md p-4 w-full flex flex-col gap-6">
              <p className="font-medium text-base">Price summary</p>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">
                    Room price
                  </p>
                  <p className="text-xs font-medium text-sec-main">
                    NGN {Number(bookingInfo.totalAmount).toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">
                    7.5 % VAT
                  </p>
                  <p className="text-xs font-medium text-sec-main">
                    NGN {bookingInfo.vat.toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">
                    5 % State Tax
                  </p>
                  <p className="text-xs font-medium text-sec-main">
                    NGN {bookingInfo.stateTax.toLocaleString()}
                  </p>
                </div>
              </div>

              <hr />

              <div className="flex justify-between w-full text-base font-medium text-sec-main">
                <p>Total</p>
                <p>
                  NGN{" "}
                  {bookingInfo.totalAmount +
                    bookingInfo.vat +
                    bookingInfo.stateTax}
                </p>
              </div>

              <div className="flex flex-col w-full gap-1 text-xs font-normal text-sec-main">
                <p>Free cancellation until 72hrs before the checking</p>
                <p className="text-[#4CB200] italic">
                  Payment to be made on premises
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full w-full gap-4 text-sec-main">
            <div className="border-[1.5px] p-3 flex gap-3 rounded-md w-full">
              {/* <Image width={200} height={200} src="/img.png" className="object-cover rounded-md" /> */}
              <img
                src={hotel.imageUrl}
                className="w-[200px] h-[200px] object-cover rounded-md"
              />
              <div className="flex flex-col gap-2 w-full">
                <p className="lg:text-xl text-base font-medium">{hotel.name}</p>

                <div className="lg:flex lg:items-center grid grid-cols-1 lg:gap-3 gap-1 text-xs">
                  {/* <p className="font-medium">Surulere, Lagos</p> */}
                  <p className="text-sec-main/70">{hotel.address.line}</p>
                </div>

                {/* <div className="text-xs flex flex-col gap-1">
                  <p className="font-medium uppercase">Deluxe room</p>
                  <p className="font-normal text-sec-main/70">1 bed (1 queen)</p>
                  <p className="font-normal">Free Cancellation</p>
                </div>

                <div className="text-xs flex lg:flex-row flex-col gap-1 lg:gap-2 font-medium">
                  <p>Free parking</p>
                  <p>Free wifi</p>
                  <p>Air conditioning</p>
                  <p>Swimming pool</p>
                </div> */}
              </div>
            </div>

            <div className="border-[1.5px] p-3 space-y-3 w-full rounded-md pb-20">
              <p className="text-base font-medium">Enter your details</p>
              <div className="lg:flex lg:flex-row grid grid-cols-1 lg:gap-0 gap-4 justify-between items-center w-full">
                <div className="grid lg:grid-row-2 grid-cols-1 justify-between gap-4">
                  {/* <div>
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
                  </div> */}

                  <div>
                    <label htmlFor="" className="text-sm">
                      Phone Number
                    </label>
                    <input
                      className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                      type="text"
                      // placeholder="Last name"
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData({ ...formData, phone: event.target.value })
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

                <div className="bg-pri-main/30 lg:w-1/3 w-full border-[1.5px] p-4 rounded-md flex justify-end">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="" className="text-sm">
                        Full Name
                      </label>
                      <input
                        className="border-[1.5px] bg-white rounded-md text-sm outline-0 w-full p-2"
                        disabled
                        type="text"
                        // placeholder="First name"
                        // value={{...formData, firstName}}
                        value={formData.firstName + " " + formData.lastName}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            firstName: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="text-sm">
                        Email Address
                      </label>
                      <input
                        className="border-[1.5px] bg-white rounded-md text-sm outline-0 w-full p-2"
                        disabled
                        type="text"
                        // placeholder="First name"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            email: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="disabled:bg-[#FFDD55] mb-10 py-[7px] mt-10 px-[89px] rounded-md bg-[#FFCC00]"
                // disabled={(!bookingInfo.firstName || bookingInfo.lastName || bookingInfo.email)}
                onClick={bookRooms}
              >
                COMPLETE BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div
          onClick={toggleModal}
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 bg-blend-overlay flex items-center m-0 lg:px-0 px-4"
        >
          <div className="shadow-lg rounded-2xl p-4 bg-white lg:w-[360px] w-full m-auto pb-[96px] px-[52px] pt-[43px]">
            <div className="w-full h-full text-center">
              <div className="flex h-full flex-col items-center justify-between">
                {isBooking ? (
                  <>
                    <BounceLoader
                      size={140}
                      color="#FFCC00"/>
                    <div className="flex flex-col mt-6 gap-2">
                      <p className="text-lg font-medium text-sec-main">Hold on a sec</p>
                      <p className="text-base text-sec-main/70">Confirming your booking</p>
                    </div>
                  </>
                ) : (
                  <>
                    <svg
                      width="140"
                      height="140"
                      viewBox="0 0 150 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M75 12.5C40.5625 12.5 12.5 40.5625 12.5 75C12.5 109.438 40.5625 137.5 75 137.5C109.438 137.5 137.5 109.438 137.5 75C137.5 40.5625 109.438 12.5 75 12.5ZM104.875 60.625L69.4375 96.0625C68.5625 96.9375 67.375 97.4375 66.125 97.4375C64.875 97.4375 63.6875 96.9375 62.8125 96.0625L45.125 78.375C43.3125 76.5625 43.3125 73.5625 45.125 71.75C46.9375 69.9375 49.9375 69.9375 51.75 71.75L66.125 86.125L98.25 54C100.063 52.1875 103.063 52.1875 104.875 54C106.688 55.8125 106.688 58.75 104.875 60.625Z"
                        fill="#56CA00"
                      />
                    </svg>
                    <div className="flex flex-col mt-6 gap-2">
                      <p className="text-lg font-medium text-sec-main">Booking confirmed</p>
                      <p className="text-base text-sec-main-70">
                        Your booking has been confirmed successfully
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />F
    </div>
  );
}

export default PersonalInfo;
