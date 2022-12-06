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
        <div className="flex justify-between items-center gap-11 py-[15px] px-[16px]">
          <p className="text-base text-black ">Adult</p>

          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setNumberOfAdults(numberOfAdults - 1)}
              disabled={numberOfAdults < 2}
              className="text-center flex justify-center items-center border border-black rounded-full px-3"
            >
              <span className="font-medium text-xl mb-1">-</span>
            </button>

            <p className="text-lg mx-2">{numberOfAdults}</p>
            <button
              onClick={() => setNumberOfAdults(numberOfAdults + 1)}
              className="text-center flex justify-center items-center border border-black rounded-full px-2"
            >
              <span className="font-medium text-xl mb-1">+</span>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
          <p className="text-base ">Children</p>

          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setNumberOfChildren(numberOfChildren - 1)}
              disabled={numberOfChildren < 1}
              className="text-center flex justify-center items-center border border-black rounded-full px-3"
            >
              <span className="font-medium text-xl mb-1">-</span>
            </button>

            <p className="text-lg mx-2">{numberOfChildren}</p>
            <button
              onClick={() => setNumberOfChildren(numberOfChildren + 1)}
              className="text-center flex justify-center items-center border border-black rounded-full px-2"
            >
              <span className="font-medium text-xl mb-1">+</span>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-11 py-[6px] px-[16px]">
          <p className="text-base ">Rooms</p>

          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setNumberOfRooms(numberOfRooms - 1)}
              disabled={numberOfRooms < 2}
              className="text-center flex justify-center items-center border border-black rounded-full px-3"
            >
              <span className="font-medium text-xl mb-1">-</span>
            </button>

            <p className="text-lg mx-2">{numberOfRooms}</p>
            <button
              onClick={() => setNumberOfRooms(numberOfRooms + 1)}
              className="text-center flex justify-center items-center border border-black rounded-full px-2"
            >
              <span className="font-medium text-xl mb-1">+</span>
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default PopoverDisplay;
