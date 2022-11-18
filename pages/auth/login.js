import { Checkbox, FormControlLabel, TextField, Button, CircularProgress, Snackbar, MuiAlert } from '@mui/material'
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { post } from '../../helpers/ApiRequest';
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from "react-icons/fa";



export default function Login() {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleLogin = async () => {
        setIsLoading(true)
        const request = {
            email,
            password,
            isSocailAuth: false
        }

        const response = await post('Auth/Customer/SignIn', request)
        if (response.successful) {
            router.push("/")
        } else {
            alert(response.data)
        }

        // const res = await signIn("credentials", {
        //     email,
        //     password,
        //     redirect: false,
        // });

        // if (res.ok) {
        //     router.push("/")
        // } else {
        //     alert(res.error)
        // }

        setIsLoading(false)
    }

    const handleGoogleAuth = async () => {
        // const res = await signIn('google', {
        //     redirect: false
        // });
        // console.log(res)
        router.push('/api/google')
        // signOut();
    }
    const handleFacebookAuth = async () => {
        router.push('/api/facebook')
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
                <div className='w-full h-full flex bg-gradient-to-t from-[#1a1a1a]/80 to-[#1a1a1a]/10'>
                    <div className='bg-white w-[450px] h-[605px] flex items-center flex-d m-auto'>

                        <div className='flex justify-center items-center p-7 w-full h-full'>
                            <div className='m-0'>

                                <div className="block">
                                    <Image src="/logo.png" width={120} height={120} className="mb-2 m-auto" />
                                    <p className='block text-xl leading-8 font-medium text-[#1a1a1a}/90'>Welcome to BCloud! &#128075;</p>
                                    <span className='block text-sm leading-5 font-normal text-[#1a1a1a]/70'>Please sign-in to your account and start the adventure</span>
                                </div>

                                <div className='flex flex-col mt-6 space-y-4 text-[#1a1a1a}'>
                                    <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Email" variant="outlined" />
                                    <TextField id="outlined-basic" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Password" variant="outlined" />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <FormControlLabel control={<Checkbox size='small' checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.value)} />} label="Remember Me" className='text-[12px]' />
                                    {/* <p className='text-xs leading-6 font-normal text-[#1a1a1a]/50'>Forgot password?</p> */}
                                </div>
                                {isLoading ? <div className='flex justify-center'><CircularProgress /></div> :
                                    <button
                                        type="button"
                                        disabled={!email || !password}
                                        className="mt-7 w-full text-center justify-center font-medium flex items-center py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]" onClick={handleLogin}>Login</button>}

                                {/* <div className='text-sm font-normal leading-6 w-full text-center mt-10'>
                                    
                                </div> */}
                                <div className='font-normal flex justify-center item-center m-auto mt-2'>
                                    <p className='text-[16px] m-auto flex leading-6'>New on our platform? <Link href="/auth/signup"> <span className='font-bold ml-1'>Create an account</span></Link> </p>
                                </div>
                                {/* <div>
                                    <Image src="/google.png" width={50} onClick={handleGoogleAuth} height={50} className="mt-1 m-auto" />

                                </div> */}
                                {/* <button
                                    role="button"
                                    className="py-2.5 px-4 bg-googlesignin border rounded-full border-gray-700 flex items-center w-full mt-15"
                                    type="submit"
                                    onClick={handleGoogleAuth}
                                >
                                    <div className="border rounded-full p-1 bg-white shadow-sm">
                                    </div>
                                    <p className="text-base font-medium ml-8 sm:ml-6 md:ml-6 lg:ml-6 xl:ml-6 text-black text-center">
                                        Sign in with Google
                                    </p>
                                </button> */}
                                <div className='flex items-center justify-center '>
                                    <FaFacebookF onClick={handleFacebookAuth} color='#4267B2' size={24} />
                                    <FaTwitter color='#1DA1F2' className='mx-4 my-4' size={24} />
                                    <FcGoogle onClick={handleGoogleAuth} size={24} />
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
