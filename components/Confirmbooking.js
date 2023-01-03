import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { post } from "../helpers/ApiRequest";
import { useRouter } from "next/dist/client/router";

function PersonalInfo({ formData, setFormData, bookingInfo, hotel, setPage, user }) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const toggleModal = () => {
    if (isBooking && modal) {
      return;
    }
    setModal(!modal);
  }
  const bookRooms = async () => {
    setIsBooking(true)
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
      roomTypes: bookingInfo.roomTypesInfo
    }

    if (user) {
      request.customerId = user.id
    }

    console.log(request)

    const response = await post('Booking/Reserve', request)
    debugger
    if (response.successful) {
      
      console.log('success')
    }
    setIsBooking(false)

    setTimeout(() => {
      router.push('/')
    }, 2000);
  }

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
            <div className="w-1/3 bg-pri-main h-2 rounded-tr rounded-br"></div>
          </div>
        </div>

        <div className="lg:flex grid grid-cols-1 w-full h-full gap-4">

          <div className="lg:flex lg:flex-col grid grid-cols-1 h-auto lg:w-2/5 w-full text-sec-main gap-4">

            <div className="border-[1.5px] bg-white rounded-md p-4 w-full flex flex-col gap-6">

              <p className="font-medium text-base">Booking details</p>

              <div className="grid grid-cols-2 gap-6 w-full">

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Check-in</p>
                  <span className="text-sm font-normal text-sec-main">{bookingInfo.checkIn && format(bookingInfo.checkIn, "d MMM, yyyy")}</span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Check-out</p>
                  <span className="text-sm font-normal text-sec-main">{bookingInfo.checkIn && format(bookingInfo.checkOut, "d MMM, yyyy")}</span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Guest</p>
                  <span className="text-sm font-normal text-sec-main">{bookingInfo.adults} adults {bookingInfo.children > 0 ? `${bookingInfo.children} children` : null}</span>
                </div>

                <div className="box w-full gap-1">
                  <p className="text-xs font-normal text-sec-main/70">Rooms</p>
                  <span className="text-sm font-normal text-sec-main">{bookingInfo.rooms} room</span>
                </div>

              </div>

            </div>

            <div className="border-[1.5px] bg-white rounded-md p-4 w-full flex flex-col gap-6">

              <p className="font-medium text-base">Price summary</p>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">Room price</p>
                  <p className="text-xs font-medium text-sec-main">NGN {Number(bookingInfo.totalAmount).toLocaleString()}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">7.5 % VAT</p>
                  <p className="text-xs font-medium text-sec-main">NGN {bookingInfo.vat.toLocaleString()}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-xs font-normal text-sec-main/70">5 % State Tax</p>
                  <p className="text-xs font-medium text-sec-main">NGN {bookingInfo.stateTax.toLocaleString()}</p>
                </div>
              </div>

              <hr />

              <div className="flex justify-between w-full text-base font-medium text-sec-main">
                <p>Total</p>
                <p>NGN {bookingInfo.totalAmount + bookingInfo.vat + bookingInfo.stateTax}</p>
              </div>

              <div className="flex flex-col w-full gap-1 text-xs font-normal text-sec-main">
                <p>Free cancellation until 11:59 PM on 26 Aug</p>
                <p className="text-[#4CB200] italic">Payment to be made on premises</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col h-full w-full gap-4 text-sec-main">

            <div className="border-[1.5px] p-3 flex gap-3 rounded-md w-full">
              {/* <Image width={200} height={200} src="/img.png" className="object-cover rounded-md" /> */}
              <img src={hotel.imageUrl} className="w-[200px] h-[200px] object-cover rounded-md" />
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
            <div className="flex justify-end">
              <button className="disabled:bg-[#FFDD55] mb-10 py-[7px] mt-10 px-[89px] rounded-md bg-[#FFCC00]"
                // disabled={(!bookingInfo.firstName || bookingInfo.lastName || bookingInfo.email)}
                onClick={bookRooms}
              >
                COMPLETE BOOKING
              </button>
            </div>
          </div>
        </div>


      </div>
      {modal &&
        <div onClick={toggleModal} className='fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 bg-blend-overlay flex items-center m-0'>
          <div className="shadow-lg rounded-2xl p-4 bg-white w-[360px] m-auto pb-[96px] px-[52px] pt-[43px]">
            <div className="w-full h-full text-center">
              <div className="flex h-full flex-col items-center justify-between">
                {isBooking ? <>
                  <svg width="153" height="153" viewBox="0 0 153 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.97652 96.7304C6.76994 97.3972 4.42854 96.1506 3.88553 93.9103C-0.11884 77.3898 1.60051 59.9507 8.83562 44.4773C16.6616 27.7403 30.3901 14.481 47.3891 7.24167C64.3881 0.00232572 83.461 -0.707564 100.951 5.24811C118.441 11.2038 133.117 23.4059 142.166 39.5148C151.214 55.6238 153.998 74.5058 149.984 92.5407C145.969 110.576 135.439 126.494 120.412 137.244C105.385 147.994 86.9184 152.818 68.5535 150.793C51.575 148.92 35.788 141.315 23.7635 129.299C22.1329 127.67 22.2867 125.022 24.0042 123.484V123.484C25.7216 121.947 28.3516 122.103 29.9934 123.721C40.6377 134.21 54.5345 140.849 69.4686 142.496C85.7895 144.296 102.2 140.008 115.555 130.455C128.91 120.901 138.268 106.755 141.836 90.727C145.403 74.6994 142.929 57.9189 134.888 43.6029C126.847 29.2869 113.804 18.4429 98.2603 13.1501C82.7169 7.85725 65.7668 8.48813 50.6598 14.9217C35.5528 21.3553 23.3523 33.1389 16.3973 48.013C10.0334 61.6233 8.47135 76.9448 11.8903 91.4924C12.4177 93.7363 11.1831 96.0637 8.97652 96.7304V96.7304Z" fill="#1A1A1A" fill-opacity="0.5" />
                    <path d="M69.8964 93.8554C68.8959 93.8554 67.9455 93.4552 67.2451 92.7549L53.088 78.5978C51.6373 77.1471 51.6373 74.7459 53.088 73.2951C54.5388 71.8444 56.94 71.8444 58.3907 73.2951L69.8964 84.8009L95.6093 59.088C97.06 57.6373 99.4612 57.6373 100.912 59.088C102.363 60.5388 102.363 62.94 100.912 64.3907L72.5478 92.7549C71.8474 93.4552 70.8969 93.8554 69.8964 93.8554Z" fill="#1A1A1A" fill-opacity="0.5" />
                  </svg>
                  <div className="flex flex-col mt-[23px] gap-[4px]">
                    <p className="text-2xl font-medium">Hold on a sec</p>
                    <p className="text-xl">Confirming your booking</p>
                  </div>
                </> :
                  <>
                    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M75 12.5C40.5625 12.5 12.5 40.5625 12.5 75C12.5 109.438 40.5625 137.5 75 137.5C109.438 137.5 137.5 109.438 137.5 75C137.5 40.5625 109.438 12.5 75 12.5ZM104.875 60.625L69.4375 96.0625C68.5625 96.9375 67.375 97.4375 66.125 97.4375C64.875 97.4375 63.6875 96.9375 62.8125 96.0625L45.125 78.375C43.3125 76.5625 43.3125 73.5625 45.125 71.75C46.9375 69.9375 49.9375 69.9375 51.75 71.75L66.125 86.125L98.25 54C100.063 52.1875 103.063 52.1875 104.875 54C106.688 55.8125 106.688 58.75 104.875 60.625Z" fill="#56CA00" />
                    </svg>
                    <div className="flex flex-col mt-[23px] gap-[4px]">
                      <p className="text-2xl font-medium">Booking confirmed</p>
                      <p className="text-xl">Your booking has been confirmed successfully</p>
                    </div>
                  </>}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default PersonalInfo;
