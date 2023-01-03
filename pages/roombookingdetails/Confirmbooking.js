import React from "react";
import BookingDetails from "../../components/BookingDetails";
import PriceSummary from "../../components/PriceSummary";
import HotelCheckoutDetails from "../../components/HotelCheckoutDetails";
import Link from "next/link";

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="flex items-start justify-center gap-5 w-full">
      <div className="flex-initial w-64">
        <BookingDetails />
        <PriceSummary />
      </div>
      <div className="grid max-w-[50%] w-full space-y-3">
        <HotelCheckoutDetails />
        <div className="border p-4 w-full">
          <div className="flex justify-between">
            <div className="w-full">
              <h4 className="font-bold">Enter your address</h4>
              <div className="mt-3 ">
                <div className="grid text-[#9CA3AF]">
                  <label htmlFor="" className="text-[12px] text-[#9CA3AF] my-1">
                    Country
                  </label>
                  <select id="cars" className="max-w-[50%] border p-2">
                    <option value="volvo">Select time</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <div className="mt-2">
                <div className="grid">
                  <label htmlFor="" className="text-[12px] my-1 text-[#9CA3AF]">
                    Phone Number
                  </label>
                  <input
                    className="grow border p-2 rounded-sm w-[50%]"
                    type="text"
                    placeholder="+0123456789"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="border w-[200px] h-[200px] p-4">
                <Link href="" className="text-end w-full">
                  Edit
                </Link>
                <div className="space-y-3 mt-7">
                  <p className="text-[13px]">Name</p>
                  <small>Uzoma Charles</small>

                  <div>
                    <p className="text-[13px]">Email</p>
                    <small>Uzomacharles@gmail.com</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <input
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
        value={formData.username}
        onChange={(e) => {
          setFormData({ ...formData, username: e.target.value });
        }}
      /> */
}
export default PersonalInfo;
