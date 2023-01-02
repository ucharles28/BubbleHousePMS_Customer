import { Checkbox, FormControlLabel, TextField, Button, CircularProgress, Snackbar, MuiAlert } from '@mui/material'
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { post } from '../../helpers/ApiRequest';
// import styles from '../styles/Home.module.css';
import Image from "next/image";
// import { logo } from "../public/logo.png";
import { useSession, signIn, signOut } from 'next-auth/react'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';



export default function SignUp() {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoadingSocial, setIsLoadingSocial] = useState(false);

    const googleAuthLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            setIsLoadingSocial(true)
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                }
            }).then(async (res) => {
                return res.json()
            })

            console.log(userInfo)
            const request = {
                email: userInfo.email,
                fullName: userInfo.name,
                profileImageUrl: userInfo.picture
            }

            const response = await post('Auth/Customer/SocialLogin', request);
            console.log(response)
            if (response.successful) {
                // Request is successful
                localStorage.setItem('token', response.data.token);
                localStorage.setItem(
                    'tokenExpiry',
                    JSON.stringify(response.data.tokenExpiryDate)
                );
                localStorage.setItem('user', JSON.stringify(response.data));
                router.push("/")
            } else {
                alert(response.data)
            }
            setIsLoadingSocial(false)
        },

    });

    const handleLogin = async () => {
        setIsLoading(true)
        const request = {
            email,
            password,
            fullName,
            isSocailAuth: false
        }
        const response = await post('Auth/Customer/SignUp', request)
        if (response.successful) {
            // Request is successful
            localStorage.setItem('token', response.data.token);
            localStorage.setItem(
                'tokenExpiry',
                JSON.stringify(response.data.tokenExpiryDate)
            );
            localStorage.setItem('user', JSON.stringify(response.data));
            router.push("/")
        } else {
            alert(response.data)
        }
        setIsLoading(false)
    }

    const responseFacebook = async (fbResponse) => {
        console.log(fbResponse)
        if (!fbResponse.name) return

        setIsLoadingSocial(true)

        const request = {
            email: fbResponse.email,
            fullName: fbResponse.name,
            profileImageUrl: fbResponse.picture.data.url
        }

        const response = await post('Auth/Customer/SocialLogin', request);
        if (response.successful) {
            localStorage.setItem('user', JSON.stringify(response.data))
            router.push("/")
        } else {
            alert(response.data)
        }
        setIsLoadingSocial(false)
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
                                    <p className='block text-xl leading-8 font-medium text-[#1a1a1a}/90'>Adventure starts here 🚀</p>
                                    <span className='block text-sm leading-5 font-normal text-[#1a1a1a]/70'>Make your hotel booking management easy and fun!</span>
                                </div>

                                <div className='flex flex-col mt-6 space-y-4 text-[#1a1a1a}'>
                                    <TextField id="outlined-basic" value={fullName} onChange={(e) => setFullName(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Full Name" variant="outlined" />
                                    <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Email" variant="outlined" />
                                    <TextField id="outlined-basic" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Password" variant="outlined" />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <FormControlLabel control={<Checkbox size='small' checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.value)} />} label="I agree to privacy policy & terms" className='text-[12px]' />
                                    {/* <p className='text-xs leading-6 font-normal text-[#1a1a1a]/50'>Forgot password?</p> */}
                                </div>
                                {isLoading ? <div className='flex justify-center'><CircularProgress /></div> :
                                    <button
                                        type="button"
                                        disabled={!fullName || !email || !password || !acceptTerms}
                                        className="mt-7 w-full text-center justify-center font-medium flex items-center py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]" onClick={handleLogin}>Sign Up</button>}

                                {/* <div className='text-sm font-normal leading-6 w-full text-center mt-10'>
                                    
                                </div> */}
                                {/* <div className='text-sm font-normal m-auto mt-2'>
                                    <p>Already have an account?  Sign in instead</p>
                                </div> */}
                                <div className='font-normal flex justify-center item-center m-auto mt-2'>
                                    <p className='text-[16px] m-auto flex leading-6'>Already have an account? <Link href="/auth/login"> <span className='font-medium ml-1'>Sign in instead</span></Link> </p>
                                </div>
                                {!isLoadingSocial ? <div className='flex items-center justify-center '>

                                    <FacebookLogin
                                        appId="687573586008281"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        render={renderProps => {
                                            console.log(renderProps)

                                            // <button onClick={(e) => renderProps.onClick(e)}>This is my custom FB button</button>
                                            return (<FaFacebookF className='cursor-pointer' onClick={(e) => renderProps.onClick(e)} color='#4267B2' size={24} />)
                                        }}
                                        callback={responseFacebook} />
                                    <FaTwitter color='#1DA1F2' className='mx-4 my-4 cursor-pointer' size={24} />
                                    <FcGoogle className='cursor-pointer' onClick={() => googleAuthLogin()} size={24} />
                                </div> :
                                    <div className='flex items-center justify-center '>
                                        <CircularProgress />
                                    </div>}


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
