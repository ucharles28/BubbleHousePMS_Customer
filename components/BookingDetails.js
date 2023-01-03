const BookingDetails = () => {
  return (
    <>
      <div className="border p-4">
        <h3 className="font-semibold text-[12px]">Booking details</h3>
        <div className="flex items-center w-full justify-between mt-2 gap-5">
          <div className="text-[13px] text-[#1A1A1AAD]">
            <h6>Check in</h6>
            <small>Fri, 27 Aug, 2022</small>

            <div className="mt-2">
              <small>Guests</small>
              <br />
              <small>2 Adults</small>
            </div>
          </div>

          <div className="">
            <div className="text-[13px] text-[#1A1A1AAD]">
              <h5>check out</h5>
              <small>Fri, 27 Aug, 2022</small>
            </div>
            <div>
              <small>Rooms</small>
              <br />
              <small>1 room</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
