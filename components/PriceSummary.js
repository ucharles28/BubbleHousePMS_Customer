const PriceSummary = () => {
  return (
    <>
      <div className="border p-4 mt-4">
        <h3 className="text-[12px] font-semibold">Price summary</h3>
        <div className="flex justify-between items-center mt-2 text-[12px] ">
          <div className="space-y-1">
            <p>Room price</p>
            <p>7.5 % VAT</p>
            <p>5 % State Tax</p>
          </div>
          <div className="space-y-1 text-[11px]">
            <p>NGN 60,000</p>
            <p>NGN 4,500</p>
            <p>NGN 3,000</p>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-[12px]">
          <p>Total</p>
          <span>NGN 67,500</span>
        </div>

        <div className="text-[10px] mt-4 space-y-1">
          <p>Free cancellation until 11:59 PM on 26 Aug</p>
          <p className="text-[#4CB200]">Payment to be made on premises</p>
        </div>
      </div>
    </>
  );
};

export default PriceSummary;
