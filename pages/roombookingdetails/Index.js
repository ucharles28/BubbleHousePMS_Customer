import { useState } from "react";
import Contact from "./Contact";
import Confirmbooking from "./Confirmbooking";
import OtherInfo from "./Other";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    username: "",
    country: "",
    other: "",
  });

  const FormTitles = [
    "Add your contact details and select payment method",
    "Confirm your details to complete your booking",
    "Other",
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
    <div className="h-[screen] font-poppins">
      <Navbar />

      {/* <div className="progressbar">
        <h1 className="font-bold my-2">{FormTitles[page]}</h1>
        <div
          style={{ width: page === 0 ? "66.6%" : page == 1 ? "33.4%" : "100%" }}
        ></div>
      </div> */}
      {/* <div className=""> */}
      {/* <div className="form-container"> */}
      {/* <div className="header"></div> */}
      {/* <div> */}
      {/* <div> */}
        {PageDisplay()}
        {/* </div> */}
        {/* </div> */}
        <div className="text-center space-x-2 flex items-center justify-end lg:px-24 px-4 pb-20 pt-6">
          <button
            className="py-2.5 px-6 rounded-md text-sm font-medium text-sec-main"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Back
          </button>
          <button
            className="bg-pri-main p-3 lg:w-1/6 w-1/2 rounded-md text-sm font-medium text-sec-main hover:bg-pri-cont"
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Complete Booking" : "Continue"}
          </button>
        </div>
      {/* </div> */}
      {/* </div> */}

      <Footer />
    </div>
  );
}

export default Form;