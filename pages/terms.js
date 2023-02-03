import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from 'next/link';

function TermsOfService() {
    return (
        <div className='h-full font-poppins'>
            <Navbar />
            <div className="w-full h-full">

                <div className="pt-28 pb-12 h-auto bg-gradient-to-b from-orange-300 to-yellow-500 flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-white">Terms of Service</h1>
                </div>

                <div className='container py-16 lg:px-5 px-4 mx-auto space-y-8 text-justify text-sm text-gray-700'>

                    <div className='flex flex-col w-full'>
                        <p className='font-semibold leading-7 text-base'>
                            Terms and Conditions
                        </p>

                        <p className='font-normal leading-6'>
                            Bookings can be made by visiting our website: <Link href='#'><strong>www.bubblehousebiz.com</strong></Link> <br />
                            <strong>Or</strong> write us email us: <Link href='mailto:Customerservice@bubblehousebiz.com' target='_blank'><strong>Customerservice@bubblehousebiz.com</strong></Link> <br />
                            <strong>Or</strong> Phone us: <Link href='tel:+2349157871153'><strong>+234 915 787 1153</strong></Link> <br />
                            <Link href='tel:+14709191041'><strong>+1 470 919 1041</strong></Link> <br />
                            To book a room in our hotel, the customers and guests must fill the exact room of choice, accommodation period, guest's name, phone number, e-mail address and guest's card number and its expiration date on the card.<br />
                            We accept Mastercard Visa card for payments.<br />
                            Payment is charged from the guest's card on the day the booking is made.

                        </p>
                    </div>

                    <div className='flex flex-col w-full'>
                        <p className='font-semibold leading-7 text-base'>
                            Guaranteed reservations
                        </p>

                        <p className='font-normal leading-6'>
                            The reservation can be guaranteed only by making a booking with the guest's card number and expiration date or by making a prepayment (not later than 72 hours prior to arrival).
                            Room can be reserved by a third party as long as booking is made.
                            Bubble House Gold Card Carrying Member are the one that can make a reservation at the snap of their fingers and its automatically guaranteed.
                            In case of unguaranteed reservation, the hotel keeps the right to sell the room to another person.

                        </p>
                    </div>

                    <div className='flex flex-col w-full'>
                        <p className='font-semibold leading-7 text-base'>
                            Cancellation policy
                        </p>

                        <p className='font-normal leading-6'>
                            Guaranteed reservation without any penalties may be canceled up to 72 hours prior to arrival date, by sending a written request for reservation cancellation by e-mail. The guest must ensure that the reservation cancellation request and responds falls within the stipulated 72 hrs prior to arrival. <br />

                            <strong>Email us: </strong>
                            <Link href='mailto:Customerservice@bubblehousebiz.com' target='_blank'>
                                <strong>
                                    Customerservice@bubblehousebiz.com
                                </strong>
                            </Link> <br />

                            <strong>Phone us: </strong>
                            <Link href='tel:+2349157871153'>
                                <strong>
                                    +234 915 787 1153
                                </strong>
                            </Link> <br />

                            <Link href='tel:+14709191041'>
                                <strong>
                                    +1 470 919 1041
                                </strong>
                            </Link> <br />
                            <br />

                            In case of delayed reservation cancellation or without informing the hotel about reservation cancellation, the hotel does not return the pre-paid amount for all guaranteed reservation.<br />

                            If the guarantee reservation with card is canceled after more than 72 hours to the date of arrival Or in case of no--show, a penalty equal to the accommodation cost for the first night will be charged.
                        </p>
                    </div>

                    <div className='flex flex-col w-full'>
                        <p className='font-semibold leading-7 text-base'>
                            Stay-On Policy
                        </p>

                        <p className='font-normal leading-6'>
                            1. Check-in time is 2PM and check out is 11AM. Failure to check out by 12noon will result in an additional fee 12pm -4pm half day while after 4pm will attracts full day charges. <br />

                            2. Guests are advised to always drop their key card before leaving the premises as loss of card would attract a fee of N5,000 and more in some cases. <br />

                            3. Food and Drinks from outside the hotel are not allowed into the rooms and bar of the hotel. Except in the case of hotels that do not run full F&B, defaulters would be made to pay N10,000. <br />

                            4. The rooms. walk ways, staircase, inside bar and restaurant is hereby declared a non-smoking area( Except otherwise stated) .The hotel guest bears financial liability for damaging the hotel's equipment, materials or technical devices due to their fault or their visitors.' <br />

                            5. Personal belongings left by guest in the hotel room upon check out shall be kept in our store for 90 days. <br />

                            6. Electric iron, ring boilers and cooking are not allowed in the rooms. <br />

                            7. Conducts of guests and persons using the services of the hotel should not disturb the peaceful stay or other guests. The hotel may refuse to render services to a person violating the above rule. <br />

                            8. Guess are advised to confirm the number of towels placed in the rooms upon check in so as to avoid argument when checking out as anyone (towel) found missing or damaged will be paid for. <br />

                        </p>
                    </div>

                    <div className='flex flex-col w-full'>
                        <p className='font-semibold leading-7 text-base'>
                            Check-in policy
                        </p>

                        <p className='font-normal leading-6'>
                            Guests will receive a card or key  as a room key, for which registration saying in the room is required
                            Registration is carried out by completing the check-in accurately and ventying the guest's identity. <br />
                            The presentation of the documents proving identity is considered an essential condition of the accommodation contract. <br />
                            The rooms can be occupied from 2noon on the day of arrival. <br />
                            If the room is available, the guests may occupy the room before 2pm for NO surcharge of.
                        </p>
                    </div>

                    <div className='flex flex-col w-full'>
                        <p className='font-semibold leading-7 text-base'>
                            Check-in policy
                        </p>

                        <p className='font-normal leading-6'>
                            On the day of departure, the guest is required to leave the room taking all the luggage with him or her at 11 am. The hotel&#39;s card received at check-in  is to be returned at the front  desk. Depending on the hotel's available room capacity, the guest may leave the hotel room later, up to 2:00pm for NO surcharge or extra fee. <br />
                            In case if the guest stays longer than 2:00pm (that is if the room is not empty ).
                            The guest is required to pay the full charge of staying in the hotel no later than at the time of
                            ticir lina depenure in accordance with provisions of the accommodation contract. <br />
                            In case of refusal to pay for any reason, the hotel is entitled to keep the guests' belongings
                            taken into the hotel, the hotel is entitled to enforce lien. <br />
                            The police may enforce its claim against the guest, the costs of which are to be borne by the guest is to be determined by the front desk Manager .compensation to the hotel for a non-returned or damaged card key of the hotel.
                        </p>
                    </div>

                    <div className='flex flex-col w-full'>
                        <p className='font-semibold leading-7 text-base'>
                            Third party (visitors of the guest)
                        </p>

                        <p className='font-normal leading-6'>
                            Only the guests registered at the front desk are allowed to stay in the hotel rooms. <br />
                            The guest is responsible for their visitor's behavior - including any incurring damage as well. <br />
                            The hotel excludes any liability incurred by any damage caused by the visitor to the guest
                            or any third  party. <br />
                            If the number of guests exceeds the number of the guests registered in the booking,there will be a surcharge or the hotel reserves the right to eject the Owner of the room and his or her guest by extension.
                        </p>
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default TermsOfService;