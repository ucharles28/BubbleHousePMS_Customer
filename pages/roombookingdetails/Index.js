import { useState } from "react";
import Contact from "./Contact";
import Confirmbooking from "./Confirmbooking";
import OtherInfo from "./Other";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    nationality: "",
    other: "",
  });

  const FormTitles = [
    "Add your contact details and select payment method",
    "Confirm your details to complete your booking",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <Contact formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Confirmbooking formData={formData} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="form p-3 w-full">
      <div className="progressbar text-center">
        <h1 className="font-bold my-2">{FormTitles[page]}</h1>
        <div
          className="progress text-center"
          style={{ width: page === 0 ? "50%" : page == 1 && "100%" }}
        ></div>
      </div>
      <div className="form-container w-full">
        <div className="header"></div>
        <div className="body">{PageDisplay()}</div>
      </div>
      <div className="footer text-center mt-3 space-x-2 flex items-center justify-center">
        {page == 1 && (
          <button
            className="bg-[#FFCC00] py-2 px-7"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
        )}

        <button
          className={
            page === 0
              ? "w-[30%] items-end bg-[#FFCC00] py-2 px-7 ml-14"
              : "bg-[#FFCC00] py-2 px-7"
          }
          onClick={() => {
            if (page === FormTitles.length - 1) {
              alert("FORM SUBMITTED");
              console.log(formData);
            } else {
              setPage((currPage) => currPage + 1);
            }
          }}
        >
          {page === FormTitles.length - 1 ? "Confirm Booking" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default Form;
