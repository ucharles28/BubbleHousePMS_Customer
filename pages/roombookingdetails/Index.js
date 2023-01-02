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
      {/* <Navbar /> */}

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
      {PageDisplay()}
      {/* </div> */}
      {/* </div> */}
      {/* <div className="footer text-center mt-3 space-x-2 flex items-center justify-center">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            className="bg-[#FFCC00] py-2 px-7"
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div> */}
      {/* </div> */}

      {/* <Footer /> */}
    </div>
  );
}

export default Form;