import BookingDetails from "../../components/BookingDetails";
import HotelCheckoutDetails from "../../components/HotelCheckoutDetails";
import PriceSummary from "../../components/PriceSummary";

function SignUpInfo({ formData, setFormData }) {
  return (
    <div className="flex items-start justify-center gap-5 w-full">
      <div className="flex-initial w-64">
        <BookingDetails />
        <PriceSummary />
      </div>
      <div className="grid max-w-[50%] w-full space-y-3">
        <HotelCheckoutDetails />
        <div className="border p-4 w-full">
          <h4 className="font-bold">Enter Email Address</h4>
          <div className="mt-3 flex flex-wrap justify-between space-x-4">
            <input
              className="grow border p-2 rounded-sm"
              type="text"
              placeholder="First Name"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
            <input
              className="border grow p-2 rounded-sm"
              type="text"
              placeholder="Last Name"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <input
              className="border w-[50%] p-1 rounded-sm"
              type="text"
              placeholder="Confirm Password..."
              value={formData.confirmPassword}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  confirmPassword: event.target.value,
                })
              }
            />
          </div>
          <div className="mt-2">
            <h3 className="font-bold my-2">Who are you booking for?</h3>
            <div className="flex items-center space-x-1">
              <input type="radio" name="" id="main guest" value="main_guest" />
              <label htmlFor="main guest" className="text-[12px]">
                I'm the main guest
              </label>
            </div>
            <div className="flex items-center space-x-1 mt-2">
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
        <div className="border p-3">
          <h3 className="font-bold">Special request</h3>
          <p className="text-[13px]">
            Do you have any special request to make to the hotel management
            during the period of your stay? You can do so now with the message
            box below which is to be reviewed and considered by the management.
          </p>
          <div className="mt-2">
            <label htmlFor="" className="">
              Kindly make your requests in English
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="border w-full my-2"
            ></textarea>
          </div>
        </div>
        <div className="border p-3">
          <h4 className="font-bold">Your arrival time</h4>
          <small className="text-[11px]">
            You can check in between 3:00 PM and 6:00 PM
          </small>
          <div className="grid mt-3">
            <label htmlFor="" className="text-[11px]">
              Add your estimated arrival time (optional)
            </label>

            <select id="cars" className="max-w-[50%] border p-1 mt-2">
              <option value="volvo">Select time</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpInfo;
