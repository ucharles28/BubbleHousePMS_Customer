import { Wifi, Star1 } from "iconsax-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWifi, faCar, faTv, faBed, faDumbbell, faWineGlass, faMartiniGlassEmpty, faUtensils, faUser, faPhone, faBanSmoking, faSmoking,
    faMugSaucer, faSpa, faBellConcierge, faPercent, faEnvelopeOpen, faTag,
    faCalendarDays, faHouse, faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faWifi, faCar, faTv, faBed, faDumbbell, faWineGlass, faMartiniGlassEmpty, faUtensils, faUser, faPhone, faBanSmoking, faSmoking, faMugSaucer, faSpa, faBellConcierge, faPercent, faEnvelopeOpen, faTag, faCalendarDays, faHouse, faLightbulb)

const Amenities = ({ amenities }) => {
  return (
    <>
      <div className="grid justify-between md:grid-cols-8 grid-cols-3 gap-4 font-poppins">
        {amenities && amenities.map((amenity) => (
          <div className="relative flex flex-col items-center space-y-2">

            <div className="flex items-center justify-center relative">
              <span className="absolute rounded-full p-5 bg-pri-main/30">
              </span>
              {/* <i className={`fa fa-${amenity.icon} text-base text-[#f5c400]`}></i> */}
              <FontAwesomeIcon icon={amenity.icon} className="text-base text-[#f5c400"/>
            </div>

            <p className="inset-1 text-xs text-center md:font-medium font-normal"> {amenity.title}</p>
          </div>
        ))}

      </div>
    </>
  );
};

export default Amenities;
