import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function SignUpInfo({ formData, setFormData }) {
  return (
    <div className="h-full font-poppins">
      {/* <Navbar /> */}

      <div className="flex flex-col items-center w-full h-full pt-20 lg:px-24 px-4">

        <div className="w-11/12 lg:w-2/6 mx-auto mt-4 lg:mb-8 mb-4">
          <div className="flex justify-between items-center pb-2 flex-col">
            <p className="text-sm font-bold text-sec-main">Add your contact details and select payment method</p>
          </div>
          <div className="flex items-center">
            <div className="w-1/3 bg-pri-main h-2 rounded-tl rounded-bl mr-1"></div>
            <div className="w-1/3 bg-gray-200 h-1 mr-1"></div>
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

            <div className="border-[1.5px] p-3 space-y-3 w-full rounded-md">
              <p className="text-base font-medium">Enter your details</p>
              <div className="grid lg:grid-cols-2 grid-cols-1 justify-between gap-4">

                <div>
                  <label htmlFor="" className="text-sm">
                    First Name
                  </label>
                  <input
                    className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                    type="text"
                    // placeholder="First name"
                    value={formData.firstName}
                    onChange={(event) =>
                      setFormData({ ...formData, firstName: event.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="" className="text-sm">
                    Last Name
                  </label>
                  <input
                    className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                    type="text"
                    // placeholder="Last name"
                    value={formData.lastName}
                    onChange={(event) =>
                      setFormData({ ...formData, lastName: event.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="" className="text-sm">
                    Email Address
                  </label>
                  <input
                    className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                    type="email"
                    // placeholder="Email Address"
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

              <div className="space-y-2">
                <p className="text-sm font-medium">Who are you booking for?</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-1">
                    <input type="radio" name="" id="main guest" value="main_guest" />
                    <label htmlFor="main guest" className="text-[12px]">
                      I'm the main guest
                    </label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name=""
                      id="for someone"
                      value="for_someone"
                    />
                    <label htmlFor="for someone" className="text-[12px]">
                      I’m booking for someone
                    </label>
                  </div>
                </div>
              </div>

            </div>

            <div className="border-[1.5px] p-3 space-y-5 w-full rounded-md">

              <p className="text-base font-medium">Special request</p>
              <span className="text-xs text-sec-main/70">
                Do you have any special request to make to the hotel management
                during the period of your stay? You can do so now with the message
                box below which is to be reviewed and considered by the management.
              </span>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  Kindly make your requests in English
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="border-[1.5px] rounded-md text-sm outline-0 w-full p-2"
                >
                </textarea>
              </div>
            </div>

            <div className="border-[1.5px] p-3 space-y-5 w-full rounded-md">
              <p className="text-base font-medium">Your arrival time</p>
              <span className="text-xs text-sec-main/70">You can check in between 3:00 PM and 6:00 PM</span>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm">
                  Add your estimated arrival time (optional)
                </label>

                <select id="cars" className="border-[1.5px] rounded-md text-xs outline-0 lg:w-1/2 w-full p-2">
                  <option value="volvo">Select time</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default SignUpInfo;
