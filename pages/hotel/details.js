import { Heart, Location } from "iconsax-react";
import Carousel from "../../components/Carousel";

export default function HotelDetails() {
    const responsive = {
        desktop: {//desktop
            items: 2
        },
        tablet: {//tablet
            items: 1
        },
        mobile: {//mobile
            items: 1
        }
    };
    return (
        <div className="w-full flex flex-col h-full font-poppins">
            <div className="flex flex-row justify-between mx-20 mt-10 mb-10">
                <div className="flex-col">
                    <p className="text-2xl font-medium">Raddison Blue</p>
                    <div className="flex gap-1 mt-1">
                        <Location
                            size={20} className="items-center" />
                        <div className="max-w-[562px]">
                            <p className="text-sm leading-[20px]">No.1, Bisi Oladipo Street, Aviation Estate, Off Murtala Mohammed International Airport Road, Lagos., 100261 Lagos, Nigeria</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Heart
                        size={24} 
                        />
                    <button
                        type="button"
                        className="text-center font-medium px-3 py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">Book Now</button>
                </div>
            </div>

            {/* Room Images Carousel */}
            <div className="mx-4">
                <Carousel show={2} responsive={responsive}>
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                    <img
                        className="relative rounded-[6px] w-[576.95px] h-[565.01px] shrink-0 object-cover"
                        alt=""
                        src="../img2@2x.png"
                    />
                </Carousel>
            </div>

            {/* Description */}
            <div className="flex mx-20 justify-between my-10 gap-14">
                <div className="w-[813px]">
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur. Aliquet malesuada malesuada maecenas sit turpis non quis. Sodales ornare egestas auctor eget. Sit adipiscing sodales in quis consequat morbi sollicitudin duis scelerisque. Amet dolor fringilla sociis augue ipsum.
                        Et orci at eget aliquam sed pretium sit laoreet. Odio pellentesque ultricies hac id montes amet amet. Facilisis curabitur quis et volutpat mattis magnis tristique.
                        Nam sed rhoncus risus netus vulputate vestibulum aenean orci. Massa nunc fringilla purus mollis est nisl sed aliquet. Est arcu condimentum habitasse leo gravida arcu bibendum suscipit sed. Eu commodo est ornare faucibus erat sagittis. Dignissim adipiscing vestibulum condimentum egestas. Est turpis a amet nibh sed dignissim massa.
                        Parturient volutpat in sed pretium enim ut dui. Scelerisque elementum semper sagittis adipiscing eget vivamus facilisi nibh enim. Elit purus eu eget ac magna. Aliquam pharetra sed sem sed eget at nec. Sit tempus sed quam placerat accumsan. Malesuada rhoncus vitae a enim nulla nisl feugiat. Gravida mauris integer volutpat eu auctor in proin cursus et. Enim tellus risus dictum diam.
                        Blandit pellentesque dolor ornare euismod adipiscing placerat neque sem massa. A euismod at maecenas sed quam lacus lorem. Viverra ullamcorper mi enim hendrerit sagittis erat pharetra. Pulvinar sed vitae cursus consectetur risus donec eget. Augue nunc morbi ornare aliquam orci lorem.
                    </p>

                </div>
                <div className="bg-[#1A1A1A0A] h-[228px] flex flex-col w-[343px] h-[288px] rounded-[6px] p-4">
                    <p className="text-base leading-[175%] font-medium">Reservation Highlights</p>
                    <div className="mt-5 mb-9">
                        <p className="text-[13px] leading-[18px] font-medium">Free Private Parking Available On Site</p>
                        <p className="text-[13px] leading-[18px] font-medium">Free Wifi</p>
                    </div>

                    <button type="button"
                        className="text-center font-medium px-3 py-2 w-full rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]">
                        Book Now
                    </button>
                    <div className="flex justify-center gap-2 mt-3">
                        <Heart size={20} />
                        <span className="text-sm leading-5">Like this property</span>
                    </div>
                </div>

            </div>
        </div>
    );
};