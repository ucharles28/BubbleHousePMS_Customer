import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { post } from '../helpers/ApiRequest';
import Image from "next/image";
import { BounceLoader } from 'react-spinners';
import bcloud1 from "../public/images/img/bcloud1.png";
import { Form, Col } from 'react-bootstrap';

export default function ResetPassword({ email }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [open, setOpen] = useState(false);

    const handleResetPassword = async () => {
        setIsLoading(true)

        if (newPassword.length < 8) {
            showAlert('error', 'Your password should be at least 8 characters long')
            setLoading(false);
            return
        }
        if (confirmPassword !== newPassword) {
            showAlert('error', 'Both passwords didn’t match. Please try again.')
            setLoading(false);
            return
        }

        const request = {
            email,
            password: newPassword
        }

        const response = await post('Auth/ResetPassword', request)
        if (response.successful) {
            // showAlert('success', 'Password updated successfully')
            // setTimeout(() => {
            // }, 1000);
            router.push('login')
        } else {
            alert(response.data)
        }
        setIsLoading(false)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const showAlert = (alertType, alertMessage) => {
        setAlertMessage(alertMessage)
        setAlertType(alertMessage)
        setOpen(true)
    }

    return (
        <div className='h-screen font-poppins'>

            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
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
                                    <p className='mb-[0] text-lg font-medium text-[#1a1a1a}/90'>Create new password</p>
                                    <span className='text-sm font-normal text-[#1a1a1a]/70'>Create your new password. Make sure it’s easy for you to remember</span>
                                </div>
                            </div>

                            <Form className='flex flex-col gap-4'>
                                <Form.Group as={Col} controlId="validationCustom01" autoCorrect="nope">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm font-medium text-gray-800">
                                            New Password
                                        </label>
                                        <Form.Control
                                            type="password"
                                            placeholder="New Password"
                                            role="input"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="bg-white border-[1.5px] rounded-md border-gray focus:outline-none text-base font-medium leading-none text-black py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid" />
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} controlId="validationCustom01" autoCorrect="nope">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm font-medium text-gray-800">
                                            Confirm Password
                                        </label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            role="input"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                        onClick={handleResetPassword}
                                        disabled={!newPassword || !confirmPassword || isLoading}
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
