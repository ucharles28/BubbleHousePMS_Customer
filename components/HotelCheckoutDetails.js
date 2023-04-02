import Image from "next/image";

const HotelCheckoutDetails = () => {
  return (
    <div className="border p-3 flex space-x-3 rounded-md">
      <Image width={200} height={200} src="../public/images/img/img.png" />
      <div className="">
        <h4 className="font-bold">Raddison Blue Hotel and Suites</h4>
        <div className="flex space-x-3 mt-2 text-[11px]">
          <p>Surelere, Lagos</p>
          <p>Plot 37 Ahmed Onibudo Street</p>
        </div>
      </div>
    </div>
  );
};

export default HotelCheckoutDetails;
