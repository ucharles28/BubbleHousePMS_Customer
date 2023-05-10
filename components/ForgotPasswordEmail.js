import { useRouter } from 'next/router';
import { useState } from 'react';
import { post } from '../helpers/ApiRequest';
import Image from "next/image";
import { BounceLoader } from 'react-spinners';
import bcloud1 from "../public/images/img/bcloud1.png";
import { Form, Col } from 'react-bootstrap';

export default function ForgotPasswordEmail({ gotoNextStep, email, setEmail }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSendOtp = async () => {
        setIsLoading(true)

        const response = await post('Auth/SendOtp', email)
        if (response.successful) {
            gotoNextStep()
        } else {
            alert(response.data)
        }
        setIsLoading(false)
    }


    const showAlert = (alertMessage) => {
        setAlertMessage(alertMessage)
        setOpen(true)
    }

    return (
        <div className='h-screen font-poppins'>

            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar> */}


            <div className='item w-full h-full bg-[url(https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg)] object-fill'>
                <div className='w-full h-full flex bg-gradient-to-t from-[#1a1a1a]/90 to-[#1a1a1a]/30'>

                    <div className='flex justify-center items-center w-full px-1 h-full'>
                        <div className='bg-white rounded lg:w-1/3 w-full lg:px-6 p-4 py-10 shadow-md flex flex-col gap-9'>


                            <div className="flex flex-col gap-5 items-center">
                                <Image src={bcloud1} width={100} height={100} className="object-cover" />

                                <div className='flex flex-col w-full'>
                                    <p className='mb-[0] text-lg font-medium text-[#1a1a1a}/90'>Forgot your password?</p>
                                    <span className='text-sm font-normal text-[#1a1a1a]/70'>Enter the email address you used to sign up and we'll send you an OTP Code to be used to reset your password.</span>
                                </div>
                            </div>

                            <Form className='flex flex-col gap-4'>
                                <Form.Group as={Col} controlId="validationCustom01" autoCorrect="nope">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm font-medium text-gray-800">
                                            Email Address
                                        </label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            role="input"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white border-[1.5px] rounded-md border-gray focus:outline-none text-base font-medium leading-none text-black py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid" />
                                    </div>
                                </Form.Group>
                                <div className="mt-2">
                                    <button
                                        role="button"
                                        type="submit"
                                        aria-label="log into my account"
                                        onClick={handleSendOtp}
                                        disabled={!email || isLoading}
                                        className="text-sm font-medium uppercase rounded-md leading-none focus:outline-none bg-pri-main hover:bg-pri-cont disabled:bg-pri-main/50 text-sec-main py-3.5 w-full flex items-center justify-center gap-1"
                                    >
                                        {isLoading ? <BounceLoader size={18} color="#ffffff" /> :
                                            <span>Reset your password</span>}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
