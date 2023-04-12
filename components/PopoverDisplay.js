import Popover from "@mui/material/Popover";

const PopoverDisplay = ({
  anchorEl,
  setAnchorEl,
  numberOfChildren,
  numberOfAdults,
  numberOfRooms,
  setNumberOfChildren,
  setNumberOfAdults,
  setNumberOfRooms,
}) => {
  //Popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          width: 320,
        }}
      >
        <div className="flex flex-col w-full p-3 space-y-3">

          <div className="flex justify-between items-center w-full gap-x-12">

            <p className="text-sm mb-[0] font-normal text-sec-main/70">Adult</p>

            <div className="flex items-center justify-center gap-x-3">
              <button
                onClick={() => setNumberOfAdults(Number(numberOfAdults) - 1)}
                disabled={numberOfAdults < 2}
                className="flex justify-center items-center border border-gray-500 hover:bg-gray-200 rounded-full px-3 py-1.5 cursor-pointer"
              >
                <span className="text-lg font-medium leading-6">
                  &#8722;
                </span>
              </button>

              <p className="text-lg font-medium text-gray-700 leading-6 mb-[0]">{numberOfAdults}</p>

              <button
                onClick={() => setNumberOfAdults(Number(numberOfAdults) + 1)}
                className="flex justify-center items-center border border-gray-500 hover:bg-gray-200 rounded-full px-3 py-1.5 cursor-pointer"
              >
                <span className="text-lg font-medium leading-6">
                  &#43;
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center w-full gap-x-12">
            <p className="text-sm mb-[0] font-normal text-sec-main/70">Children</p>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setNumberOfChildren(Number(numberOfChildren) - 1)}
                disabled={numberOfChildren < 1}
                className="flex justify-center items-center border border-gray-500 hover:bg-gray-200 rounded-full px-3 py-1.5 cursor-pointer"
              >
                 <span className="text-lg font-medium leading-6">
                  &#8722;
                </span>
              </button>

              <p className="text-lg font-medium text-gray-700 leading-6 mb-[0]">{numberOfChildren}</p>

              <button
                onClick={() => setNumberOfChildren(numberOfChildren + 1)}
                className="flex justify-center items-center border border-gray-500 hover:bg-gray-200 rounded-full px-3 py-1.5 cursor-pointer"
              >
                <span className="text-lg font-medium leading-6">
                  &#43;
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center w-full gap-x-12">
            <p className="text-sm mb-[0] font-normal text-sec-main/70">Rooms</p>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setNumberOfRooms(numberOfRooms - 1)}
                disabled={numberOfRooms < 2}
                className="flex justify-center items-center border border-gray-500 hover:bg-gray-200 rounded-full px-3 py-1.5 cursor-pointer"
              >
                <span className="text-lg font-medium leading-6">
                  &#8722;
                </span>
              </button>

              <p className="text-lg font-medium text-gray-700 leading-6 mb-[0]">{numberOfRooms}</p>

              <button
                onClick={() => setNumberOfRooms(numberOfRooms + 1)}
                className="flex justify-center items-center border border-gray-500 hover:bg-gray-200 rounded-full px-3 py-1.5 cursor-pointer"
              >
                <span className="text-lg font-medium leading-6">
                  &#43;
                </span>
              </button>
            </div>
          </div>

        </div>
      </Popover>
    </div>
  );
};

export default PopoverDisplay;
