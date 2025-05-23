import { Checkbox, FormControlLabel, TextField, Button, CircularProgress, Snackbar, MuiAlert } from '@mui/material'
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useState } from 'react';
import { post, get } from '../../helpers/ApiRequest';
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitter } from "react-icons/fa";
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import jwt_decode from "jwt-decode"
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { BounceLoader } from 'react-spinners';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bcloud1 from "../../public/images/img/bcloud1.png";
import { Form, Col } from 'react-bootstrap';
import { RiFacebookFill } from 'react-icons/ri';

export default function Login() {


    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSocial, setIsLoadingSocial] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        alert(
            `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );
        refreshTokenSetup(res);
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

    const onHandleSuccess = async (res) => {
        const userObject = jwt_decode(res.credential);
        console.log(userObject);
    }

    const handleFacebookAuth = async () => {
        router.push('/api/facebook')
    }
    const showAlert = (alertMessage) => {
        setAlertMessage(alertMessage)
        setOpen(true)
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
                <div className='w-full h-full flex bg-gradient-to-t from-[#1a1a1a]/90 to-[#1a1a1a]/30'>

                    <div className='flex justify-center items-center w-full px-1 h-full'>
                        <div className='bg-white rounded lg:w-1/3 w-full lg:px-6 p-4 py-10 shadow-md flex flex-col gap-6'>

                            {/* <GoogleLogin
                                    onSuccess={onHandleSuccess}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                /> */}

                            <div className="flex flex-col gap-5 items-center">
                                <Image src={bcloud1} width={100} height={100} className="object-cover" />

                                <div className='flex flex-col w-full'>
                                    <p className='mb-[0] text-lg font-medium text-[#1a1a1a}/90'>Welcome to BCloud! &#128075;</p>
                                    <span className='text-sm font-normal text-[#1a1a1a]/70'>Please sign-in to your account and start the adventure</span>
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white border-[1.5px] rounded-md border-gray focus:outline-none text-base font-medium leading-none text-black py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid" />
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} controlId="validationCustomPassword" autoCorrect="current-password">
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className='flex justify-between'>
                                            <label className="text-sm font-medium text-gray-800">
                                                Password
                                            </label>
                                        </div>
                                        <div className="relative flex items-center justify-center">
                                            <Form.Control
                                                type={passwordShown ? 'text' : 'password'}
                                                role="input"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                                className="bg-white border-[1.5px] rounded-md border-gray focus:outline-none text-base font-medium leading-none text-black py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                                required
                                            />
                                            <div
                                                className="absolute right-1 mt-2 mr-2 cursor-pointer"
                                                onClick={togglePasswordVisiblity}
                                            >
                                                {passwordShown ? <FiEyeOff /> : <FiEye />}
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} controlId="validationCustomTerms">
                                    <div className='flex flex-row justify-between'>
                                        <div className="flex flex-row gap-2 pl-0.5">
                                            <div>
                                                <Form.Check
                                                    name="term"
                                                    type="checkbox"
                                                    checked={acceptTerms}
                                                    onChange={(e) => setAcceptTerms(e.target.value)}
                                                />
                                            </div>
                                            <div className="text-sm mb-[0]">
                                                Remember Me
                                            </div>
                                        </div>
                                        <div className='font-normal flex text-gray-500 text-sm'>
                                            <p className='flex gap-1'><Link href="/auth/forgotpassword"> <span>Fogot password?</span></Link> </p>
                                        </div>
                                    </div>
                                </Form.Group>

                                <div className="mt-2">
                                    <button
                                        role="button"
                                        type="submit"
                                        aria-label="log into my account"
                                        onClick={handleLogin}
                                        disabled={!email || !password || isLoading}
                                        className="text-sm font-medium uppercase rounded-md leading-none focus:outline-none bg-pri-main hover:bg-pri-cont disabled:bg-pri-main/50 text-sec-main py-3.5 w-full flex items-center justify-center gap-1"
                                    >
                                        {isLoading ? <BounceLoader size={18} color="#ffffff" /> :
                                            <span>Login</span>}
                                    </button>
                                </div>
                            </Form>

                            <div className='font-normal flex justify-center item-center text-sm'>
                                <p className='flex gap-1'>New on our platform? <Link href="/auth/signup"> <span className='font-medium'>Create an account</span></Link> </p>
                            </div>

                            {!isLoadingSocial ? <div className='flex items-center justify-center gap-4 mt-3'>

                                {/*<FacebookLogin
                                    appId="687573586008281"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    render={renderProps => {
                                        console.log(renderProps)

                                        return (<RiFacebookFill className='cursor-pointer' onClick={(e) => renderProps.onClick(e)} color='#4267B2' size={24} />)
                                    }}
                                    callback={responseFacebook} />*/}
                                {/* <FaTwitter color='#1DA1F2' className='cursor-pointer' size={24} /> */}
                                <FcGoogle className='cursor-pointer' onClick={() => googleAuthLogin()} size={24} />
                            </div> : <div className='flex items-center justify-center '>
                                <BounceLoader />
                            </div>}

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
